import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Loader } from "lucide-react";
import { useAuthStore } from "../store/use-auth";
import { pesananService } from "../service/pesanan.service";
import { orderService } from "../service/order.service";
import { cartService } from "../service/cart.service";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/LandingPage/Footer";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const cartItems = location.state?.cartItems || [];
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.products?.price || 0) * item.quantity,
    0
  );

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Semua field harus diisi");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Buat pesanan baru
      const pesananRes = await pesananService.create({
        user_id: user.id,
        status: "pending",
        total_amount: totalPrice,
      });

      const pesananId = pesananRes.data.id;

      // 2. Buat order items untuk setiap cart item
      await Promise.all(
        cartItems.map((item) =>
          orderService.create({
            pesanan_id: pesananId,
            product_id: item.product_id,
            quantity: item.quantity,
          })
        )
      );

      // 3. Hapus cart items setelah checkout berhasil
      await Promise.all(cartItems.map((item) => cartService.remove(item.id)));

      setOrderPlaced(true);
      toast.success("Pesanan berhasil dibuat!");

    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal membuat pesanan");
      console.error("Checkout error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-20 flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <CheckCircle size={80} className="mx-auto text-green-500" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pesanan Berhasil Dibuat!
            </h1>
            <p className="text-gray-600 mb-8">
              Terima kasih telah berbelanja. Pesanan Anda sedang diproses.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/menu")}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Lanjut Belanja
              </button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Kembali ke Keranjang
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleCheckout} className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informasi Pengiriman
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Alamat Pengiriman
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Konfirmasi Pesanan"
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Ringkasan Pesanan
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.products?.name} x {item.quantity}
                      </span>
                      <span className="font-semibold text-gray-900">
                        Rp{" "}
                        {(
                          (item.products?.price || 0) * item.quantity
                        ).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rp {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Ongkir</span>
                    <span className="text-orange-500 font-semibold">Gratis</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-orange-500">
                    Rp {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
