"use client";

import { useEffect, useState } from "react";
import { Lottie } from "lottie-react";
import AndroidIcon from "@/components/ui/AndroidIcon";
import animationData from "@/animations/app-download.json";

export default function AppDownload() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <section id="app" className="scroll-mt-16 bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
        <div className="mx-auto w-full max-w-md" aria-hidden="true">
          <Lottie src={animationData} loop autoplay />
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
            Get the Mob&apos;in app
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-stone-600">
            Looking for a room instead of listing one. Browse boarding
            houses, dormitories and apartments, and send inquiries straight
            from your phone.
          </p>
          <div className="mt-8">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-sand-dark bg-transparent px-7 py-3 text-center text-sm font-medium text-ink transition-colors hover:border-bark hover:text-bark"
            >
              <AndroidIcon size={16} />
              Download the App (APK)
            </button>
            <p className="mt-3 text-xs text-stone-500">
              For tenants. Android APK coming soon.
            </p>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-5 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Coming soon"
        >
          <div
            className="animate-modal-pop w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <AndroidIcon size={40} className="mx-auto" />
            <h3 className="mt-4 text-xl font-semibold tracking-tight">
              Coming soon
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              The Mob&apos;in Android app is on its way. Please check back
              soon to download it.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-full bg-bark py-2.5 text-sm font-medium text-white transition-colors hover:bg-bark-dark"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
