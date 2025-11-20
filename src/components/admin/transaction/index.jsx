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
  Select,
  SelectItem,
} from "@heroui/react";
import { Eye, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { pesananService } from "../../../service/pesanan.service";
import { toast } from "react-toastify";

const TransactionComponent = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingPesanan, setViewingPesanan] = useState(null);
  const [pesanans, setPesanans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const rowsPerPage = 10;

  const fetchPesanans = async () => {
    try {
      setLoading(true);
      const response = await pesananService.getAll();
      const allPesanans = response.data || [];
      setPesanans(allPesanans);
      setPages(Math.ceil(allPesanans.length / rowsPerPage));
    } catch (error) {
      toast.error("Gagal memuat data transaksi");
      console.error("Error fetching pesanans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPesanans();
  }, []);

  const items = pesanans.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const openViewModal = (pesanan) => {
    setViewingPesanan(pesanan);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingPesanan(null);
  };

  const handleStatusChange = async (pesananId, newStatus) => {
    try {
      setIsUpdatingStatus(true);
      await pesananService.update(pesananId, {
        status: newStatus,
        total_amount: viewingPesanan.total_amount,
      });
      toast.success("Status pesanan diperbarui");
      await fetchPesanans();
      closeViewModal();
    } catch (error) {
      toast.error("Gagal memperbarui status");
      console.error("Error updating status:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
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
      case "pending":
        return "warning";
      case "processing":
        return "primary";
      case "shipped":
        return "secondary";
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Menunggu",
      processing: "Diproses",
      shipped: "Dikirim",
      completed: "Selesai",
      cancelled: "Dibatalkan",
    };
    return labels[status] || status;
  };

  const getTotalRevenue = () => {
    return pesanans
      .filter((p) => p.status === "completed")
      .reduce((total, p) => total + (p.total_amount || 0), 0);
  };

  const getTotalOrders = () => {
    return pesanans.length;
  };

  const getPendingOrders = () => {
    return pesanans.filter((p) => p.status === "pending").length;
  };

  const renderCell = (pesanan, columnKey) => {
    const cellValue = pesanan[columnKey];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="font-semibold text-sm">#{pesanan.id}</p>
          </div>
        );
      case "user":
        return (
          <div className="flex flex-col">
            <p className="font-semibold">{pesanan.users?.name || "-"}</p>
            <p className="text-xs text-gray-500">{pesanan.users?.phone || "-"}</p>
          </div>
        );
      case "total_amount":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-green-600">
              {formatCurrency(cellValue)}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            color={getStatusColor(cellValue)}
            variant="flat"
            size="sm"
          >
            {getStatusLabel(cellValue)}
          </Chip>
        );
      case "created_at":
        return (
          <div className="flex flex-col">
            <p className="text-sm">
              {new Date(cellValue).toLocaleDateString("id-ID")}
            </p>
          </div>
        );
      case "actions":
        return (
          <Button
            size="sm"
            color="default"
            variant="flat"
            startContent={<Eye size={16} />}
            onPress={() => openViewModal(pesanan)}
          >
            Lihat
          </Button>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">Total Pesanan</p>
              <p className="text-3xl font-bold text-gray-900">
                {getTotalOrders()}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">Pesanan Menunggu</p>
              <p className="text-3xl font-bold text-orange-600">
                {getPendingOrders()}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">Total Pendapatan</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(getTotalRevenue())}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Transaksi</h1>
        <p className="text-gray-600">Kelola semua pesanan dari pelanggan</p>
      </div>

      {/* Table */}
      <Table
        aria-label="Transaction table"
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
          <TableColumn key="id">ID PESANAN</TableColumn>
          <TableColumn key="user">PELANGGAN</TableColumn>
          <TableColumn key="total_amount">TOTAL</TableColumn>
          <TableColumn key="status">STATUS</TableColumn>
          <TableColumn key="created_at">TANGGAL</TableColumn>
          <TableColumn key="actions">AKSI</TableColumn>
        </TableHeader>
        <TableBody
          items={items}
          emptyContent={
            <div className="text-center py-10">
              <p className="text-gray-500">Belum ada transaksi</p>
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

      {/* Detail Modal */}
      <Modal isOpen={isViewModalOpen} onOpenChange={closeViewModal} size="lg">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Detail Pesanan #{viewingPesanan?.id}
          </ModalHeader>
          <ModalBody>
            {viewingPesanan && (
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Informasi Pelanggan
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Nama:</span>{" "}
                      <span className="font-semibold">
                        {viewingPesanan.users?.name}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Telepon:</span>{" "}
                      <span className="font-semibold">
                        {viewingPesanan.users?.phone}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Alamat:</span>{" "}
                      <span className="font-semibold">
                        {viewingPesanan.users?.address}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Order Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Informasi Pesanan
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Tanggal:</span>{" "}
                      <span className="font-semibold">
                        {new Date(viewingPesanan.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Total:</span>{" "}
                      <span className="font-bold text-green-600">
                        {formatCurrency(viewingPesanan.total_amount)}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Status Update */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Update Status
                  </h3>
                  <Select
                    label="Status"
                    value={viewingPesanan.status}
                    onChange={(e) =>
                      setViewingPesanan({
                        ...viewingPesanan,
                        status: e.target.value,
                      })
                    }
                  >
                    <SelectItem key="pending" value="pending">
                      Menunggu
                    </SelectItem>
                    <SelectItem key="processing" value="processing">
                      Diproses
                    </SelectItem>
                    <SelectItem key="shipped" value="shipped">
                      Dikirim
                    </SelectItem>
                    <SelectItem key="completed" value="completed">
                      Selesai
                    </SelectItem>
                    <SelectItem key="cancelled" value="cancelled">
                      Dibatalkan
                    </SelectItem>
                  </Select>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={closeViewModal}>
              Tutup
            </Button>
            <Button
              color="primary"
              onPress={() =>
                handleStatusChange(viewingPesanan.id, viewingPesanan.status)
              }
              isLoading={isUpdatingStatus}
            >
              Simpan Status
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TransactionComponent;
