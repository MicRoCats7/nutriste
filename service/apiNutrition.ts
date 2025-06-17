import api from '@/config/api';

export const addProfile = (data: any) => {
  return api.post(`/profile`, data);
};

export const getProfile = () => {
  return api.get(`/profile`);
};

export const getMealPlan = () => {
  return api.get(`/meal-plan`);
};

export const setTarget = (data: any) => {
  return api.post(`/target-nutrition`, data);
};

export const getNutritionToday = () => {
  return api.get(`/nutrition-today`);
};

export const getCalories = (range: '7d' | '30d' | '90d') => {
  return api.get(`/calories?days=${range}`);
};

export const getFunFact = () => {
  return api.get(`/fun-fact`);
};

export const getImagesMeal = () => {
  return api.get(`/meal-plan-images`);
};

export const sendChat = (data: any) => {
  return api.post(`/chat`, data);
};

export const getHistoryChat = () => {
  return api.get(`/chat`);
};

export const getResep = () => {
  return api.get(`/recipes`);
};

export const getDetailResep = (id: string) => {
  return api.post(`/specific-recipe?index=${id}`);
};

export const getTips = () => {
  return api.get(`/tips`);
};
