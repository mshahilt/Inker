import { Request, Response, NextFunction } from "express";


export interface IUserController {
    profile(req: Request, res: Response, next: NextFunction): Promise<void>
}