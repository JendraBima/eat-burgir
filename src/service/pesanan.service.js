import { apiClient } from "../helpers/API";

export const pesananService = {
  getAll: async () => {
    const response = await apiClient.get("/pesanan");
    return response.data;
  },

  getMine: async () => {
    const response = await apiClient.get("/my-pesanan");
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/pesanan/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await apiClient.post("/pesanan", formData);
    return response.data;
  },

  update: async (id, formData) => {
    const response = await apiClient.put(`/pesanan/${id}`, formData);
    return response.data;
  },

  remove: async (id) => {
    const response = await apiClient.delete(`/pesanan/${id}`);
    return response.data;
  },
};
