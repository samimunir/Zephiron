// import AppShell from "../components/AppShell";

// export default function Settings() {
//   return (
//     <AppShell>
//       <h2 className="text-xl font-semibold">Settings</h2>
//       <div className="mt-4 grid gap-6 md:grid-cols-2">
//         <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
//           <h3 className="font-semibold">Profile</h3>
//           <p className="text-sm text-neutral-500">Update your personal info.</p>
//         </div>
//         <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
//           <h3 className="font-semibold">Billing</h3>
//           <p className="text-sm text-neutral-500">Manage your subscription.</p>
//         </div>
//       </div>
//     </AppShell>
//   );
// }

// import { useState } from "react";
// import AppShell from "../components/AppShell";
// import { useAuth } from "../context/AuthContext";
// import { createCheckout, createPortal, updateMyProfile } from "../lib/api";

// export default function Settings() {
//   const { user, refreshUser } = useAuth();
//   const [name, setName] = useState(user?.name || "");
//   const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
//   const [busy, setBusy] = useState(false);
//   const [msg, setMsg] = useState<string | null>(null);
//   const [err, setErr] = useState<string | null>(null);

//   async function save(e: React.FormEvent) {
//     e.preventDefault();
//     setErr(null);
//     setMsg(null);
//     setBusy(true);
//     try {
//       await updateMyProfile({ name, avatarUrl: avatarUrl || null });
//       await refreshUser();
//       setMsg("Profile updated.");
//     } catch (e: any) {
//       setErr(e?.response?.data?.message || "Failed to update profile.");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <AppShell>
//       <h2 className="text-xl font-semibold">Settings</h2>

//       <div className="mt-4 grid gap-6 lg:grid-cols-2">
//         {/* Profile */}
//         <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-[#0b1020]">
//           <h3 className="font-semibold">Profile</h3>
//           <p className="text-sm text-neutral-500">Update your personal info.</p>

//           {err && (
//             <div className="mt-4 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
//               {err}
//             </div>
//           )}
//           {msg && (
//             <div className="mt-4 rounded-xl border border-emerald-300/50 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-900/20 dark:text-emerald-200">
//               {msg}
//             </div>
//           )}

//           <form onSubmit={save} className="mt-4 grid gap-3">
//             <label className="grid gap-1">
//               <span className="text-sm">Name</span>
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//               />
//             </label>
//             <label className="grid gap-1">
//               <span className="text-sm">Avatar URL</span>
//               <input
//                 value={avatarUrl || ""}
//                 onChange={(e) => setAvatarUrl(e.target.value)}
//                 placeholder="https://…"
//                 className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//               />
//             </label>

//             <div className="mt-2 flex items-center justify-end gap-2">
//               <button
//                 disabled={busy}
//                 className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
//               >
//                 {busy ? "Saving…" : "Save changes"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Billing (CTA only for now) */}
//         {/* <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-[#0b1020]">
//           <h3 className="font-semibold">Billing</h3>
//           <p className="text-sm text-neutral-500">Manage your subscription.</p>

//           <div className="mt-4 grid gap-2">
//             <button className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
//               Upgrade to Pro (wire later)
//             </button>
//             <button className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
//               Open billing portal (wire later)
//             </button>
//             <div className="text-xs text-neutral-500 mt-1">
//               Current plan: <span className="font-medium">{user?.plan}</span> (
//               {user?.subscriptionStatus ?? "inactive"})
//             </div>
//           </div>
//         </div> */}
//         <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-[#0b1020]">
//           <h3 className="font-semibold">Billing</h3>
//           <p className="text-sm text-neutral-500">Manage your subscription.</p>

//           <div className="mt-4 grid gap-2">
//             <button
//               onClick={async () => {
//                 try {
//                   // Use env or hard-code for now
//                   const priceId = import.meta.env.VITE_STRIPE_PRICE_PRO || "";
//                   const { url } = await createCheckout(priceId);
//                   window.location.href = url;
//                 } catch (e) {
//                   console.error(e);
//                   alert("Failed to start checkout.");
//                 }
//               }}
//               className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//             >
//               Upgrade to Pro
//             </button>

