import { HugeiconsIcon } from "@hugeicons/react";
import {
  OneCircleIcon,
  TwoCircleIcon,
  ThreeCircleIcon,
} from "@hugeicons/core-free-icons";

const steps = [
  {
    icon: OneCircleIcon,
    title: "Create a free account",
    text: "Sign in with your name and contact details. It takes about a minute and costs nothing.",
  },
  {
    icon: TwoCircleIcon,
    title: "Post up to 2 properties",
    text: "Publish your first listings with photos and monthly rates. Your free quota covers 2 active posts.",
  },
  {
    icon: ThreeCircleIcon,
    title: "Get inquiries, then scale",
    text: "Reply to interested tenants from one place. When you need more posts, contact our team for a subscription.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-right">
          <h2 className="ml-auto max-w-xl text-3xl font-semibold tracking-tight lg:text-4xl">
            From signup to booked rooms
          </h2>
          <p className="ml-auto mt-3 max-w-xl text-stone-600">
            Three short steps between you and fully booked rooms.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-x-8 gap-y-12 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="text-center">
              <HugeiconsIcon
                icon={s.icon}
                size={44}
                color="#5c3d2e"
                strokeWidth={1.5}
                className="mx-auto"
              />
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-stone-600">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
