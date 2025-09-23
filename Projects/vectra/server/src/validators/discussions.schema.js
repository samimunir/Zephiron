import { z } from "zod";

export const createThreadSchema = z.object({
  body: z.object({
    title: z.string().min(4).max(140),
    tags: z.array(z.string().min(1).max(20)).max(5).optional(),
    applicationId: z.string().trim().min(1).optional(),
  }),
});

export const listThreadsSchema = z.object({
  query: z.object({
    q: z.string().trim().optional(),
    tag: z.string().trim().optional(),
    applicationId: z.string().trim().optional(),
    mine: z.enum(["0", "1"]).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  }),
});

export const getThreadSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const updateThreadSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z
    .object({
      title: z.string().min(4).max(140).optional(),
      tags: z.array(z.string().min(1).max(20)).max(5).optional(),
      pinned: z.boolean().optional(),
      locked: z.boolean().optional(),
    })
    .refine((d) => Object.keys(d).length > 0, {
      message: "No fields to update",
    }),
});

export const deleteThreadSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const listMessagesSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  query: z.object({
    cursor: z.string().optional(), // message _id for forward pagination
    limit: z.coerce.number().int().min(1).max(100).default(30),
  }),
});

export const createMessageSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ body: z.string().min(1).max(4000) }),
});

export const editMessageSchema = z.object({
  params: z.object({ messageId: z.string().min(1) }),
  body: z.object({ body: z.string().min(1).max(4000) }),
});

export const deleteMessageSchema = z.object({
  params: z.object({ messageId: z.string().min(1) }),
});
