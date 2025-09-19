import { motion } from "framer-motion";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <TopNav />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex gap-6 pt-6">
        <SideNav />
        <motion.main
          className="flex-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
