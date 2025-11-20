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
import { useOrderManagement } from "../../../hooks/useOrderManagement";
import OrderModal from "./OrderModal";
import OrderTableSkeleton from "./OrderTableSkeleton";
import ConfirmModal from "../../ConfirmModal";

const OrderComponent = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);

  const {
    items,
    loading,
    page,
    pages,
    setPage,
    isModalOpen,
    modalMode,
    selectedOrder,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    isSubmitting,
    isDeleteModalOpen,
    orderToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteOrder,
  } = useOrderManagement();

  const openViewModal = (order) => {
    setViewingOrder(order);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingOrder(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const renderCell = (order, columnKey) => {
    const cellValue = order[columnKey];

    switch (columnKey) {
      case "product":
        return (
          <div className="flex flex-col">
            <p className="font-semibold">{order.products?.name || "-"}</p>
          </div>
        );
      case "quantity":
        return (
          <div className="flex flex-col">
            <p className="font-medium">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            color={order.pesanan?.status === "completed" ? "success" : "warning"}
            variant="flat"
            size="sm"
          >
            {order.pesanan?.status || "-"}
          </Chip>
        );
      case "total":
        return (
          <div className="flex flex-col">
            <p className="font-medium">{formatCurrency(order.pesanan?.total_amount || 0)}</p>
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
              onPress={() => openViewModal(order)}
            >
              Lihat
            </Button>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              startContent={<Pencil size={16} />}
              onPress={() => openEditModal(order)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="flat"
              startContent={<Trash2 size={16} />}
              onPress={() => openDeleteModal(order)}
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
          <h1 className="text-2xl font-bold">Manajemen Order</h1>
          <p className="text-gray-600">Kelola order items dari pesanan</p>
        </div>
        <Button
          color="primary"
          startContent={<Plus size={20} />}
          onPress={openCreateModal}
        >
          Tambah Order
        </Button>
      </div>

      {loading ? (
        <OrderTableSkeleton />
      ) : (
        <>
          <Table
            aria-label="Order table"
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
              <TableColumn key="status">STATUS</TableColumn>
              <TableColumn key="total">TOTAL</TableColumn>
              <TableColumn key="actions">AKSI</TableColumn>
            </TableHeader>
            <TableBody
              items={items}
              emptyContent={
                <div className="text-center py-10">
                  <p className="text-gray-500">Belum ada order</p>
                  <Button
                    color="primary"
                    variant="flat"
                    className="mt-4"
                    onPress={openCreateModal}
                  >
                    Tambah Order Pertama
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

      <OrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        order={selectedOrder}
        isSubmitting={isSubmitting}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteOrder}
        title="Hapus Order"
        message={`Apakah Anda yakin ingin menghapus order ini? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        confirmColor="danger"
        isLoading={isDeleting}
      />

      <Modal isOpen={isViewModalOpen} onOpenChange={closeViewModal} size="lg">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Detail Order
          </ModalHeader>
          <ModalBody>
            {viewingOrder && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Produk</p>
                  <p className="text-lg font-semibold">{viewingOrder.products?.name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jumlah</p>
                  <p className="text-base font-semibold">{viewingOrder.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Harga Produk</p>
                  <p className="text-base font-semibold">{formatCurrency(viewingOrder.products?.price || 0)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status Pesanan</p>
                  <Chip
                    color={viewingOrder.pesanan?.status === "completed" ? "success" : "warning"}
                    variant="flat"
                  >
                    {viewingOrder.pesanan?.status || "-"}
                  </Chip>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Pesanan</p>
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(viewingOrder.pesanan?.total_amount || 0)}
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

export default OrderComponent;
