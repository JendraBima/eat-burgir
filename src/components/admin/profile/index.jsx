import { Skeleton, Card, CardBody } from "@heroui/react";
import { useProfile } from "../../../hooks/useProfile";
import ProfileForm from "./ProfileForm";

const ProfileComponent = () => {
  const {
    profile,
    loading,
    isSubmitting,
    imagePreview,
    handleImageChange,
    updateProfile,
    resetImage,
  } = useProfile();

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardBody className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="w-32 h-32 rounded-full" />
              <Skeleton className="w-48 h-4 rounded" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="space-y-4">
            <Skeleton className="w-full h-12 rounded" />
            <Skeleton className="w-full h-12 rounded" />
            <Skeleton className="w-full h-24 rounded" />
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Profil</h1>
        <p className="text-gray-600">Kelola informasi profil Anda</p>
      </div>

      <ProfileForm
        profile={profile}
        isSubmitting={isSubmitting}
        imagePreview={imagePreview}
        onImageChange={handleImageChange}
        onSubmit={updateProfile}
        onResetImage={resetImage}
      />
    </div>
  );
};

export default ProfileComponent;
