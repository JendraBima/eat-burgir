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
} from "@heroui/react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useProductManagement } from "../../../hooks/useProductManagement";
import ProductModal from "./ProductModal";
import ProductTableSkeleton from "./ProductTableSkeleton";
import ConfirmModal from "../../ConfirmModal";

const ProductComponent = () => {
  const {
    items,
    loading,
    page,
    pages,
    setPage,
    isModalOpen,
    modalMode,
    selectedProduct,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    isSubmitting,
    // Delete modal
    isDeleteModalOpen,
    productToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteProduct,
  } = useProductManagement();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const renderCell = (product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "image":
        return (
          <Image
            src={cellValue || "/placeholder-product.png"}
            alt={product.name}
            width={64}
            height={64}
            className="object-cover rounded-lg"
          />
        );
      case "name":
        return (
          <div className="flex flex-col">
            <p className="font-semibold">{cellValue}</p>
          </div>
        );
      case "description":
        return (
          <div className="max-w-xs">
            <p className="text-sm text-gray-600 truncate">{cellValue || "-"}</p>
          </div>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="font-medium">{formatCurrency(cellValue)}</p>
          </div>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              color="primary"
              variant="flat"
              startContent={<Pencil size={16} />}
              onPress={() => openEditModal(product)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="flat"
              startContent={<Trash2 size={16} />}
              onPress={() => openDeleteModal(product)}
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Produk</h1>
          <p className="text-gray-600">Kelola produk yang tersedia di toko</p>
        </div>
        <Button
          color="primary"
          startContent={<Plus size={20} />}
          onPress={openCreateModal}
        >
          Tambah Produk
        </Button>
      </div>

      {loading ? (
        <ProductTableSkeleton />
      ) : (
        <>
          <Table
            aria-label="Product table"
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
              <TableColumn key="image">GAMBAR</TableColumn>
              <TableColumn key="name">NAMA</TableColumn>
              <TableColumn key="description">DESKRIPSI</TableColumn>
              <TableColumn key="price">HARGA</TableColumn>
              <TableColumn key="actions">AKSI</TableColumn>
            </TableHeader>
            <TableBody
              items={items}
              emptyContent={
                <div className="text-center py-10">
                  <p className="text-gray-500">Belum ada produk</p>
                  <Button
                    color="primary"
                    variant="flat"
                    className="mt-4"
                    onPress={openCreateModal}
                  >
                    Tambah Produk Pertama
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

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        product={selectedProduct}
        isSubmitting={isSubmitting}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteProduct}
        title="Hapus Produk"
        message={`Apakah Anda yakin ingin menghapus produk "${productToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        confirmColor="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ProductComponent;