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
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { usePesananManagement } from "../../../hooks/usePesananManagement";
import PesananModal from "./PesananModal";
import PesananTableSkeleton from "./PesananTableSkeleton";
import ConfirmModal from "../../ConfirmModal";

const PesananComponent = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingPesanan, setViewingPesanan] = useState(null);

  const {
    items,
    loading,
    page,
    pages,
    setPage,
    isModalOpen,
    modalMode,
    selectedPesanan,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    isSubmitting,
    isDeleteModalOpen,
    pesananToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDeletePesanan,
  } = usePesananManagement();

  const openViewModal = (pesanan) => {
    setViewingPesanan(pesanan);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingPesanan(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  const renderCell = (pesanan, columnKey) => {
    const cellValue = pesanan[columnKey];

    switch (columnKey) {
      case "status":
        return (
          <Chip
            color={getStatusColor(cellValue)}
            variant="flat"
            size="sm"
          >
            {cellValue}
          </Chip>
        );
      case "total_amount":
        return (
          <div className="flex flex-col">
            <p className="font-medium">{formatCurrency(cellValue)}</p>
          </div>
        );
      case "user":
        return (
          <div className="flex flex-col">
            <p className="font-semibold">{pesanan.users?.name || "-"}</p>
            <p className="text-sm text-gray-600">{pesanan.users?.phone || "-"}</p>
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
              onPress={() => openViewModal(pesanan)}
            >
              Lihat
            </Button>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              startContent={<Pencil size={16} />}
              onPress={() => openEditModal(pesanan)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="flat"
              startContent={<Trash2 size={16} />}
              onPress={() => openDeleteModal(pesanan)}
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
          <h1 className="text-2xl font-bold">Manajemen Pesanan</h1>
          <p className="text-gray-600">Kelola semua pesanan pelanggan</p>
        </div>
        <Button
          color="primary"
          startContent={<Plus size={20} />}
          onPress={openCreateModal}
        >
          Tambah Pesanan
        </Button>
      </div>

      {loading ? (
        <PesananTableSkeleton />
      ) : (
        <>
          <Table
            aria-label="Pesanan table"
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
              <TableColumn key="user">PENGGUNA</TableColumn>
              <TableColumn key="status">STATUS</TableColumn>
              <TableColumn key="total_amount">TOTAL</TableColumn>
              <TableColumn key="actions">AKSI</TableColumn>
            </TableHeader>
            <TableBody
              items={items}
              emptyContent={
                <div className="text-center py-10">
                  <p className="text-gray-500">Belum ada pesanan</p>
                  <Button
                    color="primary"
                    variant="flat"
                    className="mt-4"
                    onPress={openCreateModal}
                  >
                    Tambah Pesanan Pertama
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

      <PesananModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        pesanan={selectedPesanan}
        isSubmitting={isSubmitting}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeletePesanan}
        title="Hapus Pesanan"
        message={`Apakah Anda yakin ingin menghapus pesanan ini? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        confirmColor="danger"
        isLoading={isDeleting}
      />

      <Modal isOpen={isViewModalOpen} onOpenChange={closeViewModal} size="lg">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Detail Pesanan
          </ModalHeader>
          <ModalBody>
            {viewingPesanan && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Nama Pengguna</p>
                  <p className="text-lg font-semibold">{viewingPesanan.users?.name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">No. Telepon</p>
                  <p className="text-base">{viewingPesanan.users?.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alamat</p>
                  <p className="text-base">{viewingPesanan.users?.address || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Chip
                    color={getStatusColor(viewingPesanan.status)}
                    variant="flat"
                  >
                    {viewingPesanan.status}
                  </Chip>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Pesanan</p>
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(viewingPesanan.total_amount)}
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

export default PesananComponent;
