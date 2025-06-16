import { getTokenUser } from "@/service/apiAuth";
import axios from "axios";
import Cookies from "js-cookie";

export const baseUrl = 'https://nutriste.vercel.app';

const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // Agar cookies bisa dikirim ke server
});

// ** Tambahkan interceptor untuk mengambil token sebelum request **
api.interceptors.request.use(
    async (config) => {
        let token = Cookies.get("token"); // Ambil token dari cookies jika ada

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (!token) {
            try {
                const tokenResponse = await getTokenUser();
                token = tokenResponse?.data?.token;

                if (token) {
                    Cookies.set("token", token, { expires: 1 }); // Simpan di cookies agar bisa dipakai lagi
                }
            } catch (error) {
                console.error("Gagal mengambil token:", error);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ** Tambahkan interceptor response untuk menangani error 401 **
api.interceptors.response.use(
    (response) => response, // Jika berhasil, lanjutkan response
    // (error) => {
    //     if (error.response?.status === 401) {
    //         Cookies.remove("token"); // Hapus token jika tidak valid

    //         if (typeof window !== "undefined") {
    //             window.location.href = "/login"; // Redirect ke login
    //         }
    //     }
    //     return Promise.reject(error);
    // }
);

export default api;