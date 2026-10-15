"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { getMyPlan, getProperties } from "@/lib/properties";

export default function PlanTab() {
  const [used, setUsed] = useState(0);
  const [planName, setPlanName] = useState("Free");
  const [quota, setQuota] = useState(2);

  useEffect(() => {
    // Client-only storage read after mount; runs once, no render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsed(
      getProperties().filter((p) => p.status === "published").length
    );
    const plan = getMyPlan();
    setPlanName(plan.plan);
    setQuota(plan.quota);
  }, []);

  const pct = Math.min(100, Math.round((used / quota) * 100));

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Current Plan</h2>
      <p className="mt-1 text-sm text-stone-600">
        You are on the {planName} plan.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-bark bg-white p-7">
          <span className="rounded-full bg-bark px-3 py-1 text-xs font-medium text-white">
            Current
          </span>
          <h3 className="mt-3 font-semibold">{planName}</h3>
          <p className="mt-4">
            <span className="text-3xl font-semibold tracking-tight">
              {used} of {quota}
            </span>
            <span className="block text-sm text-stone-500">
              posts published
            </span>
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full bg-bark transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <ul className="mt-5 space-y-2.5">
            {[
              "1 landlord account",
              `${quota} active property posts`,
              "Inquiry inbox included",
            ].map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-stone-700"
              >
                <Check size={16} className="mt-0.5 shrink-0 text-bark" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-sand-dark bg-white p-7">
          <h3 className="font-semibold">Subscription</h3>
          <p className="mt-1 text-sm text-stone-600">
            For managers with more properties.
          </p>
          <p className="mt-4">
            <span className="text-3xl font-semibold tracking-tight">Custom</span>
          </p>
          <ul className="mt-5 space-y-2.5">
            {[
              "More than 2 active posts",
              "Priority support",
              "Onboarding help from our team",
            ].map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-stone-700"
              >
                <Check size={16} className="mt-0.5 shrink-0 text-bark" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl bg-cream p-4 text-sm leading-relaxed text-stone-600">
            To upgrade, contact our team at team@mobin.example.
          </div>
        </div>
      </div>
    </div>
  );
}
