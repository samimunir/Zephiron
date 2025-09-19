import { z } from "zod";

export const listDiscussionsSchema = z.object({
  query: z.object({
    company: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(20)
  })
});

export const createDiscussionSchema = z.object({
  body: z.object({
    company: z.string().min(1),
    position: z.string().optional(),
    title: z.string().min(1)
  })
});