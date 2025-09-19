import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { Network, LogOut } from "lucide-react";

export default function TopNav() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-[#0b1020]/60 border-b border-neutral-200/60 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-brand-600" />
          <span className="font-semibold">Vectra</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user && (
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-3 py-2 text-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}