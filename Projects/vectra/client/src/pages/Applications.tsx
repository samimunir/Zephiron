import AppShell from "../components/AppShell";

export default function Applications() {
  return (
    <AppShell>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Applications</h2>
        <button className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">New</button>
      </div>
      <div className="mt-4 rounded-2xl bg-white p-4 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
        <div className="text-neutral-500">Table placeholder</div>
      </div>
    </AppShell>
  );
}