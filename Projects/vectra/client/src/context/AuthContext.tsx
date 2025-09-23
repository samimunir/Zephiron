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

// import { createContext, useContext, useEffect, useState } from "react";
// import { api, setTokens } from "../lib/api";
// import type { User } from "../types/api";

// type AuthCtx = {
//   user: User | null;
//   ready: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (email: string, password: string, name: string) => Promise<void>;
//   logout: () => Promise<void>;
//   refreshUser: () => Promise<void>;
// };

// const Ctx = createContext<AuthCtx>({
//   user: null,
//   ready: false,
//   login: async () => {},
//   register: async () => {},
//   logout: async () => {},
//   refreshUser: async () => {},
// });

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [ready, setReady] = useState(false);

//   // Rehydrate tokens and fetch /auth/me on initial load
//   useEffect(() => {
//     const at = localStorage.getItem("vectra_at");
//     const rt = localStorage.getItem("vectra_rt");
//     if (at && rt) {
//       setTokens(at, rt);
//       api
//         .get("/auth/me")
//         .then((r) => setUser(r.data.user))
//         .catch(() => {
//           // tokens invalid → clear
//           setTokens(null, null);
//           localStorage.removeItem("vectra_at");
//           localStorage.removeItem("vectra_rt");
//         })
//         .finally(() => setReady(true));
//     } else {
//       setReady(true);
//     }
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
//     // Best-effort revoke on server; even if it fails, clear locally
//     if (rt) {
//       try {
//         await api.post("/auth/logout", { token: rt });
//       } catch {
//         /* ignore */
//       }
//     }
//     setUser(null);
//     setTokens(null, null);
//     localStorage.removeItem("vectra_at");
//     localStorage.removeItem("vectra_rt");
//   }

//   async function refreshUser() {
//     try {
//       const { data } = await api.get("/auth/me");
//       setUser(data.user);
//     } catch {
//       // If this fails, keep current user; caller can decide next steps
//     }
//   }

//   return (
//     <Ctx.Provider value={{ user, ready, login, register, logout, refreshUser }}>
//       {children}
//     </Ctx.Provider>
//   );
// }

// export const useAuth = () => useContext(Ctx);

//

import { createContext, useContext, useEffect, useState } from "react";
import { api, setTokens } from "../lib/api";
import { type User } from "../types/api";

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

  // async function login(email: string, password: string) {
  //   const { data } = await api.post("/auth/login", { email, password });
  //   setUser(data.user);
  //   setTokens(data.accessToken, data.refreshToken);
  //   localStorage.setItem("vectra_at", data.accessToken);
  //   localStorage.setItem("vectra_rt", data.refreshToken);
  // }

  async function login(email: string, password: string) {
    const { data } = await api.post("/auth/login", { email, password });

    // Accept common shapes
    const at = data.accessToken ?? data.token ?? data.access_token ?? null;
    const rt = data.refreshToken ?? data.refresh_token ?? null;

    if (!at || !rt) {
      console.error("Login response:", data);
      throw new Error(
        "Login did not return tokens. Check server response keys."
      );
    }

    setUser(data.user);

    // Install tokens on axios and persist
    setTokens(at, rt);
    localStorage.setItem("vectra_at", at);
    localStorage.setItem("vectra_rt", rt);

    // Sanity: immediately verify we can hit /auth/me with the header
    await api.get("/auth/me"); // will 401 if header missing/bad
  }

  // IMPORTANT: keep this signature (email, password, name) to match your call site
  async function register(email: string, password: string, name: string) {
    // If your server returns tokens on register:
    const { data } = await api.post("/auth/register", {
      email,
      password,
      name,
    });
    // Set auth just like login:
    setUser(data.user);
    setTokens(data.accessToken, data.refreshToken);
    localStorage.setItem("vectra_at", data.accessToken);
    localStorage.setItem("vectra_rt", data.refreshToken);

    // If your server does NOT return tokens on register, comment the above
    // and instead follow up with a login:
    // await login(email, password);
  }

  async function logout() {
    const rt = localStorage.getItem("vectra_rt");
    // Best-effort revoke; even if it fails, clear locally
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
      // keep current user; caller can handle if needed
    }
  }

  return (
    <Ctx.Provider value={{ user, ready, login, register, logout, refreshUser }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
