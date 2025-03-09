import { HttpResponse } from "@/constants/response-message.constant";
import { z } from "zod";
export const verifyOtpSchema = z
  .object({
    email: z.string().email(HttpResponse.INVALID_EMAIL),
    otp: z
      .number()
      .int("OTP must be an integer")
      .min(100000, "OTP must be 6 digits long")
      .max(999999, "OTP must be 6 digits long"),
  })
  .strict();
