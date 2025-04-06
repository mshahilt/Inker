import { DecodedToken } from "@/types";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = "accessToken";

export const TokenUtils = {
    setToken: (token: string, days: number = 7) => {
        Cookies.set(TOKEN_KEY, token, {
            expires: days,
            secure: true,
            sameSite: "Strict",
        });
    },

    getToken: (): string | undefined => {
        return Cookies.get(TOKEN_KEY);
    },

    removeToken: () => {
        Cookies.remove(TOKEN_KEY);
    }
};


export const decodeToken = (): DecodedToken => {
    const token = TokenUtils.getToken();
    let user: DecodedToken = { id: '', username: '', role: '' };
    if (token) {
        try {
            user = jwtDecode(token);
        } catch (err) {
            console.error("Invalid token", err);
        }
    }
    return user
}




