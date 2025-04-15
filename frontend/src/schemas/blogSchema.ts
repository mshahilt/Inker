import { z } from "zod";

export const blogEditorSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Post Title is required" })
    .max(250, { message: "Title must be at most 250 characters" }),
  content: z.string().min(1, { message: "Content is required" }),
});

