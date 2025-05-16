import React, { useCallback, useEffect, useState } from "react";
import { Camera, X, Edit } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { useBlogEditorStore } from "@/store/useBlogEditorStore";
import { ImageEditor } from "@/components/ui/imageEditor";

export const ThumbnailUploader: React.FC = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { thumbnail, setThumbnail } = useBlogEditorStore();

  useEffect(() => {
    if (thumbnail) {
      setThumbnailUrl(thumbnail.url);
    } else {
      setThumbnailUrl(null);
    }
  }, [thumbnail]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnail({ name: file.name, url, file });
    }
  }, [setThumbnail]);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setThumbnail(null)
  }, [setThumbnail]);

  const handleOpenEditor = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditorOpen(true);
  }, []);

  const handleEditorClose = useCallback(() => {
    setIsEditorOpen(false);
  }, []);

  const handleEditorSave = useCallback(
    (editedImageUrl: string, editedImageFile: File) => {
      // Update the thumbnail with the edited image
      setThumbnail({
        name: editedImageFile.name,
        url: editedImageUrl,
        file: editedImageFile,
      });
    },
    [setThumbnail]
  );

  return (
    <>
      <Card
        className="relative flex items-center justify-center cursor-pointer border border-dashed p-4 bg-muted text-muted-foreground hover:bg-muted/80 rounded-md"
        onClick={() => document.getElementById("thumbnail-upload")?.click()}
      >
        {thumbnailUrl ? (
          <>
            <AspectRatio ratio={16 / 9} className="w-full max-w-xs">
              <img
                src={thumbnailUrl}
                alt="Thumbnail preview"
                className="rounded-md object-cover w-full h-full border border-border"
              />
            </AspectRatio>
            <div className="absolute -top-2 -right-2 flex gap-2 z-10">
              <Button
                variant="secondary"
                size="icon"
                className="w-6 h-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/50 cursor-pointer"
                onClick={handleOpenEditor}
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="w-6 h-6 rounded-full bg-red-900 hover:bg-red-500 cursor-pointer"
                onClick={handleRemove}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Camera className="w-8 h-8 text-muted-foreground" />
            <Label className="text-sm font-medium text-muted-foreground">
              Add Thumbnail
            </Label>
          </div>
        )}
        <Input
          type="file"
          id="thumbnail-upload"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-0"
        />
      </Card>

      {/* Image Editor Modal */}
      <ImageEditor
        imageUrl={thumbnailUrl}
        isOpen={isEditorOpen}
        onClose={handleEditorClose}
        onSave={handleEditorSave}
      />
    </>
  );
};