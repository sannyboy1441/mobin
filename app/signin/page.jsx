import Image from "next/image";
import Link from "next/link";
import SignupForm from "@/components/forms/SignupForm";
import Logo from "@/components/ui/Logo";

export const metadata = {
  title: "Mob'in | Create Your Free Account",
  description:
    "Sign up for a free Mob'in landlord account with 2 property posts included. No payment required to start.",
};

export default function SigninPage() {
  return (
    <div className="grid min-h-screen bg-cream lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop"
          alt="Apartment building exterior"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-bark/70" />
        <div className="absolute inset-0 flex flex-col justify-between p-10">
          <Link href="/" className="w-fit" aria-label="Mob'in home">
            <Logo variant="onDark" />
          </Link>
          <div>
            <p className="max-w-sm text-2xl font-semibold leading-snug tracking-tight text-white">
              Post your property. Fill your rooms.
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
              Join landlords managing boarding houses, dormitories and apartments in one place.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Link href="/" className="w-fit lg:hidden" aria-label="Mob'in home">
            <Logo variant="onLight" />
          </Link>
          <div className="mt-6 lg:mt-0">
            <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Create your account
            </h1>
            <p className="mt-3 leading-relaxed text-stone-600">
              Sign up free and get 2 property posts included. No payment required to start.
            </p>
          </div>
          <div className="mt-8">
            <SignupForm />
          </div>
          <p className="mt-6 text-center text-sm text-stone-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-bark hover:text-bark-dark">
              Log in
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-stone-500">
            <Link href="/" className="font-medium text-bark hover:text-bark-dark">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
