// import { createContext, useContext, useEffect, useState } from "react";
// import { api, setTokens } from "../lib/api";
// import type { User } from "../types/api";

// type AuthCtx = {
//   user: User | null;
//   ready: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (email: string, password: string, name: string) => Promise<void>;
//   logout: () => Promise<void>;
//   refreshUser: () => Promise<void>; // <-- add
// };

// const Ctx = createContext<AuthCtx>({
//   user: null,
//   ready: false,
//   login: async () => {},
//   register: async () => {},
//   logout: async () => {},
//   refreshUser: () => Promise<void>; // <-- add
// });

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     const at = localStorage.getItem("vectra_at");
//     const rt = localStorage.getItem("vectra_rt");
//     if (at && rt) {
//       setTokens(at, rt);
//       api
//         .get("/auth/me")
//         .then((r) => setUser(r.data.user))
//         .catch(() => {
//           setTokens(null, null);
//           localStorage.removeItem("vectra_at");
//           localStorage.removeItem("vectra_rt");
//         })
//         .finally(() => setReady(true));
//     } else setReady(true);
//   }, []);

//   async function login(email: string, password: string) {
//     const { data } = await api.post("/auth/login", { email, password });
//     setUser(data.user);
//     setTokens(data.accessToken, data.refreshToken);
//     localStorage.setItem("vectra_at", data.accessToken);
//     localStorage.setItem("vectra_rt", data.refreshToken);
//   }
//   async function register(email: string, password: string, name: string) {
//     const { data } = await api.post("/auth/register", {
//       email,
//       password,
//       name,
//     });
//     setUser(data.user);
//     setTokens(data.accessToken, data.refreshToken);
//     localStorage.setItem("vectra_at", data.accessToken);
//     localStorage.setItem("vectra_rt", data.refreshToken);
//   }
//   async function logout() {
//     const rt = localStorage.getItem("vectra_rt");
//     if (rt) await api.post("/auth/logout", { token: rt }).catch(() => {});
//     setUser(null);
//     setTokens(null, null);
//     localStorage.removeItem("vectra_at");
//     localStorage.removeItem("vectra_rt");
//   }
//   async function refreshUser() {
//   try {
//     const { data } = await api.get("/auth/me");
//     setUser(data.user);
//   } catch {
//     // ignore
//   }
// }

//   return <Ctx.Provider value={{ user, ready, login, register, logout, refreshUser }}>{children}</Ctx.Provider>;

// }
// export const useAuth = () => useContext(Ctx);

import { createContext, useContext, useEffect, useState } from "react";
import { api, setTokens } from "../lib/api";
import type { User } from "../types/api";

type AuthCtx = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  ready: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  // Rehydrate tokens and fetch /auth/me on initial load
  useEffect(() => {
    const at = localStorage.getItem("vectra_at");
    const rt = localStorage.getItem("vectra_rt");
    if (at && rt) {
      setTokens(at, rt);
      api
        .get("/auth/me")
        .then((r) => setUser(r.data.user))
        .catch(() => {
          // tokens invalid → clear
          setTokens(null, null);
          localStorage.removeItem("vectra_at");
          localStorage.removeItem("vectra_rt");
        })
        .finally(() => setReady(true));
    } else {
      setReady(true);
    }
  }, []);

  async function login(email: string, password: string) {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data.user);
    setTokens(data.accessToken, data.refreshToken);
    localStorage.setItem("vectra_at", data.accessToken);
    localStorage.setItem("vectra_rt", data.refreshToken);
  }

  async function register(email: string, password: string, name: string) {
    const { data } = await api.post("/auth/register", {
      email,
      password,
      name,
    });
    setUser(data.user);
    setTokens(data.accessToken, data.refreshToken);
    localStorage.setItem("vectra_at", data.accessToken);
    localStorage.setItem("vectra_rt", data.refreshToken);
  }

  async function logout() {
    const rt = localStorage.getItem("vectra_rt");
    // Best-effort revoke on server; even if it fails, clear locally
    if (rt) {
      try {
        await api.post("/auth/logout", { token: rt });
      } catch {
        /* ignore */
      }
    }
    setUser(null);
    setTokens(null, null);
    localStorage.removeItem("vectra_at");
    localStorage.removeItem("vectra_rt");
  }

  async function refreshUser() {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
    } catch {
      // If this fails, keep current user; caller can decide next steps
    }
  }

  return (
    <Ctx.Provider value={{ user, ready, login, register, logout, refreshUser }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
