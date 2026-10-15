import { FREE_QUOTA, SUBSCRIPTION_QUOTA } from "./constants.js";

export { FREE_QUOTA, SUBSCRIPTION_QUOTA };

/**
 * @typedef {"published" | "draft"} PropertyStatus
 * @typedef {object} Property
 * @property {string} id
 * @property {string} title
 * @property {string} type
 * @property {string} monthlyRate
 * @property {string} address
 * @property {string} description
 * @property {PropertyStatus} status
 * @property {string} createdAt
 * @typedef {object} MyPlan
 * @property {"Free" | "Subscription"} plan
 * @property {number} quota
 * @typedef {object} Profile
 * @property {string} name
 * @property {string} contact
 */

const PLAN_KEY = "mobin-myplan";

export function getMyPlan() {
  try {
    const raw = localStorage.getItem(PLAN_KEY);
    if (!raw) return { plan: "Free", quota: FREE_QUOTA };
    const parsed = JSON.parse(raw);
    return {
      plan: parsed.plan === "Subscription" ? "Subscription" : "Free",
      quota:
        typeof parsed.quota === "number" && parsed.quota > 0
          ? parsed.quota
          : FREE_QUOTA,
    };
  } catch {
    return { plan: "Free", quota: FREE_QUOTA };
  }
}

export function saveMyPlan(plan) {
  localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

const KEY = "mobin-properties";

export function getProperties() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveProperties(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

const PROFILE_KEY = "mobin-profile";

export function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return { name: "", contact: "" };
    const parsed = JSON.parse(raw);
    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      contact: typeof parsed.contact === "string" ? parsed.contact : "",
    };
  } catch {
    return { name: "", contact: "" };
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
