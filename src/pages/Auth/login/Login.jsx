/* eslint-disable */
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../../store/use-auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useNavigate();
  const { login, isLoading } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handler submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await login(formData);
    
    if (result.success) {
      toast.success(result.message);
      router("/admin");
    } else {
      toast.error(result.message);
    }
  };


  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col justify-center px-20 bg-white">
        <h1 className="text-4xl font-bold text-center mb-2">Selamat Datang</h1>
        <p className="text-black mb-8 text-center">
          Masukkan Email dan Password untuk melanjutkan
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@gmail.com"
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan Password"
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 text-gray-500"
              >
                {showPassword ? (
                  <Eye className="size-5 text-black" />
                ) : (
                  <EyeClosed className="size-5 text-black" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center space-x-2 text-gray-700">
              <input type="checkbox" className="w-10 h-5" />
              <span>Ingat Saya</span>
            </label>
            <a href="#" className="text-orange-500 hover:underline">
              Lupa Password?
            </a>
          </div>

         <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-400 hover:bg-orange-500 text-white"
        }`}
      >
        {isLoading ? "Loading..." : "Masuk"}
      </button>
        </form>

        <p className="text-center mt-6 text-gray-700">
          Belum punya akun?{" "}
          <Link to={"/register"} href="#" className="text-orange-500 font-semibold hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>

      <div className="flex-1 bg-[#F8B259] flex items-center justify-center">
        <img
          src="/burgir-menu.png"
          alt="Burger"
          className="max-w-[400px] w-full drop-shadow-[0_0_100px_rgba(255,255,255,0.9)]"
        />
      </div>
    </div>
  );
};

export default Login;
