import { useState, useEffect } from "react";
import { reviewService } from "../service/review.service";
import { toast } from "react-toastify";

export const useReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedReview, setSelectedReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reviewService.getAll();
      setReviews(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch reviews");
      toast.error("Gagal memuat data review");
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const pages = Math.ceil(reviews.length / rowsPerPage);
  const items = reviews.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const createReview = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await reviewService.create(formData);
      toast.success("Review berhasil ditambahkan");
      await fetchReviews();
      closeModal();
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menambahkan review");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateReview = async (id, formData) => {
    try {
      setIsSubmitting(true);
      const response = await reviewService.update(id, formData);
      toast.success("Review berhasil diupdate");
      await fetchReviews();
      closeModal();
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengupdate review");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (review) => {
    setReviewToDelete(review);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  const confirmDeleteReview = async () => {
    if (!reviewToDelete) return;

    try {
      setIsDeleting(true);
      await reviewService.remove(reviewToDelete.id);
      toast.success("Review berhasil dihapus");
      await fetchReviews();
      closeDeleteModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus review");
      console.error("Error deleting review:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedReview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (review) => {
    setModalMode("edit");
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
    setModalMode("create");
  };

  const handleSubmit = async (formData) => {
    if (modalMode === "create") {
      return await createReview(formData);
    } else {
      return await updateReview(selectedReview.id, formData);
    }
  };

  return {
    reviews,
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
    selectedReview,
    openCreateModal,
    openEditModal,
    closeModal,

    handleSubmit,
    fetchReviews,
    isSubmitting,

    isDeleteModalOpen,
    reviewToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteReview,
  };
};
