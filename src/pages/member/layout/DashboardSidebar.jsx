import { Listbox, ListboxItem } from "@heroui/listbox";
import { useLocation, useNavigate } from "react-router";
import { LogOut, User } from "lucide-react";
import { useAuthStore } from "../../../store/use-auth";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";

const DashboardLayoutSidebar = ({ sidebarItems, isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout } = useAuthStore();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const checkIsActive = (href) => {
    if (currentPath === href) return true;
    if (href !== "/member" && currentPath.startsWith(href)) return true;
    return false;
  };

  const handleItemClick = (item) => {
    navigate(item.href);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast.success("Logout berhasil");
      navigate("/login");
    } catch (error) {
      toast.error("Gagal logout");
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <div
      className={`fixed lg:translate-x-0 lg:relative z-50 flex h-screen w-full max-w-[300px] flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        <div className="relative h-32">
          <img src="/eat_burgir.png" className="absolute -top-20" alt="" />
        </div>

        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
          key={currentPath}
        >
          {(item) => {
            const isActive = checkIsActive(item.href);
            return (
              <ListboxItem
                key={item.key}
                className={`my-1 h-12 text-lg cursor-pointer transition-colors ${
                  isActive ? "bg-amber-500 text-white" : "hover:bg-gray-100"
                }`}
                startContent={item.icon}
                textValue={item.label}
                aria-labelledby={item.label}
                aria-describedby={item.label}
                onClick={() => handleItemClick(item)}
              >
                <p className="text-small">{item.label}</p>
              </ListboxItem>
            );
          }}
        </Listbox>
      </div>
      <div className="">
        {user && (
          <div className="flex items-center justify-between gap-2 bg-orange-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors" onClick={() => navigate("/member/profile")}>
            <div className="flex items-center gap-2">
              {user.image ? (
                <>
                  <img src={user.image} alt={user.name} className="w-8 h-8 rounded-lg" />
                </>
              ) : (
                <>
                  <User className="w-5 h-5 text-orange-600" />
                </>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                  {user.name}
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {user.role === "user" ? "member" : user.role}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogoutClick}
              className="text-red-500 hover:text-red-600 hover:scale-110 transition-all ease-in-out duration-200"
            >
              <LogOut />
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Logout"
        message="Apakah Anda yakin ingin keluar dari aplikasi?"
        confirmText="Logout"
        cancelText="Batal"
        confirmColor="danger"
        isLoading={isLoggingOut}
      />
    </div>
  );
};

export default DashboardLayoutSidebar;
