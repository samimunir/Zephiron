import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Check,
  Sparkles,
  Shield,
  BarChart3,
  Rocket,
  Grid,
  Users,
  Zap,
} from "lucide-react";

export default function Landing() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  // Light parallax glow follows the cursor (no external libs)
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#070B1A] text-white selection:bg-brand-400/30 selection:text-white">
      {/* Aurora / background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-400/15 to-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-3xl" />
      </div>

      {/* NAV */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:py-6">
        <a href="/" className="group inline-flex items-center gap-2">
          <div className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500">
            <Sparkles className="h-5 w-5 text-white drop-shadow" />
            <div className="absolute inset-0 bg-white/10" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Vectra</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm text-white/80 hover:text-white transition"
          >
            Features
          </a>
          <a
            href="#how"
            className="text-sm text-white/80 hover:text-white transition"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="text-sm text-white/80 hover:text-white transition"
          >
            Pricing
          </a>
          <a
            href="#community"
            className="text-sm text-white/80 hover:text-white transition"
          >
            Community
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/login"
            className="rounded-xl px-3 py-2 text-sm text-white/80 hover:text-white transition"
          >
            Log in
          </a>
          <a
            href="/register"
            className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-[#070B1A] shadow transition hover:shadow-lg"
          >
            Get started
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative mx-auto mt-2 w-full max-w-6xl px-4">
        <div
          ref={glowRef}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6 md:p-10"
          style={
            {
              background:
                "radial-gradient(600px circle at var(--x,50%) var(--y,40%), rgba(56,189,248,0.10), transparent 40%), radial-gradient(600px circle at var(--x,40%) var(--y,60%), rgba(168,85,247,0.08), transparent 45%)",
            } as React.CSSProperties
          }
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur transition hover:bg-white/10">
              <Zap className="h-3.5 w-3.5" />
              now with Discussions & Stripe PRO
            </span>

            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Your career,{" "}
              <span className="bg-gradient-to-r from-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
                beautifully organized
              </span>
            </h1>
            <p className="mt-4 text-base text-white/80 md:text-lg">
              Track applications, collaborate in discussions, and upgrade
              seamlessly — all in one fast, elegant workspace.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3 text-sm font-medium text-white transition hover:opacity-95"
              >
                Start for free
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                Live demo
              </a>
            </div>

            {/* quick trust row */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-left sm:grid-cols-6">
              {[
                { label: "Fast", sub: "Vite + TS" },
                { label: "Secure", sub: "Auth & RBAC" },
                { label: "Payments", sub: "Stripe PRO" },
                { label: "Community", sub: "Discussions" },
                { label: "Metrics", sub: "KPIs" },
                { label: "Responsive", sub: "Mobile-first" },
              ].map((x) => (
                <div
                  key={x.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/70"
                >
                  <div className="font-medium text-white">{x.label}</div>
                  <div>{x.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16"
      >
        <div className="mb-6 md:mb-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Designed for momentum
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">
            Vectra blends speed, clarity, and community — so you can ship your
            next move.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Grid className="h-5 w-5" />}
            title="Applications"
            desc="Organize roles, statuses, and timelines with delightful controls."
          />
          <FeatureCard
            icon={<Users className="h-5 w-5" />}
            title="Discussions"
            desc="Ask questions, compare strategies, and level up with peers."
          />
          <FeatureCard
            icon={<Shield className="h-5 w-5" />}
            title="Secure by default"
            desc="Auth + protected APIs, rate limits, and schema validation."
          />
          <FeatureCard
            icon={<BarChart3 className="h-5 w-5" />}
            title="KPIs & Insights"
            desc="Understand conversion rates and where to focus next."
          />
          <FeatureCard
            icon={<Rocket className="h-5 w-5" />}
            title="Upgrade to PRO"
            desc="Stripe-powered checkout and billing to unlock more."
          />
          <FeatureCard
            icon={<Sparkles className="h-5 w-5" />}
            title="Polished UX"
            desc="Transitions, skeletons, and micro-interactions everywhere."
          />
        </div>
      </section>

      {/* SKELETONS DEMO (pretend-loading) */}
      <section className="mx-auto w-full max-w-6xl px-4 py-4 md:py-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Live data preview</h3>
            <span className="text-xs text-white/60">loading state</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16"
      >
        <h2 className="text-2xl font-semibold md:text-3xl">
          From idea to offer
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              n: 1,
              t: "Capture",
              d: "Add roles, city/country, skills & links in seconds.",
            },
            {
              n: 2,
              t: "Collaborate",
              d: "Discuss tactics, get feedback, and iterate fast.",
            },
            {
              n: 3,
              t: "Win",
              d: "Track KPIs, refine strategy, and land the offer.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.06]"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 blur-2xl transition group-hover:scale-125" />
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-sm font-semibold">
                  {s.n}
                </div>
                <div className="text-lg font-semibold">{s.t}</div>
              </div>
              <p className="mt-2 text-white/70">{s.d}</p>
              <div className="mt-3 inline-flex items-center gap-2 text-xs text-emerald-300">
                <Check className="h-4 w-4" />
                smooth transitions by default
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF / LOGOS */}
      <section
        id="community"
        className="mx-auto w-full max-w-6xl px-4 pb-10 md:pb-16"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-lg font-semibold">Loved by builders</h3>
              <p className="mt-1 max-w-xl text-white/70">
                Vectra is crafted for momentum — from first application to final
                signature.
              </p>
            </div>
            <div className="grid grid-cols-3 items-center gap-3 opacity-80 sm:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 rounded-lg border border-white/10 bg-white/5"
                  title="logo"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="pricing"
        className="mx-auto w-full max-w-6xl px-4 pb-14 md:pb-20"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-6 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(80rem_40rem_at_0%_100%,rgba(255,255,255,0.18),transparent)]" />
          <div className="relative z-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold leading-tight">
                Upgrade to PRO when you’re ready
              </h3>
              <p className="mt-1 text-white/90">
                Keep it free forever — or unlock more power with a single click.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/register"
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-[#070B1A] transition hover:opacity-95"
              >
                Get started free
              </a>
              <a
                href="/login"
                className="rounded-xl border border-white/50 bg-white/10 px-4 py-2.5 text-sm text-white backdrop-blur transition hover:bg-white/20"
              >
                I already have an account
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto w-full max-w-6xl px-4 pb-10">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row">
          <div>© {new Date().getFullYear()} Vectra. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-white transition" href="#">
              Privacy
            </a>
            <a className="hover:text-white transition" href="#">
              Terms
            </a>
            <a className="hover:text-white transition" href="#">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ————— Subcomponents ————— */

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.06]">
      <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 blur-2xl transition group-hover:scale-125" />
      <div className="relative z-10">
        <div className="inline-grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white/90">
          {icon}
        </div>
        <h4 className="mt-3 text-lg font-semibold">{title}</h4>
        <p className="mt-1 text-white/70">{desc}</p>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="h-4 w-1/3 animate-pulse rounded bg-white/10" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-white/10" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-6 w-20 animate-pulse rounded bg-white/10" />
        <div className="h-6 w-16 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );
}
