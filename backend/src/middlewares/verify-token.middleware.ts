import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/utils/jwt.util";
import { HttpResponse } from "@/constants/response-message.constant";
import { HttpStatus } from "@/constants/status.constant";
import { createHttpError } from "@/utils/http-error.util";

export default function (
  userLevel: "user" | "admin" | "moderator"
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.NO_TOKEN)
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.NO_TOKEN)
      }

      const payload = verifyAccessToken(token) as {
        id: string;
        email: string;
        role: "user" | "admin" | "moderator";
      };

      if (payload.role !== userLevel) {
        throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.UNAUTHORIZED)
      }

      req.headers["x-user-payload"] = JSON.stringify(payload);
      next();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.TOKEN_EXPIRED)
      } else {
        throw createHttpError(HttpStatus.FORBIDDEN, HttpResponse.TOKEN_EXPIRED)
      }
    }
  };
}
