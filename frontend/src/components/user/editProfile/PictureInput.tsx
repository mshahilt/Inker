import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FC, useState, useRef } from "react";

const PictureInput: FC = () => {
  const [image, setImage] = useState<string | null>(
    "https://res.cloudinary.com/dwyxogyrk/image/upload/v1737433466/h0xf7zi0blmclfqrjeo7.png"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
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
  const removeImage = () => setImage(null);

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

      {image ? (
        <img className="w-24 h-24 rounded-2xl object-cover border border-gray-300 dark:border-gray-700" src={image} alt="Profile" />
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
        <button
          onClick={triggerFileInput}
          className="text-sm"
        >
         Upload Image
        </button>

        {image && (
          <Button
            className="h-7 absolute bottom-1 right-1 scale-75"
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
};

export default PictureInput;
