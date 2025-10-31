import { createBrowserRouter } from "react-router";
import LandingPages from "../pages/LandingPage";
import Login from "../pages/Auth/login/Login";
import Register from "../pages/Auth/register/Register";
import AdminPage from "../pages/admin";
import DashboardLayout from "../pages/admin/layout/DashboardLayout";
import ProductAdminPage from "../pages/admin/produk";
import ProfilePage from "../pages/admin/profile";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPages />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin={true}>
        <DashboardLayout/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "produk",
        element:<ProductAdminPage/>
      },
      {
        path: "profile",
        element:<ProfilePage/>
      }
    ],
  },
  {
    path: "*",
    element: <div>Halaman ini gorong selesai !!!</div>,
  },
]);
