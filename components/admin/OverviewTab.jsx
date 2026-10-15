"use client";

import { useEffect, useState } from "react";
import {
  getLandlords,
  getTenants,
  getAdminProperties,
  getRequests,
} from "@/lib/admin";

export default function OverviewTab() {
  const [stats, setStats] = useState({
    landlords: 0,
    tenants: 0,
    published: 0,
    pending: 0,
    subscriptions: 0,
  });

  useEffect(() => {
    const landlords = getLandlords();
    const props = getAdminProperties();
    // Client-only storage read after mount; runs once, no render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({
      landlords: landlords.length,
      tenants: getTenants().length,
      published: props.filter((p) => p.status === "published").length,
      pending: getRequests().filter((r) => r.status === "pending").length,
      subscriptions: landlords.filter((l) => l.plan === "subscription").length,
    });
  }, []);

  const rows = [
    { label: "Landlords", value: stats.landlords },
    { label: "Tenants on the app", value: stats.tenants },
    { label: "Published properties", value: stats.published },
    { label: "Pending plan requests", value: stats.pending },
    { label: "Active subscriptions", value: stats.subscriptions },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
      <dl className="mt-6 divide-y divide-sand rounded-2xl border border-sand-dark bg-white px-6">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between py-4">
            <dt className="text-sm text-stone-600">{r.label}</dt>
            <dd className="text-2xl font-semibold tabular-nums tracking-tight">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
