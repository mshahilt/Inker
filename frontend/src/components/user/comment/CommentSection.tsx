import React, { useEffect, useRef, useState } from "react";
import { useCommentStore } from "@/store/commentStore";
import CommentItem from "./CommentItem";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { IComment } from "shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CommentSectionProps {
  blogId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ blogId }) => {
  const {
    comments,
    topLevelIds,
    topLevelTotalCount,
    topLevelCurrentPage,
    isLoadingTopLevel,
    isPostingComment,
    error,
    replyingToId,
    setReplyingToId,
    loadTopLevelComments,
    addComment,
    resetCommentsState,
  } = useCommentStore();

  const { user } = useAuthStore();
  const userId = user?._id;

  const [newCommentContent, setNewCommentContent] = useState("");

  const commentInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (replyingToId !== null) {
      const commentToReply = comments.find((c) => c._id === replyingToId);

      if (commentInputRef.current && commentToReply) {
        if (commentToReply?.username) {
          setNewCommentContent(`@${commentToReply.username} `);
        } else {
          setNewCommentContent("");
        }
        commentInputRef.current.focus();
        commentInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (!commentToReply) {
        setNewCommentContent("");
      }
    } else {
      setNewCommentContent("");
    }
  }, [replyingToId, commentInputRef, comments]);

  useEffect(() => {
    if (blogId) {
      resetCommentsState();
      loadTopLevelComments(blogId);
    }
    return () => {
      resetCommentsState();
    };
  }, [blogId, resetCommentsState, loadTopLevelComments]);

  const replyingToComment = replyingToId
    ? comments.find((c) => c._id === replyingToId)
    : null;

  const handleAddComment = async () => {
    if (!userId) {
      toast.info("Please login to add a comment.");
      return;
    }
    if (!newCommentContent.trim()) {
      toast.warning("Comment cannot be empty.");
      return;
    }

    const parentId = replyingToId;

    setNewCommentContent("");
    setReplyingToId(null);

    await addComment(blogId, newCommentContent, parentId);
  };

  const topLevelComments = topLevelIds
    .map((commentId) => comments.find((c) => c._id === commentId))
    .filter((c): c is IComment => c !== undefined);

  const hasMoreTopLevelComments = topLevelComments.length < topLevelTotalCount;

  return (
    <div className="mt-8 p-4 md:p-0">
      <h2 className="text-2xl font-bold mb-4">
        Comments <span className="text-sm font-semibold">( {topLevelTotalCount} )</span>
      </h2>
      {user ? (
        <div
          className={`mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 ${replyingToId ? "sticky top-30 z-10" : ""}`}
        >
          <div className="flex items-center space-x-3 mb-3 ">
            <Avatar>
              <AvatarImage
                src={user?.profilePicture}
                alt={user?.username}
                className="w-8 rounded-full"
              />
              <AvatarFallback>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">{user?.username?.charAt(0)}</div>
              </AvatarFallback>

            </Avatar>
            <span className="hidden sm:flex text-lg font-semibold">
              {user?.username}
            </span>
            {replyingToComment && (
              <span className="text-sm text-gray-600">
                Replying to{" "}
                <span className="font-semibold">
                  @{replyingToComment?.username}
                </span>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setReplyingToId(null)}
                  className="ml-2 px-1 h-auto text-red-500 bg-red-100"
                >
                  Cancel Reply
                </Button>
              </span>
            )}
          </div>
          <div className="flex justify-end mt-3">
            <Input
              ref={commentInputRef}
              placeholder={
                replyingToComment
                  ? `Add a reply to ${replyingToComment?.username}...`
                  : "Add a comment..."
              }
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              disabled={isPostingComment}
              className="w-full dark:bg-gray-100/10 border-2 mr-2 focus:ring-0"
            />
            <Button
              onClick={handleAddComment}
              disabled={isPostingComment || !newCommentContent.trim()}
            >
              <Send size={17} strokeWidth={1} color="#fff" fill="#000" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="mb-6 text-center text-gray-600 p-4 border rounded-lg bg-gray-50">
          Please login to add comments or like.
        </div>
      )}
      <Separator className="my-6" />
      {!isLoadingTopLevel &&
        topLevelComments.length === 0 &&
        topLevelCurrentPage === 0 && (
          <div className="text-center text-gray-500 mb-20">
            Loading comments...
          </div>
        )}
      {!isLoadingTopLevel &&
        topLevelComments.length === 0 &&
        topLevelCurrentPage > 0 &&
        topLevelTotalCount === 0 && (
          <div className="text-center text-gray-500 mb-6">
            No comments yet. Be the first to comment!
          </div>
        )}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      {/* Comments List */}
      {topLevelComments.length > 0 && (
        <div className="space-y-6">
          {topLevelComments.map((topComment) => (
            <CommentItem
              key={topComment._id}
              comment={topComment}
              blogId={blogId}
              allComments={comments}
              displayLevel={0}
            />
          ))}
        </div>
      )}
      {topLevelComments.length > 0 &&
        !isLoadingTopLevel &&
        hasMoreTopLevelComments && (
          <div className="text-center mt-6 ">
            <Button
              onClick={() => loadTopLevelComments(blogId)}
              disabled={isLoadingTopLevel}
            >
              {isLoadingTopLevel
                ? "Loading More Comments..."
                : "Load More Comments"}
            </Button>
          </div>
        )}
      {isLoadingTopLevel && topLevelComments.length > 0 && (
        <div className="text-center text-gray-500 mt-6">Loading more...</div>
      )}
    </div>
  );
};

export default CommentSection;
