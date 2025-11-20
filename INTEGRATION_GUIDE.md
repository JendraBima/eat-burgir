# Panduan Integrasi Cart, Order, Pesanan, dan Review ke Admin Dashboard

## ✅ Integrasi Sudah Selesai

Semua modul Cart, Order, Pesanan, dan Review sudah terintegrasi ke admin dashboard dengan routing dan sidebar menu.

## Struktur Folder yang Dibuat

```
src/
├── pages/admin/
│   ├── cart/
│   │   └── index.jsx          # Page wrapper untuk Cart
│   ├── order/
│   │   └── index.jsx          # Page wrapper untuk Order
│   ├── pesanan/
│   │   └── index.jsx          # Page wrapper untuk Pesanan
│   └── review/
│       └── index.jsx          # Page wrapper untuk Review
│
├── components/admin/
│   ├── cart/
│   │   ├── index.jsx
│   │   ├── CartModal.jsx
│   │   └── CartTableSkeleton.jsx
│   ├── order/
│   │   ├── index.jsx
│   │   ├── OrderModal.jsx
│   │   └── OrderTableSkeleton.jsx
│   ├── pesanan/
│   │   ├── index.jsx
│   │   ├── PesananModal.jsx
│   │   └── PesananTableSkeleton.jsx
│   └── review/
│       ├── index.jsx
│       ├── ReviewModal.jsx
│       └── ReviewTableSkeleton.jsx
│
├── hooks/
│   ├── useCartManagement.js
│   ├── useOrderManagement.js
│   ├── usePesananManagement.js
│   └── useReviewManagement.js
│
└── service/
    ├── cart.service.js
    ├── order.service.js
    ├── pesanan.service.js
    └── review.service.js
```

## File yang Diupdate

### 1. `src/lib/router.jsx`
**Perubahan:**
- Menambahkan import untuk 4 page baru (CartAdminPage, OrderAdminPage, PesananAdminPage, ReviewAdminPage)
- Menambahkan 4 route baru di dalam children admin routes:
  - `/admin/cart` → CartAdminPage
  - `/admin/order` → OrderAdminPage
  - `/admin/pesanan` → PesananAdminPage
  - `/admin/review` → ReviewAdminPage

### 2. `src/pages/admin/layout/DashboardConstant.jsx`
**Perubahan:**
- Menambahkan import icons: ShoppingCart, FileText, Star, Boxes
- Menambahkan 4 menu items baru di SIDEBAR_ADMIN:
  - Keranjang (ShoppingCart icon) → /admin/cart
  - Order (Boxes icon) → /admin/order
  - Pesanan (FileText icon) → /admin/pesanan
  - Review (Star icon) → /admin/review

## Menu Sidebar yang Tersedia

```
Dashboard          (LayoutDashboard icon)
Produk            (Package icon)
Keranjang         (ShoppingCart icon)  ← NEW
Order             (Boxes icon)          ← NEW
Pesanan           (FileText icon)       ← NEW
Review            (Star icon)           ← NEW
Profile           (User icon)
```

## Cara Mengakses

### Via Sidebar Menu
1. Login ke admin dashboard
2. Klik salah satu menu di sidebar:
   - **Keranjang** → Manajemen keranjang belanja
   - **Order** → Manajemen order items
   - **Pesanan** → Manajemen pesanan pelanggan
   - **Review** → Manajemen review produk

### Via URL
- `http://localhost:5173/admin/cart`
- `http://localhost:5173/admin/order`
- `http://localhost:5173/admin/pesanan`
- `http://localhost:5173/admin/review`

## Fitur Setiap Halaman

### 📦 Keranjang (/admin/cart)
- **Lihat**: Melihat detail keranjang
- **Tambah**: Menambah item ke keranjang
- **Edit**: Mengubah jumlah item
- **Hapus**: Menghapus item dari keranjang
- **Pagination**: 5 items per halaman

