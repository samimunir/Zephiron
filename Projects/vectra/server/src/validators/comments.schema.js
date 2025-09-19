import { z } from "zod";

export const listCommentsSchema = z.object({
  query: z.object({
    discussionId: z.string().length(24),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(20)
  })
});

export const createCommentSchema = z.object({
  body: z.object({
    discussionId: z.string().length(24),
    body: z.string().min(1)
  })
});