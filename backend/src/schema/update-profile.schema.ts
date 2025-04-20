import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string()
    .min(3, "Name must be least 3 character")
    .max(20, "Name must be at most 20 characters long")
    .regex(
      /^(?=.*[A-Za-z])[A-Za-z0-9._@-]+$/,
      "Name must have at least one letter and can include letters, numbers, underscores, periods, hyphens, and @."
    ),
  bio: z.string()
    .max(100, "Bio must be under 100 characters")
    .regex(
      /^[A-Za-z0-9\s.,!?'-]*$/,
      "Bio must only contain letters, numbers, spaces, and punctuation (e.g., period, comma, apostrophe, hyphen)."
    )
    .optional(),
  resume: z.string().url("Invalid resume URL").optional(),
  socialLinks: z.array(
    z.object({
      platform: z.string().min(2, "Platform name is required"),
      url: z.string().url("Invalid URL"),
    })
  ).optional(),
});

