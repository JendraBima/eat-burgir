/* eslint-disable */

import { motion } from "framer-motion";
import {
  CheckCircle,
  Utensils,
  DollarSign,
  Search,
  ShoppingCart,
} from "lucide-react";

const FeaturesPage = () => {
  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      title: "Bahan Segar & Berkualitas",
      description:
        "Daging 100% asli tanpa campuran, sayuran segar yang dipilih langsung dari pemasok terpercaya, dan roti lembut buatan sendiri. Menjamin rasa otentik dan lebih sehat bagi konsumen.",
    },
    {
      icon: <Utensils className="w-8 h-8 text-white" />,
      title: "Rasa Unik & Variasi Menu",
      description:
        "Daging 100% asli tanpa campuran, sayuran segar yang dipilih langsung dari pemasok terpercaya, dan roti lembut buatan sendiri. Menjamin rasa otentik dan lebih sehat bagi konsumen.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-white" />,
      title: "Harga Terjangkau dengan Porsi Mengenyangkan",
      description:
        "Memberikan value terbaik bagi pelanggan: harga ramah di kantong tapi tetap dengan kualitas premium. Membuat konsumen merasa puas dan ingin kembali lagi.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-orange-300 to-orange-400 rounded-3xl p-12 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-8"
          >
            Kenapa Sih Harus EatBurgir ?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white text-lg md:text-xl mb-16 max-w-4xl mx-auto leading-relaxed"
          >
            EatBurgir hadir menawarkan burger premium dengan harga terjangkau,
            bahan berkualitas, resep khas, dan pelayanan ramah untuk pengalaman
            kuliner yang menyenangkan.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesPage;
