# Dokumentasi Integrasi Frontend-Backend Menu & Keranjang

## 📋 Ringkasan Perubahan

Integrasi lengkap antara frontend dan backend untuk:
- ✅ Menu dengan filter harga dan search
- ✅ Detail produk dengan desain clean
- ✅ Keranjang belanja per user
- ✅ Manajemen cart (add, update, remove)

## 🏗️ Struktur Folder yang Dibuat

```
src/
├── hooks/
│   ├── useMenuManagement.js      # Hook untuk menu & filter
│   └── useCartUser.js             # Hook untuk cart per user
├── pages/
│   ├── LandingPage/
│   │   ├── ProductDetailPage.jsx  # Halaman detail produk
│   │   └── ui/MenuComponent.jsx   # Menu dengan filter (updated)
│   └── CartPage.jsx               # Halaman keranjang belanja
└── service/
    ├── cart.service.js            # API calls untuk cart
    └── product.service.js         # API calls untuk produk
```

## 🔄 Alur Integrasi

### 1. Menu Page (/menu)
```
MenuComponent
├── useMenuManagement() → Fetch produk dari backend
├── Filter berdasarkan:
│   ├── Search query
│   ├── Kategori
│   └── Rentang harga
└── Klik produk → Detail page
    Klik "Tambah ke Keranjang" → Add to cart
```

### 2. Detail Produk (/menu/:productId)
```
ProductDetailPage
├── Fetch detail produk dari backend
├── Tampilkan:
│   ├── Gambar produk
│   ├── Deskripsi lengkap
│   ├── Harga
│   ├── Stok
│   └── Rating (placeholder)
└── Tombol "Tambah ke Keranjang"
    └── useCartUser.addToCart()
```

### 3. Keranjang (/cart)
```
CartPage
├── useCartUser() → Fetch cart items user
├── Tampilkan:
│   ├── Daftar produk di keranjang
│   ├── Harga per item
│   ├── Total harga
│   └── Tombol checkout
└── Aksi:
    ├── Update quantity
    ├── Remove item
    └── Checkout
```

## 📡 API Endpoints yang Digunakan

### Product API
```
GET    /products              # Ambil semua produk
GET    /products/:id          # Ambil detail produk
POST   /products              # Buat produk (admin)
PUT    /products/:id          # Update produk (admin)
DELETE /products/:id          # Hapus produk (admin)
```

### Cart API
```
GET    /carts                 # Ambil semua cart
GET    /carts/:id             # Ambil detail cart
POST   /carts                 # Tambah ke cart
PUT    /carts/:id             # Update quantity
DELETE /carts/:id             # Hapus dari cart
```

## 🎯 Fitur Utama

### Menu & Filter
- **Search**: Cari produk berdasarkan nama
- **Filter Kategori**: Tampilkan produk per kategori
- **Filter Harga**: 4 range harga yang dapat dipilih
- **Reset Filter**: Kembalikan ke tampilan awal
- **Loading State**: Skeleton loading saat fetch data
- **Empty State**: Pesan ketika tidak ada hasil

### Detail Produk
- **Gambar Produk**: Dengan hover effect
- **Informasi Lengkap**: Nama, deskripsi, harga, stok
- **Quantity Selector**: Pilih jumlah sebelum add to cart
- **Stock Check**: Tampilkan status stok
- **Back Button**: Kembali ke menu
- **Responsive Design**: Mobile & desktop friendly

### Keranjang
- **Cart Items**: Daftar produk dengan gambar & harga
- **Quantity Management**: Tambah/kurangi jumlah
- **Remove Item**: Hapus produk dari keranjang
- **Order Summary**: Ringkasan total harga
- **Checkout Button**: Lanjut ke pembayaran
- **Empty State**: Pesan ketika keranjang kosong
- **User-Specific**: Hanya tampilkan cart user yang login

## 🔐 Authentication

### Login Required
- Halaman `/cart` memerlukan login
- Tombol "Tambah ke Keranjang" redirect ke login jika belum login
- Cart data difilter berdasarkan `user_id` yang login

### User Identification
```javascript
const { user } = useAuthStore();
// user.id digunakan untuk filter cart items
```

## 📊 Data Schema

