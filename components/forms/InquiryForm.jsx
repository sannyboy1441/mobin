import Link from "next/link";

export default function InquiryForm() {
  return (
    <section id="get-started" className="scroll-mt-16 bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
          Sign in free, post today
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-stone-600">
          Create your free landlord account and publish up to 2 properties.
          It takes about a minute and no payment is required to start. When
          you need more posts, our team will help you subscribe.
        </p>
        <Link
          href="/signin"
          className="mt-8 inline-block rounded-full bg-bark px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-bark-dark"
        >
          Sign In Free
        </Link>
        <p className="mt-5 text-sm text-stone-600">
          Prefer to talk first. Reach us at team@mobin.example.
        </p>
      </div>
    </section>
  );
}
