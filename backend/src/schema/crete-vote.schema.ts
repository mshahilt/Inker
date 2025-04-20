import { HttpResponse } from "@/constants/response-message.constant";
import { z } from "zod";

export const createVoteSchema = z
  .object({
    blogId: z.string().regex(/^[0-9a-fA-F]{24}$/, HttpResponse.INVALID_ID), 
    voteType: z.enum(["upvote", "downvote"], {
      errorMap: () => ({ message: "Vote type must be either 'upvote' or 'downvote'" }),
    }),
  })
  .strict();

export type CreateVoteRequestType = z.infer<typeof createVoteSchema>;