### Products Table
```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  stock INTEGER DEFAULT 0,
  image VARCHAR,
  category VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Carts Table
```sql
CREATE TABLE carts (
  id BIGINT PRIMARY KEY,
  quantity INTEGER DEFAULT 1,
  product_id BIGINT FOREIGN KEY,
  user_id UUID FOREIGN KEY,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## 🎨 UI/UX Features

### Animations
- Framer Motion untuk smooth transitions
- Hover effects pada produk
- Loading skeletons
- Staggered animations

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly buttons
- Flexible grid layouts

### Color Scheme
- Primary: Orange (#D96F32, #F8B259)
- Secondary: Gray (various shades)
- Accent: Amber
- Status: Green (available), Red (out of stock)

## 🚀 Routes

```
/                    → Landing page
/menu                → Menu dengan filter
/menu/:productId     → Detail produk
/cart                → Keranjang belanja
/login               → Login page
/register            → Register page
/admin               → Admin dashboard
/admin/produk        → Manajemen produk (admin)
/admin/cart          → Manajemen cart (admin)
/admin/order         → Manajemen order (admin)
/admin/pesanan       → Manajemen pesanan (admin)
/admin/review        → Manajemen review (admin)
```

## 🔧 Hooks yang Digunakan

### useMenuManagement()
```javascript
const {
  products,              // Semua produk dari backend
  filteredProducts,      // Produk yang sudah difilter
  loading,              // Loading state
  error,                // Error message
  searchQuery,          // Search input value
  setSearchQuery,       // Update search
  selectedCategory,     // Kategori terpilih
  setSelectedCategory,  // Update kategori
  selectedPriceRange,   // Range harga terpilih
  setSelectedPriceRange, // Update range harga
  priceRanges,          // Array range harga
  categories,           // Array kategori
  resetFilters,         // Reset semua filter
  fetchProducts,        // Refetch produk
} = useMenuManagement();
```

### useCartUser()
```javascript
const {
  cartItems,           // Array cart items user
  loading,             // Loading state
  error,               // Error message
  addToCart,           // Fungsi tambah ke cart
  updateCartItem,      // Fungsi update quantity
  removeFromCart,      // Fungsi hapus dari cart
  getTotalPrice,       // Fungsi hitung total harga
  getTotalItems,       // Fungsi hitung total item
  fetchCartItems,      // Refetch cart items
  isLoggedIn,          // Boolean user login status
} = useCartUser();
```

## 📝 Contoh Penggunaan

### Menambah ke Keranjang
```javascript
const { addToCart, isLoggedIn } = useCartUser();

const handleAddToCart = async (productId) => {
  if (!isLoggedIn) {
    navigate("/login");
    return;
  }
  await addToCart(productId, 1);
};
```

### Filter Menu
```javascript
const {
  filteredProducts,
  setSearchQuery,
  setSelectedCategory,
  setSelectedPriceRange,
} = useMenuManagement();

// Search
setSearchQuery("burger");

// Filter kategori
setSelectedCategory("Burger");

// Filter harga
setSelectedPriceRange(2); // Rp 20.000 - Rp 40.000
```

## ⚙️ Konfigurasi Backend

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### API Client Setup
```javascript
// src/helpers/API.js
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

## 🧪 Testing Checklist

- [ ] Menu page load dengan produk dari backend
- [ ] Filter search berfungsi
- [ ] Filter kategori berfungsi
- [ ] Filter harga berfungsi
- [ ] Reset filter berfungsi
- [ ] Klik produk membuka detail page
- [ ] Detail produk menampilkan info lengkap
- [ ] Quantity selector berfungsi
- [ ] Tambah ke cart berhasil (user login)
- [ ] Redirect ke login jika belum login
- [ ] Cart page menampilkan items user
- [ ] Update quantity di cart berfungsi
- [ ] Remove item dari cart berfungsi
- [ ] Total harga dihitung dengan benar
- [ ] Responsive di mobile & desktop

## 🐛 Troubleshooting

### Menu tidak load
- Pastikan backend API running
- Cek console untuk error messages
- Verifikasi API endpoint di service

### Cart tidak menyimpan
- Pastikan user sudah login
- Cek user_id di localStorage
- Verifikasi cart API endpoint

### Filter tidak bekerja
- Clear browser cache
- Reload halaman
- Cek data produk di backend

### Styling issue
- Pastikan Tailwind CSS compiled
- Clear Tailwind cache: `npm run build`
- Restart dev server

## 📚 Dependencies

- `react-router` - Routing
- `framer-motion` - Animations
- `axios` - HTTP client
- `react-toastify` - Notifications
- `@heroui/react` - UI components
- `tailwindcss` - Styling
- `lucide-react` - Icons

## 🔄 Next Steps

1. ✅ Frontend menu & filter terintegrasi
2. ✅ Detail produk page dibuat
3. ✅ Cart functionality implemented
4. ⏳ Checkout page (coming soon)
5. ⏳ Payment integration (coming soon)
6. ⏳ Order history (coming soon)

## 📞 Support

Jika ada masalah:
1. Cek browser console (F12)
2. Cek network tab untuk API calls
3. Lihat backend logs
4. Verifikasi database schema
5. Restart dev server

---

**Status**: ✅ Integrasi Frontend-Backend Selesai
**Last Updated**: Nov 20, 2025
