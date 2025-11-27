import { Skeleton } from "@heroui/react";
import { ShoppingCart, DollarSign, Clock } from "lucide-react";
import { useMemberDashboard } from "../../../hooks/useMemberDashboard";
import StatsCard from "../../admin/dashboard/StatsCard";
import SalesChart from "../../admin/dashboard/SalesChart";
import RevenueChart from "../../admin/dashboard/RevenueChart";
import TopProducts from "../../admin/dashboard/TopProducts";

const MemberDashboardComponent = () => {
  const { stats, salesData, topProducts, loading } = useMemberDashboard();

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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
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
        <h2 className="text-3xl font-bold">Dashboard Member</h2>
        <p className="text-gray-600">
          Lihat ringkasan pesanan dan riwayat belanja kamu di Eat Burgir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Total Pesanan"
          value={stats.totalOrders}
          icon={ShoppingCart}
          color="primary"
          subtitle="Semua pesanan kamu"
        />
        <StatsCard
          title="Total Pengeluaran"
          value={formatCurrency(stats.totalSpent)}
          icon={DollarSign}
          color="warning"
          subtitle="Tidak termasuk pesanan dibatalkan"
        />
        <StatsCard
          title="Pesanan Menunggu"
          value={stats.pendingOrders}
          icon={Clock}
          color="success"
          subtitle="Belum diproses"
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

export default MemberDashboardComponent;
