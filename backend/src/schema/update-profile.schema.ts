import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  resume: z.string().url("Invalid resume URL").optional(),
  socialLinks: z.array(
      z.object({
        platform: z.string().min(2, "Platform name is required"),
        url: z.string().url("Invalid URL"),
      })
    ).optional(),
});

