import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";

const PesananModal = ({ isOpen, onClose, onSubmit, mode, pesanan, isSubmitting }) => {
  const [formData, setFormData] = useState({
    status: "pending",
    total_amount: "",
  });

  const statusOptions = [
    { key: "pending", label: "Pending" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  useEffect(() => {
    if (mode === "edit" && pesanan) {
      setFormData({
        status: pesanan.status || "pending",
        total_amount: pesanan.total_amount || "",
      });
    } else {
      setFormData({
        status: "pending",
        total_amount: "",
      });
    }
  }, [mode, pesanan, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {mode === "create" ? "Tambah Pesanan" : "Edit Pesanan"}
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody className="gap-4">
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleSelectChange}
              required
            >
              {statusOptions.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            <Input
              label="Total Jumlah"
              name="total_amount"
              type="number"
              value={formData.total_amount}
              onChange={handleChange}
              placeholder="Masukkan total jumlah"
              required
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Batal
            </Button>
            <Button color="primary" type="submit" isLoading={isSubmitting}>
              {mode === "create" ? "Tambah" : "Simpan"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PesananModal;
