import axios from "axios";
import { usePathname } from "next/navigation";

export const baseUrl = 'https://nutriste.vercel.app';

const api = axios.create({
    baseURL: baseUrl,
});

api.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem("token");

        if (!token) {
            // Try to extract token from pathname if not in localStorage
            const pathname = window.location.pathname + window.location.search;
            const match = pathname.match(/menu-utama\?token=([^&]+)/);
            if (match && match[1]) {
            token = match[1];
            localStorage.setItem("token", token);
            }
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;