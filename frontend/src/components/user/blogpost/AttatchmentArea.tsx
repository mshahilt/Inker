import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paperclip, Link2, X } from "lucide-react";
import { addAttachment, removeAttachment, setSaved, insertLink } from "@/store/slices/blogSlice";
import type { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const AttachmentArea: React.FC = () => {
  const dispatch = useDispatch();
  const attachments = useSelector((state: RootState) => state.blogEditor.attachments);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const attachmentAreaRef = useRef<HTMLDivElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const handleAttachmentClick = () => {
    attachmentInputRef.current?.click();
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) => file.type.startsWith("image/"));
    if (files.length > 0) {
      dispatch(addAttachment(files));
      dispatch(setSaved(false));
    }
    if (attachmentInputRef.current) attachmentInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    attachmentAreaRef.current?.classList.add("bg-muted");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    attachmentAreaRef.current?.classList.remove("bg-muted");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    attachmentAreaRef.current?.classList.remove("bg-muted");
    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"));
    if (files.length > 0) {
      dispatch(addAttachment(files));
      dispatch(setSaved(false));
    }
  };

  const removeAttachmentHandler = (index: number) => {
    dispatch(removeAttachment(index));
    dispatch(setSaved(false));
  };

  const openInsertLinkDialog = () => setOpenDialog(true);
  const closeInsertLinkDialog = () => setOpenDialog(false);

  const handleInsertLink = () => {
    if (linkUrl) {
      dispatch(insertLink({ url: linkUrl, start: 0, end: 0 }));
      setLinkUrl("");
      closeInsertLinkDialog();
    }
  };

  return (
    <div
      ref={attachmentAreaRef}
      className="p-2 bg-muted transition cursor-pointer rounded-lg"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleAttachmentClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Paperclip className="w-5 h-5" />
          <span className="text-sm">Attach images by dragging & dropping or clicking here</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            openInsertLinkDialog();
          }}
        >
          <Link2 className="w-5 h-5" />
        </Button>
      </div>

      {attachments.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Attachment ${index + 1}`}
                className="h-14 w-14 object-cover rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 w-5 h-5"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAttachmentHandler(index);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Input
        type="file"
        ref={attachmentInputRef}
        onChange={handleAttachmentChange}
        accept="image/*"
        multiple
        className="hidden"
      />

      {/* Insert Link Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="p-4">
          <DialogHeader>
            <DialogTitle>Insert Markdown Link</DialogTitle>
          </DialogHeader>
          <Input
            type="url"
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={closeInsertLinkDialog}>
              Cancel
            </Button>
            <Button onClick={handleInsertLink}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
