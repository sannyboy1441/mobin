"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop",
    alt: "",
    label: "Apartment",
  },
  {
    src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2000&auto=format&fit=crop",
    alt: "",
    label: "Dormitory",
  },
  {
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop",
    alt: "",
    label: "Boarding house",
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000&auto=format&fit=crop",
    alt: "",
    label: "Studio unit",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2000&auto=format&fit=crop",
    alt: "",
    label: "Property exterior",
  },
];

import Link from "next/link";

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="top" className="relative flex min-h-[85vh] items-center overflow-hidden bg-bark pt-16">
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-bark/70" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <h1 className="max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          List your property.
          <br />
          Fill your rooms.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
          Mob&apos;in is a simple listing platform for landlords. Post your
          boarding house, dormitory or apartment, receive tenant inquiries
          in one place and keep every room occupied. Start free with
          2 posts included.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/signin"
            className="rounded-full bg-white px-7 py-3 text-center text-sm font-medium text-bark transition-colors hover:bg-cream"
          >
            Sign In Free
          </Link>
          <a
            href="#how-it-works"
            className="rounded-full border border-white/60 px-7 py-3 text-center text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-bark"
          >
            See How It Works
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setIndex(i)}
            aria-label={`Show ${s.label}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
