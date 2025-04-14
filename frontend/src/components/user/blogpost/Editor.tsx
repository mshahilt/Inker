import React, { useState } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ThumbnailUploader } from "./ThumbnailUploader";
import { useNavigate } from "react-router-dom";
import { useBlogEditorStore } from "@/store/useBlogEditorStore";

interface EditorProps {
  isEditMode: boolean;
}

export const Editor: React.FC<EditorProps> = ({ isEditMode }) => {
  const navigate = useNavigate();
  const [newTag, setNewTag] = useState("");

  const {
    title,
    content,
    tags,
    isLoading,
    setTitle,
    setContent,
    addTag,
    removeTag,
    saveBlog,
  } = useBlogEditorStore();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      addTag(newTag.trim());
      setNewTag("");
    }
  };

  const handleSave = async () => {
    await saveBlog();
    navigate("/feed");
  };

  
  return (
    <div data-color-mode="dark">
      <ThumbnailUploader />
      <div className="relative mt-4">
        <Input
          value={title}
          onChange={handleTitleChange}
          placeholder="Post Title*"
          className="pr-12"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          {250 - title.length}
        </span>
      </div>

      <div className="mt-4">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Add tags (press Enter)"
          className="mb-2"
        />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <button
                title="Remove tag"
                onClick={() => removeTag(tag)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <Card className="border rounded-lg overflow-hidden mt-6">
        <MDEditor
          value={content}
          onChange={(value) => setContent(value || "")}
          preview="edit"
          height={300}
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.hr,
            commands.title,
            commands.divider,
            commands.link,
            commands.quote,
            commands.code,
            commands.codeBlock,
            commands.image,
          ]}
        />
      </Card>

      <div className="flex justify-end mt-4 gap-2">
        <Button onClick={() => navigate(-1)} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : isEditMode ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};
