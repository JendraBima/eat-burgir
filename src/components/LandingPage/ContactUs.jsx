/* eslint-disable */
import { motion } from "framer-motion";
import { Mail, Phone, Clock } from "lucide-react";

const ContactUs = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, delay: 0.5 },
    },
  };

  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-15 pt-20">
      <motion.div
        className="max-w-4xl w-full text-center pt-15g"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-[#D96F32] mb-2"
          variants={itemVariants}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="text-gray-700 text-md leading-relaxed max-w-4xl mx-auto mb-3"
          variants={itemVariants}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          fermentum lacus aliquet ante convallis, ut elementum eros pharetra. In
          nibh ligula, porttitor eget egestas suscipit, porttitor quis turpis.
          Nunc nulla ipsum, ornare vel imperdiet at, malesuada ac mauris.
        </motion.p>

        <motion.div
          className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl mx-auto border border-gray-200"
          variants={cardVariants}
        >
          <motion.h2
            className="text-3xl font-semibold text-[#D96F32] mb-6"
            variants={itemVariants}
          >
            Informasi Kontak
          </motion.h2>

          <motion.p
            className="text-gray-600 mb-10 leading-relaxed"
            variants={itemVariants}
          >
            Informasi lebih lanjut silahkan kunjungi atau hubungi kami sesuai
            dengan detail yang ada dibawah ini
          </motion.p>

          <div className="space-y-8">
            <motion.div
              className="flex items-center justify-start space-x-4"
              variants={contactItemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="bg-[#D96F32] p-3 rounded-2xl">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">eatburgir@gmail.com</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-start space-x-4"
              variants={contactItemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="bg-[#D96F32] p-3 rounded-2xl">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800">Telepon</h3>
                <p className="text-gray-600">+62 345 678 901</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-start space-x-4"
              variants={contactItemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="bg-[#D96F32] p-3 rounded-2xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800">
                  Jam Operasional
                </h3>
                <p className="text-gray-600">Senin-Jumat: 09:00 - 00:00</p>
                <p className="text-gray-600">Sabtu-Minggu: 10:00 - 21:00</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
