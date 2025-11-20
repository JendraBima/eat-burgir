import { apiClient } from "../helpers/API";

export const reviewService = {
  getAll: async () => {
    const response = await apiClient.get("/reviews");
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/reviews/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await apiClient.post("/reviews", formData);
    return response.data;
  },

  update: async (id, formData) => {
    const response = await apiClient.put(`/reviews/${id}`, formData);
    return response.data;
  },

  remove: async (id) => {
    const response = await apiClient.delete(`/reviews/${id}`);
    return response.data;
  },
};
