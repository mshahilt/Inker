import { HttpResponse } from "@/constants/response-message.constant";
import { HttpStatus } from "@/constants/status.constant";
import { createHttpError } from "@/utils/http-error.util";
import {Request, Response, NextFunction} from "express";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(HttpStatus.NOT_FOUND, HttpResponse.PAGE_NOT_FOUND));
}