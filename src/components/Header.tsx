import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 h-14 w-full fixed top-0 z-50 bg-background border-b border-outline-variant/15">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary cursor-pointer md:hidden">
          menu
        </span>
        <Link href="/">
          <h1 className="font-headline font-black tracking-tighter uppercase text-sm text-primary">
            ABISON
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-headline font-black tracking-widest text-lg text-primary hidden md:block">
          AI COMMAND
        </span>
        <div className="w-8 h-8 bg-surface-container-highest flex items-center justify-center border border-outline-variant/30">
          <span className="material-symbols-outlined text-xs">person</span>
        </div>
      </div>
    </header>
  );
}
