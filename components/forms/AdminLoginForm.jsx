"use client";

import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/admin");
      }}
    >
      <label className="block">
        <span className="text-xs font-medium text-stone-600">
          Phone or email
        </span>
        <input
          name="contact"
          required
          placeholder="team@mobin.example"
          className="mt-1.5 w-full rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
        />
      </label>
      <label className="mt-4 block">
        <span className="text-xs font-medium text-stone-600">Password</span>
        <input
          name="password"
          type="password"
          required
          placeholder="Your password"
          className="mt-1.5 w-full rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
        />
      </label>
      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-bark py-3 text-sm font-medium text-white transition-colors hover:bg-bark-dark"
      >
        Log In
      </button>
    </form>
  );
}
