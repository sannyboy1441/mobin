"use client";

import { useEffect, useState } from "react";
import UiSelect from "@/components/ui/UiSelect";
import SearchInput from "@/components/ui/SearchInput";
import {
  getMyPlan,
  getProperties,
  saveProperties,
  uid,
} from "@/lib/properties";

const types = ["Boarding house", "Dormitory", "Apartment"];

const blank = {
  title: "",
  type: types[0],
  monthlyRate: "",
  address: "",
  description: "",
  status: "published",
};

export default function PropertiesTab() {
  const [items, setItems] = useState([]);
  const [quota, setQuota] = useState(2);
  const [planName, setPlanName] = useState("Free");
  const [modal, setModal] = useState(null);
  const [draft, setDraft] = useState(blank);
  const [error, setError] = useState("");
  const [confirmingId, setConfirmingId] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    // Client-only storage read after mount; runs once, no render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(getProperties());
    const plan = getMyPlan();
    setQuota(plan.quota);
    setPlanName(plan.plan);
  }, []);

  const persist = (next) => {
    setItems(next);
    saveProperties(next);
  };

  const openNew = () => {
    setDraft(blank);
    setError("");
    setModal({ editingId: null });
  };

  const openEdit = (p) => {
    setDraft({
      title: p.title,
      type: p.type,
      monthlyRate: p.monthlyRate,
      address: p.address,
      description: p.description,
      status: p.status,
    });
    setError("");
    setModal({ editingId: p.id });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!draft.title.trim()) {
      setError("Please give the property a title.");
      return;
    }
    if (!draft.monthlyRate.trim()) {
      setError("Please add a monthly rate.");
      return;
    }
    const editingId = modal?.editingId ?? null;
    const activeOthers = items.filter(
      (p) => p.status === "published" && p.id !== editingId
    ).length;
    if (draft.status === "published" && activeOthers >= quota) {
      setError(
        `Your ${planName} plan allows ${quota} published posts. Save as draft, unpublish another property, or contact our team for a subscription.`
      );
      return;
    }
    if (editingId) {
      persist(
        items.map((p) =>
          p.id === editingId
            ? {
                ...p,
                title: draft.title.trim(),
                type: draft.type,
                monthlyRate: draft.monthlyRate.trim(),
                address: draft.address.trim(),
                description: draft.description.trim(),
                status: draft.status,
              }
            : p
        )
      );
    } else {
      persist([
        {
          id: uid(),
          title: draft.title.trim(),
          type: draft.type,
          monthlyRate: draft.monthlyRate.trim(),
          address: draft.address.trim(),
          description: draft.description.trim(),
          status: draft.status,
          createdAt: new Date().toISOString(),
        },
        ...items,
      ]);
    }
    setModal(null);
  };

  const toggleStatus = (id) => {
    const target = items.find((p) => p.id === id);
    if (!target) return;
    if (target.status === "draft") {
      const active = items.filter((p) => p.status === "published").length;
      if (active >= quota) {
        alert(
          `Your ${planName} plan allows ${quota} published posts. Unpublish another property or contact our team for a subscription.`
        );
        return;
      }
    }
    persist(
      items.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "published" ? "draft" : "published" }
          : p
      )
    );
  };

  const handleDelete = (id) => {
    if (confirmingId !== id) {
      setConfirmingId(id);
      return;
    }
    persist(items.filter((p) => p.id !== id));
    setConfirmingId(null);
  };

  const active = items.filter((p) => p.status === "published").length;

  const q = query.trim().toLowerCase();
  const filtered = items.filter((p) => {
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      (p.address ?? "").toLowerCase().includes(q);
    const statusLabel = p.status === "published" ? "Published" : "Draft";
    const matchesStatus = statusFilter === "All" || statusLabel === statusFilter;
    const matchesType = typeFilter === "All" || p.type === typeFilter;
    return matchesQuery && matchesStatus && matchesType;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Properties</h2>
          <p className="mt-1 text-sm text-stone-600">
            {active} of {quota} posts published.
          </p>
        </div>
        <button
          onClick={openNew}
          className="rounded-full bg-bark px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bark-dark"
        >
          Add Property
        </button>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-sand-dark bg-white px-6 py-14 text-center">
          <p className="font-semibold">No properties yet</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-stone-600">
            Post your first boarding house, dormitory or apartment and it
            will appear here.
          </p>
          <button
            onClick={openNew}
            className="mt-5 rounded-full bg-bark px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bark-dark"
          >
            Post Your First Property
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <div className="flex-1">
              <SearchInput
                value={query}
                onChange={setQuery}
                label="Search your properties"
                placeholder="Search by title or address..."
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="w-full sm:w-32">
                <UiSelect
                  label="Filter by status"
                  value={statusFilter}
                  options={["All", "Published", "Draft"]}
                  onChange={setStatusFilter}
                />
              </div>
              <div className="w-full sm:w-40">
                <UiSelect
                  label="Filter by type"
                  value={typeFilter}
                  options={["All", ...types]}
                  onChange={setTypeFilter}
                />
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-stone-500" role="status">
            Showing {filtered.length} of {items.length} properties
          </p>
          {filtered.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-dashed border-sand-dark bg-white px-6 py-10 text-center text-sm text-stone-500">
              No properties match your search or filters.
            </p>
          ) : (
        <div className="mt-4 space-y-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-sand-dark bg-white p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {p.type} · ₱{p.monthlyRate}/month
                    {p.address ? ` · ${p.address}` : ""}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    p.status === "published"
                      ? "bg-bark text-white"
                      : "border border-sand-dark text-stone-500"
                  }`}
                >
                  {p.status === "published" ? "Published" : "Draft"}
                </span>
              </div>
              {p.description && (
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {p.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="rounded-full border border-sand-dark px-4 py-1.5 text-xs font-medium transition-colors hover:border-bark hover:text-bark"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleStatus(p.id)}
                  className="rounded-full border border-sand-dark px-4 py-1.5 text-xs font-medium transition-colors hover:border-bark hover:text-bark"
                >
                  {p.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                    confirmingId === p.id
                      ? "border-red-800 bg-red-800 text-white"
                      : "border-sand-dark text-stone-500 hover:border-red-800 hover:text-red-800"
                  }`}
                >
                  {confirmingId === p.id ? "Confirm delete" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
          )}
        </>
      )}

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-5 backdrop-blur-sm"
          onClick={() => setModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={modal.editingId ? "Edit property" : "Add property"}
        >
          <div
            className="animate-modal-pop max-h-[90vh] w-full max-w-lg overflow-y-auto no-scrollbar rounded-2xl bg-white p-6 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold tracking-tight">
              {modal.editingId ? "Edit property" : "Add property"}
            </h3>
            <form onSubmit={handleSave} className="mt-5">
              <label className="block">
                <span className="text-xs font-medium text-stone-600">
                  Property title
                </span>
                <input
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  placeholder="Sunrise Boarding House"
                  className="mt-1.5 w-full rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
                />
              </label>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-medium text-stone-600">
                    Property type
                  </span>
                <div className="mt-1.5">
                  <UiSelect
                    label="Property type"
                    value={draft.type}
                    options={types}
                    onChange={(v) => setDraft({ ...draft, type: v })}
                  />
                </div>
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-stone-600">
                    Monthly rate (₱)
                  </span>
                  <input
                    value={draft.monthlyRate}
                    onChange={(e) =>
                      setDraft({ ...draft, monthlyRate: e.target.value })
                    }
                    placeholder="5,500"
                    inputMode="numeric"
                    className="mt-1.5 w-full rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-xs font-medium text-stone-600">Address</span>
                <input
                  value={draft.address}
                  onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                  placeholder="Street, barangay, city"
                  className="mt-1.5 w-full rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
                />
              </label>
              <label className="mt-4 block">
                <span className="text-xs font-medium text-stone-600">
                  Description
                </span>
                <textarea
                  rows={3}
                  value={draft.description}
                  onChange={(e) =>
                    setDraft({ ...draft, description: e.target.value })
                  }
                  placeholder="Furnished rooms near... House rules..."
                  className="mt-1.5 w-full resize-none rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
                />
              </label>
              <div className="mt-4 flex gap-2">
                {(["published", "draft"]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setDraft({ ...draft, status: s })}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                      draft.status === s
                        ? "bg-bark text-white"
                        : "border border-sand-dark text-stone-600 hover:border-bark hover:text-bark"
                    }`}
                  >
                    {s === "published" ? "Published" : "Draft"}
                  </button>
                ))}
              </div>
              {error && (
                <p className="mt-4 rounded-xl bg-cream p-3 text-xs leading-relaxed text-bark">
                  {error}
                </p>
              )}
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="w-full rounded-full border border-sand-dark py-2.5 text-sm font-medium transition-colors hover:border-bark hover:text-bark"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full rounded-full bg-bark py-2.5 text-sm font-medium text-white transition-colors hover:bg-bark-dark"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
