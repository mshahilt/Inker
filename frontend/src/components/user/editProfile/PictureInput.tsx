import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FC, useState, useRef, useCallback, useEffect } from "react";
import ImageModal from "./ImageModal";
import { getCroppedImg } from "./cropImage";
import { Area } from "react-easy-crop";
import { ProfileService } from "@/services/profileService";
import { toast } from "sonner";
import useAuthStore from "@/store/authStore";

const PictureInput: FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { user, updateProfilePicture } = useAuthStore();

  useEffect(() => {
    if (user?.profilePicture) {
      setCroppedImage(user?.profilePicture);
    }
  }, [user]);

  // Handle file selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      setImageModal(true);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Trigger file input on button click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Remove selected image
  const removeImage = () => {
    setImage(null);
    setCroppedImage(null);
  };

  const onCropComplete = useCallback((_val: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveImage = async () => {
    if (image && croppedAreaPixels) {
      try {
        const { croppedImageUrl, croppedImageFile } = await getCroppedImg(
          image,
          croppedAreaPixels
        );

        setCroppedImage(croppedImageUrl);
        setCroppedImageFile(croppedImageFile);
        setImageModal(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const uploadImageHanlder = async () => {
    try {
      setLoading(true);
      if (croppedImageFile) {
        const response =
          await ProfileService.changeProfilePictureService(croppedImageFile);
        if (response.profileUrl) {
          updateProfilePicture(response.profileUrl);
          toast.success("Profile picture updated successfully");
        } else {
          toast.error("Failed to update profile picture");
        }
        setCroppedImageFile(null);
        setImage(null);
      } else {
        toast.error("No image selected");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center gap-3 bg-gray-200 dark:bg-gray-900 p-4 rounded-2xl relative shadow-md">
      {image && (
        <button
          className="absolute top-2 left-2 bg-neutral-300 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full p-1 hover:bg-neutral-400 dark:hover:bg-gray-700 transition"
          onClick={removeImage}
        >
          <X size={18} />
        </button>
      )}

      {croppedImage ? (
        <img
          className="w-24 h-24 rounded-2xl object-cover border border-gray-300 
          dark:border-gray-700"
          src={croppedImage}
          alt="Profile"
        />
      ) : (
        <div className="w-24 h-24 rounded-2xl bg-gray-400 dark:bg-gray-800 flex items-center justify-center text-white">
          No Image
        </div>
      )}

      <div className="flex flex-col gap-2">
        {/* Hidden File Input */}
        <Input
          id="picture"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Button to Trigger File Input */}
        <button onClick={triggerFileInput} className="text-sm cursor-pointer">
          Upload Image
        </button>

        {image && (
          <Button
            className="h-7 absolute bottom-1 right-1 scale-75"
            onClick={uploadImageHanlder}
            disabled={loading}
          >
            Confirm
          </Button>
        )}
      </div>
      {imageModal && (
        <ImageModal
          image={image}
          crop={crop}
          setCrop={setCrop}
          zoom={zoom}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
          handleSave={handleSaveImage}
          closeModal={() => setImageModal(false)}
        />
      )}

      {loading && (
        <div className="w-full h-full rounded-xl font-semibold absolute top-0 left-0 flex justify-end items-end p-4 bg-black/30 text-brand-orange">
          loading...
        </div>
      )}
    </div>
  );
};

export default PictureInput;
