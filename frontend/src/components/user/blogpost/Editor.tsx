import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { ThumbnailUploader } from "./ThumbnailUploader";
import { AttachmentArea } from "./AttatchmentArea";
import { setTitle, setContent, setActiveTab, addBlog } from "@/store/slices/blogSlice";
import type { RootState } from "@/store/store";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { TabMode } from "@/types";

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { title, content, activeTab, saved } = useSelector((state: RootState) => state.blogEditor);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setContent(e.target.value));
  };

  const handlePost = () => {
    dispatch(addBlog({ title, content, thumbnail: null, attachments: [] }));
  };

  return (
    <>
      <ThumbnailUploader />
      <div className="relative">
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
      
      <Card className="border rounded-lg overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <div className="flex gap-4">
            {(["write", "preview"] as TabMode[]).map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                onClick={() => dispatch(setActiveTab(tab))}
                className={`relative px-3 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? "text-primary after:w-full after:h-[2px] after:bg-primary after:absolute after:bottom-0 after:left-0"
                    : "text-muted-foreground"
                }`}
              >
                {tab === "write" ? "Write" : "Preview"}
              </Button>
            ))}
          </div>
          {saved && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Check className="w-4 h-4 mr-1" />
              Saved
            </div>
          )}
        </div>

        <div className="p-4 min-h-[300px]">
          {activeTab === "write" ? (
            <textarea
              ref={textAreaRef}
              className="w-full h-72 bg-background border-0 outline-none resize-none text-foreground placeholder-muted-foreground rounded-md p-3 focus:ring-2 focus:ring-primary"
              placeholder="Write your post content in Markdown here..."
              value={content}
              onChange={handleContentChange}
            />
          ) : (
            <div className="space-y-4 p-3 rounded-md">
              {title && <h1 className="text-4xl font-bold text-foreground">{title}</h1>}
              {content ? (
                <MarkdownRenderer content={content} />
              ) : (
                <p className="text-muted-foreground italic">Nothing to preview yet...</p>
              )}
            </div>
          )}
        </div>

        <AttachmentArea />
      </Card>

      <div className="flex justify-end pt-4">
        <Button onClick={handlePost}>Post</Button>
      </div>
    </>
  );
};
