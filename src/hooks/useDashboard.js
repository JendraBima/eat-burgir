import { useState, useEffect } from "react";
import { productService } from "../service/product.service";

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

      // Fetch products
      const productsResponse = await productService.getAll();
      const products = productsResponse.data || [];

      // Generate dummy sales data untuk chart
      const monthlySales = [
        { month: "Jan", sales: 45, revenue: 4500000 },
        { month: "Feb", sales: 52, revenue: 5200000 },
        { month: "Mar", sales: 48, revenue: 4800000 },
        { month: "Apr", sales: 61, revenue: 6100000 },
        { month: "May", sales: 55, revenue: 5500000 },
        { month: "Jun", sales: 67, revenue: 6700000 },
        { month: "Jul", sales: 72, revenue: 7200000 },
        { month: "Aug", sales: 68, revenue: 6800000 },
        { month: "Sep", sales: 75, revenue: 7500000 },
        { month: "Oct", sales: 82, revenue: 8200000 },
      ];

      // Generate top products data
      const productsWithSales = products.slice(0, 5).map((product, index) => ({
        ...product,
        salesCount: Math.floor(Math.random() * 100) + 50,
        revenue: product.price * (Math.floor(Math.random() * 100) + 50),
      }));

      // Calculate stats
      const totalSales = monthlySales.reduce((sum, item) => sum + item.sales, 0);
      const totalRevenue = monthlySales.reduce((sum, item) => sum + item.revenue, 0);

      setStats({
        totalProducts: products.length,
        totalSales: totalSales,
        totalRevenue: totalRevenue,
        totalCustomers: 156, // Dummy data
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
