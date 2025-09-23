// import AppShell from "../components/AppShell";

// export default function Discussions() {
//   return (
//     <AppShell>
//       <h2 className="text-xl font-semibold">Discussions</h2>
//       <div className="mt-4 rounded-2xl bg-white p-4 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
//         <div className="text-neutral-500">Threads list placeholder</div>
//       </div>
//     </AppShell>
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import AppShell from "../components/AppShell";
// import { useAuth } from "../context/AuthContext";
// import { createThreadApi, listThreads } from "../lib/api";
// import { type Thread } from "../types/api";

// export default function DiscussionsPage() {
//   const { user } = useAuth();
//   const [params, setParams] = useSearchParams();

//   const navigate = useNavigate();

//   const [threads, setThreads] = useState<Thread[]>([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState<number>(Number(params.get("page") || 1));
//   const [limit] = useState<number>(20);
//   const [q, setQ] = useState(params.get("q") || "");
//   const [mine, setMine] = useState(params.get("mine") === "1");
//   const [loading, setLoading] = useState(false);
//   const [showNew, setShowNew] = useState(false);

//   const canPost = useMemo(() => {
//     const okPlan =
//       user?.plan === "pro" &&
//       ["active", "trialing"].includes(user?.subscriptionStatus || "");
//     return !!okPlan;
//   }, [user]);

