export type User = {
  id: string; email: string; name: string;
  plan: "free" | "basic" | "pro";
  subscriptionStatus?: string;
  avatarUrl?: string | null;
};