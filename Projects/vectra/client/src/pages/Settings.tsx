import { useEffect, useMemo, useRef, useState } from "react";
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
  const [busyCancelEnd, setBusyCancelEnd] = useState(false);
  const [busyCancelNow, setBusyCancelNow] = useState(false);

  // Post-Checkout flow guards
  const didHandleReturn = useRef(false);
  const timerRef = useRef<number | null>(null);
  const [pendingUpgrade, setPendingUpgrade] = useState(false);

  // --- Helpers ---
  const statusLabel =
    user?.subscriptionStatus ??
    (user?.plan === "pro" ? "updating…" : "inactive");

  const formattedPeriodEnd = useMemo(() => {
    if (!user?.currentPeriodEnd) return null;
    try {
      const d = new Date(user.currentPeriodEnd);
      if (Number.isNaN(d.getTime())) return null;
      return d.toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return null;
    }
  }, [user?.currentPeriodEnd]);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

            {user?.plan === "pro" && formattedPeriodEnd && (
              <div className="mt-1 text-xs text-neutral-500">
                Billing period ends on{" "}
                <span className="font-medium">{formattedPeriodEnd}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Downgrade confirm modal (period end OR immediate) */}
      {showCancel && (
        <CancelModal
          onClose={() => {
            if (!busyCancelEnd && !busyCancelNow) setShowCancel(false);
          }}
          onCancelAtPeriodEnd={async () => {
            try {
              setBusyCancelEnd(true);
              const { mode } = await cancelSubscription(false); // period end
              await refreshUser(); // pulls currentPeriodEnd + status
              setShowCancel(false);
              setMsg(
                mode === "period_end"
                  ? "Your Pro plan will end at the end of the current billing period."
                  : "Subscription updated."
              );
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
              console.error(e?.response?.data || e);
              alert(
                e?.response?.data?.message || "Failed to schedule cancellation."
              );
            } finally {
              setBusyCancelEnd(false);
            }
          }}
          onCancelNow={async () => {
            try {
              setBusyCancelNow(true);
              const { mode } = await cancelSubscription(true); // immediate
              await refreshUser(); // should now show plan=free, status=canceled
              setShowCancel(false);
              setMsg(
                mode === "immediate"
                  ? "Your subscription has been canceled immediately. You are now on the Free plan."
                  : "Subscription updated."
              );
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
              console.error(e?.response?.data || e);
              alert(
                e?.response?.data?.message || "Failed to cancel immediately."
              );
            } finally {
              setBusyCancelNow(false);
            }
          }}
          busyEnd={busyCancelEnd}
          busyNow={busyCancelNow}
        />
      )}
    </AppShell>
  );
}

/* ---------- Cancel modal with two actions ---------- */
function CancelModal({
  onClose,
  onCancelAtPeriodEnd,
  onCancelNow,
  busyEnd,
  busyNow,
}: {
  onClose: () => void;
  onCancelAtPeriodEnd: () => void;
  onCancelNow: () => void;
  busyEnd: boolean;
  busyNow: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#0b1020]">
        <div className="text-lg font-semibold">Downgrade to Free</div>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          You can cancel your Pro subscription either immediately or at the end
          of your current billing period.
        </p>

        <div className="mt-4 grid gap-2">
          <button
            onClick={onCancelAtPeriodEnd}
            disabled={busyEnd || busyNow}
            className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            {busyEnd ? "Scheduling…" : "Cancel at period end"}
          </button>

          <button
            onClick={onCancelNow}
            disabled={busyEnd || busyNow}
            className="rounded-xl border border-red-400 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20"
          >
            {busyNow ? "Canceling…" : "Cancel immediately"}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={onClose}
            disabled={busyEnd || busyNow}
            className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
