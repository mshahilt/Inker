import { axiosInstance } from "@/api/axios"
import { toast } from "sonner";

export const AuthService = {

    loginService: async (data: { email: string, password: string }) => {
        try {
            return await axiosInstance.post('/api/auth/login', data)
        } catch (error: any) {
            toast.error(error.data.error)
        }
    },

    registerService: async (data: { email: string; password: string; name: string; }) => {
        try {
            const response = await axiosInstance.post('/api/auth/register', data);
            console.log(response, 'sd');
            return response.data; 
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || "Registration failed. Please try again.";
            throw new Error(errorMessage);
        }
    },
    
    otpVerificationService: async (data: { email: string; otp: string }): Promise<{ status: number; message: string }> => {
        try {
            const response = await axiosInstance.post<{ status: number; message: string }>('/api/auth/otp', data);
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || "OTP validation failed. Please try again.";
            throw new Error(errorMessage);
        }
    }
}