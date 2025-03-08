import { Request, Response, NextFunction } from "express";

export interface IAuthController {
    signup(req: Request, res: Response, next: NextFunction): Promise<void>
    signin(req: Request, res: Response, next: NextFunction): Promise<void>
    forgotPassword(req: Request, res: Response, next: NextFunction) : Promise <void>;
    resetPassword(req: Request, res: Response, next: NextFunction ) : Promise <void>;
    refreshAccessToken(req: Request, res: Response, next: NextFunction): Promise<void>;
}