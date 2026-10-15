import { useEffect, useMemo, useState } from "react";
import { getTenants } from "@/lib/admin";
import SearchInput from "@/components/ui/SearchInput";

export default function TenantsTab() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Client-only storage read after mount; runs once, no render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(getTenants());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.contact.toLowerCase().includes(q) ||
        t.lookingFor.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Tenants</h2>

      <div className="mt-4">
        <SearchInput
          value={query}
          onChange={setQuery}
          label="Search tenants"
          placeholder="Search by name, contact, or what they're looking for..."
        />
      </div>
      <p className="mt-3 text-xs text-stone-500" role="status">
        Showing {filtered.length} of {items.length} tenants
      </p>

      <div className="mt-4 hidden rounded-2xl border border-sand-dark bg-white lg:block">
        <table className="w-full text-left text-sm [&_td]:align-middle">
          <thead>
            <tr className="border-b border-sand text-xs uppercase tracking-wider text-stone-500">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Looking for</th>
              <th className="px-5 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {filtered.map((t) => (
              <tr key={t.id}>
                <td className="px-5 py-3.5 font-medium">{t.name}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-stone-600">{t.contact}</td>
                <td className="px-5 py-3.5 text-stone-600">{t.lookingFor}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-stone-600">{t.joinedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-stone-500">
            No tenants match your search.
          </p>
        )}
      </div>

      <div className="mt-4 space-y-3 lg:hidden">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-sand-dark bg-white p-4"
          >
            <p className="text-sm font-semibold">{t.name}</p>
            <p className="mt-0.5 text-xs text-stone-500">
              {t.contact} · Joined {t.joinedAt}
            </p>
            <p className="mt-2 text-sm text-stone-600">{t.lookingFor}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-sand-dark bg-white px-5 py-8 text-center text-sm text-stone-500">
            No tenants match your search.
          </p>
        )}
      </div>
    </div>
  );
}
