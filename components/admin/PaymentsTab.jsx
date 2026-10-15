"use client";

import { useEffect, useState } from "react";
import {
  getPayments,
  savePayments,
} from "@/lib/admin";
import UiSelect from "@/components/ui/UiSelect";
import SearchInput from "@/components/ui/SearchInput";

export default function PaymentsTab() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    // Client-only storage read after mount; runs once, no render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(getPayments());
  }, []);

  const markPaid = (id) => {
    const next = items.map((p) =>
      p.id === id ? { ...p, status: "paid" } : p
    );
    setItems(next);
    savePayments(next);
  };

  const q = query.trim().toLowerCase();
  const filtered = items.filter((p) => {
    const matchesQuery = !q || p.landlord.toLowerCase().includes(q);
    const statusLabel = p.status === "paid" ? "Paid" : "Pending";
    return matchesQuery && (statusFilter === "All" || statusLabel === statusFilter);
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Payments</h2>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Search payments"
            placeholder="Search by landlord..."
          />
        </div>
        <div className="w-full sm:w-36">
          <UiSelect
            label="Filter by status"
            value={statusFilter}
            options={["All", "Paid", "Pending"]}
            onChange={setStatusFilter}
          />
        </div>
      </div>
      <p className="mt-3 text-xs text-stone-500" role="status">
        Showing {filtered.length} of {items.length} payments
      </p>

      <div className="mt-4 hidden rounded-2xl border border-sand-dark bg-white lg:block">
        <table className="w-full text-left text-sm [&_td]:align-middle">
          <thead>
            <tr className="border-b border-sand text-xs uppercase tracking-wider text-stone-500">
              <th className="px-5 py-3 font-medium">Landlord</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Period</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {filtered.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-3.5 font-medium">{p.landlord}</td>
                <td className="px-5 py-3.5 text-stone-600">{p.plan}</td>
                <td className="whitespace-nowrap px-5 py-3.5 tabular-nums">{p.amount}</td>
                <td className="px-5 py-3.5 text-stone-600">{p.period}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      p.status === "paid"
                        ? "bg-bark text-white"
                        : "border border-sand-dark text-stone-500"
                    }`}
                  >
                    {p.status === "paid" ? "Paid" : "Pending"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  {p.status === "pending" ? (
                    <button
                      onClick={() => markPaid(p.id)}
                      className="rounded-full border border-sand-dark px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-bark hover:text-bark"
                    >
                      Mark paid
                    </button>
                  ) : (
                    <span className="text-xs text-stone-400">Settled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-stone-500">
            No payments match your search or filters.
          </p>
        )}
      </div>

      <div className="mt-4 space-y-3 lg:hidden">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-sand-dark bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{p.landlord}</p>
                <p className="mt-0.5 text-xs text-stone-500">
                  {p.plan} · {p.amount} · {p.period}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  p.status === "paid"
                    ? "bg-bark text-white"
                    : "border border-sand-dark text-stone-500"
                }`}
              >
                {p.status === "paid" ? "Paid" : "Pending"}
              </span>
            </div>
            {p.status === "pending" ? (
              <button
                onClick={() => markPaid(p.id)}
                className="mt-3 w-full rounded-full border border-sand-dark py-2 text-xs font-medium transition-colors hover:border-bark hover:text-bark"
              >
                Mark paid
              </button>
            ) : (
              <p className="mt-3 text-xs text-stone-400">Settled</p>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-sand-dark bg-white px-5 py-8 text-center text-sm text-stone-500">
            No payments match your search or filters.
          </p>
        )}
      </div>
    </div>
  );
}
