import { IUserService } from "@/services/interface";
import { NextFunction, Request, Response } from "express";

export class UserController {
    constructor(private readonly _userService: IUserService) {

    }
    async profile(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.params.id)
            const user = await this._userService.verifyEmail(req.params.id, req.body.email);

            res.status(200).json({
                email: user,
            });
        } catch (err) {
            next(err);
        }
    }
}
