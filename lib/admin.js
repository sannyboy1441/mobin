import { SUBSCRIPTION_QUOTA } from "./constants.js";

export { SUBSCRIPTION_QUOTA };

/**
 * @typedef {"free" | "subscription"} LandlordPlan
 * @typedef {"active" | "suspended"} LandlordStatus
 * @typedef {"pending" | "approved" | "declined"} RequestStatus
 * @typedef {"paid" | "pending"} PaymentStatus
 * @typedef {object} DemoLandlord
 * @property {string} id
 * @property {string} name
 * @property {string} contact
 * @property {number} properties
 * @property {LandlordPlan} plan
 * @property {LandlordStatus} status
 * @property {string} joinedAt
 * @property {boolean} [isYou]
 * @typedef {object} DemoTenant
 * @property {string} id
 * @property {string} name
 * @property {string} contact
 * @property {string} lookingFor
 * @property {string} joinedAt
 * @typedef {object} DemoProperty
 * @property {string} id
 * @property {string} title
 * @property {string} owner
 * @property {string} type
 * @property {string} rate
 * @property {"published" | "draft"} status
 * @typedef {object} PlanRequest
 * @property {string} id
 * @property {string} landlord
 * @property {string} landlordId
 * @property {string} contact
 * @property {number} postsNeeded
 * @property {string} message
 * @property {string} date
 * @property {RequestStatus} status
 * @typedef {object} DemoPayment
 * @property {string} id
 * @property {string} landlord
 * @property {string} plan
 * @property {string} amount
 * @property {string} period
 * @property {PaymentStatus} status
 * @typedef {object} AdminProfile
 * @property {string} name
 * @property {string} contact
 */

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      const initial = fallback();
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return fallback();
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLandlords() {
  return read("mobin-admin-landlords", () => [
    {
      id: "landlord-you",
      name: "C. Navarro",
      contact: "0912 345 6789",
      properties: 2,
      plan: "free",
      status: "active",
      joinedAt: "Oct 2026",
      isYou: true,
    },
    {
      id: "landlord-2",
      name: "R. Villanueva",
      contact: "0917 111 2233",
      properties: 6,
      plan: "subscription",
      status: "active",
      joinedAt: "Sep 2026",
    },
    {
      id: "landlord-3",
      name: "K. Aquino",
      contact: "0920 444 5566",
      properties: 2,
      plan: "free",
      status: "active",
      joinedAt: "Oct 2026",
    },
    {
      id: "landlord-4",
      name: "J. Lim",
      contact: "0933 777 8899",
      properties: 1,
      plan: "free",
      status: "suspended",
      joinedAt: "Aug 2026",
    },
  ]);
}

export function saveLandlords(items) {
  write("mobin-admin-landlords", items);
}

export function getTenants() {
  return read("mobin-admin-tenants", () => [
    {
      id: "tenant-1",
      name: "J. Ramos",
      contact: "0912 000 1111",
      lookingFor: "Solo room near the university",
      joinedAt: "Oct 2026",
    },
    {
      id: "tenant-2",
      name: "A. Dela Cruz",
      contact: "0913 222 3333",
      lookingFor: "Studio under ₱10,000",
      joinedAt: "Oct 2026",
    },
    {
      id: "tenant-3",
      name: "M. Santos",
      contact: "0914 444 5555",
      lookingFor: "Dorm bedspace, short term",
      joinedAt: "Sep 2026",
    },
    {
      id: "tenant-4",
      name: "P. Reyes",
      contact: "0915 666 7777",
      lookingFor: "Bedspace near offices",
      joinedAt: "Sep 2026",
    },
  ]);
}

export function getAdminProperties() {
  return read("mobin-admin-properties", () => [
    {
      id: "ap-1",
      title: "Sunrise Boarding House",
      owner: "C. Navarro",
      type: "Boarding house",
      rate: "₱5,500",
      status: "published",
    },
    {
      id: "ap-2",
      title: "Maple Studio Unit",
      owner: "C. Navarro",
      type: "Apartment",
      rate: "₱9,500",
      status: "draft",
    },
    {
      id: "ap-3",
      title: "Villanueva Dormitory",
      owner: "R. Villanueva",
      type: "Dormitory",
      rate: "₱2,500",
      status: "published",
    },
    {
      id: "ap-4",
      title: "Villanueva Apartments",
      owner: "R. Villanueva",
      type: "Apartment",
      rate: "₱8,000",
      status: "published",
    },
    {
      id: "ap-5",
      title: "Aquino Bedspaces",
      owner: "K. Aquino",
      type: "Dormitory",
      rate: "₱2,000",
      status: "published",
    },
    {
      id: "ap-6",
      title: "Lim Boarding House",
      owner: "J. Lim",
      type: "Boarding house",
      rate: "₱3,500",
      status: "draft",
    },
  ]);
}

export function saveAdminProperties(items) {
  write("mobin-admin-properties", items);
}

export function getRequests() {
  return read("mobin-admin-requests", () => [
    {
      id: "req-1",
      landlord: "C. Navarro",
      landlordId: "landlord-you",
      contact: "0912 345 6789",
      postsNeeded: 5,
      message: "Managing three more buildings next month.",
      date: "Oct 2026",
      status: "pending",
    },
    {
      id: "req-2",
      landlord: "K. Aquino",
      landlordId: "landlord-3",
      contact: "0920 444 5566",
      postsNeeded: 4,
      message: "Adding a second dormitory soon.",
      date: "Oct 2026",
      status: "pending",
    },
    {
      id: "req-3",
      landlord: "R. Villanueva",
      landlordId: "landlord-2",
      contact: "0917 111 2233",
      postsNeeded: 8,
      message: "Portfolio grew this quarter.",
      date: "Sep 2026",
      status: "approved",
    },
  ]);
}

export function getPayments() {
  return read("mobin-admin-payments", () => [
    {
      id: "pay-1",
      landlord: "R. Villanueva",
      plan: "Subscription",
      amount: "₱499",
      period: "Oct 2026",
      status: "paid",
    },
    {
      id: "pay-2",
      landlord: "C. Navarro",
      plan: "Subscription",
      amount: "₱499",
      period: "Oct 2026",
      status: "pending",
    },
    {
      id: "pay-3",
      landlord: "R. Villanueva",
      plan: "Subscription",
      amount: "₱499",
      period: "Sep 2026",
      status: "paid",
    },
  ]);
}

export function savePayments(items) {
  write("mobin-admin-payments", items);
}

export function getAdminProfile() {
  return read("mobin-admin-profile", () => ({
    name: "Super Admin",
    contact: "team@mobin.example",
  }));
}

export function saveAdminProfile(profile) {
  write("mobin-admin-profile", profile);
}
