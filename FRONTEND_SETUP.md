# Frontend Setup untuk Cart, Order, Pesanan, dan Review

Dokumentasi ini menjelaskan struktur frontend yang telah dibuat untuk mengelola Cart, Order, Pesanan, dan Review.

## Struktur Folder

```
src/
├── components/
│   └── admin/
│       ├── cart/
│       │   ├── index.jsx           # Main Cart Component
│       │   ├── CartModal.jsx        # Modal untuk Create/Edit
│       │   └── CartTableSkeleton.jsx # Loading skeleton
│       ├── order/
│       │   ├── index.jsx            # Main Order Component
│       │   ├── OrderModal.jsx       # Modal untuk Create/Edit
│       │   └── OrderTableSkeleton.jsx # Loading skeleton
│       ├── pesanan/
│       │   ├── index.jsx            # Main Pesanan Component
│       │   ├── PesananModal.jsx     # Modal untuk Create/Edit
│       │   └── PesananTableSkeleton.jsx # Loading skeleton
│       └── review/
│           ├── index.jsx            # Main Review Component
│           ├── ReviewModal.jsx      # Modal untuk Create/Edit
│           └── ReviewTableSkeleton.jsx # Loading skeleton
├── hooks/
│   ├── useCartManagement.js         # Cart state management
│   ├── useOrderManagement.js        # Order state management
│   ├── usePesananManagement.js      # Pesanan state management
│   └── useReviewManagement.js       # Review state management
└── service/
    ├── cart.service.js              # Cart API calls
    ├── order.service.js             # Order API calls
    ├── pesanan.service.js           # Pesanan API calls
    └── review.service.js            # Review API calls
```

## Fitur Setiap Module

### 1. Cart Management
- **Lihat**: View detail keranjang
- **Edit**: Update jumlah produk
- **Hapus**: Menghapus item dari keranjang
- **Tambah**: Menambah item baru ke keranjang

**Fields:**
- `quantity` (number) - Jumlah produk
- `product_id` (string) - ID produk
- `user_id` (string) - ID pengguna

### 2. Order Management
- **Lihat**: View detail order item
- **Edit**: Update jumlah order
- **Hapus**: Menghapus order item
- **Tambah**: Menambah order item baru

**Fields:**
- `quantity` (number) - Jumlah item
- `pesanan_id` (string) - ID pesanan
- `product_id` (string) - ID produk

### 3. Pesanan Management
- **Lihat**: View detail pesanan dengan info pengguna
- **Edit**: Update status dan total pesanan
- **Hapus**: Menghapus pesanan
- **Tambah**: Membuat pesanan baru

**Fields:**
- `status` (enum: pending, completed, cancelled) - Status pesanan
- `total_amount` (number) - Total harga pesanan

**Status Colors:**
- Pending: Warning (kuning)
- Completed: Success (hijau)
- Cancelled: Danger (merah)

### 4. Review Management
- **Lihat**: View detail review dengan rating stars
- **Edit**: Update rating dan review text
- **Hapus**: Menghapus review
- **Tambah**: Menambah review baru

**Fields:**
- `rating` (1-5) - Rating produk
- `review` (text) - Teks review
- `product_id` (string) - ID produk
- `user_id` (string) - ID pengguna

**Rating Display:**
- Menampilkan bintang (★) sesuai rating
- Bintang penuh untuk rating yang diberikan

## Cara Mengintegrasikan ke Admin Dashboard

### 1. Import Component
```jsx
import CartComponent from "@/components/admin/cart";
import OrderComponent from "@/components/admin/order";
import PesananComponent from "@/components/admin/pesanan";
import ReviewComponent from "@/components/admin/review";
```

### 2. Tambahkan ke Routes (jika menggunakan routing)
```jsx
// Contoh dengan React Router
<Route path="/admin/cart" element={<CartComponent />} />
<Route path="/admin/order" element={<OrderComponent />} />
<Route path="/admin/pesanan" element={<PesananComponent />} />
<Route path="/admin/review" element={<ReviewComponent />} />
```

### 3. Tambahkan ke Navigation Menu
```jsx
<NavLink to="/admin/cart">Manajemen Keranjang</NavLink>
<NavLink to="/admin/order">Manajemen Order</NavLink>
<NavLink to="/admin/pesanan">Manajemen Pesanan</NavLink>
<NavLink to="/admin/review">Manajemen Review</NavLink>
```

## API Endpoints yang Digunakan

### Cart
- `GET /carts` - Ambil semua keranjang
- `GET /carts/:id` - Ambil detail keranjang
- `POST /carts` - Buat keranjang baru
- `PUT /carts/:id` - Update keranjang
- `DELETE /carts/:id` - Hapus keranjang

### Order
- `GET /orders` - Ambil semua order
- `GET /orders/:id` - Ambil detail order
- `POST /orders` - Buat order baru
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Hapus order

### Pesanan
- `GET /pesanan` - Ambil semua pesanan
- `GET /pesanan/:id` - Ambil detail pesanan
- `POST /pesanan` - Buat pesanan baru
- `PUT /pesanan/:id` - Update pesanan
- `DELETE /pesanan/:id` - Hapus pesanan

### Review
- `GET /reviews` - Ambil semua review
- `GET /reviews/:id` - Ambil detail review
- `POST /reviews` - Buat review baru
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Hapus review

## Fitur Umum Setiap Component

1. **Pagination** - Menampilkan 5 item per halaman
2. **Loading State** - Skeleton loading saat data dimuat
3. **Empty State** - Pesan ketika tidak ada data
4. **View Modal** - Modal untuk melihat detail
5. **CRUD Modal** - Modal untuk Create/Edit
6. **Confirm Modal** - Konfirmasi sebelum delete
7. **Toast Notifications** - Notifikasi sukses/error

## Styling

Semua component menggunakan:
- **HeroUI Components** - UI components
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icons

## Notes

- Setiap component sudah terintegrasi dengan backend API
- Error handling dan toast notifications sudah included
- Loading states dan skeleton screens sudah tersedia
- Responsive design untuk mobile dan desktop
- Pagination untuk data yang banyak

## Troubleshooting

### API Error
Pastikan backend server sudah running dan endpoints sudah benar di `apiClient` configuration.

### Import Error
Pastikan path import sudah sesuai dengan struktur folder project Anda.

### Styling Issue
Pastikan Tailwind CSS dan HeroUI sudah terinstall dan dikonfigurasi dengan benar.
