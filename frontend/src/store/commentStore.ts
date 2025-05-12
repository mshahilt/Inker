import { create } from "zustand";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { commentService } from "@/services/commentServices";
import { devtools } from "zustand/middleware";
import { IComment } from "shared/types";

const COMMENTS_PER_PAGE = 5;
const REPLIES_PER_PAGE = 5;

interface CommentState {
  comments: IComment[];

  topLevelIds: string[];
  topLevelCurrentPage: number;
  topLevelTotalCount: number;
  isLoadingTopLevel: boolean;

  repliesPagination: Map<
    string,
    {
      ids: string[];
      currentPage: number;
      totalCount: number;
      isLoading: boolean;
      isVisible: boolean;
    }
  >;

  currentBlogId: string | null;
  isPostingComment: boolean;
  error: string | null;
  // State to track which comment is being replied to (helpful for UI)
  replyingToId: string | null;
}

interface CommentStore extends CommentState {
  loadTopLevelComments: (blogId: string) => Promise<void>;
  loadReplies: (parentId: string, makeVisible?: boolean) => Promise<void>;
  addComment: (
    blogId: string,
    content: string,
    parentId?: string | null
  ) => Promise<void>;
  toggleCommentLike: (commentId: string, userId: string) => Promise<void>;
  setReplyingToId: (commentId: string | null) => void;
  resetCommentsState: () => void;
  toggleRepliesVisibility: (parentId: string, visible: boolean) => void;
}

const getOrCreateReplyPaginationState = (
  map: Map<
    string,
    {
      ids: string[];
      currentPage: number;
      totalCount: number;
      isLoading: boolean;
      isVisible: boolean;
    }
  >,
  parentId: string
) => {
  if (!map.has(parentId)) {
    map.set(parentId, {
      ids: [],
      currentPage: 0,
      totalCount: 0,
      isLoading: false,
      isVisible: false,
    });
  }
  return map.get(parentId)!;
};

// Helper function to find the root parent of a comment
const findRootParentId = (
  comments: IComment[],
  commentId: string
): string | null => {
  const comment = comments.find((c) => c._id === commentId);
  if (!comment) return null;

  // If it's a top-level comment, return itself
  if (comment.parentId === null) return comment._id;

  // Otherwise, recursively find the root parent
  return findRootParentId(comments, comment.parentId as string);
};


