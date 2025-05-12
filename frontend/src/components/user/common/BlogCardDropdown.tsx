import { useNavigate } from "react-router-dom";
import { MoreVertical, UserPlus, Share2, Clipboard, Trash2, Archive, ArchiveRestore, Pencil } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/authStore";
import { useBlogStore } from "@/store/blogStore";
import { useBlogEditorStore } from "@/store/useBlogEditorStore";
import { showConfirmDialog } from "@/store/slices/confirmDialogSlice";

interface BlogCardDropdownProps {
  blogId: string;
  authorId: string;
  isArchived: boolean;
  onArchiveChange?: () => void;
}

const BlogCardDropdown: FC<BlogCardDropdownProps> = ({ blogId, authorId, isArchived, onArchiveChange }) => {
  const { user } = useAuthStore();
  const { deleteBlog, archiveBlog } = useBlogStore();
  const { setEditingBlog } = useBlogEditorStore();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isOwner = user?._id === authorId;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://inker-dev.vercel.app/blog/${blogId}`);
    toast.success("Blog link copied!");
  };

  const handleDelete = () => {
    deleteBlog(blogId, user?._id as string);
  };

  const handleEdit = async () => {
    const val = await setEditingBlog(blogId);
    if (val) {
      navigate(`/blog/edit`);
    }
  };

  const handleArchive = async (action: boolean) => {
    await archiveBlog(blogId, action);
    if (onArchiveChange) {
      onArchiveChange();
    }
  };

  const handleFollow = () => {
    // Placeholder for follow functionality
    toast.info("Follow functionality coming soon!");
  };

  const handleShare = () => {
    // Placeholder for share functionality
    toast.info("Share functionality coming soon!");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {!isOwner && (
          <>
            <DropdownMenuItem onClick={handleFollow}>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Follow</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyLink}>
              <Clipboard className="mr-2 h-4 w-4" />
              <span>Copy Link</span>
            </DropdownMenuItem>
          </>
        )}
        {isOwner && (
          <>
          <DropdownMenuItem onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyLink}>
              <Clipboard className="mr-2 h-4 w-4" />
              <span>Copy Link</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleArchive(!isArchived)}>
              {isArchived ? (
                <>
                  <ArchiveRestore className="mr-2 h-4 w-4" />
                  <span>Unarchive</span>
                </>
              ) : (
                <>
                  <Archive className="mr-2 h-4 w-4" />
                  <span>Archive</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                dispatch(
                  showConfirmDialog({
                    title: "Are you sure you want to delete?",
                    description: "You will not be able to recover it.",
                    confirmText: "Delete",
                    cancelText: "Cancel",
                    onConfirm: handleDelete,
                  })
                )
              }
              className="text-rose-600 dark:text-rose-400 hover:bg-muted hover:text-rose-400 cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span className="text-rose-600 dark:text-rose-400">Delete</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BlogCardDropdown;
