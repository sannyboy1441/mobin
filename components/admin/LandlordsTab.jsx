"use client";

import { useEffect, useState } from "react";
import {
  getLandlords,
  saveLandlords,
} from "@/lib/admin";
import { FREE_QUOTA, SUBSCRIPTION_QUOTA } from "@/lib/constants";
import { saveMyPlan } from "@/lib/properties";
import UiSelect from "@/components/ui/UiSelect";
import SearchInput from "@/components/ui/SearchInput";
import { notify } from "@/lib/notifications";

export default function LandlordsTab() {
  const [items, setItems] = useState([]);
  const [plans, setPlans] = useState({});
  const [savedId, setSavedId] = useState(null);
  const [query, setQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const loaded = getLandlords();
    // Client-only storage read after mount; runs once, no render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(loaded);
    setPlans(Object.fromEntries(loaded.map((l) => [l.id, l.plan])));
  }, []);

  const persist = (next) => {
    setItems(next);
    saveLandlords(next);
  };

  const toggleStatus = (id) => {
    persist(
      items.map((l) =>
        l.id === id
          ? {
              ...l,
              status: l.status === "active" ? "suspended" : "active",
            }
          : l
      )
    );
  };

  const changePlan = (id, plan) => {
    setPlans({ ...plans, [id]: plan });
    const next = items.map((l) => (l.id === id ? { ...l, plan } : l));
    persist(next);

    const target = next.find((l) => l.id === id);
    if (target?.isYou) {
      if (plan === "subscription") {
        saveMyPlan({ plan: "Subscription", quota: SUBSCRIPTION_QUOTA });
      } else {
        saveMyPlan({ plan: "Free", quota: FREE_QUOTA });
      }
      notify(
        `Your plan was updated to ${
          plan === "subscription" ? "Subscription" : "Free"
        } (${plan === "subscription" ? SUBSCRIPTION_QUOTA : FREE_QUOTA} posts) by the Mob'in team.`
      );
    }
    setSavedId(id);
    setTimeout(() => setSavedId((current) => (current === id ? null : current)), 2000);
  };

  const q = query.trim().toLowerCase();
  const filtered = items.filter((l) => {
    const matchesQuery =
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.contact.toLowerCase().includes(q);
    const planLabel = (plans[l.id] ?? l.plan) === "subscription" ? "Subscription" : "Free";
    const matchesPlan = planFilter === "All" || planLabel === planFilter;
    const statusLabel = l.status === "active" ? "Active" : "Suspended";
    const matchesStatus = statusFilter === "All" || statusLabel === statusFilter;
    return matchesQuery && matchesPlan && matchesStatus;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Landlords</h2>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Search landlords"
            placeholder="Search by name or contact..."
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:w-auto sm:grid-cols-2">
          <div className="w-full sm:w-36">
            <UiSelect
              label="Filter by plan"
              value={planFilter}
              options={["All", "Free", "Subscription"]}
              onChange={setPlanFilter}
            />
          </div>
          <div className="w-full sm:w-36">
            <UiSelect
              label="Filter by status"
              value={statusFilter}
              options={["All", "Active", "Suspended"]}
              onChange={setStatusFilter}
            />
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-stone-500" role="status">
        Showing {filtered.length} of {items.length} landlords
      </p>

      <div className="mt-4 hidden rounded-2xl border border-sand-dark bg-white lg:block">
        <table className="w-full text-left text-sm [&_td]:align-middle">
          <thead>
            <tr className="border-b border-sand text-xs uppercase tracking-wider text-stone-500">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Props</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {filtered.map((l) => (
              <tr key={l.id}>
                <td className="px-5 py-3.5 font-medium">{l.name}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-stone-600">{l.contact}</td>
                <td className="px-5 py-3.5 tabular-nums">{l.properties}</td>
                <td className="min-w-28 px-5 py-3.5">
                  <UiSelect
                    size="sm"
                    label={`Plan for ${l.name}`}
                    value={
                      plans[l.id] === "subscription" ? "Subscription" : "Free"
                    }
                    options={["Free", "Subscription"]}
                    onChange={(v) =>
                      changePlan(
                        l.id,
                        v === "Subscription" ? "subscription" : "free"
                      )
                    }
                  />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      l.status === "active"
                        ? "bg-bark text-white"
                        : "border border-sand-dark text-stone-500"
                    }`}
                  >
                    {l.status === "active" ? "Active" : "Suspended"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <span className="flex flex-col items-stretch gap-2">
                    <button
                      onClick={() => toggleStatus(l.id)}
                      className="rounded-full border border-sand-dark px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-bark hover:text-bark"
                    >
                      {l.status === "active" ? "Suspend" : "Reactivate"}
                    </button>
                    {savedId === l.id && (
                      <span className="text-center text-xs text-bark">Saved</span>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-stone-500">
            No landlords match your search or filters.
          </p>
        )}
      </div>

      <div className="mt-4 space-y-3 lg:hidden">
        {filtered.map((l) => (
          <div
            key={l.id}
            className="rounded-2xl border border-sand-dark bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{l.name}</p>
                <p className="mt-0.5 text-xs text-stone-500">
                  {l.contact} · {l.properties} props ·{" "}
                  {l.status === "active" ? "Active" : "Suspended"}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <UiSelect
                size="sm"
                label={`Plan for ${l.name}`}
                value={
                  plans[l.id] === "subscription" ? "Subscription" : "Free"
                }
                options={["Free", "Subscription"]}
                onChange={(v) =>
                  changePlan(
                    l.id,
                    v === "Subscription" ? "subscription" : "free"
                  )
                }
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => toggleStatus(l.id)}
                className="flex-1 rounded-full border border-sand-dark py-2 text-xs font-medium transition-colors hover:border-bark hover:text-bark"
              >
                {l.status === "active" ? "Suspend" : "Reactivate"}
              </button>
            </div>
            {savedId === l.id && (
              <p className="mt-2 text-center text-xs text-bark">Saved</p>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-sand-dark bg-white px-5 py-8 text-center text-sm text-stone-500">
            No landlords match your search or filters.
          </p>
        )}
      </div>
    </div>
  );
}
