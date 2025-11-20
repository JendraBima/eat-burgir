import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { useCartManagement } from "../../../hooks/useCartManagement";
import CartModal from "./CartModal";
import CartTableSkeleton from "./CartTableSkeleton";
import ConfirmModal from "../../ConfirmModal";

const CartComponent = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingCart, setViewingCart] = useState(null);

  const {
    items,
    loading,
    page,
    pages,
    setPage,
    isModalOpen,
    modalMode,
    selectedCart,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    isSubmitting,
    isDeleteModalOpen,
    cartToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteCart,
  } = useCartManagement();

  const openViewModal = (cart) => {
    setViewingCart(cart);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingCart(null);
  };

  const renderCell = (cart, columnKey) => {
    const cellValue = cart[columnKey];

    switch (columnKey) {
      case "product":
        return (
          <div className="flex flex-col">
            <p className="font-semibold">{cart.products?.name || "-"}</p>
          </div>
        );
      case "quantity":
        return (
          <div className="flex flex-col">
            <p className="font-medium">{cellValue}</p>
          </div>
        );
      case "user":
        return (
          <div className="flex flex-col">
            <p className="text-sm">{cart.users?.name || "-"}</p>
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
              onPress={() => openViewModal(cart)}
            >
              Lihat
            </Button>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              startContent={<Pencil size={16} />}
              onPress={() => openEditModal(cart)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="flat"
              startContent={<Trash2 size={16} />}
              onPress={() => openDeleteModal(cart)}
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
          <h1 className="text-2xl font-bold">Manajemen Keranjang</h1>
          <p className="text-gray-600">Kelola keranjang belanja pelanggan</p>
        </div>
        <Button
          color="primary"
          startContent={<Plus size={20} />}
          onPress={openCreateModal}
        >
          Tambah Keranjang
        </Button>
      </div>

      {loading ? (
        <CartTableSkeleton />
      ) : (
        <>
          <Table
            aria-label="Cart table"
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
              <TableColumn key="quantity">JUMLAH</TableColumn>
              <TableColumn key="user">PENGGUNA</TableColumn>
              <TableColumn key="actions">AKSI</TableColumn>
            </TableHeader>
            <TableBody
              items={items}
              emptyContent={
                <div className="text-center py-10">
                  <p className="text-gray-500">Belum ada keranjang</p>
                  <Button
                    color="primary"
                    variant="flat"
                    className="mt-4"
                    onPress={openCreateModal}
                  >
                    Tambah Keranjang Pertama
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

      <CartModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        cart={selectedCart}
        isSubmitting={isSubmitting}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteCart}
        title="Hapus Keranjang"
        message={`Apakah Anda yakin ingin menghapus keranjang ini? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        confirmColor="danger"
        isLoading={isDeleting}
      />

      <Modal isOpen={isViewModalOpen} onOpenChange={closeViewModal} size="lg">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Detail Keranjang
          </ModalHeader>
          <ModalBody>
            {viewingCart && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Produk</p>
                  <p className="text-lg font-semibold">{viewingCart.products?.name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jumlah</p>
                  <p className="text-base font-semibold">{viewingCart.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pengguna</p>
                  <p className="text-base">{viewingCart.users?.name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">No. Telepon</p>
                  <p className="text-base">{viewingCart.users?.phone || "-"}</p>
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

export default CartComponent;
