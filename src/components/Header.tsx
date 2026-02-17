import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ivory-100/85 backdrop-blur border-b border-ink-900/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative flex h-16 items-center">
          {/* Left placeholder to keep center true-center */}
          <div className="w-28" />

          {/* Center stacked logo text */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-center select-none"
            aria-label="Cloud Gallery Home"
          >
            <div className="font-display text-[11px] tracking-luxe text-ink-700">
              THE
            </div>
            <div className="font-display text-[16px] sm:text-[18px] tracking-[0.08em] text-ink-900">
              CLOUD GALLERY
            </div>
          </Link>

          {/* Right actions */}
          <nav className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-full px-3 py-1.5 text-sm text-ink-700 hover:text-ink-900 hover:bg-white/60 border border-transparent hover:border-ink-900/10 transition"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full px-3 py-1.5 text-sm bg-ink-900 text-ivory-50 hover:bg-ink-800 transition shadow-soft"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
