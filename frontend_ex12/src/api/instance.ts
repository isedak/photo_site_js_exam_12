import axios, { InternalAxiosRequestConfig } from "axios";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

instance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = token
    };
    return req;
});