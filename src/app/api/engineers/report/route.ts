import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { agentRuns } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { engineers } from '@/lib/engineers';

/**
 * Build a minimal valid PDF containing the engineer run report as plain text.
 * No external PDF library needed — we construct the PDF byte structure directly.
 */
function buildPdfReport(opts: {
  engineerName: string;
  engineerId: string;
  ticker: string;
  status: string;
  triggerType: string;
  startedAt: string | null;
  completedAt: string | null;
  durationMs: number | null;
  output: string;
  error: string | null;
}): Uint8Array {
  const lines: string[] = [];

  lines.push(`ENGINEER RUN REPORT`);
  lines.push(`${'='.repeat(60)}`);
  lines.push(``);
  lines.push(`Engineer:     ${opts.engineerName} (${opts.engineerId})`);
  lines.push(`Ticker:       ${opts.ticker}`);
  lines.push(`Status:       ${opts.status}`);
  lines.push(`Trigger:      ${opts.triggerType}`);
  if (opts.startedAt) lines.push(`Started:      ${new Date(opts.startedAt).toLocaleString()}`);
  if (opts.completedAt) lines.push(`Completed:    ${new Date(opts.completedAt).toLocaleString()}`);
  if (opts.durationMs != null) lines.push(`Duration:     ${(opts.durationMs / 1000).toFixed(1)}s`);
  lines.push(``);
  lines.push(`${'='.repeat(60)}`);
  lines.push(`OUTPUT`);
  lines.push(`${'='.repeat(60)}`);
  lines.push(``);

  if (opts.output) {
    lines.push(opts.output);
  } else {
    lines.push('(No output recorded)');
  }

  if (opts.error) {
    lines.push(``);
    lines.push(`${'='.repeat(60)}`);
    lines.push(`ERROR`);
    lines.push(`${'='.repeat(60)}`);
    lines.push(opts.error);
  }

  lines.push(``);
  lines.push(`${'—'.repeat(60)}`);
  lines.push(`Generated: ${new Date().toISOString()}`);

  const fullText = lines.join('\n');

  // Build PDF with multi-page support
  // PDF text rendering: we split into lines and paginate
  const fontSize = 9;
  const leading = 12;
  const pageW = 612; // Letter width in points
  const pageH = 792; // Letter height in points
  const marginL = 50;
  const marginR = 50;
  const marginT = 50;
  const marginB = 50;
  const usableW = pageW - marginL - marginR;
  const usableH = pageH - marginT - marginB;
  const linesPerPage = Math.floor(usableH / leading);
  const charsPerLine = Math.floor(usableW / (fontSize * 0.52)); // approximate mono char width

  // Word-wrap and split the text into rendered lines
  const renderedLines: string[] = [];
  for (const rawLine of fullText.split('\n')) {
    if (rawLine.length <= charsPerLine) {
      renderedLines.push(rawLine);
    } else {
      // Wrap long lines
      let remaining = rawLine;
      while (remaining.length > charsPerLine) {
        // Try to break at a space
        let breakAt = remaining.lastIndexOf(' ', charsPerLine);
        if (breakAt <= 0) breakAt = charsPerLine;
        renderedLines.push(remaining.slice(0, breakAt));
        remaining = remaining.slice(breakAt).replace(/^ /, '');
      }
      if (remaining) renderedLines.push(remaining);
    }
  }

  // Split into pages
  const pages: string[][] = [];
  for (let i = 0; i < renderedLines.length; i += linesPerPage) {
    pages.push(renderedLines.slice(i, i + linesPerPage));
  }
  if (pages.length === 0) pages.push(['(empty report)']);

  // Escape PDF text string special characters
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

  // Build PDF objects
  const objects: string[] = [];
  let objCount = 0;
  const offsets: number[] = [];

  const addObj = (content: string) => {
    objCount++;
    objects.push(`${objCount} 0 obj\n${content}\nendobj\n`);
    return objCount;
  };

  // 1: Catalog
  addObj(`<< /Type /Catalog /Pages 2 0 R >>`);

  // 2: Pages (placeholder — we'll fix the Kids reference after creating page objects)
  const pagesObjId = objCount + 1;
  addObj(`PAGES_PLACEHOLDER`);

  // 3: Font
  const fontId = addObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>`);

  // Create page content streams and page objects
  const pageObjIds: number[] = [];
  for (const pageLines of pages) {
    // Build content stream
    const streamLines: string[] = [];
    streamLines.push(`BT`);
    streamLines.push(`/F1 ${fontSize} Tf`);
    streamLines.push(`${leading} TL`);
    streamLines.push(`${marginL} ${pageH - marginT} Td`);
    for (const line of pageLines) {
      streamLines.push(`(${esc(line)}) Tj T*`);
    }
    streamLines.push(`ET`);
    const streamContent = streamLines.join('\n');

    const streamId = addObj(
      `<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream`
    );

    const pageId = addObj(
      `<< /Type /Page /Parent ${pagesObjId} 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents ${streamId} 0 R /Resources << /Font << /F1 ${fontId} 0 R >> >> >>`
    );
    pageObjIds.push(pageId);
  }

  // Fix Pages object
  const kidsStr = pageObjIds.map(id => `${id} 0 R`).join(' ');
  objects[pagesObjId - 1] = `${pagesObjId} 0 obj\n<< /Type /Pages /Kids [${kidsStr}] /Count ${pages.length} >>\nendobj\n`;

  // Build the final PDF
  let pdf = `%PDF-1.4\n`;

  for (let i = 0; i < objects.length; i++) {
    offsets.push(pdf.length);
    pdf += objects[i];
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objCount + 1}\n`;
  pdf += `0000000000 65535 f \n`;
  for (const off of offsets) {
    pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objCount + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF\n`;

  return new TextEncoder().encode(pdf);
}

export async function GET(request: NextRequest) {
  const runId = request.nextUrl.searchParams.get('runId');

  if (!runId) {
    return NextResponse.json({ error: 'runId parameter required' }, { status: 400 });
  }

  try {
    const db = getDb();

    const rows = await db
      .select()
      .from(agentRuns)
      .where(eq(agentRuns.id, parseInt(runId, 10)))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Run not found' }, { status: 404 });
    }

    const run = rows[0];
    const engineer = engineers.find(e => e.id === run.engineerId);

    const pdfBytes = buildPdfReport({
      engineerName: engineer?.name ?? run.engineerId,
      engineerId: run.engineerId,
      ticker: run.ticker,
      status: run.status,
      triggerType: run.triggerType,
      startedAt: run.startedAt?.toISOString() ?? null,
      completedAt: run.completedAt?.toISOString() ?? null,
      durationMs: run.durationMs,
      output: run.outputFull ?? run.outputSummary ?? '',
      error: run.errorsEncountered,
    });

    const filename = `${run.engineerId}-${run.ticker}-run-${runId}.pdf`;

    return new NextResponse(pdfBytes.buffer as ArrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfBytes.length),
      },
    });
  } catch (error) {
    console.error('PDF report error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate report' },
      { status: 500 }
    );
  }
}
