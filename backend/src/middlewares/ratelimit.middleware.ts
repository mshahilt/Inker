import rateLimit from "express-rate-limit";
// import { createHttpError } from "@/utils"; 
import { HttpStatus } from "@/constants/status.constant";
import { HttpResponse } from "@/constants/response-message.constant";

export const voteRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Allow max 10 requests per minute per user
    headers: true,
    handler: (req, res) => {
        res.status(HttpStatus.TOO_MANY_REQUESTS).json({
            message: HttpResponse.TOO_MANY_REQUESTS,
        });
    },
});
