import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, X } from "lucide-react";
import { setThumbnail, setSaved } from "@/store/blogSlice";
import type { RootState } from "@/store/store";
import { Label } from "@/components/ui/label";

export const ThumbnailUploader: React.FC = () => {
  const dispatch = useDispatch();
  const thumbnail = useSelector((state: RootState) => state.blogEditor.thumbnail);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(setThumbnail(file));
      dispatch(setSaved(false));
    }
  };

  const removeThumbnail = () => {
    dispatch(setThumbnail(null));
    dispatch(setSaved(false));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      className="bg-gray-200 dark:bg-gray-600/30 rounded-lg p-4 flex items-center justify-center cursor-pointer relative"
      onClick={handleThumbnailClick}
    >
      {thumbnail ? (
        <>
          <img
            src={URL.createObjectURL(thumbnail)}
            alt="Thumbnail preview"
            className="max-h-40 rounded-md object-cover"
          />
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              removeThumbnail();
            }}
            className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 hover:bg-red-700 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button> */}
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <Camera className="w-8 h-8" />
          <Label className="text-sm font-medium">Add Thumbnail</Label>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleThumbnailChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};