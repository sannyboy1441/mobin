/**
 * @typedef {"landlord" | "tenant"} Sender
 * @typedef {object} ChatMessage
 * @property {string} id
 * @property {Sender} from
 * @property {string} text
 * @property {string} at
 * @typedef {object} Thread
 * @property {string} id
 * @property {string} tenantName
 * @property {string} propertyTitle
 * @property {ChatMessage[]} messages
 * @property {boolean} unread
 * @property {string} updatedAt
 */

const KEY = "mobin-threads";

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function newMessageId() {
  return uid("msg");
}

function seed() {
  const now = Date.now();
  const at = (minsAgo) => new Date(now - minsAgo * 60000).toISOString();
  return [
    {
      id: "thread-demo-1",
      tenantName: "J. Ramos",
      propertyTitle: "Sunrise Boarding House",
      unread: true,
      updatedAt: at(25),
      messages: [
        {
          id: "msg-demo-1a",
          from: "tenant",
          text: "Hi, is the solo room near the university still available?",
          at: at(90),
        },
        {
          id: "msg-demo-1b",
          from: "landlord",
          text: "Yes, it is still open. Viewing is possible this weekend.",
          at: at(60),
        },
        {
          id: "msg-demo-1c",
          from: "tenant",
          text: "Great. Is Saturday morning fine for a quick visit?",
          at: at(25),
        },
      ],
    },
    {
      id: "thread-demo-2",
      tenantName: "A. Dela Cruz",
      propertyTitle: "Maple Studio Unit",
      unread: true,
      updatedAt: at(180),
      messages: [
        {
          id: "msg-demo-2a",
          from: "tenant",
          text: "Hello, does the studio rate include WiFi?",
          at: at(180),
        },
      ],
    },
    {
      id: "thread-demo-3",
      tenantName: "M. Santos",
      propertyTitle: "Sunrise Boarding House",
      unread: false,
      updatedAt: at(1500),
      messages: [
        {
          id: "msg-demo-3a",
          from: "tenant",
          text: "Hi, what are the visiting hours for the dorm?",
          at: at(1560),
        },
        {
          id: "msg-demo-3b",
          from: "landlord",
          text: "Visitors are welcome until 8 PM daily.",
          at: at(1500),
        },
      ],
    },
  ];
}

export function getThreads() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const initial = seed();
      localStorage.setItem(KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveThreads(threads) {
  localStorage.setItem(KEY, JSON.stringify(threads));
}
