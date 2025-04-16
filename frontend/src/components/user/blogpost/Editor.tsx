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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { blogEditorSchema } from "@/schemas/blogSchema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

interface EditorProps {
  isEditMode: boolean;
}

type BlogEditorSchema = z.infer<typeof blogEditorSchema>;

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

  const form = useForm<BlogEditorSchema>({
    resolver: zodResolver(blogEditorSchema),
    defaultValues: {
      title,
      content,
    },
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newTag.trim() && !tags.includes(newTag.trim())) {
        addTag(newTag.trim());
        setNewTag("");
      }
    }
  };

  const handleSave = async (values: BlogEditorSchema) => {
    setTitle(values.title.trim());
    setContent(values.content);
    await saveBlog();
    navigate("/feed");
  };

  return (
    <div data-color-mode="dark">
      <ThumbnailUploader />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)}>
          {/* Post Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="relative mt-4">
                <FormControl>
                  <Input {...field} placeholder="Post Title*" className="pr-12" maxLength={250}/>
                </FormControl>

                <span className="absolute right-3 top-3 text-xs text-muted-foreground">
                  {250 - (form.watch("title")?.length || 0)}
                </span>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* tags */}
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

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <Card className="border rounded-lg overflow-hidden mt-2">
                  <FormControl>
                    <MDEditor
                      value={field.value}
                      onChange={(value) => field.onChange(value || "")}
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
                  </FormControl>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Buttons */}
          <div className="flex justify-end mt-4 gap-2">
            <Button onClick={() => navigate(-1)} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditMode ? "Update" : "Save"}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
};
