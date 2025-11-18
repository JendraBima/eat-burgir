import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuthStore } from "../store/use-auth";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isCheckingAuth, user, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  if (requireAdmin && user?.role !== "admin") {
    return (
      <Navigate to="/login" replace />
    );
  }

  return children;
};

export default ProtectedRoute;
