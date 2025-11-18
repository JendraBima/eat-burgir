import { motion } from "framer-motion";
import { ShoppingCart, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

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
    category: "Burger",
  },
  {
    id: "2",
    name: "Burgir Cheese",
    price: 35000,
    image: "/burgir-menu.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    rating: 5,
    reviews: 98,
    category: "Burger",
  },
  {
    id: "3",
    name: "Burgir Deluxe",
    price: 45000,
    image: "/burgir-menu.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    rating: 4,
    reviews: 156,
    category: "Burger",
  },
  {
    id: "4",
    name: "Fries Classic",
    price: 15000,
    image: "/burgir-menu.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    rating: 5,
    reviews: 203,
    category: "Sides",
  },
];

const categories = ["Semua", "Burger", "Sides", "Drinks", "Dessert"];
const priceRanges = [
  { label: "Semua Harga", min: 0, max: Infinity },
  { label: "< Rp 20.000", min: 0, max: 20000 },
  { label: "Rp 20.000 - Rp 40.000", min: 20000, max: 40000 },
  { label: "> Rp 40.000", min: 40000, max: Infinity },
];

const MenuComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

  const filteredItems = menuItems.filter((item) => {
    const matchCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    const matchPrice = item.price >= priceRanges[selectedPriceRange].min && 
                       item.price <= priceRanges[selectedPriceRange].max;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchPrice && matchSearch;
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Menu Kami</h1>
          <p className="text-gray-600 text-lg">Pilih makanan favorit Anda</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-lg p-6 sticky top-24"
            >
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="text-orange-500" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Filter</h2>
              </div>

              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Cari Menu
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Cari..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                  Kategori
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                  Rentang Harga
                </label>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPriceRange(index)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm ${
                        selectedPriceRange === index
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory("Semua");
                  setSelectedPriceRange(0);
                  setSearchQuery("");
                }}
                className="w-full px-4 py-3 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
              >
                Reset Filter
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs font-semibold text-orange-600">{item.category}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${i < item.rating ? "opacity-100" : "opacity-30"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs ml-2">
                        ({item.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-500 block">Harga</span>
                        <span className="text-2xl font-bold text-orange-500">
                          Rp {item.price.toLocaleString()}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        <ShoppingCart size={20} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">Tidak ada menu yang sesuai dengan filter</p>
              </div>
            )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default MenuComponent;