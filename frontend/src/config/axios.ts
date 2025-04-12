import axios from 'axios';
import { store } from '@/store/store';
import { setAuth, logout } from "@/store/slices/authSlice"
import { TokenUtils } from '@/utils/tokenUtil';
import {env} from "@/config/env.ts";

const BASE_URL = env.API_URL;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

// Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = TokenUtils.getToken()

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Refresh
axiosInstance.interceptors.response.use(
    (response) => { 
        return response },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await axios.post(`${BASE_URL}/api/auth/refresh-token`, {}, { withCredentials: true });
                const accessToken = refreshResponse.data;

                store.dispatch(setAuth({accessToken }));

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
