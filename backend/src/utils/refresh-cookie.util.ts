import { Response } from "express";

export function setCookie(res: Response, refreshToken: string) {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
    });
}

export function deleteCookie(res: Response) {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })
}