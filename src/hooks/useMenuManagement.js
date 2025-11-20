import { useState, useEffect } from "react";
import { productService } from "../service/product.service";
import { toast } from "react-toastify";

export const useMenuManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);

  const priceRanges = [
    { label: "Semua Harga", min: 0, max: Infinity },
    { label: "< Rp 20.000", min: 0, max: 20000 },
    { label: "Rp 20.000 - Rp 40.000", min: 20000, max: 40000 },
    { label: "> Rp 40.000", min: 40000, max: Infinity },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getAll();
      setProducts(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      toast.error("Gagal memuat menu");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get unique categories from products
  const getCategories = () => {
    const categories = new Set(products.map((p) => p.category || "Lainnya"));
    return ["Semua", ...Array.from(categories)];
  };

  // Filter products based on search, category, and price
  useEffect(() => {
    const filtered = products.filter((item) => {
      const matchCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;
      const matchPrice =
        item.price >= priceRanges[selectedPriceRange].min &&
        item.price <= priceRanges[selectedPriceRange].max;
      const matchSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchCategory && matchPrice && matchSearch;
    });
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedPriceRange]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Semua");
    setSelectedPriceRange(0);
  };

  return {
    products,
    filteredProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    priceRanges,
    categories: getCategories(),
    resetFilters,
    fetchProducts,
  };
};
