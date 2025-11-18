/* eslint-disable */
import { useLocation, useNavigate } from "react-router";
import { Facebook, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fungsi smooth scroll yang sama seperti navbar
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="bg-[#1E1E1E] text-white py-10 px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold">
              Eat<span className="text-[#D96F32]">Burgir</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Nikmati sensasi burger terbaik dengan bahan segar dan cita rasa tak
            terlupakan.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Menu Navigasi</h3>
          <ul className="space-y-2 text-gray-300">

            {/* HOME */}
            <li>
              <a
                href="#home"
                onClick={(e) => handleSmoothScroll(e, "home")}
                className="hover:text-[#D96F32] transition-colors cursor-pointer"
              >
                Home
              </a>
            </li>

            {/* MENU — tetap pakai route */}
            <li>
              <a
                href="/menu"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/menu");
                }}
                className="hover:text-[#D96F32] transition-colors cursor-pointer"
              >
                Menu
              </a>
            </li>

            {/* ABOUT */}
            <li>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, "about")}
                className="hover:text-[#D96F32] transition-colors cursor-pointer"
              >
                About
              </a>
            </li>

            {/* CONTACT */}
            <li>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="hover:text-[#D96F32] transition-colors cursor-pointer"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Kontak</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Jl. Burger ABCD No 6</li>
            <li>+62 812-3456-7890</li>
            <li>Eatburgir@gmail.com</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Ikuti Sosmed Kami</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-gray-600 rounded-full hover:bg-[#D96F32] transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-600 rounded-full hover:bg-[#D96F32] transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-600 rounded-full hover:bg-[#D96F32] transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EatBurgir. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
