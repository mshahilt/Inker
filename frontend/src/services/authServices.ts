import {axiosInstance} from "@/config/axios";
import {toast} from "sonner";
import axios, {AxiosError} from "axios";

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData extends LoginData {
    name: string;
}

interface OtpData {
    email: string;
    otp: string;
}

interface forgetPasswordData {
    email: string
}

export const AuthService = {
    loginService: async (data: LoginData) => {
        try {
            const response = await axiosInstance.post("/api/auth/login", data, {withCredentials: true});
            return {data: response.data, error: null};
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "Login failed. Please try again.";
            toast.error(errorMessage);
            return {data: null, error: errorMessage};
        }
    },

    registerService: async (data: RegisterData) => {
        try {
            const response = await axiosInstance.post("/api/auth/register", data, {withCredentials: true});
            return {data: response.data, error: null};
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "Registration failed. Please try again.";
            return {data: null, error: errorMessage};
        }
    },

    googleAuthLogin: async (id_token: string) => {
        try {
            const response = await axiosInstance.post("/api/auth/google-auth", {id_token}, {withCredentials: true});
            return {data: response.data, error: null};
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "Google authentication failed. Please try again.";
            return {data: null, error: errorMessage};
        }
    },

    otpVerificationService: async (data: OtpData) => {
        try {
            const response = await axiosInstance.post<{ status: number; message: string }>("/api/auth/otp", data);
            return {data: response.data, error: null};
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "OTP validation failed. Please try again.";
            return {data: null, error: errorMessage};
        }
    },
    forgetPasswordService: async (data: forgetPasswordData) => {
        try {
            const response = await axiosInstance.post<{
                status: number;
                message: string
            }>("/api/auth/forgot-password", data);
            return {data: response.data, error: null};
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "ForgetPassword Service failed. Please try again.";
            return {data: null, error: errorMessage};
        }
    },

    login: async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post("/auth/login", {email, password}, {withCredentials: true});
            return {data: response.data, error: null};
        } catch (error) {
            console.log("Error: ", error);
            return {data: null, error: (error as Error).message};
        }
    },

    register: async (name: string, email: string, password: string) => {
        try {
            const response = await axiosInstance.post("/auth/register", {name, email, password});
            return {data: response.data, error: null};
        } catch (error) {
            return {data: null, error: (error as Error).message};
        }
    },

    getUser: async () => {
        try {
            const response = await axiosInstance.get("/user/me");
            return {data: response.data, error: null};
        } catch (error) {
            return {data: null, error: (error as Error).message};
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout", {},
                {withCredentials: true}
            );
            return {error: null};
        } catch (error) {
            return {error: (error as Error).message};
        }
    },

    refreshToken: async () => {
        const baseURL = process.env.VUE_APP_AUTH_SERVER_URL || "http://localhost:4000/api/v1";
        try {
            const response = await axios.post(`${baseURL}/auth/refresh-token`, {}, {
                withCredentials: true
            });
            return {data: response.data, error: null};
        } catch (error) {
            return {data: null, error: (error as Error).message};
        }
    },
};
