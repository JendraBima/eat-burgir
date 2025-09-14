/* eslint-disable */
import { motion } from "framer-motion";
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between z-50"
    >
      <Link to="/" className="flex items-center">
        <img src="/burgir.png" alt="icon" className="w-14 h-14" />
        <span className="font-bold text-xl">
          Eat<span className="text-[#D96F32]">Burgir</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/menu"
          className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
        >
          Menu
        </Link>
        <Link
          to="/about"
          className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
        >
          Contact
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors" />
          {/* {state.items.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {state.items.reduce((sum, item) => sum + item.quantity, 0)}
            </motion.span>
          )} */}
        </Link>
        <Link to="/login">
          <User className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors" />
        </Link>
        <Link
          to="/register"
          className="bg-[#D96F32] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
        >
          Register
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
