import { z } from "zod";

/** Common enums */
const Status = z.enum(["applied", "interview", "offer", "rejected", "closed"]);
const WorkType = z.enum(["remote", "in-person", "hybrid"]);

/** Create */
export const createApplicationSchema = z.object({
  body: z.object({
    company: z.string().min(1),
    jobTitle: z.string().min(1),

    status: Status.optional(),
    workType: WorkType.optional(),

    // NEW structured location
    city: z.string().min(1),
    state: z.string().optional(),
    country: z.string().min(1),

    // NEW job posting url
    postingUrl: z.string().url().optional(),

    // NEW extras
    skills: z.array(z.string().trim()).max(50).optional(),
    tags: z.array(z.string().trim()).max(50).optional(),
    category: z
      .enum([
        "technology",
        "design",
        "product",
        "data",
        "sales",
        "marketing",
        "operations",
        "finance",
        "hr",
        "other",
      ])
      .optional(),

    notes: z.string().max(5000).optional(),
    // Accept either an ISO string or Date (Mongoose can cast)
    appliedAt: z.union([z.string().datetime(), z.date()]).optional(),
  }),
});

/** List (query filters) */
export const listApplicationsSchema = z.object({
  query: z.object({
    q: z.string().trim().optional(),
    status: Status.optional(),
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(20),
    sort: z.string().optional(),
  }),
});

/** Update (partial of create) */
export const updateApplicationSchema = z.object({
  params: z.object({ id: z.string().length(24) }),
  body: createApplicationSchema.shape.body.partial(),
});

/** Remove */
export const removeApplicationSchema = z.object({
  params: z.object({ id: z.string().length(24) }),
});
