import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

const ReviewModal = ({ isOpen, onClose, onSubmit, mode, review, isSubmitting }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    review: "",
    product_id: "",
    user_id: "",
  });

  const ratingOptions = [
    { key: 1, label: "1 - Sangat Buruk" },
    { key: 2, label: "2 - Buruk" },
    { key: 3, label: "3 - Cukup" },
    { key: 4, label: "4 - Baik" },
    { key: 5, label: "5 - Sangat Baik" },
  ];

  useEffect(() => {
    if (mode === "edit" && review) {
      setFormData({
        rating: review.rating || 5,
        review: review.review || "",
        product_id: review.product_id || "",
        user_id: review.user_id || "",
      });
    } else {
      setFormData({
        rating: 5,
        review: "",
        product_id: "",
        user_id: "",
      });
    }
  }, [mode, review, isOpen]);

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
      rating: parseInt(e.target.value),
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
          {mode === "create" ? "Tambah Review" : "Edit Review"}
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody className="gap-4">
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
            <Select
              label="Rating"
              name="rating"
              value={formData.rating.toString()}
              onChange={handleSelectChange}
              required
            >
              {ratingOptions.map((option) => (
                <SelectItem key={option.key} value={option.key.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            <Textarea
              label="Review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Masukkan review produk"
              minRows={4}
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

export default ReviewModal;
