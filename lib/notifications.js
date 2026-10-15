/**
 * @typedef {object} Notification
 * @property {string} id
 * @property {string} text
 * @property {string} date
 */

const KEY = "mobin-notifications";

function uid() {
  return `note-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function getNotifications() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveNotifications(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function notify(text) {
  const next = [
    {
      id: uid(),
      text,
      date: new Date().toISOString(),
    },
    ...getNotifications(),
  ].slice(0, 20);
  saveNotifications(next);
}

export function dismissNotification(id) {
  saveNotifications(getNotifications().filter((n) => n.id !== id));
}
