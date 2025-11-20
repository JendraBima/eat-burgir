/* eslint-disable */
import { motion } from "framer-motion";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../../store/use-auth";
import { set } from "react-hook-form";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { user, logout } = useAuthStore();

  // Active section state
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll section
  useEffect(() => {

    if(pathname !== "/") setActiveSection("");

    const handleScroll = () => {
      const sections = ["home", "menu" ,"about", "contact"];

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= 150 && rect.bottom >= 150;

        if (isVisible) setActiveSection(id);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // For checking active link
  const isActive = (path) => location.pathname === path;

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full h-20 bg-white shadow-sm py-4 px-4 md:px-6 flex items-center justify-between z-50"
    >
      <Link to="/" className="flex items-center">
        <img src="/eat_burgir.png" alt="icon" className="h-12 md:h-17 scale-150 md:scale-170 object-contain" />
        <span className="font-bold text-lg md:text-2xl">
          Eat<span className="text-[#D96F32]">Burgir</span>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          to="#home"
          onClick={(e) => handleSmoothScroll(e, "home")}
          className={`text-sm font-medium transition-colors ${
            activeSection === "home"
              ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
              : "text-gray-700 hover:text-orange-500"
          }`}
        >
          Home
        </Link>

        {/* MENU */}
        <Link
          to="/menu"
          className={`text-sm font-medium transition-colors ${
            isActive("/menu")
              ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
              : "text-gray-700 hover:text-orange-500"
          }`}
        >
          Menu
        </Link>

        {/* ABOUT */}
        <Link
          to="#about"
          onClick={(e) => handleSmoothScroll(e, "about")}
          className={`text-sm font-medium transition-colors ${
            activeSection === "about"
              ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
              : "text-gray-700 hover:text-orange-500"
          }`}
        >
          About
        </Link>

        {/* CONTACT */}
        <Link
          to="#contact"
          onClick={(e) => handleSmoothScroll(e, "contact")}
          className={`text-sm font-medium transition-colors ${
            activeSection === "contact"
              ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
              : "text-gray-700 hover:text-orange-500"
          }`}
        >
          Contact
        </Link>
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-4">
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors" />
        </Link>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2">
              <img
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User"}
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 hover:border-orange-500 transition-colors cursor-pointer"
              />
            </button>

            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{user.name || "User"}</p>
                  <p className="text-xs text-gray-500">{user.email || ""}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <User className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors" />
            </Link>

            <Link
              to="/Register"
              className="bg-[#D96F32] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors" />
        </Link>
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 hover:text-orange-500 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-20 right-0 w-64 h-full bg-white shadow-lg z-40 md:hidden"
        >
          <div className="flex flex-col p-4 gap-4">
            <Link
              to="#home"
              onClick={(e) => handleSmoothScroll(e, "home")}
              className={`text-sm font-medium transition-colors py-2 ${
                activeSection === "home"
                  ? "text-orange-500 font-semibold"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              Home
            </Link>

            <Link
              to="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-medium transition-colors py-2 ${
                isActive("/menu")
                  ? "text-orange-500 font-semibold"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              Menu
            </Link>

            <Link
              to="#about"
              onClick={(e) => handleSmoothScroll(e, "about")}
              className={`text-sm font-medium transition-colors py-2 ${
                activeSection === "about"
                  ? "text-orange-500 font-semibold"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              About
            </Link>

            <Link
              to="#contact"
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className={`text-sm font-medium transition-colors py-2 ${
                activeSection === "contact"
                  ? "text-orange-500 font-semibold"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              Contact
            </Link>

            <div className="border-t pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                    <img
                      src={user.image || "/default-avatar.png"}
                      alt={user.name || "User"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user.name || "User"}</p>
                      <p className="text-xs text-gray-500">{user.email || ""}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/Register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-[#D96F32] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
