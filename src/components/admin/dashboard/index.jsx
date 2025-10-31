import { Skeleton } from "@heroui/react";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import { useDashboard } from "../../../hooks/useDashboard";
import StatsCard from "./StatsCard";
import SalesChart from "./SalesChart";
import RevenueChart from "./RevenueChart";
import TopProducts from "./TopProducts";

const DashboardComponent = () => {
  const { stats, salesData, topProducts, loading } = useDashboard();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] rounded-lg" />
          <Skeleton className="h-[400px] rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <p className="text-gray-600">Pantau perkembangan penjualan dan pelanggan Eat Burgir setiap bulan.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Produk"
          value={stats.totalProducts}
          icon={Package}
          color="primary"
          subtitle="Produk aktif"
        />
        <StatsCard
          title="Total Penjualan"
          value={stats.totalSales}
          icon={ShoppingCart}
          color="success"
          subtitle="Transaksi berhasil"
        />
        <StatsCard
          title="Total Pendapatan"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          color="warning"
          subtitle="Revenue tahun ini"
        />
        <StatsCard
          title="Total Pelanggan"
          value={stats.totalCustomers}
          icon={Users}
          color="danger"
          subtitle="Pelanggan terdaftar"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={salesData} />
        <RevenueChart data={salesData} />
      </div>

      <TopProducts products={topProducts} />
    </div>
  );
};

export default DashboardComponent;
