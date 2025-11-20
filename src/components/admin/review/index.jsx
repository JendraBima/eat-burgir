import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
} from "@heroui/react";
import { Plus, Pencil, Trash2, Eye, Star } from "lucide-react";
import { useState } from "react";
import { useReviewManagement } from "../../../hooks/useReviewManagement";
import ReviewModal from "./ReviewModal";
import ReviewTableSkeleton from "./ReviewTableSkeleton";
import ConfirmModal from "../../ConfirmModal";

const ReviewComponent = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingReview, setViewingReview] = useState(null);

  const {
    items,
    loading,
    page,
    pages,
    setPage,
    isModalOpen,
    modalMode,
    selectedReview,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    isSubmitting,
    isDeleteModalOpen,
    reviewToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteReview,
  } = useReviewManagement();

  const openViewModal = (review) => {
    setViewingReview(review);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingReview(null);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const renderCell = (review, columnKey) => {
    const cellValue = review[columnKey];

    switch (columnKey) {
      case "product":
        return (
          <div className="flex flex-col">
            <p className="font-semibold">{review.products?.name || "-"}</p>
          </div>
        );
      case "user":
        return (
          <div className="flex flex-col">
            <p className="font-semibold">{review.users?.name || "-"}</p>
          </div>
        );
      case "rating":
        return (
          <div className="flex flex-col">
            {renderStars(cellValue)}
          </div>
        );
      case "review":
        return (
          <div className="flex flex-col max-w-xs">
            <p className="text-sm text-gray-600 truncate">{cellValue || "-"}</p>
          </div>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              color="default"
              variant="flat"
              startContent={<Eye size={16} />}
              onPress={() => openViewModal(review)}
            >
              Lihat
            </Button>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              startContent={<Pencil size={16} />}
              onPress={() => openEditModal(review)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="flat"
              startContent={<Trash2 size={16} />}
              onPress={() => openDeleteModal(review)}
            >
              Hapus
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Review</h1>
          <p className="text-gray-600">Kelola review produk dari pelanggan</p>
        </div>
        <Button
          color="primary"
          startContent={<Plus size={20} />}
          onPress={openCreateModal}
        >
          Tambah Review
        </Button>
      </div>

      {loading ? (
        <ReviewTableSkeleton />
      ) : (
        <>
          <Table
            aria-label="Review table"
            bottomContent={
              pages > 1 ? (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn key="product">PRODUK</TableColumn>
              <TableColumn key="user">PENGGUNA</TableColumn>
              <TableColumn key="rating">RATING</TableColumn>
              <TableColumn key="review">REVIEW</TableColumn>
              <TableColumn key="actions">AKSI</TableColumn>
            </TableHeader>
            <TableBody
              items={items}
              emptyContent={
                <div className="text-center py-10">
                  <p className="text-gray-500">Belum ada review</p>
                  <Button
                    color="primary"
                    variant="flat"
                    className="mt-4"
                    onPress={openCreateModal}
                  >
                    Tambah Review Pertama
                  </Button>
                </div>
              }
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      )}

      <ReviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        review={selectedReview}
        isSubmitting={isSubmitting}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteReview}
        title="Hapus Review"
        message={`Apakah Anda yakin ingin menghapus review ini? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        confirmColor="danger"
        isLoading={isDeleting}
      />

      <Modal isOpen={isViewModalOpen} onOpenChange={closeViewModal} size="lg">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Detail Review
          </ModalHeader>
          <ModalBody>
            {viewingReview && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Produk</p>
                  <p className="text-lg font-semibold">{viewingReview.products?.name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pengguna</p>
                  <p className="text-base">{viewingReview.users?.name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <div className="mt-2">
                    {renderStars(viewingReview.rating)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Review</p>
                  <p className="text-base mt-2 p-3 bg-gray-100 rounded-lg">
                    {viewingReview.review || "-"}
                  </p>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={closeViewModal}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReviewComponent;
