import { apiClient } from "../helpers/API";

export const cartService = {
  getAll: async () => {
    const response = await apiClient.get("/carts");
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/carts/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await apiClient.post("/carts", formData);
    return response.data;
  },

  update: async (id, formData) => {
    const response = await apiClient.put(`/carts/${id}`, formData);
    return response.data;
  },

  remove: async (id) => {
    const response = await apiClient.delete(`/carts/${id}`);
    return response.data;
  },
};
