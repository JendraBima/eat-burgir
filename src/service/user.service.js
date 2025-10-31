import { apiClient } from "../helpers/API";

export const userService = {
  getById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  update: async (id, formData) => {
    const config = formData instanceof FormData ? {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    } : {};

    const response = await apiClient.put(`/users/${id}`, formData, config);
    return response.data;
  },
};
