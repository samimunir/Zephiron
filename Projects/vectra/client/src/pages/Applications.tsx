// import AppShell from "../components/AppShell";

// export default function Applications() {
//   return (
//     <AppShell>
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold">Applications</h2>
//         <button className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
//           New
//         </button>
//       </div>
//       <div className="mt-4 rounded-2xl bg-white p-4 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
//         <div className="text-neutral-500">Table placeholder</div>
//       </div>
//     </AppShell>
//   );
// }

// import { useEffect, useState } from "react";
// import AppShell from "../components/AppShell";
// import { createApplication, listApplications, type AppItem } from "../lib/api";

// const STATUSES = [
//   "applied",
//   "interview",
//   "offer",
//   "rejected",
//   "closed",
// ] as const;

// export default function Applications() {
//   const [items, setItems] = useState<AppItem[]>([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [status, setStatus] = useState<string>("");
//   const [q, setQ] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);

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
//     load(1); /* eslint-disable-next-line react-hooks/exhaustive-deps */
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
//             onClick={() => setOpen(true)}
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
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
//             {loading ? (
//               <tr>
//                 <td className="px-4 py-6 text-neutral-500" colSpan={4}>
//                   Loading…
//                 </td>
//               </tr>
//             ) : err ? (
//               <tr>
//                 <td
//                   className="px-4 py-6 text-red-600 dark:text-red-300"
//                   colSpan={4}
//                 >
//                   {err}
//                 </td>
//               </tr>
//             ) : items.length === 0 ? (
//               <tr>
//                 <td className="px-4 py-6 text-neutral-500" colSpan={4}>
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

//       {/* create modal */}
//       {open && (
//         <CreateModal
//           onClose={() => setOpen(false)}
//           onCreated={() => {
//             setOpen(false);
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
//     <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
//       <div className="w-full max-w-lg rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#0b1020]">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold">New Application</h3>
//           <button
//             onClick={onClose}
//             className="rounded-lg border border-neutral-300 px-2 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//           >
//             Close
//           </button>
//         </div>

//         {err && (
//           <div className="mt-4 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
//             {err}
//           </div>
//         )}

//         <form onSubmit={submit} className="mt-4 grid gap-3">
//           <div className="grid gap-1">
//             <span className="text-sm">Job Title</span>
//             <input
//               value={jobTitle}
//               onChange={(e) => setJobTitle(e.target.value)}
//               required
//               className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//             />
//           </div>
//           <div className="grid gap-1">
//             <span className="text-sm">Company</span>
//             <input
//               value={company}
//               onChange={(e) => setCompany(e.target.value)}
//               required
//               className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//             />
//           </div>
//           <div className="grid gap-1">
//             <span className="text-sm">Status</span>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value as any)}
//               className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//             >
//               {STATUSES.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="grid gap-1">
//             <span className="text-sm">Work Type</span>
//             <select
//               value={workType}
//               onChange={(e) => setWorkType(e.target.value as any)}
//               className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//             >
//               <option value="">—</option>
//               <option value="remote">remote</option>
//               <option value="in-person">in-person</option>
//               <option value="hybrid">hybrid</option>
//             </select>
//           </div>
//           <div className="grid gap-1">
//             <span className="text-sm">Notes</span>
//             <textarea
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               rows={3}
//               className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
//             />
//           </div>

//           <div className="mt-2 flex items-center justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
//             >
//               Cancel
//             </button>
//             <button
//               disabled={busy}
//               className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
//             >
//               {busy ? "Saving…" : "Create"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import {
  createApplication,
  listApplications,
  updateApplication,
  deleteApplication,
  type AppItem,
} from "../lib/api";

const STATUSES = [
  "applied",
  "interview",
  "offer",
  "rejected",
  "closed",
] as const;
const WORK_TYPES = ["remote", "in-person", "hybrid"] as const;

