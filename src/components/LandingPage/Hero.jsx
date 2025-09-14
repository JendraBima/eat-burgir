/* eslint-disable */
import { Link } from "react-router";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-screen bg-gradient-to-r from-[#F3E9DC] to-[#F8B259] py-20 px-20 flex items-center justify-center"
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-xl"
        >
          <div className="bg-[#D96F32] text-white px-3 py-2 rounded text-sm font-medium mb-4 inline-block w-full h-3 max-w-52" />

          <h1 className="text-7xl text-[#D96F32] font-extrabold mb-4">
            Just One Bite.
          </h1>
          <p className="text-black mb-8 text-2xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            fermentum lacus aliquet ante convallis, ut elementum eros pharetra.
            In nibh ligula, porttitor eget egestas suscipit, porttitor quis
            turpis.
          </p>
          <Link
            to="/menu"
            className="bg-[#D96F32] text-white px-8 py-3 rounded-xl font-medium hover:bg-amber-700 transition-colors inline-block"
          >
            Order Right Now
          </Link>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className=" flex justify-center "
        >
          <img
            src="/hero-image.png"
            alt="Delicious Burger"
            className="w-[1000px] h-[740px] object-cover"
          />
        </motion.div>
      </motion.section>
    </>
  );
};

export default Hero;
