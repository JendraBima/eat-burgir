import { useState, useEffect } from "react";
import { pesananService } from "../service/pesanan.service";
import { orderService } from "../service/order.service";

export const useMemberDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    pendingOrders: 0,
  });
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [pesananResponse, orderResponse] = await Promise.all([
        pesananService.getMine(),
        orderService.getAll(),
      ]);

      const pesananList = pesananResponse?.data || [];
      const orderItems = orderResponse?.data || [];

      const myOrderIds = new Set(pesananList.map((p) => p.id));

      const validOrders = pesananList.filter((p) => p.status !== "cancelled");

      const totalOrders = validOrders.length;
      const totalSpent = validOrders.reduce(
        (sum, p) => sum + (p.total_amount || 0),
        0
      );
      const pendingOrders = pesananList.filter(
        (p) => (p.status || "").toLowerCase() === "pending"
      ).length;

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
        const monthOrders = validOrders.filter((pesanan) => {
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
        const pesanan = item.pesanan;
        if (!pesanan || !myOrderIds.has(pesanan.id)) {
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
        totalOrders,
        totalSpent,
        pendingOrders,
      });

      setSalesData(monthlySales);
      setTopProducts(productsWithSales);
    } catch (error) {
      console.error("Error fetching member dashboard data:", error);
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
