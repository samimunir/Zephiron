import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" }
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
  const { data } = await axios.post(`${API_BASE}/auth/refresh`, { token: refreshToken });
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