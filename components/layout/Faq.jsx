"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How do I start?",
    a: "Create a free account through the form below. Signing in is free and takes about a minute.",
  },
  {
    q: "What does the free account include?",
    a: "One account with up to 2 active property posts and an inquiry inbox. No payment required.",
  },
  {
    q: "What counts as 1 post?",
    a: "One published property listing counts as 1 post, whether it is a bedspace, dorm, boarding house or apartment.",
  },
  {
    q: "What happens if I need more than 2 posts?",
    a: "Contact our team about a subscription. We will set up a plan that fits the number of properties you manage.",
  },
  {
    q: "How do tenants contact me?",
    a: "Interested tenants send inquiries through your listing. You receive and reply to them in one place.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="text-center text-3xl font-semibold tracking-tight lg:text-4xl">
          Common questions
        </h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="rounded-2xl border border-sand-dark bg-white"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium">{f.q}</span>
                  <Plus
                    size={18}
                    className={`shrink-0 text-bark transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-stone-600">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
