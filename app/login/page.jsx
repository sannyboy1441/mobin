import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";
import Logo from "@/components/ui/Logo";

export const metadata = {
  title: "Mob'in | Log In",
  description:
    "Log in to your Mob'in landlord account to manage properties, profile and plan.",
};

export default function LoginPage() {
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
              Welcome back.
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
              Pick up where you left off with your properties and inquiries.
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
              Log in
            </h1>
            <p className="mt-3 leading-relaxed text-stone-600">
              Access your properties, profile and plan.
            </p>
          </div>
          <div className="mt-8">
            <LoginForm />
          </div>
          <p className="mt-6 text-center text-sm text-stone-500">
            New here?{" "}
            <Link
              href="/signin"
              className="font-medium text-bark hover:text-bark-dark"
            >
              Create a free account
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
