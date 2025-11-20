import { useState, useEffect } from "react";
import { cartService } from "../service/cart.service";
import { toast } from "react-toastify";

export const useCartManagement = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedCart, setSelectedCart] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cartToDelete, setCartToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCarts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartService.getAll();
      setCarts(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch carts");
      toast.error("Gagal memuat data keranjang");
      console.error("Error fetching carts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const pages = Math.ceil(carts.length / rowsPerPage);
  const items = carts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const createCart = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await cartService.create(formData);
      toast.success("Keranjang berhasil ditambahkan");
      await fetchCarts();
      closeModal();
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menambahkan keranjang");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateCart = async (id, formData) => {
    try {
      setIsSubmitting(true);
      const response = await cartService.update(id, formData);
      toast.success("Keranjang berhasil diupdate");
      await fetchCarts();
      closeModal();
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengupdate keranjang");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (cart) => {
    setCartToDelete(cart);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCartToDelete(null);
  };

  const confirmDeleteCart = async () => {
    if (!cartToDelete) return;

    try {
      setIsDeleting(true);
      await cartService.remove(cartToDelete.id);
      toast.success("Keranjang berhasil dihapus");
      await fetchCarts();
      closeDeleteModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus keranjang");
      console.error("Error deleting cart:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedCart(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cart) => {
    setModalMode("edit");
    setSelectedCart(cart);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCart(null);
    setModalMode("create");
  };

  const handleSubmit = async (formData) => {
    if (modalMode === "create") {
      return await createCart(formData);
    } else {
      return await updateCart(selectedCart.id, formData);
    }
  };

  return {
    carts,
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
    selectedCart,
    openCreateModal,
    openEditModal,
    closeModal,

    handleSubmit,
    fetchCarts,
    isSubmitting,

    isDeleteModalOpen,
    cartToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteCart,
  };
};
