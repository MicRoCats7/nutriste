import api from "@/config/api";

export const addProfile = (data: any) => {
    return api.post(`/profile`, data);
};

export const getProfile = () => {
    return api.get(`/profile`);
};

export const getMealPlan = () => {
    return api.get(`/meal-plan`);
};