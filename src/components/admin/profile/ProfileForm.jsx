import { Card, CardBody, CardHeader, Button, Input, Textarea, Avatar } from "@heroui/react";
import { User, Phone, MapPin, Camera, Save, X } from "lucide-react";
import { useState, useEffect } from "react";

const ProfileForm = ({ profile, isSubmitting, imagePreview, onImageChange, onSubmit, onResetImage }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Foto Profil</h3>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar
                src={imagePreview || "/default-avatar.png"}
                className="w-32 h-32"
                isBordered
                color="primary"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-600 transition-colors"
              >
                <Camera size={20} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Format: JPG, PNG, WEBP (Max 2MB)
              </p>
              {imagePreview !== profile?.image && (
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  startContent={<X size={16} />}
                  onPress={onResetImage}
                  className="mt-2"
                >
                  Reset Foto
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Informasi Profil</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Nama Lengkap"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            startContent={<User size={18} className="text-gray-400" />}
            isRequired
            variant="bordered"
          />

          <Input
            label="Nomor Telepon"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            startContent={<Phone size={18} className="text-gray-400" />}
            variant="bordered"
          />

          <Textarea
            label="Alamat"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Masukkan alamat lengkap"
            startContent={<MapPin size={18} className="text-gray-400" />}
            variant="bordered"
            minRows={3}
          />

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Informasi Akun</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Role:</span>
                <span className="text-sm font-medium capitalize">{profile?.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">User ID:</span>
                <span className="text-sm font-mono text-gray-500 truncate max-w-[200px]">
                  {profile?.id}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          color="primary"
          size="lg"
          startContent={<Save size={20} />}
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        >
          Simpan Perubahan
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
