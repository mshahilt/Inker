import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../../services/interface/IAuthService";
import { IAuthController } from "../interface/IAuthController";



export class AuthController implements IAuthController{
    constructor(private _authService: IAuthService){}

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const user = await this._authService.signup(req.body)

            res.status(200).json({
                email: user
            })
        }catch(err){
            next(err)
        }
    }
}