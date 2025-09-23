import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppShell from "../components/AppShell";
import { useAuth } from "../context/AuthContext";
import {
  getThread,
  listMessages,
  postMessage,
  editMessageApi,
  deleteMessageApi,
} from "../lib/api";
import { type Thread, type DiscussionMessage } from "../types/api";

export default function ThreadPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [thread, setThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [body, setBody] = useState("");

  const canPost = useMemo(() => {
    const okPlan =
      user?.plan === "pro" &&
      ["active", "trialing"].includes(user?.subscriptionStatus || "");
    return !!okPlan && !thread?.locked;
  }, [user, thread?.locked]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const t = await getThread(id);
        setThread(t.thread);
        const { items, nextCursor } = await listMessages(id);
        setMessages(items);
        setNextCursor(nextCursor);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function loadMore() {
    if (!id || !nextCursor) return;
    const { items, nextCursor: n } = await listMessages(id, nextCursor);
    setMessages((prev) => [...prev, ...items]);
    setNextCursor(n);
  }

  async function submit() {
    if (!id || !body.trim()) return;
    setPosting(true);
    try {
      const { message } = await postMessage(id, body.trim());
      setMessages((prev) => [...prev, message]);
      setBody("");
      // optimistic bump of count/time is optional; thread meta will update on next visit
    } catch (e: any) {
      alert(e?.response?.data?.message || "Failed to post.");
    } finally {
      setPosting(false);
    }
  }

  return (
    <AppShell>
      {!thread && loading && (
        <div className="text-sm text-neutral-500">Loading…</div>
      )}
      {thread && (
        <>
          <div className="rounded-2xl border border-neutral-200/60 bg-white p-5 dark:border-neutral-800 dark:bg-[#0b1020]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{thread.title}</h2>
                <div className="mt-1 text-xs text-neutral-500">
                  Started by {thread.createdBy?.name ?? "Someone"} •{" "}
                  {new Date(thread.createdAt).toLocaleString()}
                </div>
                {thread.tags && thread.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {thread.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {thread.locked && (
                <span className="rounded-full border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700">
                  Locked
                </span>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="mt-4 grid gap-3">
            {messages.map((m) => (
              <MessageBubble
                key={m._id}
                m={m}
                mine={m.authorId?._id === user?.id}
              />
            ))}
            {nextCursor && (
              <button
                onClick={loadMore}
                className="mx-auto mt-2 w-fit rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
              >
                Load more
              </button>
            )}
          </div>

          {/* Composer */}
          <div className="mt-4 rounded-2xl border border-neutral-200/60 bg-white p-4 dark:border-neutral-800 dark:bg-[#0b1020]">
            {!canPost && (
              <div className="mb-2 flex items-center justify-between gap-2 rounded-xl border border-neutral-200/60 bg-neutral-50 px-3 py-2 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-300">
                Posting is a Pro feature.
                <Link
                  to="/settings"
                  className="text-brand-600 underline underline-offset-4"
                >
                  Upgrade
                </Link>
              </div>
            )}
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={!canPost}
              placeholder={
                thread?.locked ? "Thread is locked." : "Write a reply…"
              }
              className="min-h-[96px] w-full rounded-xl border border-neutral-300 bg-transparent p-3 text-sm dark:border-neutral-700"
            />
            <div className="mt-2 flex items-center justify-end">
              <button
                onClick={submit}
                disabled={!canPost || posting || !body.trim()}
                className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
              >
                {posting ? "Posting…" : "Post reply"}
              </button>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}

function MessageBubble({ m, mine }: { m: DiscussionMessage; mine: boolean }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(m.body);
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    try {
      const { message } = await editMessageApi(m._id, val.trim());
      setVal(message.body);
      setEditing(false);
    } catch (e: any) {
      alert(e?.response?.data?.message || "Failed to save.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteMessageApi(m._id);
      // quick UI: mark as deleted
      (m as any).deletedAt = new Date().toISOString();
    } catch (e: any) {
      alert(e?.response?.data?.message || "Failed to delete.");
    }
  }

  return (
    <div
      className={`rounded-2xl border p-4 ${
        mine
          ? "border-brand-300/60 dark:border-brand-700/60"
          : "border-neutral-200/60 dark:border-neutral-800"
      } bg-white dark:bg-[#0b1020]`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm">
          <div className="font-medium">{m.authorId?.name ?? "Someone"}</div>
          <div className="text-xs text-neutral-500">
            {new Date(m.createdAt).toLocaleString()}
          </div>
        </div>
        {mine && !m.deletedAt && (
          <div className="flex gap-2">
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="rounded-xl border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
              >
                Edit
              </button>
            )}
            {editing ? (
              <button
                onClick={save}
                disabled={busy}
                className="rounded-xl bg-brand-600 px-2 py-1 text-xs text-white hover:bg-brand-700 disabled:opacity-60"
              >
                Save
              </button>
            ) : (
              <button
                onClick={remove}
                className="rounded-xl border border-red-400 px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {m.deletedAt ? (
        <div className="mt-2 text-sm italic text-neutral-500">(deleted)</div>
      ) : editing ? (
        <textarea
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="mt-2 w-full rounded-xl border border-neutral-300 bg-transparent p-2 text-sm dark:border-neutral-700"
        />
      ) : (
        <div className="mt-2 whitespace-pre-wrap text-sm">{val}</div>
      )}
    </div>
  );
}
