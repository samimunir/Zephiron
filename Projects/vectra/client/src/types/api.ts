// export type User = {
//   id: string;
//   email: string;
//   name: string;
//   plan: "free" | "basic" | "pro";
//   subscriptionStatus?: string;
//   avatarUrl?: string | null;
// };

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;

  plan: "free" | "pro";
  subscriptionStatus?: string | null;
  currentPeriodEnd?: string | null;

  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;

  createdAt?: string;
}

// --- ADD to your existing types.ts ---

export interface Thread {
  _id: string;
  title: string;
  tags?: string[];
  applicationId?: string | null;
  createdBy: { _id: string; name: string; avatarUrl?: string | null };
  messageCount: number;
  lastMessageAt: string;
  pinned?: boolean;
  locked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionMessage {
  _id: string;
  threadId: string;
  authorId: { _id: string; name: string; avatarUrl?: string | null };
  body: string;
  editedAt?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