export const useCommentStore = create<CommentStore>()(
  devtools((set, get) => ({
    comments: [],

    topLevelIds: [],
    topLevelCurrentPage: 0,
    topLevelTotalCount: 0,
    isLoadingTopLevel: false,

    repliesPagination: new Map(),

    currentBlogId: null,
    isPostingComment: false,
    error: null,
    replyingToId: null,

    resetCommentsState: () => {
      set({
        comments: [],
        topLevelIds: [],
        topLevelCurrentPage: 0,
        topLevelTotalCount: 0,
        isLoadingTopLevel: false,
        repliesPagination: new Map(),
        isPostingComment: false,
        error: null,
        replyingToId: null,
        currentBlogId: null,
      });
    },

    toggleRepliesVisibility: (parentId: string, visible: boolean) => {
      set((state) => {
        const newRepliesPagination = new Map(state.repliesPagination);
        const parentPagination = getOrCreateReplyPaginationState(
          newRepliesPagination,
          parentId
        );
        newRepliesPagination.set(parentId, {
          ...parentPagination,
          isVisible: visible,
        });
        return { repliesPagination: newRepliesPagination };
      });
    },

    loadTopLevelComments: async (blogId: string) => {
      const state = get();
      if (state.currentBlogId !== blogId) {
        get().resetCommentsState();
        set({ currentBlogId: blogId });
      }

      if (
        state.isLoadingTopLevel ||
        (state.topLevelCurrentPage > 0 &&
          state.topLevelCurrentPage * COMMENTS_PER_PAGE >=
            state.topLevelTotalCount)
      ) {
        return;
      }

      set({ isLoadingTopLevel: true, error: null });
      const nextPage = state.topLevelCurrentPage + 1;

      try {
        const { comments: fetchedComments, totalCount } =
          await commentService.getTopLevelComments(
            blogId,
            nextPage,
            COMMENTS_PER_PAGE
          );

        set((state) => {
          const commentsMap = new Map(state.comments.map((c) => [c._id, c]));
          fetchedComments.forEach((comment) => {
            commentsMap.set(comment._id, {
              ...commentsMap.get(comment._id),
              ...comment,
            });
          });

          const updatedComments = Array.from(commentsMap.values());

          const updatedTopLevelIds = [...state.topLevelIds];
          fetchedComments
            .filter((c) => c.parentId === null)
            .map((c) => c._id)
            .forEach((id) => {
              if (!updatedTopLevelIds.includes(id)) {
                updatedTopLevelIds.push(id);
              }
            });

          return {
            comments: updatedComments,
            topLevelIds: updatedTopLevelIds,
            topLevelCurrentPage: nextPage,
            topLevelTotalCount: totalCount,
          };
        });
      } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        const message =
          err.response?.data?.error || "Failed to fetch top-level comments";
        toast.error(message);
        set({ error: message });
      } finally {
        set({ isLoadingTopLevel: false });
      }
    },

    loadReplies: async (parentId: string, makeVisible = false) => {
      const state = get();
      const parentPagination = getOrCreateReplyPaginationState(
        state.repliesPagination,
        parentId
      );

      if (
        parentPagination.isLoading ||
        (!makeVisible && parentPagination.isVisible) ||
        (parentPagination.currentPage > 0 &&
          parentPagination.currentPage * REPLIES_PER_PAGE >=
            parentPagination.totalCount)
      ) {
        if (makeVisible && !parentPagination.isVisible) {
          get().toggleRepliesVisibility(parentId, true);
        }
        return;
      }

      set((state) => {
        const newRepliesPagination = new Map(state.repliesPagination);
        newRepliesPagination.set(parentId, {
          ...newRepliesPagination.get(parentId)!,
          isLoading: true,
        });
        return { repliesPagination: newRepliesPagination };
      });

      const nextPage = parentPagination.currentPage + 1;
      const blogId = state.currentBlogId;

      if (!blogId) {
        console.error("Attempted to load replies without blogId in state");
        set((state) => {
          const newRepliesPagination = new Map(state.repliesPagination);
          newRepliesPagination.set(parentId, {
            ...newRepliesPagination.get(parentId)!,
            isLoading: false,
          });
          return {
            repliesPagination: newRepliesPagination,
            error: "Blog ID missing for replies",
          };
        });
        return;
      }

      try {
        const { comments: fetchedComments, totalCount } =
          await commentService.getReplies(parentId, nextPage, REPLIES_PER_PAGE);

        set((state) => {
          const commentsMap = new Map(state.comments.map((c) => [c._id, c]));
          fetchedComments.forEach((comment) => {
            commentsMap.set(comment._id, comment);
          });
          const updatedComments = Array.from(commentsMap.values());

          const newRepliesPagination = new Map(state.repliesPagination);
          const currentParentPagination = newRepliesPagination.get(parentId)!;

          // Get all direct replies to this parent
          const fetchedDirectReplyIds = fetchedComments
            .filter((c) => c.parentId === parentId)
            .map((c) => c._id);

          const updatedReplyIds = [...currentParentPagination.ids];
          fetchedDirectReplyIds.forEach((id) => {
            if (!updatedReplyIds.includes(id)) {
              updatedReplyIds.push(id);
            }
          });

          newRepliesPagination.set(parentId, {
            ids: updatedReplyIds,
            currentPage: nextPage,
            totalCount: totalCount,
            isLoading: false,
            isVisible: makeVisible || currentParentPagination.isVisible,
          });

          return {
            comments: updatedComments,
            repliesPagination: newRepliesPagination,
          };
        });
      } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        const message =
          err.response?.data?.error ||
          `Failed to fetch replies for ${parentId}`;
        toast.error(message);
        set((state) => {
          const newRepliesPagination = new Map(state.repliesPagination);
          newRepliesPagination.set(parentId, {
            ...newRepliesPagination.get(parentId)!,
            isLoading: false,
          });
          return { repliesPagination: newRepliesPagination, error: message };
        });
      } finally {
        set((state) => {
          const newRepliesPagination = new Map(state.repliesPagination);
          const parentPagination = newRepliesPagination.get(parentId)!;
          newRepliesPagination.set(parentId, {
            ...parentPagination,
            isLoading: false,
          });
          return { repliesPagination: newRepliesPagination };
        });
      }
    },

    addComment: async (
      blogId: string,
      content: string,
      parentId?: string | null
    ) => {
      if (!content.trim()) {
        toast.error("Comment cannot be empty.");
        return;
      }
      set({ isPostingComment: true, error: null });
      try {
        const newComment = await commentService.createComment({
          blogId,
          content,
          parentId,
        });

        set((state) => {
          // Add the new comment to our state
          const commentsMap = new Map(state.comments.map((c) => [c._id, c]));
          commentsMap.set(newComment._id, newComment);
          const updatedComments = Array.from(commentsMap.values()).sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

          if (newComment.parentId === null) {
            const updatedTopLevelIds = [...state.topLevelIds];
            if (!updatedTopLevelIds.includes(newComment._id)) {
              updatedTopLevelIds.unshift(newComment._id);
            }

            return {
              comments: updatedComments,
              topLevelIds: updatedTopLevelIds,
              topLevelTotalCount: state.topLevelTotalCount + 1, 
            };
          } else {
            const parentIdString = newComment.parentId as string;

            const commentsBeforeAdd = state.comments; 
            const rootParentId = findRootParentId(
              commentsBeforeAdd,
              parentIdString
            );

            const newRepliesPagination = new Map(state.repliesPagination);

            if (rootParentId) {
              const ancestorCommentIndex = updatedComments.findIndex(
                (c) => c._id === rootParentId
              );
              if (ancestorCommentIndex !== -1) {
                const ancestorComment = updatedComments[ancestorCommentIndex];
                const updatedAncestorComment = {
                  ...ancestorComment,
                  totalDescendantCount:
                    (ancestorComment?.totalDescendantCount || 0) + 1,
                };
                updatedComments[ancestorCommentIndex] = updatedAncestorComment;

                const ancestorPagination = getOrCreateReplyPaginationState(
                  newRepliesPagination,
                  rootParentId
                );
                newRepliesPagination.set(rootParentId, {
                  ...ancestorPagination,
                  totalCount: ancestorPagination.totalCount + 1, 
                });
              } else {
                console.warn(
                  `CommentStore: Top-level ancestor ${rootParentId} not found in state to increment count.`
                );
              }
            } else {
              console.warn(
                "CommentStore: Could not find top-level ancestor for new reply, skipping optimistic count update."
              );
            }

            const immediateParentPagination = getOrCreateReplyPaginationState(
              newRepliesPagination,
              parentIdString
            );

            immediateParentPagination.totalCount += 1;

            if (immediateParentPagination.isVisible) {
              if (!immediateParentPagination.ids.includes(newComment._id)) {
                immediateParentPagination.ids.push(newComment._id);
              }
            }

            newRepliesPagination.set(parentIdString, immediateParentPagination);

            return {
              comments: updatedComments, 
              repliesPagination: newRepliesPagination, 
            };
          }
        });

        

        if (parentId) {
          const state = get();
          const parentPagination = state.repliesPagination.get(
            parentId as string
          );
          const isFirstReply = parentPagination?.totalCount === 1;

          if (isFirstReply) {
            get().toggleRepliesVisibility(parentId as string, true);
          }
        }
      } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        const message = err.response?.data?.error || "Failed to add comment";
        toast.error(message);
        set({ error: message });
      } finally {
        set({ isPostingComment: false });
      }
    },

    toggleCommentLike: async (commentId: string, userId: string) => {
      if (!userId) {
        toast.info("Please login to like comments.");
        return;
      }

      try {
        set((state) => {
          const commentIndex = state.comments.findIndex(
            (c) => c._id === commentId
          );
          if (commentIndex === -1) return state;

          const comment = state.comments[commentIndex];
          const hasLiked = comment.likes.includes(userId);

          const updatedLikes = hasLiked
            ? comment.likes.filter((id) => id !== userId) // Remove like
            : [...comment.likes, userId]; // Add like

          const updatedComment = { ...comment, likes: updatedLikes };
          const newComments = [...state.comments];
          newComments[commentIndex] = updatedComment;

          return { comments: newComments };
        });

        await commentService.toggleLikeComment(commentId);

      } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        const message = err.response?.data?.error || "Failed to toggle like";
        toast.error(message);
        set({ error: message });
      }
    },

    setReplyingToId: (commentId: string | null) => {
      set({ replyingToId: commentId });
    },
  }))
);
