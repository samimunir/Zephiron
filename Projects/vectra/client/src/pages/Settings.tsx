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

import { useState } from "react";
import AppShell from "../components/AppShell";
import { useAuth } from "../context/AuthContext";
import { updateMyProfile } from "../lib/api";

export default function Settings() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

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

        {/* Billing (CTA only for now) */}
        <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-[#0b1020]">
          <h3 className="font-semibold">Billing</h3>
          <p className="text-sm text-neutral-500">Manage your subscription.</p>

          <div className="mt-4 grid gap-2">
            <button className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
              Upgrade to Pro (wire later)
            </button>
            <button className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
              Open billing portal (wire later)
            </button>
            <div className="text-xs text-neutral-500 mt-1">
              Current plan: <span className="font-medium">{user?.plan}</span> (
              {user?.subscriptionStatus ?? "inactive"})
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
