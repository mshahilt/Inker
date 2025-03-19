import Cookies from "js-cookie";

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
