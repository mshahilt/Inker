import { z } from "zod";
import { HttpResponse } from "@/constants/response-message.constant";
import { Types } from "mongoose";

const objectIdString = z.string().refine(
  (val) => {
    try {
      new Types.ObjectId(val);
      return true;
    } catch (error) {
      return false;
    }
  },
  {
    message: "Invalid ObjectId format",
  }
);

export const createCommentSchema = z
  .object({
    blogId: objectIdString.refine(
      (val) => !!val,
      HttpResponse.REQUIRED_BLOG_ID
    ),
    content: z
      .string()
      .min(1, HttpResponse.REQUIRED_COMMENT)
      .max(2000, "Comment must not exceed 2000 characters"),
    parentId: objectIdString.nullable().optional(),
  })
  .strict();

export type CreateCommentRequestType = z.infer<typeof createCommentSchema>;

export const paginationQuerySchema = z
  .object({
    page: z
      .string()
      .transform(Number)
      .pipe(z.number().int().positive("Page must be a positive integer"))
      .optional()
      .default("1"),
    limit: z
      .string()
      .transform(Number)
      .pipe(z.number().int().positive("Limit must be a positive integer"))
      .optional()
      .default("5"),
  })
  .strict();
