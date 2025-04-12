import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ConfirmDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog = ({
  open,
  setOpen,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setOpen]);

  // Click outside to close
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-brightness-75 bg-black/30">
      <div
        ref={dialogRef}
        className="bg-primary-foreground w-full max-w-md mx-4 rounded-xl shadow-lg p-6 transform transition-all duration-200 scale-100 opacity-100"
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            onClick={() => setOpen(false)}
            variant='outline'
            className="bg-muted"
          >
            {cancelText}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            variant='default'
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmDialog;
