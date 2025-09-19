import { NavLink } from "react-router-dom";
import { Home, LayoutList, Settings, MessageSquare } from "lucide-react";

const link = "flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800";
const active = "bg-neutral-100 dark:bg-neutral-800 font-medium";

export default function SideNav() {
  return (
    <aside className="hidden md:block w-64 shrink-0">
      <nav className="sticky top-16 flex flex-col gap-1 p-3">
        <NavLink to="/" end className={({isActive}) => `${link} ${isActive ? active : ""}`}><Home className="h-4 w-4"/>Dashboard</NavLink>
        <NavLink to="/applications" className={({isActive}) => `${link} ${isActive ? active : ""}`}><LayoutList className="h-4 w-4"/>Applications</NavLink>
        <NavLink to="/discussions" className={({isActive}) => `${link} ${isActive ? active : ""}`}><MessageSquare className="h-4 w-4"/>Discussions</NavLink>
        <NavLink to="/settings" className={({isActive}) => `${link} ${isActive ? active : ""}`}><Settings className="h-4 w-4"/>Settings</NavLink>
      </nav>
    </aside>
  );
}