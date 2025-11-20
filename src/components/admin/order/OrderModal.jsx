import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { useState, useEffect } from "react";

const OrderModal = ({ isOpen, onClose, onSubmit, mode, order, isSubmitting }) => {
  const [formData, setFormData] = useState({
    quantity: "",
    pesanan_id: "",
    product_id: "",
  });

  useEffect(() => {
    if (mode === "edit" && order) {
      setFormData({
        quantity: order.quantity || "",
        pesanan_id: order.pesanan_id || "",
        product_id: order.product_id || "",
      });
    } else {
      setFormData({
        quantity: "",
        pesanan_id: "",
        product_id: "",
      });
    }
  }, [mode, order, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          {mode === "create" ? "Tambah Order" : "Edit Order"}
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody className="gap-4">
            <Input
              label="Jumlah"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Masukkan jumlah"
              required
            />
            <Input
              label="ID Pesanan"
              name="pesanan_id"
              value={formData.pesanan_id}
              onChange={handleChange}
              placeholder="Masukkan ID pesanan"
              required
            />
            <Input
              label="ID Produk"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              placeholder="Masukkan ID produk"
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

export default OrderModal;
