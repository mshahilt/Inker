import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/utils/jwt.util";
import { HttpResponse } from "@/constants/response-message.constant";
import { HttpStatus } from "@/constants/status.constant";

export default function (
  userLevel: "user" | "admin" | "moderator"
): (req: Request, res: Response, next: NextFunction) => void | Response {
  return (req: Request, res: Response, next: NextFunction): void | Response => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: HttpResponse.NO_TOKEN });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: HttpResponse.NO_TOKEN });
      }

      const payload = verifyAccessToken(token) as {
        id: string;
        email: string;
        role: "user" | "admin" | "moderator";
      };

      if (payload.role !== userLevel) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: HttpResponse.UNAUTHORIZED });
      }

      req.headers["x-user-payload"] = JSON.stringify(payload);
      next();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ error: HttpResponse.TOKEN_EXPIRED });
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: HttpResponse.TOKEN_EXPIRED });
      }
    }
  };
}
