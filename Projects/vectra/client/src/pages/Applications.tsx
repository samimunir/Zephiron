// import { useEffect, useState } from "react";
// import AppShell from "../components/AppShell";
// import {
//   createApplication,
//   listApplications,
//   updateApplication,
//   deleteApplication,
//   type AppItem,
// } from "../lib/api";

// const STATUSES = [
//   "applied",
//   "interview",
//   "offer",
//   "rejected",
//   "closed",
// ] as const;
// const WORK_TYPES = ["remote", "in-person", "hybrid"] as const;

// export default function Applications() {
//   const [items, setItems] = useState<AppItem[]>([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [status, setStatus] = useState<string>("");
//   const [q, setQ] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);

//   const [openCreate, setOpenCreate] = useState(false);
//   const [editId, setEditId] = useState<string | null>(null);
//   const [deleteId, setDeleteId] = useState<string | null>(null);

//   async function load(p = page) {
//     setLoading(true);
//     setErr(null);
//     try {
//       const data = await listApplications({
//         page: p,
//         pageSize: 10,
//         sort: "-createdAt",
//         status: status || undefined,
//         q: q || undefined,
//       });
//       setItems(data.items);
//       setPage(data.page);
//       setPages(data.pages);
//     } catch (e: any) {
//       setErr(e?.response?.data?.message || "Failed to load applications.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     load(1); /* eslint-disable-next-line */
//   }, [status, q]);

//   return (
//     <AppShell>
//       {/* header */}
//       <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//         <h2 className="text-xl font-semibold">Applications</h2>
//         <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
//           <div className="flex items-center gap-2">
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
//             >
//               <option value="">All statuses</option>
//               {STATUSES.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>
//             <input
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               placeholder="Search…"
//               className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
//             />
//           </div>
//           <button
//             onClick={() => setOpenCreate(true)}
//             className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
//           >
//             New
//           </button>
//         </div>
//       </div>

//       {/* table */}
//       <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200/60 shadow-soft dark:border-neutral-800">
//         <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
//           <thead className="bg-neutral-50 dark:bg-neutral-900/40">
//             <tr className="text-left text-sm text-neutral-600 dark:text-neutral-300">
//               <th className="px-4 py-3">Job Title</th>
//               <th className="px-4 py-3">Company</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Created</th>
//               <th className="px-4 py-3"></th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
//             {loading ? (
//               <tr>
//                 <td className="px-4 py-6 text-neutral-500" colSpan={5}>
//                   Loading…
//                 </td>
//               </tr>
//             ) : err ? (
//               <tr>
//                 <td
//                   className="px-4 py-6 text-red-600 dark:text-red-300"
//                   colSpan={5}
//                 >
//                   {err}
//                 </td>
//               </tr>
//             ) : items.length === 0 ? (
//               <tr>
//                 <td className="px-4 py-6 text-neutral-500" colSpan={5}>
//                   No applications yet.
//                 </td>
//               </tr>
//             ) : (
//               items.map((it) => (
//                 <tr key={it._id} className="text-sm">
//                   <td className="px-4 py-3 font-medium">{it.jobTitle}</td>
//                   <td className="px-4 py-3">{it.company}</td>
//                   <td className="px-4 py-3">
//                     <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800">
//                       {it.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     {new Date(it.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex justify-end gap-2">
//                       <button
//                         onClick={() => setEditId(it._id)}
//                         className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => setDeleteId(it._id)}
//                         className="rounded-lg border border-red-400 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* pagination */}
//       <div className="mt-4 flex items-center justify-end gap-2">
//         <button
//           onClick={() => {
//             if (page > 1) {
//               setPage((p) => p - 1);
//               load(page - 1);
//             }
//           }}
//           disabled={page <= 1}
//           className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
//         >
//           Prev
//         </button>
//         <div className="text-sm text-neutral-500">
//           Page {page} of {pages}
//         </div>
//         <button
//           onClick={() => {
//             if (page < pages) {
//               setPage((p) => p + 1);
//               load(page + 1);
//             }
//           }}
//           disabled={page >= pages}
//           className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
//         >
//           Next
//         </button>
//       </div>

