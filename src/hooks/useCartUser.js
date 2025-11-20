import { useState, useEffect } from "react";
import { cartService } from "../service/cart.service";
import { useAuthStore } from "../store/use-auth";
import { toast } from "react-toastify";

export const useCartUser = () => {
  const { user } = useAuthStore();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await cartService.getAll();
      // Filter cart items for current user
      let userCartItems = response.data?.filter(
        (item) => item.user_id === user.id
      ) || [];
      
      // Jika backend tidak return products relation, fetch per item
      userCartItems = await Promise.all(
        userCartItems.map(async (item) => {
          if (!item.products) {
            try {
              const { productService } = await import("../service/product.service");
              const productRes = await productService.getById(item.product_id);
              return { ...item, products: productRes.data };
            } catch (err) {
              console.error("Error fetching product:", err);
              return item;
            }
          }
          return item;
        })
      );
      
      setCartItems(userCartItems);
    } catch (err) {
      setError(err.message || "Failed to fetch cart");
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCartItems();
    }
  }, [user?.id]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user?.id) {
      toast.error("Silakan login terlebih dahulu");
      return false;
    }

    try {
      const response = await cartService.create({
        product_id: productId,
        user_id: user.id,
        quantity,
      });
      setCartItems([...cartItems, response.data]);
      toast.success("Produk ditambahkan ke keranjang");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menambahkan ke keranjang");
      console.error("Error adding to cart:", err);
      return false;
    }
  };

  const updateCartItem = async (cartId, quantity) => {
    try {
      const response = await cartService.update(cartId, { quantity });
      setCartItems(
        cartItems.map((item) => (item.id === cartId ? response.data : item))
      );
      toast.success("Keranjang diperbarui");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal memperbarui keranjang");
      console.error("Error updating cart:", err);
      return false;
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await cartService.remove(cartId);
      setCartItems(cartItems.filter((item) => item.id !== cartId));
      toast.success("Produk dihapus dari keranjang");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus dari keranjang");
      console.error("Error removing from cart:", err);
      return false;
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.products?.price || 0) * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    fetchCartItems,
    isLoggedIn: !!user?.id,
  };
};