//             <button
//               onClick={async () => {
//                 try {
//                   const { url } = await createPortal();
//                   window.location.href = url;
//                 } catch (e) {
//                   console.error(e);
//                   alert("Failed to open billing portal.");
//                 }
//               }}
//               className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//             >
//               Open billing portal
//             </button>

//             <div className="text-xs text-neutral-500 mt-1">
//               Current plan: <span className="font-medium">{user?.plan}</span> (
//               {user?.subscriptionStatus ?? "inactive"})
//             </div>
//           </div>
//         </div>
//       </div>
//     </AppShell>
//   );
// }

// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import AppShell from "../components/AppShell";
// import { useAuth } from "../context/AuthContext";
// import { createCheckout, createPortal, updateMyProfile } from "../lib/api";

// export default function Settings() {
//   const { user, refreshUser } = useAuth();
//   const location = useLocation();

//   const [name, setName] = useState(user?.name || "");
//   const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
//   const [busy, setBusy] = useState(false);
//   const [msg, setMsg] = useState<string | null>(null);
//   const [err, setErr] = useState<string | null>(null);

//   // When returning from Stripe (?success=1 / ?canceled=1),
//   // give webhooks a moment, then refresh the user to pick up plan/status changes.
//   useEffect(() => {
//     const q = new URLSearchParams(location.search);
//     if (q.get("success") === "1") {
//       setMsg("Payment successful. Finalizing your upgrade…");
//       const t = setTimeout(() => {
//         refreshUser().then(() =>
//           setMsg("Your subscription has been refreshed.")
//         );
//       }, 1500);
//       return () => clearTimeout(t);
//     }
//     if (q.get("canceled") === "1") {
//       setMsg("Checkout canceled.");
//     }
//   }, [location.search, refreshUser]);

//   async function save(e: React.FormEvent) {
//     e.preventDefault();
//     setErr(null);
//     setMsg(null);
//     setBusy(true);
//     try {
//       await updateMyProfile({ name, avatarUrl: avatarUrl || null });
//       await refreshUser();
//       setMsg("Profile updated.");
//     } catch (e: any) {
//       setErr(e?.response?.data?.message || "Failed to update profile.");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <AppShell>
//       <h2 className="text-xl font-semibold">Settings</h2>

//       <div className="mt-4 grid gap-6 lg:grid-cols-2">
//         {/* Profile */}
//         <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-[#0b1020]">
//           <h3 className="font-semibold">Profile</h3>
//           <p className="text-sm text-neutral-500">Update your personal info.</p>

//           {err && (
//             <div className="mt-4 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
//               {err}
//             </div>
//           )}
//           {msg && (
//             <div className="mt-4 rounded-xl border border-emerald-300/50 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-900/20 dark:text-emerald-200">
//               {msg}
//             </div>
//           )}

//           <form onSubmit={save} className="mt-4 grid gap-3">
//             <label className="grid gap-1">
//               <span className="text-sm">Name</span>
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//               />
//             </label>

//             <label className="grid gap-1">
//               <span className="text-sm">Avatar URL</span>
//               <input
//                 value={avatarUrl || ""}
//                 onChange={(e) => setAvatarUrl(e.target.value)}
//                 placeholder="https://…"
//                 className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//               />
//             </label>

//             <div className="mt-2 flex items-center justify-end gap-2">
//               <button
//                 disabled={busy}
//                 className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
//               >
//                 {busy ? "Saving…" : "Save changes"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Billing */}
//         <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-[#0b1020]">
//           <h3 className="font-semibold">Billing</h3>
//           <p className="text-sm text-neutral-500">Manage your subscription.</p>