//       {openCreate && (
//         <CreateModal
//           onClose={() => setOpenCreate(false)}
//           onCreated={() => {
//             setOpenCreate(false);
//             load(1);
//           }}
//         />
//       )}
//       {editId && (
//         <EditModal
//           id={editId}
//           onClose={() => setEditId(null)}
//           onSaved={() => {
//             setEditId(null);
//             load(page);
//           }}
//         />
//       )}
//       {deleteId && (
//         <DeleteModal
//           id={deleteId}
//           onClose={() => setDeleteId(null)}
//           onDeleted={() => {
//             setDeleteId(null);
//             load(1);
//           }}
//         />
//       )}
//     </AppShell>
//   );
// }

// function CreateModal({
//   onClose,
//   onCreated,
// }: {
//   onClose: () => void;
//   onCreated: () => void;
// }) {
//   const [jobTitle, setJobTitle] = useState("");
//   const [company, setCompany] = useState("");
//   const [status, setStatus] = useState<
//     "applied" | "interview" | "offer" | "rejected" | "closed"
//   >("applied");
//   const [workType, setWorkType] = useState<
//     "remote" | "in-person" | "hybrid" | ""
//   >("");
//   const [notes, setNotes] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [err, setErr] = useState<string | null>(null);

//   async function submit(e: React.FormEvent) {
//     e.preventDefault();
//     setErr(null);
//     setBusy(true);
//     try {
//       await createApplication({
//         jobTitle,
//         company,
//         status,
//         workType: (workType || undefined) as any,
//         notes: notes || undefined,
//       });
//       onCreated();
//     } catch (e: any) {
//       setErr(e?.response?.data?.message || "Failed to create application.");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <Modal title="New Application" onClose={onClose}>
//       {err && <AlertError text={err} />}
//       <form onSubmit={submit} className="mt-4 grid gap-3">
//         <Field label="Job Title">
//           <input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             required
//             className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//           />
//         </Field>
//         <Field label="Company">
//           <input
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//             required
//             className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//           />
//         </Field>
//         <Field label="Status">
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value as any)}
//             className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//           >
//             {STATUSES.map((s) => (
//               <option key={s} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>
//         </Field>
//         <Field label="Work Type">
//           <select
//             value={workType}
//             onChange={(e) => setWorkType(e.target.value as any)}
//             className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//           >
//             <option value="">—</option>
//             {WORK_TYPES.map((w) => (
//               <option key={w} value={w}>
//                 {w}
//               </option>
//             ))}
//           </select>
//         </Field>
//         <Field label="Notes">
//           <textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             rows={3}
//             className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//           />
//         </Field>
//         <FormActions onClose={onClose} busy={busy} submitText="Create" />
//       </form>
//     </Modal>
//   );
// }

// function EditModal({
//   id,
//   onClose,
//   onSaved,
// }: {
//   id: string;
//   onClose: () => void;
//   onSaved: () => void;
// }) {
//   // For MVP, we allow quick edits without prefetching: user types new values.
//   const [payload, setPayload] = useState<
//     Partial<{
//       jobTitle: string;
//       company: string;
//       status: "applied" | "interview" | "offer" | "rejected" | "closed";
//       workType: "remote" | "in-person" | "hybrid";
//       location: string;
//       notes: string;
//     }>
//   >({});

//   const [busy, setBusy] = useState(false);
//   const [err, setErr] = useState<string | null>(null);

//   function patch<K extends keyof typeof payload>(k: K, v: (typeof payload)[K]) {
//     setPayload((p) => ({ ...p, [k]: v }));
//   }

//   async function submit(e: React.FormEvent) {
//     e.preventDefault();
//     setErr(null);
//     setBusy(true);
//     try {
//       if (Object.keys(payload).length === 0) {
//         onClose();
//         return;
//       }
//       await updateApplication(id, payload as any);
//       onSaved();
//     } catch (e: any) {
//       setErr(e?.response?.data?.message || "Failed to update application.");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <Modal title="Edit Application" onClose={onClose}>
//       {err && <AlertError text={err} />}
//       <form onSubmit={submit} className="mt-4 grid gap-3">
//         <Field label="Job Title">
//           <input
//             onChange={(e) => patch("jobTitle", e.target.value)}
//             placeholder="(unchanged)"
//             className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//           />
//         </Field>
//         <Field label="Company">
//           <input
//             onChange={(e) => patch("company", e.target.value)}
//             placeholder="(unchanged)"
//             className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//           />
//         </Field>
//         <Field label="Status">
//           <select
//             onChange={(e) => patch("status", e.target.value as any)}
//             defaultValue=""
//             className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//           >
//             <option value="">(unchanged)</option>
//             {STATUSES.map((s) => (
//               <option key={s} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>
//         </Field>
//         <Field label="Work Type">
//           <select
//             onChange={(e) => patch("workType", e.target.value as any)}
//             defaultValue=""
//             className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//           >
//             <option value="">(unchanged)</option>
//             {WORK_TYPES.map((w) => (
//               <option key={w} value={w}>
//                 {w}
//               </option>
//             ))}
//           </select>
//         </Field>
//         <Field label="Location">
//           <input
//             onChange={(e) => patch("location", e.target.value)}
//             placeholder="(unchanged)"
//             className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//           />
//         </Field>
//         <Field label="Notes">
//           <textarea
//             onChange={(e) => patch("notes", e.target.value)}
//             rows={3}
//             placeholder="(unchanged)"
//             className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//           />
//         </Field>
//         <FormActions onClose={onClose} busy={busy} submitText="Save changes" />
//       </form>
//     </Modal>
//   );
// }

