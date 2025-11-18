import { create } from "zustand";
import { authService } from "../service/auth.service";

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await authService.login(
        credentials.email,
        credentials.password
      );
      if (response.status) {
        const userData =  await get().checkAuth();

        set({
          isLoading: false,
          isAuthenticated: !!userData,
          user: userData || null,
        });

        return {
          success: true,
          message: response.data.pesan || "Login berhasil",
          data: userData,
        };
      } else {
        set({ isLoading: false });
        return {
          success: false,
          message: response.data.pesan || "Login gagal",
        };
      }
    } catch (error) {
      set({ isLoading: false, isAuthenticated: false, user: null });
      console.error("Login error:", error);
      return {
        success: false,
        message:
          error.response?.data?.pesan ||
          "Login gagal, periksa kembali email/password",
      };
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const response = await authService.getMe();

      if (response.status && response.data) {
        const userData = response.data;

        set({
          user: userData,
          isAuthenticated: true,
          isCheckingAuth: false,
        });

        return userData;
      } else {
        set({ isCheckingAuth: false, isAuthenticated: false, user: null });
        return false;
      }
    } catch (error) {
      console.error("Check auth error:", error);
      console.error("Error response:", error.response?.data);
      set({ isCheckingAuth: false, isAuthenticated: false, user: null });
      return false;
    }
  },


  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
    set({ user: null, isAuthenticated: false });
  },
  isAdmin: () => {
    const { user } = get();
    return user?.role === "admin";
  },
}));
