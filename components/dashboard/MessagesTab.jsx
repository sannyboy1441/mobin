"use client";

import { useEffect, useState } from "react";
import {
  getThreads,
  newMessageId,
  saveThreads,
} from "@/lib/messages";
import {
  dismissNotification,
  getNotifications,
} from "@/lib/notifications";
import UiSelect from "@/components/ui/UiSelect";
import SearchInput from "@/components/ui/SearchInput";

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function MessagesTab() {
  const [threads, setThreads] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [readFilter, setReadFilter] = useState("All");

  useEffect(() => {
    const loaded = getThreads();
    // Client-only storage read after mount; runs once, no render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThreads(loaded);
    if (loaded.length > 0) setSelectedId(loaded[0].id);
    setNotes(getNotifications());
  }, []);

  const persist = (next) => {
    setThreads(next);
    saveThreads(next);
  };

  const handleDismiss = (id) => {
    dismissNotification(id);
    setNotes(getNotifications());
  };

  const openThread = (id) => {
    setSelectedId(id);
    persist(
      threads.map((t) => (t.id === id ? { ...t, unread: false } : t))
    );
  };

  const sendReply = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !selectedId) return;
    persist(
      threads.map((t) =>
        t.id === selectedId
          ? {
              ...t,
              unread: false,
              updatedAt: new Date().toISOString(),
              messages: [
                ...t.messages,
                {
                  id: newMessageId(),
                  from: "landlord",
                  text,
                  at: new Date().toISOString(),
                },
              ],
            }
          : t
      )
    );
    setDraft("");
  };

  const selected = threads.find((t) => t.id === selectedId) ?? null;

  const sorted = [...threads].sort(
    (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)
  );

  const q = query.trim().toLowerCase();
  const visible = sorted.filter((t) => {
    const last = t.messages[t.messages.length - 1]?.text ?? "";
    const matchesQuery =
      !q ||
      t.tenantName.toLowerCase().includes(q) ||
      t.propertyTitle.toLowerCase().includes(q) ||
      last.toLowerCase().includes(q);
    const matchesRead =
      readFilter === "All" || (readFilter === "Unread" ? t.unread : !t.unread);
    return matchesQuery && matchesRead;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Messages</h2>

      {sorted.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-sand-dark bg-white px-6 py-14 text-center">
          <p className="font-semibold">No messages yet</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-stone-600">
            When tenants inquire about your properties, their messages will
            appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <div className="flex-1">
              <SearchInput
                value={query}
                onChange={setQuery}
                label="Search messages"
                placeholder="Search by tenant, property, or message..."
              />
            </div>
            <div className="w-full sm:w-32">
              <UiSelect
                label="Filter by read status"
                value={readFilter}
                options={["All", "Unread", "Read"]}
                onChange={setReadFilter}
              />
            </div>
          </div>
          {visible.length !== sorted.length && (
            <p className="mt-3 text-xs text-stone-500" role="status">
              Showing {visible.length} of {sorted.length} conversations
            </p>
          )}
        <div className="mt-4 grid overflow-hidden rounded-2xl border border-sand-dark bg-white md:grid-cols-[280px_1fr]">
          {visible.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-stone-500 md:col-span-2">
              No conversations match your search or filters.
            </p>
          ) : (
          <>
          <div
            className={`flex-col divide-y divide-sand overflow-y-auto no-scrollbar md:flex ${
              selected ? "hidden" : "flex"
            }`}
          >
            {visible.map((t) => {
              const last = t.messages[t.messages.length - 1];
              return (
                <button
                  key={t.id}
                  onClick={() => openThread(t.id)}
                  className={`px-4 py-3.5 text-left transition-colors hover:bg-cream ${
                    t.id === selectedId ? "bg-cream" : ""
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">
                      {t.tenantName}
                    </span>
                    {t.unread && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-bark" />
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs text-stone-500">
                    {t.propertyTitle}
                  </span>
                  <span className="mt-1 block truncate text-xs text-stone-500">
                    {last ? last.text : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={`flex-col border-sand md:flex md:border-l ${
              selected ? "flex" : "hidden"
            }`}
          >
            {selected ? (
              <>
                <div className="border-b border-sand px-4 py-3">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="mb-1 text-xs font-medium text-bark md:hidden"
                  >
                    Back to inbox
                  </button>
                  <p className="text-sm font-semibold">
                    {selected.tenantName}
                  </p>
                  <p className="text-xs text-stone-500">
                    {selected.propertyTitle}
                  </p>
                </div>
                <div className="flex max-h-96 min-h-64 flex-col gap-2 overflow-y-auto no-scrollbar p-4">
                  {selected.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${
                        m.from === "landlord" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          m.from === "landlord"
                            ? "bg-bark text-white"
                            : "border border-sand bg-cream text-ink"
                        }`}
                      >
                        <p>{m.text}</p>
                        <p
                          className={`mt-1 text-[11px] ${
                            m.from === "landlord"
                              ? "text-white/70"
                              : "text-stone-500"
                          }`}
                        >
                          {formatTime(m.at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={sendReply}
                  className="flex gap-2 border-t border-sand p-3"
                >
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-bark px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bark-dark"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center p-10 text-sm text-stone-500">
                Select a conversation to read it.
              </div>
            )}
          </div>
          </>
          )}
        </div>
        </>
      )}

      {notes.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold">Notifications</h3>
          <ul className="mt-3 space-y-2">
            {notes.map((n) => (
              <li
                key={n.id}
                className="flex items-start justify-between gap-3 rounded-2xl border border-sand-dark bg-white px-4 py-3"
              >
                <div>
                  <p className="text-sm leading-relaxed">{n.text}</p>
                  <p className="mt-1 text-[11px] text-stone-500">
                    {formatTime(n.date)}
                  </p>
                </div>
                <button
                  onClick={() => handleDismiss(n.id)}
                  className="shrink-0 rounded-full border border-sand-dark px-3 py-1 text-xs font-medium text-stone-500 transition-colors hover:border-bark hover:text-bark"
                >
                  Dismiss
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