// function DeleteModal({
//   id,
//   onClose,
//   onDeleted,
// }: {
//   id: string;
//   onClose: () => void;
//   onDeleted: () => void;
// }) {
//   const [busy, setBusy] = useState(false);
//   const [err, setErr] = useState<string | null>(null);

//   async function doDelete() {
//     setErr(null);
//     setBusy(true);
//     try {
//       await deleteApplication(id);
//       onDeleted();
//     } catch (e: any) {
//       setErr(e?.response?.data?.message || "Failed to delete application.");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <Modal title="Delete Application" onClose={onClose}>
//       {err && <AlertError text={err} />}
//       <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
//         This action cannot be undone.
//       </p>
//       <div className="mt-4 flex items-center justify-end gap-2">
//         <button
//           onClick={onClose}
//           className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={doDelete}
//           disabled={busy}
//           className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-60"
//         >
//           {busy ? "Deleting…" : "Delete"}
//         </button>
//       </div>
//     </Modal>
//   );
// }

// /* ---------- tiny UI building blocks ---------- */
// function Modal({
//   title,
//   onClose,
//   children,
// }: {
//   title: string;
//   onClose: () => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
//       <div className="w-full max-w-lg rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#0b1020]">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <button
//             onClick={onClose}
//             className="rounded-lg border border-neutral-300 px-2 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//           >
//             Close
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }
// function Field({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <label className="grid gap-1">
//       <span className="text-sm">{label}</span>
//       {children}
//     </label>
//   );
// }
// function FormActions({
//   onClose,
//   busy,
//   submitText,
// }: {
//   onClose: () => void;
//   busy: boolean;
//   submitText: string;
// }) {
//   return (
//     <div className="mt-2 flex items-center justify-end gap-2">
//       <button
//         type="button"
//         onClick={onClose}
//         className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//       >
//         Cancel
//       </button>
//       <button
//         disabled={busy}
//         className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
//       >
//         {busy ? "Saving…" : submitText}
//       </button>
//     </div>
//   );
// }
// function AlertError({ text }: { text: string }) {
//   return (
//     <div className="mt-4 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
//       {text}
//     </div>
//   );
// }

