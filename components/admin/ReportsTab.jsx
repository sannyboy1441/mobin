"use client";

import { useEffect, useState } from "react";
import {
  getAdminProperties,
  getLandlords,
  getTenants,
} from "@/lib/admin";

export default function ReportsTab() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const landlords = getLandlords();
    const props = getAdminProperties();
    const byType = {};
    props.forEach((p) => {
      byType[p.type] = (byType[p.type] ?? 0) + 1;
    });
    // Client-only storage read after mount; runs once, no render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRows([
      { label: "Total landlords", value: landlords.length },
      { label: "Total tenants", value: getTenants().length },
      { label: "Total properties", value: props.length },
      {
        label: "Published",
        value: props.filter((p) => p.status === "published").length,
      },
      {
        label: "Drafts",
        value: props.filter((p) => p.status === "draft").length,
      },
      ...Object.entries(byType).map(([type, count]) => ({
        label: `${type}s`,
        value: count,
      })),
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Reports</h2>

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
