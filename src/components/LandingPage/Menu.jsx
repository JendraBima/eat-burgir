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
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              ut fermentum lorem magna aliq convallis, at eleifendum eros
              placerat lorem porttitor eget consectetur tortor nisl
              pellentesque.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-4xl shadow-xl drop-shadow-lg p-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-80 mx-auto"
                />
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-md mb-4">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-black">
                    {[...Array(item.rating)].map((_, i) => (
                      <span className="text-xl" key={i}>
                        ★
                      </span>
                    ))}
                    <span className="text-gray-500 mx-2 text-sm">
                      ({item.reviews} Ulasan)
                    </span>
                  </div>

                  <div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      // onClick={() => addToCart(item)}
                      className="text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <ShoppingCart />
                    </motion.button>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-500">
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