### 📋 Order (/admin/order)
- **Lihat**: Melihat detail order item
- **Tambah**: Menambah order item baru
- **Edit**: Mengubah jumlah order
- **Hapus**: Menghapus order item
- **Status**: Menampilkan status pesanan
- **Pagination**: 5 items per halaman

### 🛒 Pesanan (/admin/pesanan)
- **Lihat**: Melihat detail pesanan dengan info pelanggan
- **Tambah**: Membuat pesanan baru
- **Edit**: Mengubah status dan total pesanan
- **Hapus**: Menghapus pesanan
- **Status Colors**: 
  - Pending (Kuning)
  - Completed (Hijau)
  - Cancelled (Merah)
- **Pagination**: 5 items per halaman

### ⭐ Review (/admin/review)
- **Lihat**: Melihat detail review dengan rating stars
- **Tambah**: Menambah review baru
- **Edit**: Mengubah rating dan teks review
- **Hapus**: Menghapus review
- **Rating Display**: Menampilkan bintang (★) sesuai rating
- **Pagination**: 5 items per halaman

## API Endpoints yang Digunakan

### Cart API
```
GET    /carts              - Ambil semua keranjang
GET    /carts/:id          - Ambil detail keranjang
POST   /carts              - Buat keranjang baru
PUT    /carts/:id          - Update keranjang
DELETE /carts/:id          - Hapus keranjang
```

### Order API
```
GET    /orders             - Ambil semua order
GET    /orders/:id         - Ambil detail order
POST   /orders             - Buat order baru
PUT    /orders/:id         - Update order
DELETE /orders/:id         - Hapus order
```

### Pesanan API
```
GET    /pesanan            - Ambil semua pesanan
GET    /pesanan/:id        - Ambil detail pesanan
POST   /pesanan            - Buat pesanan baru
PUT    /pesanan/:id        - Update pesanan
DELETE /pesanan/:id        - Hapus pesanan
```

### Review API
```
GET    /reviews            - Ambil semua review
GET    /reviews/:id        - Ambil detail review
POST   /reviews            - Buat review baru
PUT    /reviews/:id        - Update review
DELETE /reviews/:id        - Hapus review
```

## Fitur Umum Setiap Halaman

✅ **Pagination** - Navigasi antar halaman data
✅ **Loading State** - Skeleton loading saat data dimuat
✅ **Empty State** - Pesan ketika tidak ada data
✅ **View Modal** - Modal untuk melihat detail
✅ **CRUD Modal** - Modal untuk Create/Edit
✅ **Confirm Modal** - Konfirmasi sebelum delete
✅ **Toast Notifications** - Notifikasi sukses/error
✅ **Responsive Design** - Mobile dan desktop friendly
✅ **Error Handling** - Penanganan error otomatis

## Teknologi yang Digunakan

- **React** - Frontend framework
- **React Router** - Routing
- **HeroUI** - UI Components
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icons
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Framer Motion** - Animations (optional)

## Troubleshooting

### Menu tidak muncul di sidebar
- Pastikan `DashboardConstant.jsx` sudah diupdate
- Clear browser cache dan reload halaman

### Route tidak ditemukan
- Pastikan `router.jsx` sudah diupdate dengan semua routes
- Restart development server

### API Error
- Pastikan backend server sudah running
- Cek konfigurasi API endpoint di `apiClient`
- Lihat console untuk error details

### Styling Issue
- Pastikan Tailwind CSS sudah dikonfigurasi
- Pastikan HeroUI sudah terinstall
- Clear Tailwind cache jika perlu

## Next Steps

1. ✅ Integrasi sudah selesai
2. Test setiap halaman di admin dashboard
3. Pastikan API endpoints sudah benar
4. Customize styling sesuai kebutuhan
5. Tambahkan fitur tambahan jika diperlukan

## Support

Jika ada masalah, cek:
1. Console browser (F12) untuk error messages
2. Network tab untuk API calls
3. Backend logs untuk server errors
4. Dokumentasi HeroUI untuk component usage

---

**Status**: ✅ Integrasi Selesai
**Last Updated**: Nov 20, 2025
