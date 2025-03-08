import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../../services/interface/IAuthService";
import { IAuthController } from "../interface/IAuthController";
import { HttpStatus } from "@/constants/status.constant";
import { HttpResponse } from "@/constants/response-message.constant";

export class AuthController implements IAuthController {
  constructor(private _authService: IAuthService) { }

  async signup(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> {
    try {

      const user = await this._authService.signup(req.body);

      res.status(HttpStatus.OK).json({
        email: user,
      });
    } catch (err) {
      next(err);
    }
  }


  async signin(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, username, password } = req.body;

      const tokens = await this._authService.signin(email || username, password);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(HttpStatus.OK).json({ accessToken: tokens.accessToken });
    } catch (err) {
      next(err);
    }
  }
  

  async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { otp, email } = req.body;
      const verificationResponse = await this._authService.verifyOtp(
        otp,
        email
      );

      res.status(HttpStatus.CREATED).json(verificationResponse);
    } catch (err) {
      next(err);
    }
  }


  async forgotPassword(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;
      const verifyForgotPassword = await this._authService.verifyForgotPassword(email);
      res.status(HttpStatus.OK).json(verifyForgotPassword);

    } catch (error) {
      next(error)
    }
  }


  async resetPassword(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> {
    try {
      const { password, token } = req.body;
      const updateUserPassword = await this._authService.getResetPassword(token, password);
      res.status(HttpStatus.OK).json(updateUserPassword)

    } catch (error) {
      next(error)
    }
  }


  async refreshAccessToken(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> {
    try {
      const { refreshToken } = req.cookies;

      const accessToken = await this._authService.refreshAccessToken(refreshToken);

      res.status(HttpStatus.OK).json(accessToken);
    } catch (error) {
      next(error)
    }
  }
}
