import { HugeiconsIcon } from "@hugeicons/react";
import {
  FilePlusIcon,
  Image01Icon,
  EyeIcon,
  InboxIcon,
  PauseCircleIcon,
  Building02Icon,
} from "@hugeicons/core-free-icons";

const features = [
  {
    icon: FilePlusIcon,
    title: "Post in minutes",
    text: "Describe the property once and publish. No technical skills needed.",
  },
  {
    icon: Image01Icon,
    title: "Photos, rates and rules in one listing",
    text: "Show everything a tenant asks about, so you stop repeating answers.",
  },
  {
    icon: EyeIcon,
    title: "Stay visible until filled",
    text: "Your listing keeps working for you instead of sinking in a group feed.",
  },
  {
    icon: InboxIcon,
    title: "One inbox for inquiries",
    text: "Every message from interested tenants lands in a single place.",
  },
  {
    icon: PauseCircleIcon,
    title: "Pause or update anytime",
    text: "Change rates, swap photos or pause a full property in one click.",
  },
  {
    icon: Building02Icon,
    title: "Made for boarding houses, dorms and apartments",
    text: "Fields and layouts fit bedspaces, shared rooms and studio units.",
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-16 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight lg:text-4xl">
          Built to help you fill rooms
        </h2>
        <p className="mt-3 max-w-xl text-stone-600">
          Everything a landlord needs to present a property and hear from tenants.
        </p>

        <div className="mx-auto mt-10 grid max-w-5xl gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <HugeiconsIcon
                icon={f.icon}
                size={44}
                color="#5c3d2e"
                strokeWidth={1.5}
                className="mx-auto"
              />
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-stone-600">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
