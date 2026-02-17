import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import GalleryGrid from "@/components/GalleryGrid";

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-eerieBlack/70 hover:text-eerieBlack transition underline decoration-eerieBlack/20 underline-offset-4 hover:decoration-eerieBlack/60"
    >
      {children}
    </Link>
  );
}

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, description, created_at, artist_id, post_media(url, sort_order)")
    .eq("visibility", "public")
    .order("created_at", { ascending: false })
    .limit(30);

  return (
    <main className="min-h-screen bg-ivory text-eerieBlack">
      {/* HEADER: compact, app-like */}
      
      <header className="sticky top-5 z-60 bg-ivory/90 backdrop-blur border-eerieBlack/10">
          <div className="mx-auto max-w-6xl px-4 h-20 flex items-center">
            <div className="hidden sm:block w-24" />

            <Link href="/" className="mx-auto w-fit select-none">
              <div className="font-logo font-extrabold tracking-tight leading-[0.88] text-4xl sm:text-4xl text-left">
                <div>The</div>
                <div>Cloud</div>
                <div>Gallery.</div>
              </div>
            </Link>

            <nav className="ml-auto flex items-center gap-2 sm:gap-3">
              <Link
                href="/auth"
                className="rounded-xl px-3 py-2 text-sm border border-eerieBlack/15 bg-white/40 hover:bg-white/70 transition"
              >
                Login
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl px-3 py-2 text-sm bg-oldBurgundy text-ivory hover:opacity-95 transition shadow-sm"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </header>


      {/* HERO */}
  {/* HERO */}
<section className="relative overflow-hidden bg-butter min-h-[calc(100svh-80px)]">
  {/* background layers */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_20%,rgba(255,255,255,0.45),transparent_60%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_55%,rgba(0,0,0,0.08))]" />
    <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[length:18px_18px]" />
  </div>

  {/* content wrapper fills available hero height */}
  <div className="relative mx-auto max-w-6xl px-4 min-h-[calc(100svh-80px)] flex items-center">
    {/* left column */}
    <div className="w-full max-w-3xl py-10 sm:py-12">
      {/* badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-eerieBlack/15 bg-ivory/70 px-4 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
        <span className="h-1.5 w-1.5 rounded-full bg-eerieBlack/60" />
        <div className="text-[11px] tracking-[0.32em] uppercase text-eerieBlack/70">
          Exhibit-first profiles
        </div>
      </div>

      {/* headline */}
      <h1 className="mt-7 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.98]">
        Your work 
        <br className="hidden sm:block" />
        deserves a room
      </h1>

      {/* support copy */}
      <p className="mt-6 max-w-2xl text-sm sm:text-base text-eerieBlack/75 leading-relaxed">
        Publish pieces and process. Let people browse calmly, search intentionally, and spend time with the work.
      </p>

      {/* CTAs */}
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link
          href="/dashboard"
          className="rounded-2xl px-5 py-3 bg-oldBurgundy text-ivory text-sm font-medium hover:opacity-95 transition shadow-[0_12px_28px_rgba(0,0,0,0.20)]"
        >
          Create your exhibit
        </Link>

        <a
          href="#browse"
          className="rounded-2xl px-5 py-3 border border-eerieBlack/25 bg-ivory/75 text-sm font-medium hover:bg-ivory transition"
        >
          Browse recent work
        </a>
      </div>

      <p className="mt-7 text-xs sm:text-sm text-eerieBlack/65 leading-relaxed">
        A curated online exhibit for painters, sculptors, potters, and makers.
      </p>

      {/* scroll cue pinned near bottom of hero */}
      <a
        href="#browse"
        className="mt-10 inline-flex items-center gap-3 text-eerieBlack/65 hover:text-eerieBlack transition"
        aria-label="Scroll down"
      >
        <span className="text-[11px] tracking-[0.32em] uppercase">Scroll</span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-eerieBlack/15 bg-ivory/70 text-xl leading-none shadow-sm">
          ⌄
        </span>
      </a>
    </div>
  </div>
</section>


 


      {/* BROWSE */}
      <section id="browse" className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-12 space-y-6">
          <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl">Browse recent work</h2>
              <p className="mt-2 text-sm text-eerieBlack/70">Quiet grid. No shouting. Just art.</p>
            </div>

            {/* make this a real CTA, not a link */}
            <Link
              href="/dashboard"
              className="w-fit rounded-xl px-4 py-2 text-sm border border-eerieBlack/15 bg-white/40 hover:bg-white/70 transition"
            >
              Post your work
            </Link>
          </header>

          <GalleryGrid posts={posts ?? []} />
        </div>
      </section>

      {/* tiny footer so it feels complete */}
      <footer className="border-t border-eerieBlack/10 bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-10 text-xs text-eerieBlack/60">
          © {new Date().getFullYear()} The Cloud Gallery
        </div>
      </footer>
    </main>
  );
}