export default function Applications() {
  const [items, setItems] = useState<AppItem[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [status, setStatus] = useState<string>("");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [openCreate, setOpenCreate] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load(p = page) {
    setLoading(true);
    setErr(null);
    try {
      const data = await listApplications({
        page: p,
        pageSize: 10,
        sort: "-createdAt",
        status: status || undefined,
        q: q || undefined,
      });
      setItems(data.items);
      setPage(data.page);
      setPages(data.pages);
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(1); /* eslint-disable-next-line */
  }, [status, q]);

  return (
    <AppShell>
      {/* header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold">Applications</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
            >
              <option value="">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
            />
          </div>
          <button
            onClick={() => setOpenCreate(true)}
            className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
          >
            New
          </button>
        </div>
      </div>

      {/* table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200/60 shadow-soft dark:border-neutral-800">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
          <thead className="bg-neutral-50 dark:bg-neutral-900/40">
            <tr className="text-left text-sm text-neutral-600 dark:text-neutral-300">
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-neutral-500" colSpan={5}>
                  Loading…
                </td>
              </tr>
            ) : err ? (
              <tr>
                <td
                  className="px-4 py-6 text-red-600 dark:text-red-300"
                  colSpan={5}
                >
                  {err}
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-neutral-500" colSpan={5}>
                  No applications yet.
                </td>
              </tr>
            ) : (
              items.map((it) => (
                <tr key={it._id} className="text-sm">
                  <td className="px-4 py-3 font-medium">{it.jobTitle}</td>
                  <td className="px-4 py-3">{it.company}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800">
                      {it.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(it.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditId(it._id)}
                        className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(it._id)}
                        className="rounded-lg border border-red-400 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          onClick={() => {
            if (page > 1) {
              setPage((p) => p - 1);
              load(page - 1);
            }
          }}
          disabled={page <= 1}
          className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Prev
        </button>
        <div className="text-sm text-neutral-500">
          Page {page} of {pages}
        </div>
        <button
          onClick={() => {
            if (page < pages) {
              setPage((p) => p + 1);
              load(page + 1);
            }
          }}
          disabled={page >= pages}
          className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Next
        </button>
      </div>

      {openCreate && (
        <CreateModal
          onClose={() => setOpenCreate(false)}
          onCreated={() => {
            setOpenCreate(false);
            load(1);
          }}
        />
      )}
      {editId && (
        <EditModal
          id={editId}
          onClose={() => setEditId(null)}
          onSaved={() => {
            setEditId(null);
            load(page);
          }}
        />
      )}
      {deleteId && (
        <DeleteModal
          id={deleteId}
          onClose={() => setDeleteId(null)}
          onDeleted={() => {
            setDeleteId(null);
            load(1);
          }}
        />
      )}
    </AppShell>
  );
}

function CreateModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<
    "applied" | "interview" | "offer" | "rejected" | "closed"
  >("applied");
  const [workType, setWorkType] = useState<
    "remote" | "in-person" | "hybrid" | ""
  >("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await createApplication({
        jobTitle,
        company,
        status,
        workType: (workType || undefined) as any,
        notes: notes || undefined,
      });
      onCreated();
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Failed to create application.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal title="New Application" onClose={onClose}>
      {err && <AlertError text={err} />}
      <form onSubmit={submit} className="mt-4 grid gap-3">
        <Field label="Job Title">
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
          />
        </Field>
        <Field label="Company">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
          />
        </Field>
        <Field label="Status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Work Type">
          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value as any)}
            className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
          >
            <option value="">—</option>
            {WORK_TYPES.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Notes">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
          />
        </Field>
        <FormActions onClose={onClose} busy={busy} submitText="Create" />
      </form>
    </Modal>
  );
}

function EditModal({
  id,
  onClose,
  onSaved,
}: {
  id: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  // For MVP, we allow quick edits without prefetching: user types new values.
  const [payload, setPayload] = useState<
    Partial<{
      jobTitle: string;
      company: string;
      status: "applied" | "interview" | "offer" | "rejected" | "closed";
      workType: "remote" | "in-person" | "hybrid";
      location: string;
      notes: string;
    }>
  >({});

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function patch<K extends keyof typeof payload>(k: K, v: (typeof payload)[K]) {
    setPayload((p) => ({ ...p, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (Object.keys(payload).length === 0) {
        onClose();
        return;
      }
      await updateApplication(id, payload as any);
      onSaved();
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Failed to update application.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal title="Edit Application" onClose={onClose}>
      {err && <AlertError text={err} />}
      <form onSubmit={submit} className="mt-4 grid gap-3">
        <Field label="Job Title">
          <input
            onChange={(e) => patch("jobTitle", e.target.value)}
            placeholder="(unchanged)"
            className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
          />
        </Field>
        <Field label="Company">
          <input
            onChange={(e) => patch("company", e.target.value)}
            placeholder="(unchanged)"
            className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
          />
        </Field>
        <Field label="Status">
          <select
            onChange={(e) => patch("status", e.target.value as any)}
            defaultValue=""
            className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
          >
            <option value="">(unchanged)</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Work Type">
          <select
            onChange={(e) => patch("workType", e.target.value as any)}
            defaultValue=""
            className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
          >
            <option value="">(unchanged)</option>
            {WORK_TYPES.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Location">
          <input
            onChange={(e) => patch("location", e.target.value)}
            placeholder="(unchanged)"
            className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
          />
        </Field>
        <Field label="Notes">
          <textarea
            onChange={(e) => patch("notes", e.target.value)}
            rows={3}
            placeholder="(unchanged)"
            className="rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
          />
        </Field>
        <FormActions onClose={onClose} busy={busy} submitText="Save changes" />
      </form>
    </Modal>
  );
}

function DeleteModal({
  id,
  onClose,
  onDeleted,
}: {
  id: string;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function doDelete() {
    setErr(null);
    setBusy(true);
    try {
      await deleteApplication(id);
      onDeleted();
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Failed to delete application.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal title="Delete Application" onClose={onClose}>
      {err && <AlertError text={err} />}
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        This action cannot be undone.
      </p>
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Cancel
        </button>
        <button
          onClick={doDelete}
          disabled={busy}
          className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-60"
        >
          {busy ? "Deleting…" : "Delete"}
        </button>
      </div>
    </Modal>
  );
}

/* ---------- tiny UI building blocks ---------- */
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#0b1020]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-300 px-2 py-1 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-sm">{label}</span>
      {children}
    </label>
  );
}
function FormActions({
  onClose,
  busy,
  submitText,
}: {
  onClose: () => void;
  busy: boolean;
  submitText: string;
}) {
  return (
    <div className="mt-2 flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={onClose}
        className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
      >
        Cancel
      </button>
      <button
        disabled={busy}
        className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {busy ? "Saving…" : submitText}
      </button>
    </div>
  );
}
function AlertError({ text }: { text: string }) {
  return (
    <div className="mt-4 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
      {text}
    </div>
  );
}