//           <div className="mt-4 grid gap-2">
//             <button
//               onClick={async () => {
//                 try {
//                   // Let the server pick its default price (STRIPE_PRICE_PRO)
//                   const { url } = await createCheckout();
//                   window.location.href = url;
//                 } catch (e: any) {
//                   console.error("checkout error", e?.response?.data || e);
//                   alert(
//                     e?.response?.data?.message || "Failed to start checkout."
//                   );
//                 }
//               }}
//               disabled={user?.plan === "pro"}
//               className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-800"
//             >
//               {user?.plan === "pro" ? "Already Pro" : "Upgrade to Pro"}
//             </button>

//             <button
//               onClick={async () => {
//                 try {
//                   const { url } = await createPortal();
//                   window.location.href = url;
//                 } catch (e: any) {
//                   console.error("portal error", e?.response?.data || e);
//                   alert(
//                     e?.response?.data?.message ||
//                       "Failed to open billing portal."
//                   );
//                 }
//               }}
//               className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//             >
//               Open billing portal
//             </button>

//             <div className="mt-1 text-xs text-neutral-500">
//               Current plan:{" "}
//               <span className="font-medium">{user?.plan ?? "free"}</span> (
//               {user?.subscriptionStatus ?? "inactive"})
//             </div>
//           </div>
//         </div>
//       </div>
//     </AppShell>
//   );
// }

// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import AppShell from "../components/AppShell";
// import { useAuth } from "../context/AuthContext";
// import { createCheckout, createPortal, updateMyProfile } from "../lib/api";

// export default function Settings() {
//   const { user, refreshUser } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [name, setName] = useState(user?.name || "");
//   const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
//   const [busy, setBusy] = useState(false);
//   const [msg, setMsg] = useState<string | null>(null);
//   const [err, setErr] = useState<string | null>(null);

//   // Guard to prevent StrictMode double-run; track pending upgrade flow
//   const didHandleReturn = useRef(false);
//   const timerRef = useRef<number | null>(null);
//   const [pendingUpgrade, setPendingUpgrade] = useState(false);

//   // Handle return from Stripe (success/canceled) once, with gentle delay
//   useEffect(() => {
//     const q = new URLSearchParams(location.search);
//     const success = q.get("success") === "1";
//     const canceled = q.get("canceled") === "1";

//     if (didHandleReturn.current) return;

//     if (success) {
//       didHandleReturn.current = true;
//       setMsg("Payment successful. Finalizing your upgrade…");

//       // Give Stripe a moment to deliver webhooks, then refresh user
//       timerRef.current = window.setTimeout(async () => {
//         await refreshUser();
//         setPendingUpgrade(true);
//         // Clean the URL to avoid retriggers
//         navigate("/settings", { replace: true });
//       }, 1200);
//     } else if (canceled) {
//       didHandleReturn.current = true;
//       setMsg("Checkout canceled.");
//       navigate("/settings", { replace: true });
//     }

//     return () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [location.search, navigate, refreshUser]);

//   // When user becomes PRO after refresh, show the final thank-you (and keep it)
//   useEffect(() => {
//     if (pendingUpgrade && user?.plan === "pro") {
//       setMsg("Thanks for upgrading! You are now a PRO plan member!");
//       setPendingUpgrade(false);
//     }
//   }, [pendingUpgrade, user?.plan]);

//   async function save(e: React.FormEvent) {
//     e.preventDefault();
//     setErr(null);
//     setMsg(null);
//     setBusy(true);
//     try {
//       await updateMyProfile({ name, avatarUrl: avatarUrl || null });
//       await refreshUser();
//       setMsg("Profile updated.");
//     } catch (e: any) {
//       setErr(e?.response?.data?.message || "Failed to update profile.");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <AppShell>
//       <h2 className="text-xl font-semibold">Settings</h2>

//       <div className="mt-4 grid gap-6 lg:grid-cols-2">
//         {/* Profile */}
//         <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-[#0b1020]">
//           <h3 className="font-semibold">Profile</h3>
//           <p className="text-sm text-neutral-500">Update your personal info.</p>

//           {err && (
//             <div className="mt-4 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
//               {err}
//             </div>
//           )}
//           {msg && (
//             <div className="mt-4 rounded-xl border border-emerald-300/50 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-900/20 dark:text-emerald-200">
//               {msg}
//             </div>
//           )}

