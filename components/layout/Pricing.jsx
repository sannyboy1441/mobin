import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "Free",
    unit: "",
    desc: "For landlords getting started with their first properties.",
    features: [
      "1 free account",
      "2 active property posts",
      "Inquiry inbox included",
      "Basic support",
    ],
    featured: true,
    badge: "Free to start",
    cta: "Sign In Free",
    href: "/signin",
  },
  {
    name: "Subscription",
    price: "Custom",
    unit: "",
    desc: "For managers with more properties.",
    features: [
      "More than 2 active posts",
      "Priority support",
      "Onboarding help from our team",
      "Contact us to subscribe",
    ],
    featured: false,
    badge: null,
    cta: "Contact Our Team",
    href: "#get-started",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight lg:text-4xl">
          Start free, pay only to grow
        </h2>
        <p className="mt-3 max-w-xl text-stone-600">
          Every landlord gets a free account with 2 posts. Need more room to grow. Talk to our team.
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-7 ${
                p.featured
                  ? "border-bark bg-cream shadow-sm"
                  : "border-sand bg-cream"
              }`}
            >
              {p.badge && (
                <span className="rounded-full bg-bark px-3 py-1 text-xs font-medium text-white">
                  {p.badge}
                </span>
              )}
              <h3 className="mt-3 font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-stone-600">{p.desc}</p>
              <p className="mt-4">
                <span className="text-3xl font-semibold tracking-tight">{p.price}</span>
                {p.unit && <span className="text-sm text-stone-500">{p.unit}</span>}
              </p>
              <ul className="mt-5 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-stone-700">
                    <Check size={16} className="mt-0.5 shrink-0 text-bark" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className={`mt-6 block rounded-full py-2.5 text-center text-sm font-medium transition-colors ${
                  p.featured
                    ? "bg-bark text-white hover:bg-bark-dark"
                    : "border border-sand-dark bg-white hover:border-bark hover:text-bark"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
