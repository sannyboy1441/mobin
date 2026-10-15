import Image from "next/image";

const src =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-16 overflow-hidden bg-cream py-16 lg:py-24">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block" aria-hidden="true">
        <Image
          src={src}
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bark/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Built to help landlords fill rooms
            </h2>
            <p className="mt-5 text-xl leading-relaxed text-ink">
              Filling a boarding house or apartment should not depend on
              tarpaulins and scattered chats.
            </p>
            <p className="mt-4 leading-relaxed text-stone-600">
              A post in a group feed is buried by tomorrow. A listing on
              Mob&apos;in stays visible, stays organized and keeps working
              for you until the room is filled.
            </p>
            <p className="mt-3 leading-relaxed text-stone-600">
              Instead of answering the same questions across five chat
              threads, you present each property once, with photos, rates
              and rules, and every inquiry lands in one inbox.
            </p>

            <h3 className="mt-8 font-semibold">How we work with you, simply</h3>
            <ul className="mt-3 space-y-2 leading-relaxed text-stone-600">
              <li>You keep ownership of your listings and your tenant relationships.</li>
              <li>Your inquiries stay in one place, so nothing gets buried.</li>
              <li>Questions get a reply from a real person within a day.</li>
            </ul>
            <p className="mt-6 leading-relaxed text-stone-600">
              Mob&apos;in is run by a small team based in the Philippines.
              We work directly with boarding house and apartment owners.
              Message us anytime at team@mobin.example.
            </p>
            <p className="mt-4 text-sm font-medium">The Mob&apos;in team</p>
          </div>

          <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80 lg:hidden">
            <Image
              src={src}
              alt="Apartment building exterior"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-bark/20" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