//           <form onSubmit={save} className="mt-4 grid gap-3">
//             <label className="grid gap-1">
//               <span className="text-sm">Name</span>
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//               />
//             </label>

//             <label className="grid gap-1">
//               <span className="text-sm">Avatar URL</span>
//               <input
//                 value={avatarUrl || ""}
//                 onChange={(e) => setAvatarUrl(e.target.value)}
//                 placeholder="https://…"
//                 className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//               />
//             </label>

//             <div className="mt-2 flex items-center justify-end gap-2">
//               <button
//                 disabled={busy}
//                 className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
//               >
//                 {busy ? "Saving…" : "Save changes"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Billing */}
//         <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-[#0b1020]">
//           <h3 className="font-semibold">Billing</h3>
//           <p className="text-sm text-neutral-500">Manage your subscription.</p>

//           <div className="mt-4 grid gap-2">
//             <button
//               onClick={async () => {
//                 try {
//                   // Let the server use its STRIPE_PRICE_PRO default
//                   const { url } = await createCheckout();
//                   window.location.href = url;
//                 } catch (e: any) {
//                   console.error("checkout error", e?.response?.data || e);
//                   alert(
//                     e?.response?.data?.message || "Failed to start checkout."
//                   );
//                 }
//               }}
//               disabled={user?.plan === "pro"}
//               className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-800"
//             >
//               {user?.plan === "pro" ? "Already Pro" : "Upgrade to Pro"}
//             </button>

//             <button
//               onClick={async () => {
//                 try {
//                   const { url } = await createPortal();
//                   window.location.href = url;
//                 } catch (e: any) {
//                   console.error("portal error", e?.response?.data || e);
//                   alert(
//                     e?.response?.data?.message ||
//                       "Failed to open billing portal."
//                   );
//                 }
//               }}
//               className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//             >
//               Open billing portal
//             </button>

//             <div className="mt-1 text-xs text-neutral-500">
//               Current plan:{" "}
//               <span className="font-medium">{user?.plan ?? "free"}</span> (
//               {user?.subscriptionStatus ?? "inactive"})
//             </div>
//           </div>
//         </div>
//       </div>
//     </AppShell>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import { useAuth } from "../context/AuthContext";
import {
  createCheckout,
  createPortal,
  updateMyProfile,
  cancelSubscription,
} from "../lib/api";

