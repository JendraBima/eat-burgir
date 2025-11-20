import { useState, useEffect } from "react";
import { pesananService } from "../service/pesanan.service";
import { toast } from "react-toastify";

export const usePesananManagement = () => {
  const [pesanans, setPesanans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedPesanan, setSelectedPesanan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pesananToDelete, setPesananToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPesanans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await pesananService.getAll();
      setPesanans(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch pesanans");
      toast.error("Gagal memuat data pesanan");
      console.error("Error fetching pesanans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPesanans();
  }, []);

  const pages = Math.ceil(pesanans.length / rowsPerPage);
  const items = pesanans.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const createPesanan = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await pesananService.create(formData);
      toast.success("Pesanan berhasil ditambahkan");
      await fetchPesanans();
      closeModal();
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menambahkan pesanan");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatePesanan = async (id, formData) => {
    try {
      setIsSubmitting(true);
      const response = await pesananService.update(id, formData);
      toast.success("Pesanan berhasil diupdate");
      await fetchPesanans();
      closeModal();
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengupdate pesanan");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (pesanan) => {
    setPesananToDelete(pesanan);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPesananToDelete(null);
  };

  const confirmDeletePesanan = async () => {
    if (!pesananToDelete) return;

    try {
      setIsDeleting(true);
      await pesananService.remove(pesananToDelete.id);
      toast.success("Pesanan berhasil dihapus");
      await fetchPesanans();
      closeDeleteModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus pesanan");
      console.error("Error deleting pesanan:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedPesanan(null);
    setIsModalOpen(true);
  };

  const openEditModal = (pesanan) => {
    setModalMode("edit");
    setSelectedPesanan(pesanan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPesanan(null);
    setModalMode("create");
  };

  const handleSubmit = async (formData) => {
    if (modalMode === "create") {
      return await createPesanan(formData);
    } else {
      return await updatePesanan(selectedPesanan.id, formData);
    }
  };

  return {
    pesanans,
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
    selectedPesanan,
    openCreateModal,
    openEditModal,
    closeModal,

    handleSubmit,
    fetchPesanans,
    isSubmitting,

    isDeleteModalOpen,
    pesananToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDeletePesanan,
  };
};
