"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";

const links = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "About Us", href: "#about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight - 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled
          ? "bg-cream/90 shadow-[0_1px_0_0_#e8ddd0] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="Mob'in home">
          <Logo variant={scrolled ? "onLight" : "onDark"} />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-stone-600 hover:text-bark"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/login"
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              scrolled
                ? "border-sand-dark text-ink hover:border-bark hover:text-bark"
                : "border-white/60 text-white hover:border-white hover:bg-white hover:text-bark"
            }`}
          >
            Log In
          </a>
        </nav>

        <button
          className={`rounded-lg p-2 transition-colors md:hidden ${
            scrolled
              ? "text-stone-700 hover:bg-sand"
              : "text-white hover:bg-white/10"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-sand bg-cream px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-sand"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-sand-dark px-5 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:border-bark hover:text-bark"
            >
              Log In
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
