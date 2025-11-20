import { LayoutDashboard, Package, ShoppingCart, FileText, Star, Boxes, CreditCard } from "lucide-react";

const SIDEBAR_ADMIN = [
  {
    key: "Dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/admin",
  },
  {
    key: "Produk",
    label: "Produk",
    icon: <Package className="w-5 h-5" />,
    href: "/admin/produk",
  },
  {
    key: "Transaksi",
    label: "Transaksi",
    icon: <CreditCard className="w-5 h-5" />,
    href: "/admin/transaction",
  },
  // {
  //   key: "Keranjang",
  //   label: "Keranjang",
  //   icon: <ShoppingCart className="w-5 h-5" />,
  //   href: "/admin/cart",
  // },
  // {
  //   key: "Order",
  //   label: "Order",
  //   icon: <Boxes className="w-5 h-5" />,
  //   href: "/admin/order",
  // },
  // {
  //   key: "Pesanan",
  //   label: "Pesanan",
  //   icon: <FileText className="w-5 h-5" />,
  //   href: "/admin/pesanan",
  // },
  // {
  //   key: "Review",
  //   label: "Review",
  //   icon: <Star className="w-5 h-5" />,
  //   href: "/admin/review",
  // },
]

export default SIDEBAR_ADMIN;