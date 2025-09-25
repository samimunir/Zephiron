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

/* src/types/api.ts */

// export interface Application {
//   _id: string;
//   userId: string; // owner of the record

//   // core job info
//   company: string;
//   role?: string; // e.g. "Frontend Engineer"
//   title?: string; // optional alias, often same as role
//   location?: string; // "Remote", "NYC, USA"
//   status: string; // "applied" | "screening" | "interview" | "offer" | "rejected" | "accepted"

//   // optional fields
//   url?: string; // job posting link
//   postingUrl?: string; // alias
//   source?: string; // "LinkedIn", "Referral", etc.
//   notes?: string;

//   // timestamps
//   appliedAt?: string; // ISO date string
//   createdAt?: string; // ISO string
//   updatedAt?: string; // ISO string
// }

export interface Application {
  _id: string;
  userId: string;

  company: string;
  jobTitle: string;
  status: "applied" | "interview" | "offer" | "rejected" | "closed";
  workType?: "remote" | "in-person" | "hybrid";

  // New structured fields
  city: string;
  state?: string;
  country: string;

  postingUrl?: string;

  skills?: string[];
  tags?: string[];
  category?: string;

  notes?: string;
  appliedAt?: string;

  createdAt?: string;
  updatedAt?: string;
}
