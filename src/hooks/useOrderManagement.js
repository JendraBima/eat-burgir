import { useState, useEffect } from "react";
import { orderService } from "../service/order.service";
import { toast } from "react-toastify";

export const useOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getAll();
      setOrders(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch orders");
      toast.error("Gagal memuat data order");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const pages = Math.ceil(orders.length / rowsPerPage);
  const items = orders.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const createOrder = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await orderService.create(formData);
      toast.success("Order berhasil ditambahkan");
      await fetchOrders();
      closeModal();
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menambahkan order");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateOrder = async (id, formData) => {
    try {
      setIsSubmitting(true);
      const response = await orderService.update(id, formData);
      toast.success("Order berhasil diupdate");
      await fetchOrders();
      closeModal();
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengupdate order");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  const confirmDeleteOrder = async () => {
    if (!orderToDelete) return;

    try {
      setIsDeleting(true);
      await orderService.remove(orderToDelete.id);
      toast.success("Order berhasil dihapus");
      await fetchOrders();
      closeDeleteModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus order");
      console.error("Error deleting order:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const openEditModal = (order) => {
    setModalMode("edit");
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setModalMode("create");
  };

  const handleSubmit = async (formData) => {
    if (modalMode === "create") {
      return await createOrder(formData);
    } else {
      return await updateOrder(selectedOrder.id, formData);
    }
  };

  return {
    orders,
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
    selectedOrder,
    openCreateModal,
    openEditModal,
    closeModal,

    handleSubmit,
    fetchOrders,
    isSubmitting,

    isDeleteModalOpen,
    orderToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteOrder,
  };
};
