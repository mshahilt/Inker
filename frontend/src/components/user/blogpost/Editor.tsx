import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { ThumbnailUploader } from "./ThumbnailUploader";
import { setTitle, setContent, addBlog, updateBlog, addAttachment, resetEditor } from "@/store/slices/blogSlice";
import type { RootState } from "@/store/store";

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { title, content, saved, thumbnail, attachments, attachmentUrls, editingBlogId } = useSelector(
    (state: RootState) => state.blogEditor
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleSave = () => {
    const blogData = {
      _id: editingBlogId || Date.now().toString(),
      title,
      content,
      author: "Current User",
      authorId: "user-1",
      tags: [],
      thumbnail: thumbnail ? { type: "image", url: thumbnail ? URL.createObjectURL(thumbnail) : "" } : null,
      attachments,
      attachmentUrls,
      createdAt: editingBlogId ? new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingBlogId) {
      dispatch(updateBlog(blogData));
    } else {
      dispatch(addBlog(blogData));
    }
    dispatch(resetEditor());
  };

  const imageCommand = {
    name: 'image',
    keyCommand: 'image',
    buttonProps: { 'aria-label': 'Insert image' },
    icon: <svg width="12" height="12" viewBox="0 0 20 20"><path fill="currentColor" d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"/></svg>,
    execute: (state: { selectedText: string }, api: { replaceSelection: (text: string) => void }) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const url = URL.createObjectURL(file);
          dispatch(addAttachment({ file, url }));
          const imageMarkdown = `![${file.name}](${url})`;
          api.replaceSelection(imageMarkdown);
        }
      };
      input.click();
    },
  };

  return (
    <div className="space-y-4">
      <ThumbnailUploader />
      <div className="relative">
        <Input
          value={title}
          onChange={handleTitleChange}
          placeholder="Post Title*"
          className="pr-12 rounded-md border-input bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          {250 - title.length}
        </span>
      </div>
      <Card className="border rounded-lg overflow-hidden">
        <MDEditor
          value={content}
          onChange={(value) => dispatch(setContent(value || ""))}
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
            imageCommand
          ]}
          className="bg-background text-foreground"
        />
        
      </Card>
      <div className="flex justify-between items-center">
        {saved && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Check className="w-4 h-4 mr-1" />
            Saved
          </div>
        )}
        <Button
          onClick={handleSave}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
        >
          {editingBlogId ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};