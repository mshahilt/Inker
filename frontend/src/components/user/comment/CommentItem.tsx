import React from "react";
import { useCommentStore } from "@/store/commentStore";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IComment } from "shared/types";
import { toast } from "sonner";
import { ArrowBigUp, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatRelativeTime } from "@/utils/formateDate";

interface CommentItemProps {
  comment: IComment;
  blogId: string;
  allComments: IComment[]; 
  displayLevel?: number; // 0 for top-level, 1 for all descendants in the flat list
}

const findAllDescendants = (
  allComments: IComment[],
  parentId: string
): IComment[] => {
  const descendants: IComment[] = [];

  const directChildren = allComments
    .filter((c) => c.parentId === parentId)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  descendants.push(...directChildren);

  directChildren.forEach((child) => {
    const grandchildren = findAllDescendants(allComments, child._id);
    descendants.push(...grandchildren);
  });

  return descendants.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};

const getReplyCountDisplay = (
  comment: IComment,
  repliesPagination: Map<
    string,
    {
      ids: string[];
      currentPage: number;
      totalCount: number;
      isLoading: boolean;
      isVisible: boolean;
    }
  >
) => {
  if (comment.parentId !== null) return 0;

  if (
    comment.totalDescendantCount !== undefined &&
    comment.totalDescendantCount > 0
  ) {
    return comment.totalDescendantCount;
  }

  const parentPagination = repliesPagination.get(comment._id);
  if (parentPagination) {
    return parentPagination.totalCount ?? 0;
  }

  return 0;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  blogId,
  allComments,
  displayLevel = 0,
}) => {
  const {
    toggleCommentLike,
    setReplyingToId,
    replyingToId,
    loadReplies,
    toggleRepliesVisibility,
    repliesPagination,
    isPostingComment,
  } = useCommentStore();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const userId = user?._id;

  const isLiked = comment.likes.includes(userId as string);
  const isReplying = replyingToId === comment._id;

  const myRepliesPaginationState =
    comment.parentId === null ? repliesPagination.get(comment._id) : undefined;
  const isVisible = myRepliesPaginationState?.isVisible ?? false;
  const isLoadingReplies = myRepliesPaginationState?.isLoading ?? false;
  const totalReplies = getReplyCountDisplay(comment, repliesPagination);

  let descendants: IComment[] = [];
  if (displayLevel === 0 && isVisible) {
    descendants = findAllDescendants(allComments, comment._id);
  }
  const loadedDirectReplyIds = myRepliesPaginationState?.ids || [];
  const loadedAllReplies = descendants.length >= totalReplies;
  const hasMoreRepliesToLoad =
    !loadedAllReplies && loadedDirectReplyIds.length < totalReplies;

  const immediateParentComment = comment.parentId
    ? allComments.find((c) => c._id === comment.parentId)
    : null;

  const renderCommentContent = (
    content: string,
    comment: IComment,
    immediateParentComment: IComment | null
  ) => {
    // The @mention is only displayed if it's a reply or deeper level
    if (
      comment.parentId !== null &&
      immediateParentComment &&
      immediateParentComment?.username
    ) {
      const parentUsername = immediateParentComment.username;

      const mentionPattern = new RegExp(`^@${parentUsername}\\s`, "i");
      if (mentionPattern.test(content)) {
        const mention = `@${parentUsername}`;
        const restOfContent = content.substring(mention.length + 1);
        return (
          <>
            <button
              onClick={() => navigate(`/profile/${parentUsername}`)}
              className="font-semibold text-blue-600 hover:underline mr-1"
            >
              {mention}
            </button>
            {restOfContent}
          </>
        );
      }
      return content;
    }
    return content;
  };

  const handleLikeClick = () => {
    if (!userId) {
      toast.info("Please login to like comments.");
      return;
    }
    toggleCommentLike(comment._id, userId);
  };

  const handleReplyClick = () => {
    if (!userId) {
      toast.info("Please login to reply.");
      return;
    }
    setReplyingToId(isReplying ? null : comment._id);
  };

  const handleToggleReplies = () => {
    if (comment.parentId !== null) return;

    if (isVisible) {
      toggleRepliesVisibility(comment._id, false);
    } else {
      if (loadedDirectReplyIds.length === 0 && totalReplies > 0) {
        loadReplies(comment._id, true);
      } else {
        toggleRepliesVisibility(comment._id, true);
      }
    }
  };

  const handleLoadMoreReplies = () => {
    if (comment.parentId !== null || !isVisible) return;

    if (!isLoadingReplies && hasMoreRepliesToLoad) {
      loadReplies(comment._id, true);
    }
  };

  return (
    <div className={`mb-4 ${displayLevel === 1 ? "ml-8 border-l pl-4" : ""}`}>
      <div className="flex items-start space-x-3">
        <Avatar>
          <AvatarImage src={comment?.profilePicture} alt={comment?.username} />
          <AvatarFallback>{comment?.username?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{comment?.username}</p>
            <span className="text-xs text-gray-500">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm mt-1">
            {renderCommentContent(
              comment.content,
              comment,
              immediateParentComment!
            )}
          </p>
          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLikeClick}
              disabled={!userId || isPostingComment}
              className={`flex items-center space-x-1 ${isLiked ? "text-red-500" : ""}`}
            >
              <ArrowBigUp
                size={17}
                strokeWidth={1}
                color={isLiked ? "#FFAA01" : "#464545"}
                fill={isLiked ? "#FFAA01" : "none"}
              />
              <span>{comment.likes.length}</span>
            </Button>
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReplyClick}
                disabled={isPostingComment}
                className={`flex items-center space-x-1 ${isReplying ? "font-bold text-blue-600" : ""}`}
              >
                Reply
              </Button>
            )}
            
            {/* Only show reply controls for top-level comments */}
            {comment.parentId === null && totalReplies > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleReplies}
                disabled={isLoadingReplies}
                className="flex items-center space-x-1"
              >
                {isLoadingReplies
                  ? "Loading..."
                  : isVisible
                    ? `Hide Replies (${totalReplies})`
                    : `Show Replies (${totalReplies})`}

                {isLoadingReplies ? null : isVisible ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          {isReplying && (
            <div className="mt-3">
              <p className="text-xs text-gray-600 italic">
                Replying to {comment?.username}...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Show descendants for top-level comments when visible */}
      {displayLevel === 0 && isVisible && descendants.length > 0 && (
        <div className="mt-4 space-y-4">
          {descendants.map((descendant) => (
            <CommentItem
              key={descendant._id}
              comment={descendant}
              blogId={blogId}
              allComments={allComments}
              displayLevel={1}
            />
          ))}
          {comment.parentId === null && isVisible && hasMoreRepliesToLoad && (
            <div className="text-center mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoadMoreReplies}
                disabled={isLoadingReplies}
              >
                {isLoadingReplies ? "Loading More..." : "Load More Replies"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