//   // In Discussions.tsx
//   useEffect(() => {
//     const m = params.get("mine");
//     if (m && m !== "1") {
//       const next = new URLSearchParams(params);
//       next.delete("mine");
//       setParams(next, { replace: true });
//     }
//     // run once
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const {
//           items,
//           total,
//           page: p,
//         } = await listThreads({
//           q: q || undefined,
//           mine,
//           page,
//           limit,
//         });
//         setThreads(items);
//         setTotal(total);
//         setPage(p);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [q, mine, page, limit]);

//   useEffect(() => {
//     // If a stale URL like ?mine=false is present, normalize it away
//     const m = params.get("mine");
//     if (m && m !== "1") {
//       const next = new URLSearchParams(params);
//       next.delete("mine");
//       setParams(next, { replace: true });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   function applyFilters() {
//     const next = new URLSearchParams();
//     if (q) next.set("q", q);
//     if (mine) next.set("mine", "1");
//     next.set("page", String(1));
//     setParams(next);
//     setPage(1);
//   }

//   const totalPages = Math.max(1, Math.ceil(total / limit));

//   return (
//     <AppShell>
//       <div className="mb-3 flex items-center justify-between">
//         <h2 className="text-xl font-semibold">Discussions</h2>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setShowNew(true)}
//             disabled={!canPost}
//             className="rounded-xl bg-brand-600 px-3 py-2 text-sm text-white hover:bg-brand-700 disabled:opacity-60"
//           >
//             New thread
//           </button>
//           {!canPost && (
//             <Link
//               to="/settings"
//               className="text-sm text-brand-600 underline underline-offset-4"
//             >
//               Posting is Pro — Upgrade
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-neutral-200/60 bg-white p-3 dark:border-neutral-800 dark:bg-[#0b1020]">
//         <input
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//           placeholder="Search threads…"
//           className="w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700 md:w-64"
//         />
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={mine}
//             onChange={(e) => setMine(e.target.checked)}
//           />
//           My threads
//         </label>
//         <button
//           onClick={applyFilters}
//           className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//         >
//           Apply
//         </button>
//       </div>

//       {/* List */}
//       <div className="mt-4 grid gap-3">
//         {loading && <div className="text-sm text-neutral-500">Loading…</div>}
//         {!loading && threads.length === 0 && (
//           <div className="rounded-xl border border-neutral-200/60 bg-white p-6 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-[#0b1020] dark:text-neutral-300">
//             No threads yet.{" "}
//             {canPost ? "Start one!" : "Upgrade to start a discussion."}
//           </div>
//         )}
//         {threads.map((t) => (
//           <Link
//             key={t._id}
//             to={`/discussions/${t._id}`}
//             className="rounded-xl border border-neutral-200/60 bg-white p-4 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#0b1020] dark:hover:bg-neutral-900/50"
//           >
//             <div className="flex items-center justify-between">
//               <div className="font-medium">{t.title}</div>
//               <div className="text-xs text-neutral-500">
//                 {new Date(t.lastMessageAt).toLocaleString()}
//               </div>
//             </div>
//             <div className="mt-1 text-xs text-neutral-500">
//               {t.messageCount} message{t.messageCount === 1 ? "" : "s"} • by{" "}
//               {t.createdBy?.name ?? "Someone"}
//             </div>
//             {t.tags && t.tags.length > 0 && (
//               <div className="mt-2 flex flex-wrap gap-1">
//                 {t.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-700"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </Link>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-4 flex items-center justify-center gap-2">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page <= 1}
//             className="rounded-xl border border-neutral-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-neutral-700"
//           >
//             Prev
//           </button>
//           <div className="text-sm">
//             Page {page} / {totalPages}
//           </div>
//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page >= totalPages}
//             className="rounded-xl border border-neutral-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-neutral-700"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {showNew && (
//         <NewThreadModal
//           onClose={() => setShowNew(false)}
//           onCreated={(thread) => {
//             setShowNew(false);
//             navigate(`/discussions/${thread._id}`);
//           }}
//         />
//       )}
//     </AppShell>
//   );
// }

// function NewThreadModal({
//   onClose,
//   onCreated,
// }: {
//   onClose: () => void;
//   onCreated: (t: Thread) => void;
// }) {
//   const [title, setTitle] = useState("");
//   const [tags, setTags] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [err, setErr] = useState<string | null>(null);

//   return (
//     <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
//       <div className="w-full max-w-md rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#0b1020]">
//         <div className="text-lg font-semibold">New thread</div>
//         <p className="text-sm text-neutral-500">Start a new discussion.</p>

//         {err && (
//           <div className="mt-3 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
//             {err}
//           </div>
//         )}

//         <div className="mt-3 grid gap-3">
//           <label className="grid gap-1">
//             <span className="text-sm">Title</span>
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//               placeholder="e.g., Interview prep strategies"
//             />
//           </label>
//           <label className="grid gap-1">
//             <span className="text-sm">Tags (comma separated)</span>
//             <input
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//               className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//               placeholder="resume, interview, leetcode"
//             />
//           </label>
//         </div>

//         <div className="mt-4 flex items-center justify-end gap-2">
//           <button
//             onClick={onClose}
//             className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//           >
//             Cancel
//           </button>
//           <button
//             disabled={busy}
//             onClick={async () => {
//               setErr(null);
//               if (title.trim().length < 4) {
//                 setErr("Title must be at least 4 characters.");
//                 return;
//               }
//               setBusy(true);
//               try {
//                 const tagList = tags
//                   .split(",")
//                   .map((t) => t.trim())
//                   .filter(Boolean)
//                   .slice(0, 5);
//                 const { thread } = await createThreadApi({
//                   title: title.trim(),
//                   tags: tagList,
//                 });
//                 onCreated(thread);
//               } catch (e: any) {
//                 setErr(
//                   e?.response?.data?.message || "Failed to create thread."
//                 );
//               } finally {
//                 setBusy(false);
//               }
//             }}
//             className="rounded-xl bg-brand-600 px-3 py-2 text-sm text-white hover:bg-brand-700 disabled:opacity-60"
//           >
//             {busy ? "Creating…" : "Create thread"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AppShell from "../components/AppShell";
import { useAuth } from "../context/AuthContext";
import { createThreadApi, listThreads } from "../lib/api";
import { type Thread } from "../types/api";

export default function DiscussionsPage() {
  const { user, ready } = useAuth();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const [threads, setThreads] = useState<Thread[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState<number>(Number(params.get("page") || 1));
  const [limit] = useState<number>(20);
  const [q, setQ] = useState(params.get("q") || "");
  const [mine, setMine] = useState(params.get("mine") === "1");
  const [loading, setLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const canPost = useMemo(() => {
    if (!ready || !user) return false;
    const plan = (user.plan || "").toLowerCase();
    const status = (user.subscriptionStatus || "").toLowerCase();
    return plan === "pro" && (status === "active" || status === "trialing");
  }, [ready, user]);

  // Normalize any stale URL like ?mine=false → remove it
  useEffect(() => {
    const m = params.get("mine");
    if (m && m !== "1") {
      const next = new URLSearchParams(params);
      next.delete("mine");
      setParams(next, { replace: true });
      setMine(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch threads on filter/pagination change
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const { items, total } = await listThreads({
          q: q || undefined,
          mine,
          page,
          limit,
        });
        if (!alive) return;
        setThreads(items);
        setTotal(total);
        // IMPORTANT: do NOT setPage(...) here — it causes a loop
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [q, mine, page, limit]);

  function applyFilters() {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (mine) next.set("mine", "1");
    next.set("page", "1");
    setParams(next);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <AppShell>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Discussions</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNew(true)}
            disabled={!canPost}
            className="rounded-xl bg-brand-600 px-3 py-2 text-sm text-white hover:bg-brand-700 disabled:opacity-60"
          >
            New thread
          </button>
          {ready && !canPost && (
            <Link
              to="/settings"
              className="text-sm text-brand-600 underline underline-offset-4"
            >
              Posting is Pro — Upgrade
            </Link>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-neutral-200/60 bg-white p-3 dark:border-neutral-800 dark:bg-[#0b1020]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search threads…"
          className="w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700 md:w-64"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={mine}
            onChange={(e) => setMine(e.target.checked)}
          />
          My threads
        </label>
        <button
          onClick={applyFilters}
          className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Apply
        </button>
      </div>

      {/* List */}
      <div className="mt-4 grid gap-3">
        {loading && <div className="text-sm text-neutral-500">Loading…</div>}
        {!loading && threads.length === 0 && (
          <div className="rounded-xl border border-neutral-200/60 bg-white p-6 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-[#0b1020] dark:text-neutral-300">
            No threads yet.{" "}
            {canPost ? "Start one!" : "Upgrade to start a discussion."}
          </div>
        )}
        {threads.map((t) => (
          <Link
            key={t._id}
            to={`/discussions/${t._id}`}
            className="rounded-xl border border-neutral-200/60 bg-white p-4 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#0b1020] dark:hover:bg-neutral-900/50"
          >
            <div className="flex items-center justify-between">
              <div className="font-medium">{t.title}</div>
              <div className="text-xs text-neutral-500">
                {new Date(t.lastMessageAt).toLocaleString()}
              </div>
            </div>
            <div className="mt-1 text-xs text-neutral-500">
              {t.messageCount} message{t.messageCount === 1 ? "" : "s"} • by{" "}
              {t.createdBy?.name ?? "Someone"}
            </div>
            {t.tags && t.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-xl border border-neutral-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-neutral-700"
          >
            Prev
          </button>
          <div className="text-sm">
            Page {page} / {totalPages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-xl border border-neutral-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-neutral-700"
          >
            Next
          </button>
        </div>
      )}

      {showNew && (
        <NewThreadModal
          onClose={() => setShowNew(false)}
          onCreated={(thread) => {
            setShowNew(false);
            navigate(`/discussions/${thread._id}`);
          }}
        />
      )}
    </AppShell>
  );
}

function NewThreadModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (t: Thread) => void;
}) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#0b1020]">
        <div className="text-lg font-semibold">New thread</div>
        <p className="text-sm text-neutral-500">Start a new discussion.</p>

        {err && (
          <div className="mt-3 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
            {err}
          </div>
        )}

        <div className="mt-3 grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
              placeholder="e.g., Interview prep strategies"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Tags (comma separated)</span>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
              placeholder="resume, interview, leetcode"
            />
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            disabled={busy}
            onClick={async () => {
              setErr(null);
              if (title.trim().length < 4) {
                setErr("Title must be at least 4 characters.");
                return;
              }
              setBusy(true);
              try {
                const tagList = tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .slice(0, 5);
                const { thread } = await createThreadApi({
                  title: title.trim(),
                  tags: tagList,
                });
                onCreated(thread);
              } catch (e: any) {
                setErr(
                  e?.response?.data?.message || "Failed to create thread."
                );
              } finally {
                setBusy(false);
              }
            }}
            className="rounded-xl bg-brand-600 px-3 py-2 text-sm text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {busy ? "Creating…" : "Create thread"}
          </button>
        </div>
      </div>
    </div>
  );
}
