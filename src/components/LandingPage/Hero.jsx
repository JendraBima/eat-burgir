import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-r from-[#F3E9DC] to-[#F8B259] overflow-hidden py-12 px-6 md:py-20 md:px-20 flex items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center text-center lg:text-left">
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 w-fit mb-6 lg:justify-start justify-center"
              >
                <span className="inline-block px-4 py-2 bg-[#D96F32] text-white text-xs font-semibold rounded">
                  Premium Burgers
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#D96F32] mb-6 leading-tight"
              >
                Just One Bite.
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg lg:text-lg text-black mb-8 leading-relaxed max-w-lg"
              >
                Di dunia penuh pilihan, kami percaya bahwa satu gigitan sudah cukup untuk membuat Anda jatuh cinta. Dengan satu gigitan, Anda akan merasakan perpaduan rasa yang tak terlupakan.
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 md:px-8 md:py-3 bg-[#D96F32] text-white font-medium rounded-lg md:rounded-[1vw] hover:bg-amber-700 transition-colors"
                >
                  Order Right Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              variants={imageVariants}
              className="flex justify-center items-center"
            >
              <div className="relative w-full max-w-md lg:max-w-none">
                <img
                  src="/hero-image.png"
                  alt="Delicious Burger"
                  className="w-full max-w-md md:max-w-lg lg:max-w-none h-auto lg:w-[1000px] lg:h-[550px] object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
