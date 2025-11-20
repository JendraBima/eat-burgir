/* eslint-disable */
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
// import { useCart } from "../contexts/CartContext";

const menuItems = [
  {
    id: "1",
    name: "Burgir OG",
    price: 30000,
    image: "/burgir-menu.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    rating: 5,
    reviews: 127,
  },
  {
    id: "2",
    name: "Burgir OG",
    price: 30000,
    image: "/burgir-menu.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    rating: 5,
    reviews: 127,
  },
  {
    id: "3",
    name: "Burgir OG",
    price: 30000,
    image: "/burgir-menu.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    rating: 5,
    reviews: 127,
  },
];

export default function MenuPage() {
  //   const { dispatch } = useCart();

  //   const addToCart = (item: (typeof menuItems)[0]) => {
  //     dispatch({
  //       type: "ADD_ITEM",
  //       payload: {
  //         id: item.id,
  //         name: item.name,
  //         price: item.price,
  //         image: item.image,
  //       },
  //     });
  //   };

  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 px-4 md:py-20 md:px-6 bg-white "
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#D96F32] mb-4">Our Menu</h1>
            <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
              Setiap menu kami dibuat dari bahan segar pilihan dengan perpaduan
              rasa yang seimbang. Kami mengutamakan kualitas di setiap
              prosesnya, mulai dari pemilihan daging, dan sayuran.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl md:rounded-4xl shadow-lg md:shadow-xl drop-shadow-md md:drop-shadow-lg p-4 md:p-6 hover:bg-[#F8B259] duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 md:h-80 object-cover mx-auto rounded-lg mb-4"
                />
                <h3 className="text-lg md:text-2xl font-bold text-center text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm md:text-md mb-4 line-clamp-3">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-black">
                    {[...Array(item.rating)].map((_, i) => (
                      <span className="text-sm md:text-xl" key={i}>
                        ⭐
                      </span>
                    ))}
                    <span className="text-gray-500 mx-2 text-xs md:text-sm">
                      ({item.reviews} Ulasan)
                    </span>
                  </div>

                  <div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      // onClick={() => addToCart(item)}
                      className="text-black p-2 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 md:w-6 md:h-6" />
                    </motion.button>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between">
                  <span className="text-xl md:text-2xl font-bold text-orange-500">
                    Rp {item.price.toLocaleString()}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(item)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    Add to Cart
                  </motion.button>
                </div> */}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
