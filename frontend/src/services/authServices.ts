import {axiosInstance} from "@/config/axios";
import {toast} from "sonner";
import axios, {AxiosError} from "axios";
import {env} from "@/config/env.ts";
import { IUser } from "shared/types";

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

    googleAuthLogin: async (id_token: string): Promise<{ data: {
      user: Partial<IUser>;
      message: string;
      token: string;
  } | null, error: string | null}> => {
        try {
            const response = await axiosInstance.post<{
              user: Partial<IUser>;
              message: string;
              token: string;
          }>("/api/auth/google-auth", {id_token}, {withCredentials: true});
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
    forgetPasswordService: async (data: forgetPasswordData): Promise<{ data: {
      status: number;
      message: string
  } | null, error: string | null}> => {
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

    fetchUser: async () => {
        try {
            const response = await axiosInstance.get("/api/auth/me");
            return {data: response.data, error: null};
        } catch (error) {
            return {data: null, error: (error as Error).message};
        }
    },

    logout: async () => {
        console.log("Logout called");
        try {
            await axiosInstance.post("/api/auth/logout", {},
                {withCredentials: true}
            );
            return {error: null};
        } catch (error) {
            console.log("Logout error: ", error);
            return {error: (error as Error).message};
        }
    },

    refreshToken: async () => {
        const baseURL = env.API_URL;
        try {
            const response = await axios.post(`${baseURL}/api/auth/refresh-token`, {}, {
                withCredentials: true
            });
            return {data: response.data, error: null};
        } catch (error) {
            return {data: null, error: (error as Error).message};
        }
    },
};
