"use client";

import { useEffect, useState } from "react";
import {
  getAdminProperties,
  saveAdminProperties,
} from "@/lib/admin";
import UiSelect from "@/components/ui/UiSelect";
import SearchInput from "@/components/ui/SearchInput";

export default function AdminPropertiesTab() {
  const [items, setItems] = useState([]);
  const [confirmingId, setConfirmingId] = useState(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    // Client-only storage read after mount; runs once, no render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(getAdminProperties());
  }, []);

  const handleRemove = (id) => {
    if (confirmingId !== id) {
      setConfirmingId(id);
      return;
    }
    const next = items.filter((p) => p.id !== id);
    setItems(next);
    saveAdminProperties(next);
    setConfirmingId(null);
  };

  const q = query.trim().toLowerCase();
  const filtered = items.filter((p) => {
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.owner.toLowerCase().includes(q);
    const matchesType = typeFilter === "All" || p.type === typeFilter;
    const statusLabel = p.status === "published" ? "Published" : "Draft";
    const matchesStatus = statusFilter === "All" || statusLabel === statusFilter;
    return matchesQuery && matchesType && matchesStatus;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Properties</h2>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Search properties"
            placeholder="Search by title or owner..."
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="w-full sm:w-40">
            <UiSelect
              label="Filter by type"
              value={typeFilter}
              options={["All", "Boarding house", "Dormitory", "Apartment"]}
              onChange={setTypeFilter}
            />
          </div>
          <div className="w-full sm:w-32">
            <UiSelect
              label="Filter by status"
              value={statusFilter}
              options={["All", "Published", "Draft"]}
              onChange={setStatusFilter}
            />
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-stone-500" role="status">
        Showing {filtered.length} of {items.length} properties
      </p>

      <div className="mt-4 hidden rounded-2xl border border-sand-dark bg-white lg:block">
        <table className="w-full text-left text-sm [&_td]:align-middle">
          <thead>
            <tr className="border-b border-sand text-xs uppercase tracking-wider text-stone-500">
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Owner</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Rate</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {filtered.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-3.5 font-medium">{p.title}</td>
                <td className="px-5 py-3.5 text-stone-600">{p.owner}</td>
                <td className="px-5 py-3.5 text-stone-600">{p.type}</td>
                <td className="whitespace-nowrap px-5 py-3.5 tabular-nums">{p.rate}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      p.status === "published"
                        ? "bg-bark text-white"
                        : "border border-sand-dark text-stone-500"
                    }`}
                  >
                    {p.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <button
                    onClick={() => handleRemove(p.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      confirmingId === p.id
                        ? "border-red-800 bg-red-800 text-white"
                        : "border-sand-dark text-stone-500 hover:border-red-800 hover:text-red-800"
                    }`}
                  >
                    {confirmingId === p.id ? "Confirm" : "Remove"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-stone-500">
            No properties match your search or filters.
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
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="mt-0.5 text-xs text-stone-500">
                  {p.owner} · {p.type} · {p.rate}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  p.status === "published"
                    ? "bg-bark text-white"
                    : "border border-sand-dark text-stone-500"
                }`}
              >
                {p.status === "published" ? "Published" : "Draft"}
              </span>
            </div>
            <button
              onClick={() => handleRemove(p.id)}
              className={`mt-3 w-full rounded-full border py-2 text-xs font-medium transition-colors ${
                confirmingId === p.id
                  ? "border-red-800 bg-red-800 text-white"
                  : "border-sand-dark text-stone-500 hover:border-red-800 hover:text-red-800"
              }`}
            >
              {confirmingId === p.id ? "Confirm remove" : "Remove"}
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-sand-dark bg-white px-5 py-8 text-center text-sm text-stone-500">
            No properties match your search or filters.
          </p>
        )}
      </div>
    </div>
  );
}
