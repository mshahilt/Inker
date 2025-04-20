import { HttpResponse } from "@/constants/response-message.constant";
import { z } from "zod";

export const updateVoteSchema = z
  .object({
    blogId: z.string().regex(/^[0-9a-fA-F]{24}$/, HttpResponse.INVALID_ID), 
  })
  .strict();

export type UpdateVoteRequestType = z.infer<typeof updateVoteSchema>;
