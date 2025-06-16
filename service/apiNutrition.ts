import api from "@/config/api";

export const addProfile = (data: any) => {
    return api.post(`/profile`, data);
};