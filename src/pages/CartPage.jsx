import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCartUser } from "../hooks/useCartUser";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/LandingPage/Footer";
import { Skeleton } from "@heroui/react";
import { useState } from "react";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    loading,
    updateCartItem,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    isLoggedIn,
  } = useCartUser();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Silakan Login Terlebih Dahulu
            </h1>
            <p className="text-gray-600 mb-6">
              Anda perlu login untuk melihat keranjang belanja
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Login Sekarang
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleQuantityChange = async (cartId, newQuantity) => {
    if (newQuantity > 0) {
      await updateCartItem(cartId, newQuantity);
    }
  };

  const handleRemove = async (cartId) => {
    await removeFromCart(cartId);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Keranjang kosong");
      return;
    }
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <button
              onClick={() => navigate("/menu")}
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Lanjut Belanja
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Keranjang Belanja</h1>
            <p className="text-gray-600 mt-2">
              {getTotalItems()} item dalam keranjang Anda
            </p>
          </motion.div>

          {loading ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 rounded-2xl" />
                ))}
              </div>
              <Skeleton className="h-96 rounded-2xl" />
            </div>
          ) : cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag size={80} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Keranjang Anda Kosong
              </h2>
              <p className="text-gray-600 mb-8">
                Mulai berbelanja dan tambahkan produk ke keranjang Anda
              </p>
              <button
                onClick={() => navigate("/menu")}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Mulai Belanja
              </button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-xl overflow-hidden">
                        <img
                          src={item.products?.image || "/placeholder-product.png"}
                          alt={item.products?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {item.products?.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3">
                          {item.products?.category || "Produk"}
                        </p>
                        <p className="text-2xl font-bold text-orange-500">
                          Rp {item.products?.price?.toLocaleString() || "0"}
                        </p>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex flex-col items-end justify-between">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-1 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="mt-4 pt-4 border-t border-gray-200 text-right">
                      <p className="text-gray-600 text-sm mb-1">Subtotal</p>
                      <p className="text-xl font-bold text-gray-900">
                        Rp{" "}
                        {(
                          (item.products?.price || 0) * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

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
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({getTotalItems()} item)</span>
                      <span>Rp {getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Ongkir</span>
                      <span className="text-orange-500 font-semibold">Gratis</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-bold text-orange-500">
                      Rp {getTotalPrice().toLocaleString()}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={isProcessing || cartItems.length === 0}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Memproses..." : "Lanjut ke Checkout"}
                  </motion.button>

                  <button
                    onClick={() => navigate("/menu")}
                    className="w-full mt-4 border-2 border-orange-500 text-orange-500 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
                  >
                    Lanjut Belanja
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