export default function Settings() {
  const { user, refreshUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Profile form state
  const [name, setName] = useState(user?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [busy, setBusy] = useState(false);

  // UI messages
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Downgrade modal
  const [showCancel, setShowCancel] = useState(false);
  const [busyCancel, setBusyCancel] = useState(false);

  // Post-Checkout flow guards
  const didHandleReturn = useRef(false);
  const timerRef = useRef<number | null>(null);
  const [pendingUpgrade, setPendingUpgrade] = useState(false);

  // Handle return from Stripe (?success=1 / ?canceled=1) once; gentle delay; clean URL
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const success = q.get("success") === "1";
    const canceled = q.get("canceled") === "1";

    if (didHandleReturn.current) return;

    if (success) {
      didHandleReturn.current = true;
      setMsg("Payment successful. Finalizing your upgrade…");

      // Give webhooks a moment, then refresh user and clean URL
      timerRef.current = window.setTimeout(async () => {
        await refreshUser();
        setPendingUpgrade(true);
        navigate("/settings", { replace: true });
      }, 1200);
    } else if (canceled) {
      didHandleReturn.current = true;
      setMsg("Checkout canceled.");
      navigate("/settings", { replace: true });
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [location.search, navigate, refreshUser]);

  // When user becomes PRO after refresh, switch to final “thanks” message (keep it)
  useEffect(() => {
    if (pendingUpgrade && user?.plan === "pro") {
      setMsg("Thanks for upgrading! You are now a PRO plan member!");
      setPendingUpgrade(false);
    }
  }, [pendingUpgrade, user?.plan]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setBusy(true);
    try {
      await updateMyProfile({ name, avatarUrl: avatarUrl || null });
      await refreshUser();
      setMsg("Profile updated.");
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Failed to update profile.");
    } finally {
      setBusy(false);
    }
  }

  const statusLabel =
    user?.subscriptionStatus ??
    (user?.plan === "pro" ? "updating…" : "inactive");

  return (
    <AppShell>
      <h2 className="text-xl font-semibold">Settings</h2>

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        {/* Profile */}
        <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-[#0b1020]">
          <h3 className="font-semibold">Profile</h3>
          <p className="text-sm text-neutral-500">Update your personal info.</p>

          {err && (
            <div className="mt-4 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
              {err}
            </div>
          )}
          {msg && (
            <div className="mt-4 rounded-xl border border-emerald-300/50 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-900/20 dark:text-emerald-200">
              {msg}
            </div>
          )}

          <form onSubmit={save} className="mt-4 grid gap-3">
            <label className="grid gap-1">
              <span className="text-sm">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm">Avatar URL</span>
              <input
                value={avatarUrl || ""}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://…"
                className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
              />
            </label>

            <div className="mt-2 flex items-center justify-end gap-2">
              <button
                disabled={busy}
                className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
              >
                {busy ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Billing */}
        <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-[#0b1020]">
          <h3 className="font-semibold">Billing</h3>
          <p className="text-sm text-neutral-500">Manage your subscription.</p>

          <div className="mt-4 grid gap-2">
            <button
              onClick={async () => {
                try {
                  // Use server default price (STRIPE_PRICE_PRO)
                  const { url } = await createCheckout();
                  window.location.href = url;
                } catch (e: any) {
                  console.error("checkout error", e?.response?.data || e);
                  alert(
                    e?.response?.data?.message || "Failed to start checkout."
                  );
                }
              }}
              disabled={user?.plan === "pro"}
              className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              {user?.plan === "pro" ? "Already Pro" : "Upgrade to Pro"}
            </button>

            <button
              onClick={async () => {
                try {
                  const { url } = await createPortal();
                  window.location.href = url;
                } catch (e: any) {
                  console.error("portal error", e?.response?.data || e);
                  alert(
                    e?.response?.data?.message ||
                      "Failed to open billing portal."
                  );
                }
              }}
              className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Open billing portal
            </button>

            {user?.plan === "pro" && (
              <button
                onClick={() => setShowCancel(true)}
                className="rounded-xl border border-red-400 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20"
              >
                Downgrade to Free
              </button>
            )}

            <div className="mt-1 text-xs text-neutral-500">
              Current plan:{" "}
              <span className="font-medium">{user?.plan ?? "free"}</span> (
              {statusLabel})
            </div>
          </div>
        </div>
      </div>

      {/* Downgrade confirm modal */}
      {showCancel && (
        <Confirm
          title="Downgrade to Free"
          body="You'll keep Pro features until the end of the current billing period. Do you want to proceed?"
          confirmText={busyCancel ? "Processing…" : "Confirm downgrade"}
          onClose={() => (!busyCancel ? setShowCancel(false) : null)}
          onConfirm={async () => {
            try {
              setBusyCancel(true);
              const { mode } = await cancelSubscription(false); // cancel at period end
              await refreshUser();
              setShowCancel(false);
              setMsg(
                mode === "period_end"
                  ? "Your Pro plan will end at the end of the current billing period."
                  : "Subscription canceled."
              );
            } catch (e: any) {
              console.error(e?.response?.data || e);
              alert(e?.response?.data?.message || "Failed to cancel.");
            } finally {
              setBusyCancel(false);
            }
          }}
        />
      )}
    </AppShell>
  );
}

/* ---------- tiny confirm modal ---------- */
function Confirm({
  title,
  body,
  onConfirm,
  onClose,
  confirmText = "Confirm",
}: {
  title: string;
  body: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#0b1020]">
        <div className="text-lg font-semibold">{title}</div>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          {body}
        </p>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
