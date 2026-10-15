"use client";

import { useEffect, useState } from "react";
import { getProfile, saveProfile } from "@/lib/properties";

export default function ProfileTab() {
  const [profile, setProfile] = useState({ name: "", contact: "" });
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const p = getProfile();
    // Client-only storage read after mount; runs once, no render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile({ name: p.name, contact: p.contact });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    saveProfile({ name: profile.name.trim(), contact: profile.contact.trim() });
    setPassword("");
    setSaved(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">
        Profile and Settings
      </h2>

      <form
        onSubmit={handleSave}
        className="mt-6 max-w-lg rounded-2xl border border-sand-dark bg-white p-6 sm:p-7"
      >
        <label className="block">
          <span className="text-xs font-medium text-stone-600">Full name</span>
          <input
            value={profile.name}
            onChange={(e) => {
              setProfile({ ...profile, name: e.target.value });
              setSaved(false);
            }}
            placeholder="Juan Dela Cruz"
            className="mt-1.5 w-full rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-xs font-medium text-stone-600">
            Phone or email
          </span>
          <input
            value={profile.contact}
            onChange={(e) => {
              setProfile({ ...profile, contact: e.target.value });
              setSaved(false);
            }}
            placeholder="0912 345 6789"
            className="mt-1.5 w-full rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-xs font-medium text-stone-600">
            New password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setSaved(false);
            }}
            placeholder="Leave blank to keep current"
            className="mt-1.5 w-full rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
          />
        </label>
        {saved && (
          <p className="mt-4 rounded-xl bg-cream p-3 text-xs text-bark">
            Profile saved.
          </p>
        )}
        <button
          type="submit"
          className="mt-5 w-full rounded-full bg-bark py-2.5 text-sm font-medium text-white transition-colors hover:bg-bark-dark"
        >
          Save Changes
        </button>
        <p className="mt-3 text-center text-xs text-stone-500">
          Changes stay in this browser.
        </p>
      </form>
    </div>
  );
}
