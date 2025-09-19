import AppShell from "../components/AppShell";

export default function Settings() {
  return (
    <AppShell>
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
          <h3 className="font-semibold">Profile</h3>
          <p className="text-sm text-neutral-500">Update your personal info.</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
          <h3 className="font-semibold">Billing</h3>
          <p className="text-sm text-neutral-500">Manage your subscription.</p>
        </div>
      </div>
    </AppShell>
  );
}