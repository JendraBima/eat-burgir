import { apiClient } from "../helpers/API";

export const authService = {
  login: async (email, password) => {
    const response = await apiClient.post("/login", {
      email,
      password,
    });
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await apiClient.post("/register", {
      name,
      email,
      password,
    });
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get("/user");
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.get("/logout");
    return response.data;
  }
};