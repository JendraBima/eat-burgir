import { apiClient } from "../helpers/API";

export const orderService = {
  getAll: async () => {
    const response = await apiClient.get("/orders");
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await apiClient.post("/orders", formData);
    return response.data;
  },

  update: async (id, formData) => {
    const response = await apiClient.put(`/orders/${id}`, formData);
    return response.data;
  },

  remove: async (id) => {
    const response = await apiClient.delete(`/orders/${id}`);
    return response.data;
  },
};
