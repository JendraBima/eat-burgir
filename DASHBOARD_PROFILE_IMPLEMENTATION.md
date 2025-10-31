# Dashboard & Profile Implementation

## Overview
Implementasi halaman Dashboard dengan ApexCharts dan Edit Profile dengan struktur terpisah antara UI dan logic (seperti Product).

## 📦 Package yang Perlu Diinstall

```bash
npm install apexcharts react-apexcharts
```

## 🗂️ Struktur File

### 1. **Services**
- `src/service/user.service.js` - API service untuk user (GET, PUT, upload image)

### 2. **Hooks (Logic Layer)**
- `src/hooks/useProfile.js` - Logic untuk profile management
- `src/hooks/useDashboard.js` - Logic untuk dashboard data

### 3. **Components (UI Layer)**

#### Dashboard Components
- `src/components/admin/dashboard/index.jsx` - Main dashboard component
- `src/components/admin/dashboard/StatsCard.jsx` - Card untuk statistik
- `src/components/admin/dashboard/SalesChart.jsx` - Chart penjualan (Area Chart)
- `src/components/admin/dashboard/RevenueChart.jsx` - Chart pendapatan (Bar Chart)
- `src/components/admin/dashboard/TopProducts.jsx` - List produk terlaris

#### Profile Components
- `src/components/admin/profile/index.jsx` - Main profile component
- `src/components/admin/profile/ProfileForm.jsx` - Form edit profile

### 4. **Pages**
- `src/pages/admin/index.jsx` - Dashboard page
- `src/pages/admin/profile/index.jsx` - Profile page

## 🎯 Fitur

### Dashboard
1. **Stats Cards**
   - Total Produk
   - Total Penjualan
   - Total Pendapatan
   - Total Pelanggan

2. **Charts (ApexCharts)**
   - **Sales Chart**: Area chart untuk visualisasi penjualan bulanan
   - **Revenue Chart**: Bar chart untuk visualisasi pendapatan bulanan

3. **Top Products**
   - List 5 produk terlaris
   - Progress bar untuk visualisasi
   - Total penjualan dan revenue per produk

### Edit Profile
1. **Upload Foto Profil**
   - Preview image
   - Validasi format (JPG, PNG, WEBP)
   - Validasi ukuran (max 2MB)
   - Reset foto

2. **Edit Informasi**
   - Nama Lengkap (required)
   - Nomor Telepon
   - Alamat

3. **Read-only Info**
   - Role
   - User ID

## 🔌 API Endpoints

### User Profile
```javascript
// GET user by ID
GET /users/{id}
Response: {
  status: true,
  pesan: "Berhasil mengambil users",
  data: {
    id: "uuid",
    name: "string",
    role: "admin",
    phone: "string",
    address: "string",
    image: "url",
    created_at: "timestamp",
    updated_at: "timestamp"
  }
}

// PUT update user
PUT /users/{id}
Body: {
  name: "string",
  phone: "string",
  address: "string",
  image: "url"
}

// POST upload avatar
POST /upload/avatar
Body: FormData with "image" field
Response: {
  status: true,
  data: {
    url: "image_url"
  }
}
```

## 🎨 UI/UX Features

### Dashboard
- Responsive grid layout
- Loading skeleton
- Color-coded stats cards
- Interactive charts dengan tooltip
- Smooth animations

### Profile
- Avatar preview dengan camera icon
- Form validation
- Loading states
- Success/error toast notifications
- Reset image functionality

## 🔄 Data Flow

### Profile Update Flow
1. User mengisi form
2. Jika ada file image baru → Upload image terlebih dahulu
3. Update profile dengan data baru + image URL
4. Refresh auth store untuk update user data
5. Refresh profile data
6. Show success notification

### Dashboard Data Flow
1. Fetch products dari API
2. Generate dummy sales data (untuk demo)
3. Calculate statistics
4. Render charts dan components

## 🚀 Usage

### Akses Dashboard
```
/admin - Dashboard page (default)
```

### Akses Profile
```
/admin/profile - Edit profile page
```

### Navigasi ke Profile
Klik pada user info card di sidebar (bagian bawah) untuk navigate ke profile page.

## 📝 Notes

- Dashboard menggunakan **dummy data** untuk sales dan revenue
- Data produk diambil dari API real
- Profile image upload memerlukan endpoint `/upload/avatar` di backend
- Semua request menggunakan `withCredentials: true` untuk cookie-based auth

## 🎯 Separation of Concerns

Struktur mengikuti pattern yang sama dengan Product:
- **Service Layer**: API calls
- **Hook Layer**: Business logic & state management
- **Component Layer**: UI presentation
- **Page Layer**: Route wrapper

Ini memudahkan:
- Testing
- Maintenance
- Reusability
- Scalability
