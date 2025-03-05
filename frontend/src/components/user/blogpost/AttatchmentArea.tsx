import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paperclip, Link2, X } from "lucide-react";
import { addAttachment, removeAttachment, setSaved, insertLink } from "@/store/blogSlice";
import type { RootState } from "@/store/store";

export const AttachmentArea: React.FC = () => {
  const dispatch = useDispatch();
  const attachments = useSelector((state: RootState) => state.blogEditor.attachments);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const attachmentInputRef = React.useRef<HTMLInputElement>(null);
  const attachmentAreaRef = React.useRef<HTMLDivElement>(null);

  const handleAttachmentClick = () => {
    attachmentInputRef.current?.click();
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => file.type.startsWith("image/"));
    if (files.length > 0) {
      dispatch(addAttachment(files));
      dispatch(setSaved(false));
    }
    if (attachmentInputRef.current) attachmentInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    attachmentAreaRef.current?.classList.add("bg-gray-700", "border-dashed", "border-purple-500");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    attachmentAreaRef.current?.classList.remove("bg-gray-700", "border-dashed", "border-purple-500");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    attachmentAreaRef.current?.classList.remove("bg-gray-700", "border-dashed", "border-purple-500");
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith("image/"));
    if (files.length > 0) {
      dispatch(addAttachment(files));
      dispatch(setSaved(false));
    }
  };

  const removeAttachmentHandler = (index: number) => {
    dispatch(removeAttachment(index));
    dispatch(setSaved(false));
  };

  const insertLinkHandler = () => {
    const url = prompt("Enter URL:");
    if (url && textAreaRef.current) {
      const start = textAreaRef.current.selectionStart || 0;
      const end = textAreaRef.current.selectionEnd || 0;
      dispatch(insertLink({ url, start, end }));
    }
  };

  return (
    <div
      ref={attachmentAreaRef}
      className="p-4 border-t border-gray-600 bg-gray-800 transition-colors cursor-pointer"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleAttachmentClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
          <Paperclip className="w-4 h-4 mr-2" />
          <span>Attach images by dragging & dropping or clicking here</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            insertLinkHandler();
          }}
          className="text-gray-400 hover:text-white transition-colors"
          title="Insert Markdown URL"
        >
          <Link2 className="w-5 h-5" />
        </button>
      </div>
      {attachments.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Attachment ${index + 1}`}
                className="h-16 w-16 object-cover rounded-md"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeAttachmentHandler(index);
                }}
                className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 hover:bg-red-700 transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        ref={attachmentInputRef}
        onChange={handleAttachmentChange}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
};