import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/AppShell";
import { fetchStatusCounts, fetchCreatedPerDay } from "../lib/api";

type Counts = {
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
  closed: number;
};

type Point = { date: string; count: number };

export default function Dashboard() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [series, setSeries] = useState<Array<Point>>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const [c, s] = await Promise.all([
          fetchStatusCounts(),
          fetchCreatedPerDay(30),
        ]);
        if (!alive) return;
        setCounts(c);
        setSeries(Array.isArray(s) ? s : []);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.response?.data?.message || "Failed to load dashboard.");
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  // Normalize counts so math is safe even while null/loading
  const norm: Counts = counts ?? {
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    closed: 0,
  };

  const total = useMemo(
    () =>
      norm.applied + norm.interview + norm.offer + norm.rejected + norm.closed,
    [norm]
  );

  const max = useMemo(() => {
    const m = series.reduce((acc, p) => (p.count > acc ? p.count : acc), 0);
    return Math.max(1, m);
  }, [series]);

  return (
    <AppShell>
      {err && (
        <div className="mb-4 rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
          {err}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-5">
        <KpiCard label="Total" value={loading ? "—" : total} />
        <KpiCard label="Applied" value={loading ? "—" : norm.applied} />
        <KpiCard label="Interview" value={loading ? "—" : norm.interview} />
        <KpiCard label="Offer" value={loading ? "—" : norm.offer} />
        <KpiCard label="Rejected" value={loading ? "—" : norm.rejected} />
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-500">
              Applications per day (last 30d)
            </div>
            {!loading && (
              <div className="text-xs text-neutral-400">Max: {max}</div>
            )}
          </div>
        </div>

        {/* lightweight inline bar chart (no deps) */}
        <div className="flex items-end gap-1 overflow-x-auto rounded-xl border border-neutral-200/60 p-3 dark:border-neutral-800">
          {loading ? (
            <div className="text-neutral-500">Loading…</div>
          ) : series.length === 0 ? (
            <div className="text-neutral-500">No data yet.</div>
          ) : (
            series.map((d) => (
              <div
                key={d.date}
                className="group flex w-6 flex-col items-center"
              >
                <div
                  className="w-full rounded-t bg-brand-600 transition-all duration-300 group-hover:bg-brand-700"
                  style={{ height: `${(d.count / max) * 140 + 6}px` }}
                  title={`${d.date}: ${d.count}`}
                />
                <div className="mt-1 text-[10px] text-neutral-400">
                  {d.date.slice(5)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}

function KpiCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-[#0b1020] border border-neutral-200/60 dark:border-neutral-800">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}
