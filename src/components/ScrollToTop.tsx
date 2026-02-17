"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 z-50 h-11 w-11 rounded-full bg-white/70 backdrop-blur border border-ink-900/10 shadow-soft hover:shadow-lift hover:bg-white transition flex items-center justify-center"
    >
      <span className="text-ink-900 text-lg leading-none -translate-y-[1px]">^</span>
    </button>
  );
}
