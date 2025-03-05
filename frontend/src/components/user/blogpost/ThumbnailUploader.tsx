import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThumbnail, setSaved } from "@/store/blogSlice";
import type { RootState } from "@/store/store";
import { Camera, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input"; 

export const ThumbnailUploader: React.FC = () => {
  const dispatch = useDispatch();
  const thumbnail = useSelector((state: RootState) => state.blogEditor.thumbnail);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    if (thumbnail) {
      const objectUrl = URL.createObjectURL(thumbnail);
      setThumbnailUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); 
    }
    setThumbnailUrl(null);
  }, [thumbnail]);

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

  const removeThumbnail = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setThumbnail(null));
    dispatch(setSaved(false));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Card
      className="relative flex items-center justify-center cursor-pointer border border-dashed p-4 bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg"
      onClick={handleThumbnailClick}
    >
      {thumbnailUrl ? (
        <>
          <AspectRatio ratio={16 / 9} className="w-full max-w-xs">
            <img
              src={thumbnailUrl}
              alt="Thumbnail preview"
              className="rounded-md object-cover w-full h-full"
            />
          </AspectRatio>
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 w-6 h-6"
            onClick={removeThumbnail}
          >
            <X className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Camera className="w-8 h-8" />
          <Label className="text-sm font-medium">Add Thumbnail</Label>
        </div>
      )}
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleThumbnailChange}
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </Card>
  );
};
