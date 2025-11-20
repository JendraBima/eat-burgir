# 📦 Fix: Product Stock & Image Update Bug

## ✅ Masalah yang Diperbaiki

### 1. **Bug Gambar Hilang Saat Update** ❌ → ✅
**Masalah**: Ketika update produk tanpa mengubah gambar, gambar akan hilang/null
**Penyebab**: Backend selalu set `image: imageUrl` menjadi null jika tidak ada file baru

**Solusi**:
- Fetch gambar existing dari database terlebih dahulu
- Hanya update field `image` jika ada file baru
- Jika tidak ada file baru, pertahankan gambar lama

### 2. **Stock Field Belum Ada di CRUD** ❌ → ✅
**Masalah**: Field stock tidak bisa diisi saat create/edit produk
**Solusi**: Tambahkan stock field di frontend dan backend

## 📝 Perubahan Backend

### File: `src/controller/produk.controller.js`

#### Create Function
```javascript
// BEFORE
const { name, description, price } = req.body;

// AFTER
const { name, description, price, stock } = req.body;

// Tambahkan ke insert
{
  name,
  description,
  price: parsedPrice,
  image: imageUrl,
  stock,  // ← NEW
}
```

#### Update Function (FIXED)
```javascript
// BEFORE - BUG: Gambar selalu di-set ke null jika tidak ada file
let imageUrl = req.body.image || null;
// ... logic upload file ...
const { data, error } = await supabase
  .from("products")
  .update({
    name,
    description,
    price: parsedPrice,
    image: imageUrl,  // ← BUG: Ini selalu null jika tidak ada file baru
    updated_at: new Date(),
  })

// AFTER - FIXED: Pertahankan gambar lama jika tidak ada file baru
const { data: product } = await supabase
  .from("products")
  .select("image")
  .eq("id", id)
  .single();

let imageUrl = product?.image || null;  // ← Mulai dari gambar existing

if (req.file) {
  // Delete old image
  // Upload new image
  imageUrl = publicUrlData.publicUrl;
}

const updateData = {
  name,
  description,
  price: parsedPrice,
  stock: parsedStock,  // ← NEW
  updated_at: new Date(),
};

// Only update image if it changed
if (req.file) {
  updateData.image = imageUrl;
}

const { data, error } = await supabase
  .from("products")
  .update(updateData)  // ← Hanya update image jika ada file baru
```

## 📝 Perubahan Frontend

### File: `src/components/admin/product/ProductModal.jsx`

#### Default Values
```javascript
// BEFORE
defaultValues: {
  name: "",
  description: "",
  price: "",
}

// AFTER
defaultValues: {
  name: "",
  description: "",
  price: "",
  stock: "",  // ← NEW
}
```

#### Set Values pada Edit
```javascript
// BEFORE
setValue("name", product.name || "");
setValue("description", product.description || "");
setValue("price", product.price || "");

// AFTER
setValue("name", product.name || "");
setValue("description", product.description || "");
setValue("price", product.price || "");
setValue("stock", product.stock || "");  // ← NEW
```

#### Form Data
```javascript
// BEFORE
const submitData = new FormData();
submitData.append("name", data.name);
submitData.append("description", data.description || "");
submitData.append("price", data.price);

// AFTER
const submitData = new FormData();
submitData.append("name", data.name);
submitData.append("description", data.description || "");
submitData.append("price", data.price);
submitData.append("stock", data.stock);  // ← NEW
```

#### Input Field
```javascript
// BEFORE - Tidak ada

// AFTER - Stock Input
<Input
  label="Stock"
  placeholder="Masukkan jumlah stock"
  type="number"
  variant="bordered"
  isInvalid={!!errors.stock}
  errorMessage={errors.stock?.message}
  {...register("stock", {
    required: "Stock wajib diisi",
    min: { value: 0, message: "Stock tidak boleh negatif" },
  })}
/>
```

## 🔄 Flow Setelah Fix

### Create Product
```
Form Input
├─ Nama
├─ Deskripsi
├─ Harga
├─ Stock ← NEW
└─ Gambar
    ↓
FormData {
  name,
  description,
  price,
  stock,  ← NEW
  image (file)
}
    ↓
Backend Create
├─ Upload gambar
├─ Insert ke DB dengan stock
└─ Return produk baru
```

### Update Product
```
Form Input (pre-filled)
├─ Nama
├─ Deskripsi
├─ Harga
├─ Stock ← NEW
└─ Gambar (optional)
    ↓
FormData {
  name,
  description,
  price,
  stock,  ← NEW
  image (file - optional)
}
    ↓
Backend Update
├─ Fetch existing product (untuk get gambar lama)
├─ Jika ada file baru:
│  ├─ Delete gambar lama
│  ├─ Upload gambar baru
│  └─ Set updateData.image = gambar baru
├─ Jika tidak ada file baru:
│  └─ Jangan update field image (pertahankan gambar lama)
├─ Update stock ← NEW
└─ Return produk updated
```

## ✅ Testing Checklist

### Create Product
- [ ] Isi semua field termasuk stock
- [ ] Upload gambar
- [ ] Klik "Tambah"
- [ ] Produk muncul di list dengan stock benar
- [ ] Gambar tampil dengan benar

### Update Product - Dengan Gambar Baru
- [ ] Edit produk
- [ ] Ubah nama/deskripsi/harga/stock
- [ ] Upload gambar baru
- [ ] Klik "Update"
- [ ] Produk terupdate dengan gambar baru
- [ ] Stock terupdate

### Update Product - Tanpa Gambar Baru (CRITICAL)
- [ ] Edit produk
- [ ] Ubah hanya nama/deskripsi/harga/stock
- [ ] **JANGAN** upload gambar baru
- [ ] Klik "Update"
- [ ] ✅ Gambar TETAP ada (tidak hilang)
- [ ] ✅ Stock terupdate
- [ ] ✅ Data lain terupdate

## 🐛 Debugging

Jika masih ada masalah:

### Gambar masih hilang
1. Cek backend logs saat update
2. Verifikasi kondisi `if (req.file)` di update function
3. Pastikan `updateData` tidak selalu include `image`
4. Cek database apakah gambar lama masih ada

### Stock tidak tersimpan
1. Cek form validation
2. Verifikasi `stock` di FormData
3. Cek backend logs
4. Verifikasi database schema punya column `stock`

### Validasi error
1. Pastikan stock adalah number
2. Stock tidak boleh negatif
3. Stock harus diisi (required)

## 📊 Database Schema

```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,  -- ← NEW
  image VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## 🔐 Validation Rules

### Stock Field
- **Type**: Number (integer)
- **Required**: Yes
- **Min**: 0
- **Max**: No limit
- **Error Messages**:
  - "Stock wajib diisi" (required)
  - "Stock tidak boleh negatif" (min validation)

## 💡 Best Practices

1. **Always fetch existing data** sebelum update
2. **Only update changed fields** untuk efficiency
3. **Validate input** di frontend dan backend
4. **Handle file uploads carefully** untuk avoid data loss
5. **Test update tanpa file** untuk ensure image persistence

## 📚 Related Files

- `src/components/admin/product/index.jsx` - Product management component
- `src/service/product.service.js` - Product API service
- Backend: `src/controller/produk.controller.js` - Product controller

---

**Status**: ✅ Stock & Image Bug Fixed
**Last Updated**: Nov 20, 2025
**Version**: 1.0.0
