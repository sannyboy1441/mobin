"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Logout01Icon,
  Message01Icon,
  UserIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import Logo from "@/components/ui/Logo";
import PropertiesTab from "@/components/dashboard/PropertiesTab";
import MessagesTab from "@/components/dashboard/MessagesTab";
import ProfileTab from "@/components/dashboard/ProfileTab";
import PlanTab from "@/components/dashboard/PlanTab";
import { getProfile } from "@/lib/properties";
import { getThreads } from "@/lib/messages";

const tabs = [
  { id: "properties", label: "Properties", icon: Home01Icon },
  { id: "messages", label: "Messages", icon: Message01Icon },
  { id: "profile", label: "Profile and Settings", icon: UserIcon },
  { id: "plan", label: "Current Plan", icon: Wallet01Icon },
];

export default function DashboardPage() {
  const [tab, setTab] = useState("properties");
  const [name, setName] = useState("");
  const [unread, setUnread] = useState(0);
  const [confirmingOut, setConfirmingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Client-only storage read after mount; refreshes the chip per tab.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(getProfile().name);
    setUnread(getThreads().filter((t) => t.unread).length);
  }, [tab]);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-40 border-b border-sand bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Mob'in home">
            <Logo variant="onLight" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-sm text-stone-600 sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bark text-xs font-semibold text-white">
                {(name || "L").charAt(0).toUpperCase()}
              </span>
              {name || "Landlord"}
            </span>
            <button
              onClick={() => setConfirmingOut(true)}
              className="flex items-center gap-2 rounded-full border border-sand-dark px-4 py-2 text-xs font-medium transition-colors hover:border-bark hover:text-bark"
            >
              <HugeiconsIcon
                icon={Logout01Icon}
                size={15}
                color="currentColor"
                strokeWidth={1.5}
                className="shrink-0"
              />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav
          aria-label="Dashboard"
          className="flex gap-2 overflow-x-auto no-scrollbar lg:sticky lg:top-24 lg:flex-col lg:self-start"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-bark text-white"
                  : "text-stone-600 hover:bg-sand"
              }`}
            >
              <HugeiconsIcon
                icon={t.icon}
                size={18}
                color="currentColor"
                strokeWidth={1.5}
                className="shrink-0"
              />
              {t.label}
              {t.id === "messages" && unread > 0 && (
                <span
                  className={`ml-auto rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                    tab === t.id ? "bg-white text-bark" : "bg-bark text-white"
                  }`}
                >
                  {unread}
                </span>
              )}
            </button>
          ))}
        </nav>

        <main className="min-w-0">
          {tab === "properties" && <PropertiesTab />}
          {tab === "messages" && <MessagesTab />}
          {tab === "profile" && <ProfileTab />}
          {tab === "plan" && <PlanTab />}
        </main>
      </div>

      {confirmingOut && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-5 backdrop-blur-sm"
          onClick={() => setConfirmingOut(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Confirm sign out"
        >
          <div
            className="animate-modal-pop w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold tracking-tight">
              Sign out?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Your properties and messages stay saved in this browser.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setConfirmingOut(false)}
                className="w-full rounded-full border border-sand-dark py-2.5 text-sm font-medium transition-colors hover:border-bark hover:text-bark"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/login")}
                className="w-full rounded-full bg-bark py-2.5 text-sm font-medium text-white transition-colors hover:bg-bark-dark"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
