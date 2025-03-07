import { HttpResponse } from "@/constants/response-message.constant";
import { z } from "zod";

const verifyEmailScheam = z.object({
   email : z.string().trim().email(HttpResponse.INVALID_EMAIL)
})

export default verifyEmailScheam;