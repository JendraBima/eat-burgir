/* eslint-disable */
import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import Header from '../components/LandingPage/Header';
import Footer from '../components/LandingPage/Footer';
import { useNavigate } from 'react-router-dom';

const MenuShowPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');

  const navigate = useNavigate();

  /** LOAD MENU DATA */
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const mockMenu = [
          {
            id: 1,
            name: 'Classic Cheeseburger',
            description:
              'Daging sapi premium dengan keju leleh, selada segar, tomat, dan saus spesial',
            price: 35000,
            stock: 15,
            image:
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60',
            category: 'burger'
          },
          {
            id: 2,
            name: 'Chicken Burger',
            description:
              'Daging ayam goreng renyah dengan mayones dan selada segar',
            price: 30000,
            stock: 12,
            image:
              'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=60',
            category: 'burger'
          },
          {
            id: 3,
            name: 'French Fries',
            description: 'Kentang goreng renyah dengan bumbu rahasia',
            price: 15000,
            stock: 20,
            image:
              'https://images.unsplash.com/photo-1541592106381-bd51a0afb7c7?auto=format&fit=crop&w=500&q=60',
            category: 'side'
          },
          {
            id: 4,
            name: 'Soda Float',
            description: 'Minuman soda segar dengan es krim vanilla',
            price: 20000,
            stock: 25,
            image:
              'https://images.unsplash.com/photo-1551024601-bec78aea704c?auto=format&fit=crop&w=500&q=60',
            category: 'beverage'
          }
        ];

        setMenuItems(mockMenu);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading menu:', error);
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  /** ADD ITEM */
  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);

      if (exist) {
        if (exist.quantity >= item.stock) return prev;

        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  /** REMOVE ITEM */
  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === itemId);

      if (exist.quantity > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }

      return prev.filter((i) => i.id !== itemId);
    });
  };

  /** CART CALCULATION */
  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.quantity * item.price, 0);

  /** GO TO CHECKOUT */
  const goToCheckout = () => {
    if (cart.length === 0) return;

    navigate('/checkout', {
      state: {
        cart,
        total: getTotalPrice()
      }
    });
  };

  /** CATEGORY FILTER */
  const categories = [
    'Semua',
    'Burger',
    'Minuman',
    'Sajian Pendamping'
  ];

  const filteredMenuItems =
    activeCategory === 'Semua'
      ? menuItems
      : menuItems.filter(
          (item) =>
            item.category ===
            activeCategory.toLowerCase().replace(' ', '')
        );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D96F32]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Menu Kami
          </h1>

          {/* CATEGORY */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  activeCategory === category
                    ? 'bg-[#D96F32] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* MENU GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredMenuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />

                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-[#D96F32]">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-2 text-sm">
                    {item.description}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Stok: {item.stock}
                    </span>

                    <button
                      className="bg-[#D96F32] text-white px-4 py-2 rounded-full text-sm flex items-center hover:bg-[#c05a24]"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Tambah
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FLOATING CART BUTTON */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setShowCart(true)}
          className="bg-[#D96F32] text-white p-4 rounded-full shadow-lg hover:bg-[#c05a24] relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>

      {/* CART SIDEBAR */}
      {showCart && (
        <CartSidebar
          cart={cart}
          removeFromCart={removeFromCart}
          addToCart={addToCart}
          total={getTotalPrice()}
          onClose={() => setShowCart(false)}
          onCheckout={goToCheckout}
        />
      )}

      <Footer />
    </div>
  );
};

export default MenuShowPage;

/** CART SIDEBAR COMPONENT */
const CartSidebar = ({
  cart,
  addToCart,
  removeFromCart,
  total,
  onClose,
  onCheckout
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold">Keranjang</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <ShoppingCart className="mx-auto w-12 h-12 mb-4" />
              Keranjang kosong
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center mb-6">
                <img
                  src={item.image}
                  className="w-20 h-20 rounded border object-cover"
                />

                <div className="ml-4 flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>

                  <div className="flex items-center mt-2 border rounded">
                    <button
                      className="px-3 py-1"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="px-3">{item.quantity}</span>

                    <button
                      className="px-3 py-1"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t">
            <div className="flex justify-between text-lg font-medium mb-4">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-[#D96F32] text-white py-3 rounded-lg text-center font-medium hover:bg-[#c05a24]"
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
