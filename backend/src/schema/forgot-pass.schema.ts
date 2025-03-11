import { HttpResponse } from "@/constants/response-message.constant";
import { z } from "zod";

export const verifyEmailSchema = z.object({
   email: z.string().trim().email(HttpResponse.INVALID_EMAIL)
})

