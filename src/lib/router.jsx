import { createBrowserRouter } from "react-router";
import LandingPages from "../pages/LandingPage";
import Login from "../pages/Auth/login/Login";
import Register from "../pages/Auth/register/Register";
import AdminPage from "../pages/admin";
import DashboardLayout from "../pages/admin/layout/DashboardLayout";
import ProductAdminPage from "../pages/admin/produk";
import ProfilePage from "../pages/admin/profile";
import CartAdminPage from "../pages/admin/cart";
import OrderAdminPage from "../pages/admin/order";
import PesananAdminPage from "../pages/admin/pesanan";
import ReviewAdminPage from "../pages/admin/review";
import TransactionAdminPage from "../pages/admin/transaction";
import ProtectedRoute from "../components/ProtectedRoute";
import MenuPages from "../pages/LandingPage/MenuPages";
import ProductDetailPage from "../pages/LandingPage/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <ProtectedRoute requireAdmin={false}>
    <LandingPages />
    </ProtectedRoute>
  },
  {
    path: "/menu",
    element: 
      <ProtectedRoute requireAdmin={false}>
        <MenuPages/>
    </ProtectedRoute>
  },
  {
    path: "/menu/:productId",
    element: 
      <ProtectedRoute requireAdmin={false}>
        <ProductDetailPage/>
    </ProtectedRoute>
  },
  {
    path: "/cart",
    element: 
      <ProtectedRoute requireAdmin={false}>
        <CartPage/>
    </ProtectedRoute>
  },
  {
    path: "/checkout",
    element: 
      <ProtectedRoute requireAdmin={false}>
        <CheckoutPage/>
    </ProtectedRoute>
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
        path: "cart",
        element:<CartAdminPage/>
      },
      {
        path: "order",
        element:<OrderAdminPage/>
      },
      {
        path: "pesanan",
        element:<PesananAdminPage/>
      },
      {
        path: "review",
        element:<ReviewAdminPage/>
      },
      {
        path: "transaction",
        element:<TransactionAdminPage/>
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
