import { useState, useEffect } from "react";
import { productService } from "../service/product.service";
import { toast } from "react-toastify";

export const useProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getAll();
      setProducts(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      toast.error("Gagal memuat data produk");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pages = Math.ceil(products.length / rowsPerPage);

  const items = products.slice((page - 1) * rowsPerPage, page * rowsPerPage);


  const createProduct = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await productService.create(formData);
      toast.success("Produk berhasil ditambahkan");
      await fetchProducts();
      closeModal();
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menambahkan produk");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateProduct = async (id, formData) => {
    try {
      setIsSubmitting(true);
      const response = await productService.update(id, formData);
      toast.success("Produk berhasil diupdate");
      await fetchProducts();
      closeModal();
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengupdate produk");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Buka modal konfirmasi delete
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  // Tutup modal konfirmasi delete
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  // Konfirmasi delete produk
  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      setIsDeleting(true);
      await productService.remove(productToDelete.id);
      toast.success("Produk berhasil dihapus");
      await fetchProducts();
      closeDeleteModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus produk");
      console.error("Error deleting product:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalMode("create");
  };

  const handleSubmit = async (formData) => {
    if (modalMode === "create") {
      return await createProduct(formData);
    } else {
      return await updateProduct(selectedProduct.id, formData);
    }
  };

  return {
    products,
    items,
    loading,
    error,

    page,
    pages,
    rowsPerPage,
    setPage,
    setRowsPerPage,

    isModalOpen,
    modalMode,
    selectedProduct,
    openCreateModal,
    openEditModal,
    closeModal,

    handleSubmit,
    fetchProducts,
    isSubmitting,

    isDeleteModalOpen,
    productToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteProduct,
  };
};
