import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export function Protected({ children }: { children: JSX.Element }) {
  const { user, ready } = useAuth();
  if (!ready) return <div className="p-6">loading…</div>;
  if (!user) return <Navigate to="/landing" replace />;
  return children;
}

export function ProOnly({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/landing" replace />;
  if (user.plan !== "pro") {
    return (
      <div className="p-6">
        This feature requires <span className="font-semibold">Pro</span>.
      </div>
    );
  }
  return children;
}
