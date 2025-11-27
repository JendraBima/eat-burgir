import { useState, useEffect } from "react";
import { productService } from "../service/product.service";
import { pesananService } from "../service/pesanan.service";
import { orderService } from "../service/order.service";
import { userService } from "../service/user.service";

export const useDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [
        productsResult,
        pesananResult,
        orderResult,
        usersResult,
      ] = await Promise.allSettled([
        productService.getAll(),
        pesananService.getAll(),
        orderService.getAll(),
        userService.getAll(),
      ]);

      const getSafeData = (result, label) => {
        if (result.status === "fulfilled") {
          return result.value?.data || [];
        }

        console.error(`Error fetching ${label}:`, result.reason);
        return [];
      };

      const products = getSafeData(productsResult, "products");
      const pesananList = getSafeData(pesananResult, "pesanan");
      const orderItems = getSafeData(orderResult, "orders");
      const users = getSafeData(usersResult, "users");

      const validPesanan = pesananList.filter((pesanan) => {
        const status = (pesanan.status || "").toLowerCase();
        return status !== "cancelled";
      });

      const pesananStatusMap = {};
      pesananList.forEach((pesanan) => {
        if (!pesanan.id) return;
        pesananStatusMap[pesanan.id] = (pesanan.status || "").toLowerCase();
      });

      const totalSales = validPesanan.length;
      const totalRevenue = validPesanan.reduce(
        (sum, pesanan) => sum + (pesanan.total_amount || 0),
        0
      );

      const totalProducts = products.length;
      const totalCustomers = users.filter((user) => user.role !== "admin").length;

      const now = new Date();
      const currentYear = now.getFullYear();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthlySales = monthNames.map((monthName, monthIndex) => {
        const monthOrders = validPesanan.filter((pesanan) => {
          if (!pesanan.created_at) return false;
          const date = new Date(pesanan.created_at);
          return (
            date.getMonth() === monthIndex &&
            date.getFullYear() === currentYear
          );
        });

        const sales = monthOrders.length;
        const revenue = monthOrders.reduce(
          (sum, pesanan) => sum + (pesanan.total_amount || 0),
          0
        );

        return {
          month: monthName,
          sales,
          revenue,
        };
      });

      const productStatsMap = {};

      orderItems.forEach((item) => {
        const parentStatus = pesananStatusMap[item.pesanan_id] || "";
        if (!parentStatus || parentStatus === "cancelled") {
          return;
        }

        const product = item.products || item.product || {};
        const productId = product.id;

        if (!productId) {
          return;
        }

        const quantity = item.quantity || 0;
        const price = product.price || 0;

        if (!productStatsMap[productId]) {
          productStatsMap[productId] = {
            id: productId,
            name: product.name,
            image: product.image,
            salesCount: 0,
            revenue: 0,
          };
        }

        productStatsMap[productId].salesCount += quantity;
        productStatsMap[productId].revenue += quantity * price;
      });

      const productsWithSales = Object.values(productStatsMap)
        .sort((a, b) => b.salesCount - a.salesCount)
        .slice(0, 5);

      setStats({
        totalProducts,
        totalSales,
        totalRevenue,
        totalCustomers,
      });

      setSalesData(monthlySales);
      setTopProducts(productsWithSales);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    stats,
    salesData,
    topProducts,
    loading,
    refreshData: fetchDashboardData,
  };
};
