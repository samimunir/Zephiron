import AppShell from "../components/AppShell";

export default function Dashboard() {
  return (
    <AppShell>
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
          <div className="text-sm text-neutral-500">Applications</div>
          <div className="mt-2 text-3xl font-bold">—</div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
          <div className="text-sm text-neutral-500">Interview</div>
          <div className="mt-2 text-3xl font-bold">—</div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
          <div className="text-sm text-neutral-500">Offer</div>
          <div className="mt-2 text-3xl font-bold">—</div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
          <div className="text-sm text-neutral-500">Rejected</div>
          <div className="mt-2 text-3xl font-bold">—</div>
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
        <div className="text-sm text-neutral-500 mb-3">Applications per day</div>
        <div className="h-56 grid place-items-center text-neutral-400">Chart placeholder</div>
      </div>
    </AppShell>
  );
}