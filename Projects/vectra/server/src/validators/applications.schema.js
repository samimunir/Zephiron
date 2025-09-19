import { z } from "zod";

export const createApplicationSchema = z.object({
  body: z.object({
    jobTitle: z.string().min(1),
    company: z.string().min(1),
    workType: z.enum(["remote", "in-person", "hybrid"]).optional(),
    status: z.enum(["applied", "interview", "offer", "rejected", "closed"]).optional(),
    location: z.string().optional(),
    careerCategory: z.string().optional(),
    positionType: z.string().optional(),
    salary: z.object({
      amount: z.number().positive().optional(),
      currency: z.string().default("USD"),
      cadence: z.enum(["hourly", "yearly"]).optional()
    }).optional(),
    applicationUrl: z.string().url().optional(),
    description: z.string().optional(),
    notes: z.string().optional(),
    skills: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional()
  })
});

export const listApplicationsSchema = z.object({
  query: z.object({
    status: z.enum(["applied", "interview", "offer", "rejected", "closed"]).optional(),
    company: z.string().optional(),
    q: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(20),
    sort: z.string().optional()
  })
});

export const updateApplicationSchema = z.object({
  params: z.object({ id: z.string().length(24) }),
  body: z.object({
    jobTitle: z.string().optional(),
    company: z.string().optional(),
    workType: z.enum(["remote", "in-person", "hybrid"]).optional(),
    status: z.enum(["applied", "interview", "offer", "rejected", "closed"]).optional(),
    location: z.string().optional(),
    careerCategory: z.string().optional(),
    positionType: z.string().optional(),
    salary: z.object({
      amount: z.number().positive().optional(),
      currency: z.string(),
      cadence: z.enum(["hourly", "yearly"]).optional()
    }).optional(),
    applicationUrl: z.string().url().optional(),
    description: z.string().optional(),
    notes: z.string().optional(),
    skills: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional()
  })
});

export const removeApplicationSchema = z.object({
  params: z.object({ id: z.string().length(24) })
});