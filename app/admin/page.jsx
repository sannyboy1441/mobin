"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Building02Icon,
  CreditCardIcon,
  LayoutGridIcon,
  Logout01Icon,
  Settings01Icon,
  UserIcon,
  UsersIcon,
  Analytics01Icon,
} from "@hugeicons/core-free-icons";
import Logo from "@/components/ui/Logo";
import OverviewTab from "@/components/admin/OverviewTab";
import LandlordsTab from "@/components/admin/LandlordsTab";
import TenantsTab from "@/components/admin/TenantsTab";
import AdminPropertiesTab from "@/components/admin/AdminPropertiesTab";
import PaymentsTab from "@/components/admin/PaymentsTab";
import ReportsTab from "@/components/admin/ReportsTab";
import AdminProfileTab from "@/components/admin/AdminProfileTab";
import { getAdminProfile } from "@/lib/admin";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutGridIcon },
  { id: "landlords", label: "Landlords", icon: UsersIcon },
  { id: "tenants", label: "Tenants", icon: UserIcon },
  { id: "properties", label: "Properties", icon: Building02Icon },
  { id: "payments", label: "Payments", icon: CreditCardIcon },
  { id: "reports", label: "Reports", icon: Analytics01Icon },
  { id: "profile", label: "Profile and Settings", icon: Settings01Icon },
];

export default function AdminPage() {
  const [tab, setTab] = useState("overview");
  const [name, setName] = useState("Super Admin");
  const [confirmingOut, setConfirmingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Client-only storage read after mount; refreshes the chip per tab.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(getAdminProfile().name || "Super Admin");
  }, [tab]);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-40 border-b border-sand bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Mob'in home">
            <Logo variant="onLight" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm text-stone-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bark text-xs font-semibold text-white">
                {name.charAt(0).toUpperCase() || "S"}
              </span>
              {name}
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
          aria-label="Admin"
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
            </button>
          ))}
        </nav>

        <main className="min-w-0">
          {tab === "overview" && <OverviewTab />}
          {tab === "landlords" && <LandlordsTab />}
          {tab === "tenants" && <TenantsTab />}
          {tab === "properties" && <AdminPropertiesTab />}
          {tab === "payments" && <PaymentsTab />}
          {tab === "reports" && <ReportsTab />}
          {tab === "profile" && <AdminProfileTab />}
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
              Your admin changes stay saved in this browser.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setConfirmingOut(false)}
                className="w-full rounded-full border border-sand-dark py-2.5 text-sm font-medium transition-colors hover:border-bark hover:text-bark"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/admin/login")}
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
