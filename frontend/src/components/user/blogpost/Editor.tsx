import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { ThumbnailUploader } from "./ThumbnailUploader";
import { AttachmentArea } from "./AttatchmentArea";
import { setTitle, setContent, setActiveTab, addBlog } from "@/store/blogSlice";
import type { RootState } from "@/store/store";
import { MarkdownRenderer } from "./MarkdownRenderer";

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
          className="bg-gray-700 border-gray-600 rounded-lg py-3 px-4 w-full text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          {250 - title.length}
        </span>
      </div>
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-700">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-600 bg-gray-800">
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(setActiveTab("write"))}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "write" ? "border-b-2 border-purple-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Write
            </button>
            <button
              onClick={() => dispatch(setActiveTab("preview"))}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "preview" ? "border-b-2 border-purple-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Preview
            </button>
          </div>
          {saved && (
            <div className="flex items-center text-sm text-gray-400">
              <Check className="w-4 h-4 mr-1" />
              Saved
            </div>
          )}
        </div>
        <div className="p-4 min-h-[300px]">
          {activeTab === "write" ? (
            <textarea
              ref={textAreaRef}
              className="w-full h-72 bg-gray-700 border-0 outline-none resize-none text-white placeholder-gray-400 rounded-md p-3 focus:ring-2 focus:ring-purple-500"
              placeholder="Write your post content in Markdown here..."
              value={content}
              onChange={handleContentChange}
            />
          ) : (
            <div className="space-y-4 p-3 bg-gray-800 rounded-md">
              {title && <h1 className="text-xl font-bold text-white">{title}</h1>}
              {content ? (
                <MarkdownRenderer content={content} />
              ) : (
                <p className="text-gray-500 italic">Nothing to preview yet...</p>
              )}
            </div>
          )}
        </div>
        <AttachmentArea />
      </div>
      <div className="flex justify-end pt-4">
        <Button
          onClick={handlePost}
          // className="bg-purple-600 hover:bg-purp text-white px-8 py-2.5 rounded-lg font-medium transition-all hover:shadow-md"
        >
          Post
        </Button>
      </div>
    </>
  );
};