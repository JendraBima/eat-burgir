import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { Eye } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const ProductModal = ({ isOpen, onClose, onSubmit, mode, product, isSubmitting }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showImageModal , setShowImageModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && product) {
      setValue("name", product.name || "");
      setValue("description", product.description || "");
      setValue("price", product.price || "");
      setImagePreview(product.image || null);
      setImageFile(null);
    } else {
      reset();
      setImagePreview(null);
      setImageFile(null);
    }
  }, [mode, product, isOpen, setValue, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = async (data) => {
    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append("name", data.name);
    submitData.append("description", data.description || "");
    submitData.append("price", data.price);
    
    if (imageFile) {
      submitData.append("image", imageFile);
    }

    try {
      await onSubmit(submitData);
      reset();
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            key="modal"
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <img
                src={previewUrl}
                alt="Full Preview"
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
              />
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 text-white bg-black p-2 rounded-full cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent className="overflow-y-auto">
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <ModalHeader className="flex flex-col gap-1">
              {mode === "create" ? "Tambah Produk Baru" : "Edit Produk"}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div>
                  <Input
                    label="Nama Produk"
                    placeholder="Masukkan nama produk"
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    {...register("name", {
                      required: "Nama produk wajib diisi",
                    })}
                  />
                </div>

                <div>
                  <Textarea
                    label="Deskripsi"
                    placeholder="Masukkan deskripsi produk"
                    variant="bordered"
                    minRows={3}
                    {...register("description")}
                  />
                </div>

                <div>
                  <Input
                    label="Harga"
                    placeholder="Masukkan harga"
                    type="number"
                    variant="bordered"
                    isInvalid={!!errors.price}
                    errorMessage={errors.price?.message}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">Rp</span>
                      </div>
                    }
                    {...register("price", {
                      required: "Harga wajib diisi",
                      min: { value: 0, message: "Harga tidak boleh negatif" },
                    })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Gambar Produk</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary-700
                      hover:file:bg-primary-100
                      cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <div className="relative w-48 h-48 overflow-hidden rounded-md border border-gray-300">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 rounded-md object-contain"
                      />
                    </div>
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button 
                color="danger" 
                variant="light" 
                onPress={onClose}
                isDisabled={isSubmitting}
              >
                Batal
              </Button>
              <Button 
                color="primary" 
                type="submit"
                isLoading={isSubmitting}
              >
                {mode === "create" ? "Tambah" : "Update"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
    </>
  );
};

export default ProductModal;
