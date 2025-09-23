import axios from "axios";
import type { DiscussionMessage, Thread } from "../types/api";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

let accessToken: string | null = null;
let refreshToken: string | null = null;

export function setTokens(at: string | null, rt: string | null) {
  accessToken = at;
  refreshToken = rt;
}

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

let refreshing = false;
let pending: Array<() => void> = [];

async function refreshTokens() {
  if (!refreshToken) throw new Error("No refresh token");
  const { data } = await axios.post(`${API_BASE}/auth/refresh`, {
    token: refreshToken,
  });
  accessToken = data.accessToken;
  refreshToken = data.refreshToken;
  return data;
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      if (refreshing) {
        await new Promise<void>((resolve) => pending.push(resolve));
      } else {
        refreshing = true;
        try {
          await refreshTokens();
          pending.forEach((r) => r());
          pending = [];
        } catch (_e) {
          throw err; // hard logout handled by caller
        } finally {
          refreshing = false;
        }
      }
      original._retry = true;
      original.headers.Authorization = `Bearer ${accessToken}`;
      return api(original);
    }
    throw err;
  }
);

export async function fetchStatusCounts() {
  const { data } = await api.get("/applications/stats/status-counts");
  return data as {
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
    closed: number;
  };
}

export async function fetchCreatedPerDay(days = 30) {
  const { data } = await api.get("/applications/stats/created-per-day", {
    params: { days },
  });
  return data as Array<{ date: string; count: number }>;
}

export type AppItem = {
  _id: string;
  jobTitle: string;
  company: string;
  status: "applied" | "interview" | "offer" | "rejected" | "closed";
  createdAt: string;
};

export type AppList = {
  items: AppItem[];
  page: number;
  pageSize: number;
  total: number;
  pages: number;
};

export async function listApplications(params: {
  status?: string;
  q?: string;
  company?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
}) {
  const { data } = await api.get("/applications", { params });
  return data as AppList;
}

export async function createApplication(payload: {
  jobTitle: string;
  company: string;
  workType?: "remote" | "in-person" | "hybrid";
  status?: "applied" | "interview" | "offer" | "rejected" | "closed";
  location?: string;
  notes?: string;
  tags?: string[];
}) {
  const { data } = await api.post("/applications", payload);
  return data as AppItem;
}

// ----- Applications: update + delete -----
export async function updateApplication(
  id: string,
  payload: Partial<{
    jobTitle: string;
    company: string;
    status: "applied" | "interview" | "offer" | "rejected" | "closed";
    workType: "remote" | "in-person" | "hybrid";
    location: string;
    notes: string;
  }>
) {
  const { data } = await api.patch(`/applications/${id}`, payload);
  return data as AppItem;
}

export async function deleteApplication(id: string) {
  await api.delete(`/applications/${id}`);
}

export async function getMyProfile() {
  const { data } = await api.get("/users/me");
  return data.user as import("../types/api").User;
}

export async function updateMyProfile(payload: {
  name?: string;
  avatarUrl?: string | null;
}) {
  const { data } = await api.patch("/users/me", payload);
  return data.user as import("../types/api").User;
}

// export async function createCheckout(priceId: string) {
//   const { data } = await api.post("/billing/checkout-session", { priceId });
//   return data as { url: string };
// }

export async function createCheckout(priceId?: string) {
  const payload = priceId ? { priceId } : {}; // server will fall back to STRIPE_PRICE_PRO
  const { data } = await api.post("/billing/checkout-session", payload);
  return data as { url: string };
}

export async function createPortal() {
  const { data } = await api.post("/billing/portal");
  return data as { url: string };
}

export async function cancelSubscription(immediate = false) {
  const { data } = await api.post("/billing/cancel", { immediate });
  return data as { ok: boolean; mode: "immediate" | "period_end" };
}

// --- ADD these helpers to your existing api.ts ---

// Threads
// export async function listThreads(params: {
//   q?: string;
//   tag?: string;
//   applicationId?: string;
//   page?: number;
//   limit?: number;
//   mine?: boolean;
// }) {
//   const { data } = await api.get("/discussions", { params });
//   return data as {
//     page: number;
//     limit: number;
//     total: number;
//     items: Thread[];
//   };
// }

// export async function listThreads(params: {
//   q?: string;
//   tag?: string;
//   applicationId?: string;
//   page?: number;
//   limit?: number;
//   mine?: boolean;
// }) {
//   const qp: Record<string, any> = {};
//   if (params.q) qp.q = params.q;
//   if (params.tag) qp.tag = params.tag;
//   if (params.applicationId) qp.applicationId = params.applicationId;
//   if (typeof params.page === "number") qp.page = params.page;
//   if (typeof params.limit === "number") qp.limit = params.limit;
//   if (params.mine) qp.mine = "1"; // ← only include when true

//   const { data } = await api.get("/discussions", { params: qp });
//   return data as {
//     page: number;
//     limit: number;
//     total: number;
//     items: Thread[];
//   };
// }

export async function listThreads(params: {
  q?: string;
  tag?: string;
  applicationId?: string;
  page?: number;
  limit?: number;
  mine?: boolean;
}) {
  const qp: Record<string, any> = {};
  if (params.q) qp.q = params.q;
  if (params.tag) qp.tag = params.tag;
  if (params.applicationId) qp.applicationId = params.applicationId;
  if (typeof params.page === "number") qp.page = params.page;
  if (typeof params.limit === "number") qp.limit = params.limit;
  if (params.mine) qp.mine = "1"; // 👈 don't send mine=false

  const { data } = await api.get("/discussions", { params: qp });
  return data as {
    page: number;
    limit: number;
    total: number;
    items: Thread[];
  };
}

export async function getThread(id: string) {
  const { data } = await api.get(`/discussions/${id}`);
  return data as { thread: Thread };
}

export async function createThreadApi(input: {
  title: string;
  tags?: string[];
  applicationId?: string;
}) {
  const { data } = await api.post("/discussions", input);
  return data as { thread: Thread };
}

// Messages
export async function listMessages(
  threadId: string,
  cursor?: string,
  limit = 30
) {
  const { data } = await api.get(`/discussions/${threadId}/messages`, {
    params: { cursor, limit },
  });
  return data as { items: DiscussionMessage[]; nextCursor: string | null };
}

export async function postMessage(threadId: string, body: string) {
  const { data } = await api.post(`/discussions/${threadId}/messages`, {
    body,
  });
  return data as { message: DiscussionMessage };
}

export async function editMessageApi(messageId: string, body: string) {
  const { data } = await api.patch(`/messages/${messageId}`, { body });
  return data as { message: DiscussionMessage };
}

export async function deleteMessageApi(messageId: string) {
  const { data } = await api.delete(`/messages/${messageId}`);
  return data as { ok: boolean };
}