import { useCallback, useEffect, useMemo, useState } from "react";
import AppShell from "../components/AppShell";
import {
  listApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../lib/api";
import type { Application } from "../types/api";

type ViewMode = "table" | "grid";

export default function ApplicationsPage() {
  // view mode persisted in URL + localStorage
  const initialView =
    (new URLSearchParams(location.search).get("view") as ViewMode) ||
    ((localStorage.getItem("vectra_view_apps") as ViewMode) ?? "table");
  const [view, setView] = useState<ViewMode>(initialView);

  // filters/pagination
  const urlParams = new URLSearchParams(location.search);
  const [q, setQ] = useState<string>(urlParams.get("q") || "");
  const [status, setStatus] = useState<string>(urlParams.get("status") || "");
  const [page, setPage] = useState<number>(Number(urlParams.get("page") || 1));
  const [pageSize] = useState<number>(20);

  // data
  const [items, setItems] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // modal state
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);
  const [busySave, setBusySave] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 🔧 Explicit literal unions so children don't see just string[]
  const statuses = useMemo<Application["status"][]>(
    () => ["applied", "interview", "offer", "rejected", "closed"],
    []
  );
  const workTypes = useMemo<NonNullable<Application["workType"]>[]>(
    () => ["remote", "in-person", "hybrid"],
    []
  );
  const categories = useMemo<string[]>(
    () => [
      "technology",
      "design",
      "product",
      "data",
      "sales",
      "marketing",
      "operations",
      "finance",
      "hr",
      "other",
    ],
    []
  );

  // const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const fetchApps = useCallback(async () => {
    setLoading(true);
    try {
      const { items, total } = await listApplications({
        q: q || undefined,
        status: status || undefined,
        page,
        pageSize,
      });
      setItems(items as Application[]);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  }, [q, status, page, pageSize]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  // persist filters/view to URL + localStorage
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("view", view);
    params.set("page", String(page));
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    const next = `${location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", next);
    localStorage.setItem("vectra_view_apps", view);
  }, [view, page, q, status]);

  function applyFilters() {
    setPage(1);
  }

  function openCreate() {
    setEditing(null);
    setErr(null);
    setShowForm(true);
  }

  function openEdit(app: Application) {
    setEditing(app);
    setErr(null);
    setShowForm(true);
  }

  async function saveApp(input: Partial<Application>) {
    setBusySave(true);
    setErr(null);
    try {
      // 🔧 Cast to any to satisfy narrower helper typings
      if (editing) {
        await updateApplication(editing._id, input as any);
      } else {
        await createApplication(input as any);
      }
      setShowForm(false);
      setEditing(null);
      await fetchApps();
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Save failed.");
    } finally {
      setBusySave(false);
    }
  }

  async function removeApp(id: string) {
    if (!confirm("Delete this application?")) return;
    try {
      await deleteApplication(id);
      await fetchApps();
    } catch (e: any) {
      alert(e?.response?.data?.message || "Delete failed.");
    }
  }

  async function changeStatus(id: string, next: Application["status"]) {
    try {
      // Optimistic update (safe: still a union)
      setItems((prev) =>
        prev.map((a) =>
          a._id === id ? ({ ...a, status: next } as Application) : a
        )
      );
      await updateApplication(id, { status: next } as any);
    } catch (e: any) {
      alert(e?.response?.data?.message || "Update failed.");
      fetchApps();
    }
  }

  return (
    <AppShell>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Applications</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={openCreate}
            className="rounded-xl bg-brand-600 px-3 py-2 text-sm text-white hover:bg-brand-700"
          >
            New Application
          </button>
          <div className="flex overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-700">
            <button
              onClick={() => setView("table")}
              className={`px-3 py-2 text-sm ${
                view === "table" ? "bg-neutral-100 dark:bg-neutral-800" : ""
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-2 text-sm ${
                view === "grid" ? "bg-neutral-100 dark:bg-neutral-800" : ""
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-neutral-200/60 bg-white p-3 dark:border-neutral-800 dark:bg-[#0b1020]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by company, job title, city…"
          className="w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700 md:w-72"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={applyFilters}
          className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Apply
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {loading && <div className="text-sm text-neutral-500">Loading…</div>}

        {!loading && items.length === 0 && (
          <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-[#0b1020] dark:text-neutral-300">
            No applications found. Create one to get started.
          </div>
        )}

        {!loading && items.length > 0 && view === "table" && (
          <TableView
            apps={items}
            onEdit={openEdit}
            onDelete={removeApp}
            onStatus={changeStatus}
            statuses={statuses}
          />
        )}

        {!loading && items.length > 0 && view === "grid" && (
          <GridView
            apps={items}
            onEdit={openEdit}
            onDelete={removeApp}
            onStatus={changeStatus}
            statuses={statuses}
          />
        )}
      </div>

      {/* Pagination */}
      {total > pageSize && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-xl border border-neutral-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-neutral-700"
          >
            Prev
          </button>
          <div className="text-sm">
            Page {page} / {Math.ceil(total / pageSize)}
          </div>
          <button
            onClick={() =>
              setPage((p) => Math.min(Math.ceil(total / pageSize), p + 1))
            }
            disabled={page >= Math.ceil(total / pageSize)}
            className="rounded-xl border border-neutral-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-neutral-700"
          >
            Next
          </button>
        </div>
      )}

      {showForm && (
        <AppFormModal
          initial={editing || undefined}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={saveApp}
          busy={busySave}
          err={err}
          statuses={statuses}
          workTypes={workTypes}
          categories={categories}
        />
      )}
    </AppShell>
  );
}

/* ---------------- TABLE VIEW ---------------- */
function TableView({
  apps,
  onEdit,
  onDelete,
  onStatus,
  statuses,
}: {
  apps: Application[];
  onEdit: (a: Application) => void;
  onDelete: (id: string) => void;
  onStatus: (id: string, next: Application["status"]) => void;
  statuses: Application["status"][];
}) {
  return (
    <div className="overflow-auto rounded-2xl border border-neutral-200/60 bg-white dark:border-neutral-800 dark:bg-[#0b1020]">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
          <tr className="[&>th]:px-3 [&>th]:py-2">
            <th className="text-left">Company</th>
            <th className="text-left">Job Title</th>
            <th className="text-left">Status</th>
            <th className="text-left">Work type</th>
            <th className="text-left">Location</th>
            <th className="text-left">Applied</th>
            <th className="text-left">Tags</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((a) => (
            <tr
              key={a._id}
              className="border-t border-neutral-100 dark:border-neutral-800 [&>td]:px-3 [&>td]:py-2"
            >
              <td className="font-medium">{a.company}</td>
              <td>{a.jobTitle}</td>
              <td>
                <select
                  value={a.status}
                  onChange={(e) =>
                    onStatus(a._id, e.target.value as Application["status"])
                  }
                  className="rounded-lg border border-neutral-300 bg-transparent px-2 py-1 text-xs dark:border-neutral-700"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td>{a.workType || "-"}</td>
              <td>
                {a.city}, {a.country}
                {a.state ? ` • ${a.state}` : ""}
              </td>
              <td>
                {a.appliedAt ? new Date(a.appliedAt).toLocaleDateString() : "-"}
              </td>
              <td className="max-w-[220px]">
                <div className="flex flex-wrap gap-1">
                  {(a.tags || []).slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-neutral-300 px-2 py-0.5 text-xs dark:border-neutral-700"
                    >
                      #{t}
                    </span>
                  ))}
                  {(a.tags?.length || 0) > 4 && (
                    <span className="text-xs text-neutral-500">
                      +{a.tags!.length - 4}
                    </span>
                  )}
                </div>
              </td>
              <td className="text-right">
                <div className="inline-flex items-center gap-2">
                  <a
                    href={a.postingUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    Link
                  </a>
                  <button
                    onClick={() => onEdit(a)}
                    className="rounded-lg border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(a._id)}
                    className="rounded-lg border border-red-400 px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- GRID VIEW ---------------- */
function GridView({
  apps,
  onEdit,
  onDelete,
  onStatus,
  statuses,
}: {
  apps: Application[];
  onEdit: (a: Application) => void;
  onDelete: (id: string) => void;
  onStatus: (id: string, next: Application["status"]) => void;
  statuses: Application["status"][];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {apps.map((a) => (
        <div
          key={a._id}
          className="rounded-2xl border border-neutral-200/60 bg-white p-4 shadow-soft transition hover:shadow-md dark:border-neutral-800 dark:bg-[#0b1020]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-semibold">{a.company}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-300">
                {a.jobTitle}
              </div>
              <div className="mt-1 text-xs text-neutral-500">
                {a.city}, {a.country}
                {a.state ? ` • ${a.state}` : ""} • {a.workType || "—"}
              </div>
            </div>
            <a
              href={a.postingUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Link
            </a>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-neutral-200 p-2 dark:border-neutral-800">
              <div className="text-neutral-500">Status</div>
              <select
                value={a.status}
                onChange={(e) =>
                  onStatus(a._id, e.target.value as Application["status"])
                }
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-transparent px-2 py-1 text-xs dark:border-neutral-700"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-xl border border-neutral-200 p-2 dark:border-neutral-800">
              <div className="text-neutral-500">Applied</div>
              <div className="mt-1">
                {a.appliedAt ? new Date(a.appliedAt).toLocaleDateString() : "-"}
              </div>
            </div>
          </div>

          {a.skills?.length || a.tags?.length ? (
            <div className="mt-3 grid gap-2">
              {a.skills && a.skills.length > 0 && (
                <div className="rounded-xl border border-neutral-200 p-2 dark:border-neutral-800">
                  <div className="text-neutral-500">Skills</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {a.skills.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-neutral-300 px-2 py-0.5 text-xs dark:border-neutral-700"
                      >
                        {s}
                      </span>
                    ))}
                    {a.skills.length > 6 && (
                      <span className="text-xs text-neutral-500">
                        +{a.skills.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {a.tags && a.tags.length > 0 && (
                <div className="rounded-xl border border-neutral-200 p-2 dark:border-neutral-800">
                  <div className="text-neutral-500">Tags</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {a.tags.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-neutral-300 px-2 py-0.5 text-xs dark:border-neutral-700"
                      >
                        #{t}
                      </span>
                    ))}
                    {a.tags.length > 6 && (
                      <span className="text-xs text-neutral-500">
                        +{a.tags.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {a.category && (
            <div className="mt-3 rounded-xl border border-neutral-200 p-2 text-xs dark:border-neutral-800">
              <span className="text-neutral-500">Category</span>
              <span className="ml-2 rounded-full border border-neutral-300 px-2 py-0.5 dark:border-neutral-700">
                {a.category}
              </span>
            </div>
          )}

          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              onClick={() => onEdit(a)}
              className="rounded-lg border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(a._id)}
              className="rounded-lg border border-red-400 px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- FORM MODAL ---------------- */
function AppFormModal({
  initial,
  onClose,
  onSave,
  busy,
  err,
  statuses,
  workTypes,
  categories,
}: {
  initial?: Application;
  onClose: () => void;
  onSave: (input: Partial<Application>) => void;
  busy: boolean;
  err: string | null;
  statuses: Application["status"][];
  workTypes: NonNullable<Application["workType"]>[];
  categories: string[];
}) {
  const [company, setCompany] = useState(initial?.company || "");
  const [jobTitle, setJobTitle] = useState(initial?.jobTitle || "");
  const [status, setStatus] = useState<Application["status"]>(
    initial?.status || "applied"
  );
  const [workType, setWorkType] = useState<Application["workType"]>(
    initial?.workType || undefined
  );

  const [city, setCity] = useState(initial?.city || "");
  const [state, setState] = useState(initial?.state || "");
  const [country, setCountry] = useState(initial?.country || "");

  const [postingUrl, setPostingUrl] = useState(initial?.postingUrl || "");
  const [appliedAt, setAppliedAt] = useState(
    initial?.appliedAt
      ? new Date(initial.appliedAt).toISOString().slice(0, 10)
      : ""
  );
  const [notes, setNotes] = useState(initial?.notes || "");
  const [tags, setTags] = useState((initial?.tags || []).join(", "));
  const [skills, setSkills] = useState((initial?.skills || []).join(", "));
  const [category, setCategory] = useState(initial?.category || "");

  const canSave =
    company.trim().length > 0 &&
    jobTitle.trim().length > 0 &&
    city.trim().length > 0 &&
    country.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#0b1020]">
        <div className="text-lg font-semibold">
          {initial ? "Edit application" : "New application"}
        </div>
        <p className="text-sm text-neutral-500">
          Store key details for this role.
        </p>

        {err && (
          <div className="mt-3 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
            {err}
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm">Company *</span>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Job Title *</span>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Status</span>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as Application["status"])
              }
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Work type</span>
            <select
              value={workType || ""}
              onChange={(e) =>
                setWorkType(
                  (e.target.value || undefined) as Application["workType"]
                )
              }
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
            >
              <option value="">—</option>
              {workTypes.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-sm">City *</span>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Country *</span>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">State / Region</span>
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
            />
          </label>

          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm">Posting URL</span>
            <input
              value={postingUrl}
              onChange={(e) => setPostingUrl(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
              placeholder="https://…"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Applied on</span>
            <input
              type="date"
              value={appliedAt}
              onChange={(e) => setAppliedAt(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
            >
              <option value="">—</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm">Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[96px] rounded-xl border border-neutral-300 bg-transparent p-3 text-sm dark:border-neutral-700"
              placeholder="Interviewers, takeaways, follow-ups, compensation, etc."
            />
          </label>

          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm">Skills (comma separated)</span>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
              placeholder="React, Node.js, SQL"
            />
          </label>

          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm">Tags (comma separated)</span>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
              placeholder="frontend, referral, urgent"
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
            disabled={busy || !canSave}
            onClick={() =>
              onSave({
                company: company.trim(),
                jobTitle: jobTitle.trim(),
                status,
                workType,
                city: city.trim(),
                state: state.trim() || undefined,
                country: country.trim(),
                postingUrl: postingUrl.trim() || undefined,
                appliedAt: appliedAt
                  ? new Date(appliedAt).toISOString()
                  : undefined,
                notes: notes.trim() || undefined,
                tags: tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
                skills: skills
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
                category: category || undefined,
              })
            }
            className="rounded-xl bg-brand-600 px-3 py-2 text-sm text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
