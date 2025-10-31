import { LayoutDashboard, Package, LogOut } from "lucide-react";

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
  
]

export default SIDEBAR_ADMIN;