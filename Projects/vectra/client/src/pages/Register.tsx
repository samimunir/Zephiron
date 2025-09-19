import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await register(email, password, name);
      nav("/", { replace: true });
    } catch (error: any) {
      setErr(
        error?.response?.data?.message ||
          "Unable to register. Try a different email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh grid place-items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-[#0b1020]"
      >
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-neutral-500">Join Vectra in seconds.</p>

        {err && (
          <div className="mt-4 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
            {err}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 grid gap-4">
          <label className="grid gap-1">
            <span className="text-sm">Name</span>
            <div className="flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 focus-within:border-brand-500 dark:border-neutral-700">
              <User className="h-4 w-4 text-neutral-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sami"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Email</span>
            <div className="flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 focus-within:border-brand-500 dark:border-neutral-700">
              <Mail className="h-4 w-4 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Password</span>
            <div className="flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 focus-within:border-brand-500 dark:border-neutral-700">
              <Lock className="h-4 w-4 text-neutral-400" />
              <input
                type={show ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                {show ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-neutral-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-brand-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
