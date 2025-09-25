import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const glowRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await register(email, password, name);
      nav("/dashboard", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className="relative min-h-dvh bg-[#070B1A] text-white">
      {/* aurora */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-400/15 to-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-3xl" />
      </div>

      {/* header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:py-6">
        <a href="/" className="group inline-flex items-center gap-2">
          <div className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500">
            <Sparkles className="h-5 w-5 text-white drop-shadow" />
            <div className="absolute inset-0 bg-white/10" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Vectra</span>
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 backdrop-blur transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </a>
      </header>

      {/* card */}
      <main className="mx-auto grid w-full max-w-6xl place-items-center px-4 pb-16">
        <motion.div
          ref={glowRef}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6 shadow-2xl"
          style={
            {
              background:
                "radial-gradient(600px circle at var(--x,50%) var(--y,40%), rgba(56,189,248,0.10), transparent 40%), radial-gradient(600px circle at var(--x,40%) var(--y,60%), rgba(168,85,247,0.08), transparent 45%)",
            } as React.CSSProperties
          }
        >
          <div className="relative z-10">
            <h1 className="text-2xl font-semibold">Create your account</h1>
            <p className="mt-1 text-sm text-white/70">
              Join Vectra in seconds.
            </p>

            {err && (
              <div className="mt-4 rounded-xl border border-red-300/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {err}
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-5 grid gap-4">
              <label className="grid gap-1">
                <span className="text-sm">Name</span>
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 focus-within:border-sky-400/60">
                  <User className="h-4 w-4 text-white/50" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sami"
                    className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-1">
                <span className="text-sm">Email</span>
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 focus-within:border-sky-400/60">
                  <Mail className="h-4 w-4 text-white/50" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-1">
                <span className="text-sm">Password</span>
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 focus-within:border-sky-400/60">
                  <Lock className="h-4 w-4 text-white/50" />
                  <input
                    type={show ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="text-white/60 transition hover:text-white"
                    aria-label={show ? "Hide password" : "Show password"}
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
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 font-medium text-white shadow transition hover:opacity-95 disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-transparent" />
                    Creating…
                  </span>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            <p className="mt-4 text-sm text-white/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-sky-300 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/10 to-transparent" />
        </motion.div>
      </main>
    </div>
  );
}
