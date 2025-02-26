import { axiosInstance } from "@/api/axios"

export const AuthService = {
    loginService: async (data: { email: string, password: string }) => {
        try {
            return await axiosInstance.post('/login', data)
        } catch (error) {
            console.log(error)
        }
    },
    registerService: async (data: { email: string; password: string; name: string; confirmPassword: string; }) => {
        try {
            return await axiosInstance.post('/register', data)
        } catch (error) {
            console.log(error)
        }
    }
}