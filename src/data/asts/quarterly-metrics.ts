/**
 * ASTS Quarterly Financial Data
 * Extracted from ASTS.tsx for maintainability.
 * Update when new 10-Q/10-K filings are processed.
 * Newest first.
 */

export const ASTS_QUARTERLY_DATA: Record<string, any> = {
  // ========== 2025 ==========
  'Q4 2025': {
    label: 'Q4 2025',
    filing: 'Pending 10-K (PR data only)',
    cashAndEquiv: null, // Pending 10-K
    totalDebt: null, // Pending 10-K
    revenue: null, // Pending 10-K
    opEx: null, // Pending 10-K
    netLoss: null, // Pending 10-K
    sharesOutstanding: null, // Pending 10-K
    impliedSharesOut: null, // Pending 10-K
    fullyDiluted: null, // Pending 10-K
    stockPrice: 71.00, // Current Dec 2025
    satellites: 7, // Per PR Dec 24: BW3 + BB1-5 + BB6
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 6, // AT&T, Vodafone, Verizon, stc, Rakuten, Bell
    mous: 50, // "over 50 MNOs"
    spectrumOwned: 105, // 45 L-band + 60 S-band
    contractedRevenue: 1000, // "$1B+ contracted revenue"
    note: 'BB6 launched Dec 23, 2025 (PR). Financial data pending 10-K filing (~Mar 2026).'
  },
  'Q3 2025': {
    label: 'Q3 2025',
    filing: '10-Q (Nov 10, 2025)',
    cashAndEquiv: 1220.1, // $1,220,123K per balance sheet (SA: 1200, diff ~$20M restricted cash)
    totalDebt: 697.6, // Long-term debt per balance sheet (SA Total Debt: 706.58, diff = current portion + accrued interest)
    revenue: 14.7, // Per 10-Q: $14,739K
    opEx: 94.4, // Per 10-Q: $94,415K total operating expenses
    opExEngineering: 40.8, // Per 10-Q: $40,836K engineering services
    opExGandA: 29.8, // Per 10-Q: $29,822K general & administrative
    opExRandD: 5.5, // Per 10-Q: $5,530K research & development
    opExDandA: 12.7, // Per Q3 Business Update: $12,716K depreciation & amortization
    opExSBC: 14.0, // Per Q3 Business Update: $8.0M eng + $6.0M G&A stock-based comp
    opExCostOfRev: 5.5, // Per Q3 Business Update: $5,511K cost of revenues (gateway)
    adjOpEx: 67.7, // Per Q3 Business Update: Total adj. operating expenses
    adjOpExExTrans: 60.6, // Per Q3 Business Update: Adj OpEx excluding transaction costs
    capEx: 258.9, // Per Q3 Business Update: Property and equipment additions
    grossPPE: 1165.8, // Per Q3 Business Update: Gross property and equipment
    netLoss: -163.8, // Per SeekingAlpha: -163.83M
    sharesOutstanding: 272.0, // 271,981,894 Class A per 10-Q
    impliedSharesOut: 361.4, // Class A 272 + Class B 11.2 + Class C 78.2
    fullyDiluted: 395.0, // Including options, RSUs, remaining converts
    stockPrice: 78.00, // Q3 end ~$78 (per Oct convert pricing)
    satellites: 6, // BW3 + BB1-5 (BB6 not yet launched)
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 6, // AT&T, Vodafone, Verizon, stc, Rakuten, Bell
    mous: 50, // "over 50 MNOs"
    spectrumOwned: 105, // Ligado 45 MHz + EllioSat 60 MHz
    spectrumUS: 80, // Per Q3 Business Update: 80+ MHz in US for satellite and terrestrial
    spectrumGlobalMNO: 1150, // Per Q3 Business Update: 1,150 MHz low- and mid-band tunable MNO spectrum globally
    contractedRevenue: 1000, // "$1B+ contracted revenue"
    note: 'Per 10-Q Nov 10. stc $175M prepay, Verizon definitive. $3.2B pro forma liquidity. H2 rev guidance $50-75M.'
  },
  'Q2 2025': {
    label: 'Q2 2025',
    filing: '10-Q (Aug 11, 2025)',
    cashAndEquiv: 939.4, // Per Q2 Business Update: $939.4M (SA: 923.65, diff ~$16M restricted cash)
    totalDebt: 482.5, // Long-term debt per balance sheet (SA Total Debt: 490.15)
    revenue: 1.2, // Per 10-Q GAAP revenue
    opEx: 74.0, // Per Q2 Business Update: $73,953K total operating expenses
    opExEngineering: 28.6, // Per Q2 Business Update: $28,598K
    opExGandA: 27.2, // Per Q2 Business Update: $27,242K
    opExRandD: 6.4, // Per Q2 Business Update: $6,393K
    opExDandA: 11.7, // Per Q2 Business Update: $11,720K
    opExSBC: 10.5, // Per Q2 Business Update: $3.3M eng + $7.2M G&A
    adjOpEx: 51.7, // Per Q2 Business Update: Total adj. operating expenses
    adjOpExExTrans: 46.5, // Per Q2 Business Update: Adj OpEx excluding L-Band/JV transaction costs
    capEx: 322.8, // Per Q2 Business Update: Property and equipment additions
    grossPPE: 906.9, // Per Q2 Business Update: Gross property and equipment
    accumulatedDA: 145.3, // Per Q2 Business Update: Accumulated depreciation
    netLoss: -135.9, // Per SeekingAlpha: -135.90M
    sharesOutstanding: 245.0, // Estimate pre-Oct conversions
    impliedSharesOut: 334.4, // Class A + B + C
    fullyDiluted: 380.0, // Including converts, options, RSUs
    stockPrice: 55.00, // Q2 2025 end ~$55
    satellites: 6, // BW3 + BB1-5
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 5, // AT&T, Vodafone, Verizon, Rakuten, stc (Q2 announcement)
    mous: 50, // "more than 50 MNOs"
    spectrumOwned: 105, // Ligado 45 MHz + EllioSat 60 MHz closed
    contractedRevenue: 800,
    note: 'Per Q2 Business Update Aug 11, 2025. L-Band court approved. 60 MHz S-Band acquired. Vi India partnership. 8 satellite microns complete. 8 total govt contracts. Pro forma $1.5B+ liquidity.'
  },
  'Q1 2025': {
    label: 'Q1 2025',
    filing: '10-Q (May 12, 2025)',
    cashAndEquiv: 874.5, // Per Q1 Business Update: $874.5M (SA: 873.78, diff ~$0.7M restricted cash)
    totalDebt: 462.2, // Long-term debt per balance sheet (SA Total Debt: 465.90)
    revenue: 0.7, // Per 10-Q GAAP revenue (note: $13.6M was gateway bookings, not recognized revenue)
    opEx: 63.7, // Per Q1 Business Update: $63,681K total operating expenses
    opExEngineering: 27.2, // Per Q1 Business Update: $27,204K
    opExGandA: 18.4, // Per Q1 Business Update: $18,384K
    opExRandD: 7.1, // Per Q1 Business Update: $7,135K
    opExDandA: 11.0, // Per Q1 Business Update: $10,958K
    opExSBC: 7.8, // Per Q1 Business Update: $4.0M eng + $3.8M G&A
    adjOpEx: 44.9, // Per Q1 Business Update: Total adj. operating expenses
    capEx: 124.1, // Per Q1 Business Update: Property and equipment additions
    grossPPE: 584.1, // Per Q1 Business Update: Gross property and equipment
    accumulatedDA: 133.3, // Per Q1 Business Update: Accumulated depreciation
    netLoss: -63.6, // Per SeekingAlpha: -63.63M
    sharesOutstanding: 220.0, // Basic Class A
    impliedSharesOut: 309.4, // Class A + B + C
    fullyDiluted: 350.0, // Including Jan converts if converted
    stockPrice: 25.00, // Q1 2025 end ~$25
    satellites: 6, // BW3 + BB1-5
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 3, // AT&T, Vodafone, Verizon (May 29 definitive)
    mous: 50, // Per Q1 pres: ~50 MNOs
    spectrumOwned: 45, // Ligado definitive signed (court pending)
    contractedRevenue: 650,
    note: 'Per Q1 Business Update May 12, 2025. H2 2025 revenue guidance $50-75M. Gateway bookings $13.6M. DIU contract $20M. FirstNet STA approved. NSF coordination agreement.'
  },
  // ========== 2024 ==========
  'Q4 2024': {
    label: 'Q4 2024',
    filing: '10-K (March 3, 2025)',
    cashAndEquiv: 567.5, // From 10-K balance sheet (SA: 564.99, diff ~$2.5M restricted cash)
    totalDebt: 155.6, // Long-term debt per balance sheet (SA Total Debt: 158.49)
    revenue: 1.9, // Per 10-K GAAP revenue
    opEx: 60.6, // Per Q4 Business Update: $60,642K total operating expenses
    opExEngineering: 30.9, // Per Q4 Business Update: $30,945K
    opExGandA: 15.9, // Per Q4 Business Update: $15,889K
    opExRandD: 5.3, // Per Q4 Business Update: $5,348K
    opExDandA: 8.5, // Per Q4 Business Update: $8,460K
    opExSBC: 11.4, // Per Q4 Business Update: $8.3M eng + $3.1M G&A
    adjOpEx: 40.8, // Per Q4 Business Update: Total adj. operating expenses
    capEx: 86.0, // Per Q4 Business Update: Property and equipment additions
    grossPPE: 460.0, // Per Q4 Business Update: Gross property and equipment
    accumulatedDA: 122.4, // Per Q4 Business Update: Accumulated depreciation
    netLoss: -57.0, // Per SeekingAlpha: -57.02M
    sharesOutstanding: 208.2, // Class A per 10-K
    impliedSharesOut: 255.0, // Class A + B + C
    fullyDiluted: 280.0, // Including 2034 converts, warrants, options
    stockPrice: 22.50, // Dec 31, 2024 ~$22.50
    satellites: 6, // 5 Block 1 + BW3
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 2, // AT&T, Vodafone (Dec definitive)
    mous: 50, // Per Q4 pres: ~50 MNOs
    spectrumOwned: 0, // Ligado announced but not closed
    contractedRevenue: 600,
    note: 'Per Q4 Business Update Mar 4, 2025. Block 1 operational Oct 29. Vodafone definitive Dec 9. $43M SDA contract. ASIC validated (10 GHz, 120 Mbps).'
  },
  'Q3 2024': {
    label: 'Q3 2024',
    filing: '10-Q (Nov 2024)',
    cashAndEquiv: 518.9, // Per Q4 Business Update (SA: 516.39, diff ~$2.5M restricted cash)
    totalDebt: 156.3, // Long-term debt per balance sheet (SA Total Debt: 200.89, diff = Atlas facility as current)
    revenue: 1.1, // Per 10-Q GAAP revenue
    opEx: 66.6, // Per Q4 Business Update: $66,646K
    opExEngineering: 21.8, // Per Q4 Business Update: $21,828K
    opExGandA: 15.6, // Per Q4 Business Update: $15,551K
    opExRandD: 14.7, // Per Q4 Business Update: $14,724K
    opExDandA: 14.5, // Per Q4 Business Update: $14,543K
    opExSBC: 6.8, // Per Q4 Business Update: $3.4M eng + $3.4M G&A
    adjOpEx: 45.3, // Per Q4 Business Update: Total adj. operating expenses
    capEx: 26.5, // Per Q4 Business Update: Property and equipment additions
    grossPPE: 374.0, // Per Q4 Business Update
    accumulatedDA: 113.9, // Per Q4 Business Update
    netLoss: -303.1, // Per SeekingAlpha: -303.08M
    sharesOutstanding: 140.0, // Class A per 10-Q
    impliedSharesOut: 175.0, // Class A + B + C
    fullyDiluted: 245.0, // Including warrants, converts, options
    stockPrice: 38.00, // Post Block 1 launch rally ~$38
    satellites: 6, // Block 1 launched Sept 12
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 2,
    mous: 50, // Per Q4 pres: ~50 MNOs
    spectrumOwned: 0,
    contractedRevenue: 400,
    note: 'Per Q4 Business Update Mar 4, 2025. Block 1 (5 sats) launched Sept 12. Public warrants redeemed Sept 27 ($153.6M cash).'
  },
  'Q2 2024': {
    label: 'Q2 2024',
    filing: '10-Q (Aug 14, 2024)',
    cashAndEquiv: 287.6, // Per 10-Q: $285.1M + $2.5M restricted (SA: 285.08)
    totalDebt: 199.5, // Long-term debt per balance sheet (SA Total Debt: 199.80)
    revenue: 0.9, // Per 10-Q: $0.9M Q2
    opEx: 63.9, // Per 10-Q total operating expenses
    opExEngineering: 11.0, // Per Q2 2024 Business Update: $11.0M (adj basis)
    opExGandA: 4.4, // Per Q2 2024 Business Update: $4.4M (adj basis)
    opExRandD: 19.2, // Per Q2 2024 Business Update: $19.2M (adj basis)
    opExDandA: 20.4, // Per Q2 2024 Business Update: $20.4M depreciation and amortization
    opExSBC: 8.8, // Per Q2 2024 Business Update: $2.0M eng + $6.8M G&A
    adjOpEx: 34.6, // Per Q2 2024 Business Update: $34.6M total adj. operating expenses
    capEx: 21.2, // Per Q2 2024 Business Update: Property and equipment additions
    grossPPE: 347.5, // Per Q2 2024 Business Update: Gross property and equipment
    accumulatedDA: 99.3, // Per Q2 2024 Business Update: Accumulated depreciation
    netLoss: -131.4, // Per SeekingAlpha: -131.35M
    sharesOutstanding: 148.8, // Per 10-Q: 148,751,110 Class A
    impliedSharesOut: 266.7, // Class A + B (39.7M) + C (78.2M)
    fullyDiluted: 320.0, // Including warrants, converts
    stockPrice: 12.00, // Q2 2024 ~$12
    satellites: 1, // BW3 only
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 1, // AT&T definitive May 15
    mous: 44, // 45+ per Aug PR
    spectrumOwned: 0,
    contractedRevenue: 300,
    note: 'Per Q2 2024 Business Update Aug 14. AT&T definitive May 15. Verizon $100M commitment May 29. FCC BB1-5 license Aug 5. ASIC tape-out completed TSMC. 17 Block 2 in production.'
  },
  'Q1 2024': {
    label: 'Q1 2024',
    filing: '10-Q (May 2024)',
    cashAndEquiv: 212.4, // Per Q1 2024 Business Update (SA: 209.97, diff ~$2.4M restricted cash)
    totalDebt: 160.8, // Long-term debt per balance sheet (SA Total Debt: 161.08)
    revenue: 0.5, // Per 10-Q ~$0.5M Q1
    opEx: 56.0, // Per 10-Q total operating expenses
    opExEngineering: 8.9, // Per Q1 2024 Business Update
    opExGandA: 4.3, // Per Q1 2024 Business Update
    opExRandD: 17.9, // Per Q1 2024 Business Update (includes R&D transfer)
    opExDandA: 19.9, // Per Q1 2024 Business Update: $19,945K
    opExSBC: 4.9, // Per Q1 2024 Business Update: $1.6M eng + $3.3M G&A
    adjOpEx: 31.1, // Per Q1 2024 Business Update: Total adj. operating expenses
    capEx: 26.6, // Per Q1 2024 Business Update: Property and equipment additions
    grossPPE: 326.3, // Per Q1 2024 Business Update: Gross property and equipment
    accumulatedDA: 81.1, // Per Q1 2024 Business Update: Accumulated depreciation
    netLoss: -39.8, // Per SeekingAlpha: -39.80M
    sharesOutstanding: 100.0, // Class A per 10-Q
    impliedSharesOut: 218.0, // Class A + B (40M) + C (78M)
    fullyDiluted: 280.0, // Including warrants, converts
    stockPrice: 3.50, // Q1 2024 range $2-5
    satellites: 1,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 40, // Per Jan PR: 40+ MNOs
    spectrumOwned: 0,
    contractedRevenue: 150,
    note: 'Per Q1 2024 Business Update May 15. Cash $212.4M. $100M equity Jan 19 @ $3.10. $110M converts Jan 18 (AT&T/Google/Vodafone). ASIC tape-out Mar 27. AT&T 6-year definitive signed.'
  },
  // ========== 2023 ==========
  'Q4 2023': {
    label: 'Q4 2023',
    filing: '10-K (April 1, 2024)',
    cashAndEquiv: 85.6, // $85.6M cash + $2.5M restricted (SA: 85.62, matches)
    totalDebt: 59.3, // Long-term debt per balance sheet (SA Total Debt: 59.50)
    revenue: 0, // $0 revenue in 2023
    opEx: 60.9, // Per Q4 2023 Business Update: $60,878K total operating expenses
    opExEngineering: 18.5, // Per Q4 2023 Business Update: $18.5M (adj basis)
    opExGandA: 10.8, // Per Q4 2023 Business Update: $10.8M (adj basis)
    opExRandD: 9.3, // Per Q4 2023 Business Update: $9.3M (adj basis)
    opExDandA: 19.6, // Per Q4 2023 Business Update: $19.6M depreciation and amortization
    opExSBC: 2.7, // Per Q4 2023 Business Update: $1.5M eng + $1.2M G&A
    adjOpEx: 38.6, // Per Q4 2023 Business Update: $38.6M total adj. operating expenses
    capEx: 33.9, // Per Q4 2023 Business Update: $33.9M property and equipment
    grossPPE: 299.7, // Per Q4 2023 Business Update: $299.7M gross property and equipment
    accumulatedDA: 61.2, // Per Q4 2023 Business Update: $61.2M accumulated depreciation
    netLoss: -87.5, // Per SeekingAlpha: -87.51M (FY2023 total: -$222.7M)
    sharesOutstanding: 90.2, // Class A per 10-K
    impliedSharesOut: 120.0, // Class A + B + C // Class A Dec 31 2023
    fullyDiluted: 145.0, // Including warrants, options
    stockPrice: 5.80, // Dec 31, 2023 ~$5.80
    satellites: 1, // BW3 only
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 35,
    spectrumOwned: 0,
    contractedRevenue: 0,
    note: 'Per Q4 2023 Business Update Apr 1, 2024. BW3 5G call Sept 19 (14 Mbps). Low cash ($88.1M) triggered Jan 2024 raise. Liquidity: $210.8M estimated Mar 31.'
  },
  'Q3 2023': {
    label: 'Q3 2023',
    filing: '10-Q (Nov 2023)',
    cashAndEquiv: 135.7, // Per Q3 2023 Business Update (SA: 133.31, diff ~$2.4M restricted cash)
    totalDebt: 58.5, // Long-term debt per balance sheet (SA Total Debt: 58.54)
    revenue: 0,
    opEx: 59.0, // Per Q3 2023 Business Update: $58,965K total
    opExEngineering: 18.0, // Per Q3 2023 Business Update: $19.5M GAAP - $1.5M SBC
    opExGandA: 9.9, // Per Q3 2023 Business Update: $11.0M GAAP - $1.1M SBC
    opExRandD: 9.4, // Per Q3 2023 Business Update: $9.4M
    opExDandA: 19.0, // Per Q3 2023 Business Update: $19,029K
    opExSBC: 2.6, // Per Q3 2023 Business Update: $1.5M eng + $1.1M G&A
    adjOpEx: 37.3, // Per Q3 2023 Business Update: Total adj. operating expenses
    capEx: 71.7, // Per Q3 2023 Business Update: Includes launch payment reclassification
    grossPPE: 265.8, // Per Q3 2023 Business Update: Gross property and equipment
    accumulatedDA: 41.6, // Per Q3 2023 Business Update: Accumulated depreciation
    netLoss: -50.8, // Per SeekingAlpha: -50.75M
    sharesOutstanding: 58.0, // Class A per 10-Q
    impliedSharesOut: 186.0, // Class A + B (50M) + C (78M)
    fullyDiluted: 200.0, // Including warrants, options
    stockPrice: 4.00, // Q3 2023 range
    satellites: 1,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 40, // Per Q3 2023 Business Update: 40+ MNOs, 2B+ subscribers
    spectrumOwned: 0,
    contractedRevenue: 0,
    note: 'Per Q3 2023 Business Update Nov 14. First 5G call Sept 19 (14 Mbps). 85% BB1-5 CapEx paid. 160 Midland employees. 3 shifts running.'
  },
  'Q2 2023': {
    label: 'Q2 2023',
    filing: '10-Q (Aug 2023)',
    cashAndEquiv: 191.5, // Per Q2 2023 Business Update (SA: 190.84, diff ~$0.7M restricted cash)
    totalDebt: 4.6, // Long-term debt per balance sheet (SA Total Debt: 4.63)
    revenue: 0,
    opEx: 58.1, // Per Q2 2023 Business Update: $58,070K total
    opExEngineering: 18.3, // Per Q2 2023 Business Update: $22.8M GAAP - $4.5M SBC
    opExGandA: 9.2, // Per Q2 2023 Business Update: $10.2M GAAP - $1.0M SBC
    opExRandD: 10.9, // Per Q2 2023 Business Update: $10.9M
    opExDandA: 14.1, // Per Q2 2023 Business Update: $14,115K (BW3 depreciation started)
    opExSBC: 5.5, // Per Q2 2023 Business Update: $4.5M eng + $1.0M G&A
    adjOpEx: 38.4, // Per Q2 2023 Business Update: Total adj. operating expenses
    capEx: 12.1, // Per Q2 2023 Business Update: PP&E (excludes launch reclass)
    grossPPE: 194.1, // Per Q2 2023 Business Update: Gross property and equipment
    accumulatedDA: 22.5, // Per Q2 2023 Business Update: Accumulated depreciation
    netLoss: -49.6, // Per SeekingAlpha: -49.59M
    sharesOutstanding: 72.0, // Post June offering
    impliedSharesOut: 200.0, // Class A + B (50M) + C (78M)
    fullyDiluted: 215.0, // Including warrants, options
    stockPrice: 5.50, // Q2 2023 range
    satellites: 1,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 40, // Per Q2 2023 Business Update: 40+ MNOs (~2.4B subscribers)
    spectrumOwned: 0,
    contractedRevenue: 0,
    note: 'Per Q2 2023 Business Update Aug 14. BW3 4G/10 Mbps June 21. $59.4M offering June 28. FCC SCS update filed July 17.'
  },
  'Q1 2023': {
    label: 'Q1 2023',
    filing: '10-Q (May 2023)',
    cashAndEquiv: 185.7, // Per Q1 2023 Business Update (SA: 185.04, diff ~$0.7M restricted cash)
    totalDebt: 4.7, // Long-term debt per balance sheet (SA Total Debt: 4.70)
    revenue: 0,
    opEx: 44.5, // Per Q1 2023 Business Update: $44,454K total
    opExEngineering: 15.1, // Per Q1 2023 Business Update: $16.5M GAAP - $1.4M SBC
    opExGandA: 8.8, // Per Q1 2023 Business Update: $9.9M GAAP - $1.1M SBC
    opExRandD: 16.4, // Per Q1 2023 Business Update: $16.4M
    opExDandA: 1.7, // Per Q1 2023 Business Update: $1,733K
    opExSBC: 2.5, // Per Q1 2023 Business Update: $1.4M eng + $1.1M G&A
    adjOpEx: 40.3, // Per Q1 2023 Business Update: Total adj. operating expenses
    capEx: 13.0, // Per Q1 2023 Business Update: $12.6M PP&E + $0.4M BW3 CIP
    grossPPE: 167.3, // Per Q2 2023 Business Update footnote (Mar 31 value)
    accumulatedDA: 8.4, // Per Q2 2023 Business Update footnote (Mar 31 value)
    netLoss: -45.2, // Per SeekingAlpha: -45.22M
    sharesOutstanding: 71.9, // Per balance sheet: 71,877,559
    impliedSharesOut: 200.0, // Class A + B (50M) + C (78M)
    fullyDiluted: 215.0, // Including warrants, options
    stockPrice: 5.00, // Q1 2023 range
    satellites: 1,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 35, // Per Q1 2023 Business Update: 35+ MNOs (~2B subscribers)
    spectrumOwned: 0,
    contractedRevenue: 0,
    note: 'Per Q1 2023 Business Update May 15. First D2C voice call April 25. Technology validated. Production on track for Q1 2024 launch.'
  },
  // ========== 2022 ==========
  'Q4 2022': {
    label: 'Q4 2022',
    filing: '10-K/A (May 1, 2023)',
    cashAndEquiv: 238.6, // From 10-K/A balance sheet (SA: 238.59, matches)
    totalDebt: 5.0, // Long-term debt per balance sheet (SA Total Debt: 5.00)
    revenue: 0, // Nano sold Sept 6
    opEx: 40.0, // Higher Q4 (Block 1 ramp)
    netLoss: -26.6, // Per SeekingAlpha: -26.58M
    sharesOutstanding: 71.9, // 71,877,559 Class A per 10-K (post-offering)
    impliedSharesOut: 200.0, // Class A + Class B (50M) + Class C (78M)
    fullyDiluted: 215.0, // Implied + options/warrants
    stockPrice: 5.50, // Dec 2022 offering @ $5.50
    satellites: 1, // BW3 deployed Nov 14
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 25, // ~1.8B subs per Dec PR
    spectrumOwned: 0,
    contractedRevenue: 0,
    classB: 50.0,
    classC: 78.2,
    note: '$75M raised Dec 2 @ $5.50 (13.6M shares). BW3 deployed Nov 14. NASA Space Act Dec 15.'
  },
  'Q3 2022': {
    label: 'Q3 2022',
    filing: '10-K/A derived',
    cashAndEquiv: 198.9, // Per SeekingAlpha (was estimated 160.0)
    totalDebt: 4.8, // Long-term debt per balance sheet (SA Total Debt: 4.82)
    revenue: 4.6, // Nano final quarter (sold Sept 6)
    opEx: 38.0,
    netLoss: -31.0, // Per SeekingAlpha: -30.95M
    sharesOutstanding: 58.0, // Class A estimate
    impliedSharesOut: 90.0, // Class A + B
    fullyDiluted: 118.0, // Implied + options
    stockPrice: 7.00, // Q3 2022 ~$7 (BW3 launch excitement)
    satellites: 1, // BW3 launched Sept 10
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 23,
    spectrumOwned: 0,
    contractedRevenue: 0,
    note: 'BW3 launched Sept 10. Nano sold Sept 6 for $26.6M (gain $24.5M). Historic quarter.'
  },
  'Q2 2022': {
    label: 'Q2 2022',
    filing: '10-K/A derived',
    cashAndEquiv: 202.4, // Per SeekingAlpha (was estimated 175.0)
    totalDebt: 4.9, // Long-term debt per balance sheet (SA Total Debt: 4.88)
    revenue: 4.6, // Nano quarterly run rate
    opEx: 36.0,
    netLoss: -7.9, // Per SeekingAlpha: -7.88M
    sharesOutstanding: 56.0, // Class A estimate
    impliedSharesOut: 88.0, // Class A + B
    fullyDiluted: 116.0, // Implied + options
    stockPrice: 5.00, // Q2 2022 ~$5.00
    satellites: 0,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 21,
    spectrumOwned: 0,
    contractedRevenue: 0,
    note: 'Sean Wallace joins as CFO May 10. BW3 final prep. Nano still operating.'
  },
  'Q1 2022': {
    label: 'Q1 2022',
    filing: '10-K/A derived',
    cashAndEquiv: 253.7, // Per SeekingAlpha: 253.73
    totalDebt: 4.9, // Long-term debt per balance sheet (SA Total Debt: 4.94)
    revenue: 4.6, // Nano quarterly
    opEx: 34.0,
    netLoss: -37.9, // Per SeekingAlpha: -37.90M
    sharesOutstanding: 54.0, // Class A estimate
    impliedSharesOut: 86.0, // Class A + B
    fullyDiluted: 114.0, // Implied + options
    stockPrice: 9.00, // Q1 2022 ~$9.00
    satellites: 0,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 19,
    spectrumOwned: 0,
    contractedRevenue: 0,
    note: 'BW3 manufacturing. Nano revenue ongoing. Block 1 design phase.'
  },
  // ========== 2021 ==========
  'Q4 2021': {
    label: 'Q4 2021',
    filing: '10-K (March 31, 2022)',
    cashAndEquiv: 321.8, // Per SeekingAlpha: 321.79
    totalDebt: 5.0, // Long-term debt per balance sheet (SA Total Debt: 5.00)
    revenue: 3.1, // $12.4M FY (Nano) - Q4 portion
    opEx: 22.9, // FY $91.6M OpEx / 4
    netLoss: -12.8, // Per SeekingAlpha: -12.80M
    sharesOutstanding: 51.8, // 51,782,154 Class A per 10-K cover page
    impliedSharesOut: 103.4, // Class A 51.8 + Class B 51.6
    fullyDiluted: 112.0, // Implied + options
    stockPrice: 11.50, // Q4 2021 ~$11.50
    satellites: 0, // BW3 under construction ($67.6M CIP)
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 20, // "over 20 preliminary agreements" per 10-K
    spectrumOwned: 0,
    contractedRevenue: 0,
    classB: 51.6, // 51,636,922 Class B shares
    classC: 78.2, // 78,163,078 Class C shares
    bw3CIP: 67.6, // BW3 construction in progress $67.6M
    note: 'FY2021: $12.4M rev (Nano), $91.6M OpEx, $73.3M net loss. 386 employees. BW3 $67.6M CIP. 1.8B subs covered by MOUs.'
  },
  'Q3 2021': {
    label: 'Q3 2021',
    filing: '10-K derived',
    cashAndEquiv: 360.4, // Per SeekingAlpha: 360.40
    totalDebt: 5.0, // Long-term debt (Lone Star facility)
    revenue: 3.1, // Nano quarterly (~$12.4M FY / 4)
    opEx: 22.9, // ~$91.6M FY / 4
    netLoss: 16.8, // Per SeekingAlpha: +16.80M (positive due to warrant/other gains)
    sharesOutstanding: 51.8, // Class A
    impliedSharesOut: 103.4, // Class A + B
    fullyDiluted: 112.0, // Implied + options
    stockPrice: 10.00, // Q3 2021 ~$10.00
    satellites: 0, // BW3 under construction
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 18, // Building toward 20+
    spectrumOwned: 0,
    contractedRevenue: 0,
    bw3CIP: 50.0, // BW3 CIP growing
    note: 'BW3 manufacturing. Director comp program established Aug 24. Scaling headcount.'
  },
  'Q2 2021': {
    label: 'Q2 2021',
    filing: '10-K derived',
    cashAndEquiv: 402.6, // Per SeekingAlpha: 402.61
    totalDebt: 5.0, // Long-term debt (Lone Star facility)
    revenue: 3.1, // Nano quarterly (~$12.4M FY / 4)
    opEx: 22.9, // ~$91.6M FY / 4
    netLoss: -65.2, // Per SeekingAlpha: -65.17M
    sharesOutstanding: 51.8, // Class A
    impliedSharesOut: 103.4, // Class A + B
    fullyDiluted: 112.0, // Implied + options
    stockPrice: 10.00, // Q2 2021 ~$10 ($514.7M / 51.8M)
    satellites: 0,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 15,
    spectrumOwned: 0,
    contractedRevenue: 0,
    bw3CIP: 35.0, // BW3 CIP building
    note: 'First full quarter post-SPAC. $514.7M market value at June 30. Scaling operations.'
  },
  'Q1 2021': {
    label: 'Q1 2021',
    filing: '10-K/A derived',
    cashAndEquiv: 50.1, // Per SeekingAlpha: 50.05 (pre-SPAC close)
    totalDebt: 0.6, // Per SeekingAlpha: 0.6M (SA Total Debt: 600K)
    revenue: 5.8, // Nano quarterly
    opEx: 22.0,
    netLoss: -12.1, // Per SeekingAlpha: -12.09M
    sharesOutstanding: 0, // Private until April 6
    impliedSharesOut: 0, // Private
    fullyDiluted: 0, // Private
    stockPrice: 0, // Private - no public price
    satellites: 0,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 10,
    spectrumOwned: 0,
    contractedRevenue: 0,
    note: 'SPAC closed April 6, 2021. $462M gross proceeds. Listed NASDAQ: ASTS.'
  },
  // ========== 2020 ==========
  'Q4 2020': {
    label: 'Q4 2020',
    filing: 'Pre-SPAC (private)',
    cashAndEquiv: 42.8, // Per SeekingAlpha: 42.78
    totalDebt: 0, // Pre-Lone Star facility
    revenue: 4.5, // Nano quarterly
    opEx: 12.0,
    netLoss: -8.4, // Per SeekingAlpha: -8.35M
    sharesOutstanding: 0, // Private (AST LLC units)
    impliedSharesOut: 0, // Private
    fullyDiluted: 0, // Private
    stockPrice: 0, // Private - no public price
    satellites: 0,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 8,
    spectrumOwned: 0,
    contractedRevenue: 0,
    note: 'Strategic agreements signed Dec 15 (Vodafone, Rakuten, American Tower). SPAC announced.'
  },
  // ========== SPAC PRE-MERGER DATA (from SEC Filings) ==========
  // Note: Below entries are NEW PROVIDENCE ACQUISITION CORP financials
  // NPA was the shell SPAC that merged with AST & Science LLC on April 6, 2021
  'Q4 2020 (NPA SPAC)': {
    label: 'Q4 2020 (NPA SPAC)',
    filing: '10-K (Feb 26, 2021) / 10-K/A Amendment',
    // Balance Sheet - Dec 31, 2020 (SPAC shell company)
    cashAndEquiv: null, // TODO: verify with SeekingAlpha
    trustAccount: 232.2, // $232,196,027 in trust for redemptions
    totalDebt: null, // TODO: verify with SeekingAlpha
    revenue: 0, // Shell company - no operations
    opEx: 1.125, // $1,124,693 operating costs
    netLoss: 0.191, // Net INCOME $191,177 (original, pre-restatement)
    netLossRestated: -51.96, // $(51,960,823) after warrant reclass (10-K/A)
    // SPAC Share structure
    sharesOutstanding: 28.75, // 23M Class A + 5.75M Class B
    classAShares: 23.0,
    classBShares: 5.75, // Founder shares
    redemptionShares: 21.67, // 21,672,451 subject to redemption
    redemptionValue: 218.71, // $218,710,925
    impliedSharesOut: 28.75,
    fullyDiluted: 40.25, // + 11.5M warrants
    totalEquity: 5.0, // $5,000,004
    stockPrice: 10.08, // NASDAQ June 30, 2020
    satellites: 0,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 0,
    spectrumOwned: 0,
    contractedRevenue: 0,
    // SPAC-specific fields
    deferredUnderwriting: 8.05, // $8,050,000 payable on merger close
    ipoProceeds: 230.0, // $230M from IPO
    pipeCommitted: 230.0, // $230M PIPE
    note: 'NPA SPAC: $232M trust. Merger w/ AST signed Dec 15. Restated for warrant liabilities per SEC guidance Apr 2021.'
  },
  'Q4 2019 (NPA SPAC)': {
    label: 'Q4 2019 (NPA SPAC)',
    filing: '10-K (Mar 30, 2020)',
    // Balance Sheet - Dec 31, 2019 (first full quarter post-IPO)
    cashAndEquiv: null, // TODO: verify with SeekingAlpha
    trustAccount: 231.2, // $231,214,831 in trust
    totalDebt: null, // TODO: verify with SeekingAlpha
    revenue: 0,
    opEx: 0.385, // $384,857 operating costs (May 28 - Dec 31, 2019)
    netLoss: 0.656, // Net INCOME $655,679 (interest income)
    // Share structure
    sharesOutstanding: 28.75,
    classAShares: 23.0,
    classBShares: 5.75,
    redemptionShares: 21.75, // 21,746,363
    redemptionValue: 218.52, // $218,519,748
    impliedSharesOut: 28.75,
    fullyDiluted: 40.25,
    totalEquity: 5.0, // $5,000,004
    stockPrice: 9.87, // Dec 31, 2019 close
    satellites: 0,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 0,
    spectrumOwned: 0,
    contractedRevenue: 0,
    deferredUnderwriting: 8.05,
    ipoDate: '2019-09-11',
    ipoProceeds: 230.0,
    note: 'NPA SPAC first full FY. IPO Sept 11, 2019. Units at $10. Searching for target business.'
  },
  'Q3 2019 (NPA SPAC)': {
    label: 'Q3 2019 (NPA SPAC)',
    filing: '10-K derived (partial)',
    // SPAC incorporated May 28, 2019; IPO Sept 11, 2019
    cashAndEquiv: null, // TODO: verify with SeekingAlpha
    trustAccount: 0,
    totalDebt: null, // TODO: verify with SeekingAlpha
    revenue: 0,
    opEx: 0,
    netLoss: 0,
    sharesOutstanding: 5.75, // Founder shares only pre-IPO
    classBShares: 5.75, // 5,750,000 founder shares @ $25,000 total
    impliedSharesOut: 5.75,
    fullyDiluted: 5.75,
    stockPrice: 0.004, // $25,000 / 5.75M = $0.004/share
    satellites: 0,
    employees: null, // TODO: verify with SeekingAlpha
    definitiveAgreements: 0,
    mous: 0,
    spectrumOwned: 0,
    contractedRevenue: 0,
    note: 'NPA incorporated May 28, 2019. IPO closed Sept 11. Pre-IPO: $25K for 5.75M founder shares.'
  },
};
