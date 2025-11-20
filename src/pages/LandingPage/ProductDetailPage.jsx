import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft, Star, Minus, Plus } from "lucide-react";
import { Skeleton } from "@heroui/react";
import { productService } from "../../service/product.service";
import { useCartUser } from "../../hooks/useCartUser";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/LandingPage/Footer";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { addToCart, isLoggedIn } = useCartUser();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getById(productId);
        setProduct(response.data);
      } catch (error) {
        toast.error("Gagal memuat detail produk");
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setIsAddingToCart(true);
    const success = await addToCart(productId, quantity);
    setIsAddingToCart(false);

    if (success) {
      setQuantity(1);
    }
  };

  const handleQuantityChange = (value) => {
    if (value > 0 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-20">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <Skeleton className="h-10 w-32 rounded-lg mb-8" />
            <div className="grid md:grid-cols-2 gap-12">
              <Skeleton className="h-96 rounded-3xl" />
              <div className="space-y-6">
                <Skeleton className="h-10 w-3/4 rounded-lg" />
                <Skeleton className="h-6 w-1/2 rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">Produk tidak ditemukan</p>
            <button
              onClick={() => navigate("/menu")}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Kembali ke Menu
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/menu")}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Menu
          </motion.button>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-12 mb-16"
          >
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-3xl blur-2xl opacity-20" />
                <img
                  src={product.image || "/placeholder-product.png"}
                  alt={product.name}
                  className="w-full h-auto rounded-3xl shadow-2xl relative z-10 object-cover"
                />
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center z-20">
                    <span className="text-white font-bold text-2xl">Habis</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              {/* Category Badge */}
              <div className="inline-flex w-fit mb-4">
                <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {product.category || "Produk"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-gray-500">(0 ulasan)</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {product.description || "Produk berkualitas tinggi dengan bahan-bahan pilihan terbaik."}
              </p>

              {/* Stock Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-8">
                <p className="text-blue-900">
                  <span className="font-semibold">Stok Tersedia:</span> {product.stock || 0} item
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-gray-500 text-sm mb-2">Harga</p>
                <p className="text-5xl font-bold text-orange-500">
                  Rp {product.price?.toLocaleString() || "0"}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <p className="text-gray-700 font-semibold mb-4">Jumlah</p>
                <div className="flex items-center gap-4 bg-gray-100 rounded-2xl p-2 w-fit">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1 || product.stock === 0}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-xl font-bold min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= (product.stock || 1) || product.stock === 0}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={24} />
                {isAddingToCart ? "Menambahkan..." : "Tambah ke Keranjang"}
              </motion.button>

              {/* Additional Info */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-500 text-sm mb-2">Kategori</p>
                    <p className="font-semibold text-gray-900">
                      {product.category || "Umum"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-2">Ketersediaan</p>
                    <p className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                      {product.stock > 0 ? "Tersedia" : "Habis"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Related Products Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 pt-12 border-t border-gray-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Produk Lainnya
            </h2>
            <div className="text-center text-gray-500">
              <p>Lihat menu lengkap untuk produk lainnya</p>
              <button
                onClick={() => navigate("/menu")}
                className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Kembali ke Menu
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
