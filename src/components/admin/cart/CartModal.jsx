import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";

const CartModal = ({ isOpen, onClose, onSubmit, mode, cart, isSubmitting }) => {
  const [formData, setFormData] = useState({
    quantity: "",
    product_id: "",
    user_id: "",
  });

  useEffect(() => {
    if (mode === "edit" && cart) {
      setFormData({
        quantity: cart.quantity || "",
        product_id: cart.product_id || "",
        user_id: cart.user_id || "",
      });
    } else {
      setFormData({
        quantity: "",
        product_id: "",
        user_id: "",
      });
    }
  }, [mode, cart, isOpen]);

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
          {mode === "create" ? "Tambah Keranjang" : "Edit Keranjang"}
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
              label="ID Produk"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              placeholder="Masukkan ID produk"
              required
            />
            <Input
              label="ID Pengguna"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              placeholder="Masukkan ID pengguna"
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

export default CartModal;
