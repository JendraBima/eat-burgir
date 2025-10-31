import { useState, useEffect } from "react";
import { userService } from "../service/user.service";
import { useAuthStore } from "../store/use-auth";
import { toast } from "react-toastify";

export const useProfile = () => {
  const { user: currentUser, checkAuth } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchProfile = async () => {
    if (!currentUser?.id) return;

    try {
      setLoading(true);
      const response = await userService.getById(currentUser.id);
      setProfile(response.data);
      setImagePreview(response.data.image);
    } catch (error) {
      toast.error("Gagal memuat data profil");
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id]);

  const handleImageChange = (file) => {
    if (!file) return;

    // Validasi file
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Format file tidak valid. Gunakan JPG, PNG, atau WEBP");
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast.error("Ukuran file maksimal 2MB");
      return;
    }

    setSelectedFile(file);
    
    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const updateProfile = async (formData) => {
    if (!currentUser?.id) return;

    try {
      setIsSubmitting(true);

      let updateData;

      if (selectedFile) {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("phone", formData.phone || "");
        data.append("address", formData.address || "");
        data.append("image", selectedFile);
        updateData = data;
      } else {
        updateData = {
          name: formData.name,
          phone: formData.phone || "",
          address: formData.address || "",
          image: profile?.image || "", // Kirim URL lama
        };
      }

      await userService.update(currentUser.id, updateData);
      toast.success("Profil berhasil diperbarui");
      
      await checkAuth();
      await fetchProfile();
      
      setSelectedFile(null);
    } catch (error) {
      toast.error(error.response?.data?.pesan || "Gagal memperbarui profil");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetImage = () => {
    setImagePreview(profile?.image);
    setSelectedFile(null);
  };

  return {
    profile,
    loading,
    isSubmitting,
    imagePreview,
    selectedFile,
    handleImageChange,
    updateProfile,
    resetImage,
    fetchProfile,
  };
};
