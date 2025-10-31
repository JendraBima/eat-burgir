import { apiClient } from "../helpers/API";

export const productService = {
  getAll: async () => {
    const response = await apiClient.get("/products");
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await apiClient.post("/products", formData)
    return response.data;
  },

  update: async (id, formData) => {
    const response = await apiClient.put(`/products/${id}`, formData)
    return response.data;
  },
   remove: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};

