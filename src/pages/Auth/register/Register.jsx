/* eslint-disable */
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";
import { authService } from "../../../service/auth.service";
import { useNavigate } from "react-router";

const Register = () => {
  const router = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(formData.password !== formData.confirmPassword) {
      toast.error("Password dan Konfirmasi Password tidak sesuai!");
      setLoading(false);
      return;
    }
  
    try {
      const nama = formData.nama;
      const email = formData.email;
      const password = formData.password;

     await authService.register(email, nama,password);
   
      toast.success("Register Berhasil");
      router("/login");
  
    setLoading(false);
    } catch (error) {
      toast.error("Register Gagal, coba lagi!");  
      setLoading(false);
      console.error(error);
    }
  }
    return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col justify-center px-20 bg-white">
        <div>
          <h1 className="text-4xl font-bold text-center mb-2">Buat Akun</h1>
          <p className="text-black mb-8 text-center">
            Masukkan Nama, Email, dan Password untuk membuat Akun baru
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="nama" className="block font-semibold mb-2">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan Nama"
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
          </div>

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

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block font-semibold mb-2"
            >
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Konfirmasi Password"
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-4 text-gray-500"
              >
                {showConfirmPassword ? (
                  <Eye className="size-5 text-black" />
                ) : (
                  <EyeClosed className="size-5 text-black" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center text-black">
              <input type="checkbox" className="w-10 h-5" />
              <span>Ingat Saya</span>
            </label>
          </div>

         <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-400 hover:bg-orange-500 text-white"
        }`}
      >
        {loading ? "Loading..." : "Masuk"}
      </button>
        </form>
      </div>

      <div className="flex-1 bg-[#F8B259] md:flex hidden items-center justify-center">
        <img
          src="/burgir-menu.png"
          alt="Burger"
          className="max-w-[400px] w-full drop-shadow-[0_0_100px_rgba(255,255,255,0.9)]"
        />
      </div>
    </div>
  );
};

export default Register;
