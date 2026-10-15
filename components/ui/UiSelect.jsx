"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function UiSelect({
  value,
  onChange,
  options,
  label,
  size = "md",
}) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onScroll = () => setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const estH = options.length * 37 + 16;
      const below = window.innerHeight - r.bottom - 8;
      const top =
        below >= estH || r.top < estH ? r.bottom + 6 : r.top - estH - 6;
      setMenu({
        top: Math.max(8, top),
        left: Math.max(
          8,
          Math.min(r.left, window.innerWidth - Math.max(r.width, 140) - 8)
        ),
        width: Math.max(r.width, 140),
      });
    }
    setOpen(!open);
  };

  return (
    <div ref={ref} className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={toggle}
        className={`flex w-full items-center justify-between gap-2 border border-sand-dark bg-white outline-none transition-colors hover:border-bark focus:border-bark ${
          size === "sm"
            ? "rounded-lg px-2 py-1.5 text-xs"
            : "rounded-xl px-3.5 py-2.5 text-sm"
        }`}
      >
        <span>{value}</span>
        <ChevronDown
          size={size === "sm" ? 14 : 16}
          className={`shrink-0 text-stone-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && menu && (
        <ul
          style={{
            position: "fixed",
            top: menu.top,
            left: menu.left,
            width: menu.width,
          }}
          className="z-50 max-h-60 overflow-y-auto no-scrollbar rounded-xl border border-sand-dark bg-white py-1 shadow-lg"
        >
          {options.map((o) => (
            <li key={o}>
              <button
                type="button"
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
                className={`block w-full px-3.5 py-2 text-left text-sm transition-colors hover:bg-cream ${
                  o === value ? "font-medium text-bark" : ""
                }`}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
