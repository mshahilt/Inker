// src/store/commentStore.ts
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
  // State to track which comment is being replied to ( helpful for UI)
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
          const commentsMap = new Map(state.comments.map(c => [c._id, c]));
          fetchedComments.forEach(comment => {
               commentsMap.set(comment._id, {
                   ...commentsMap.get(comment._id), 
                   ...comment 
               });
          });
           const updatedComments = Array.from(commentsMap.values()).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());


          const topLevelIdsSet = new Set(state.topLevelIds); 
          const newTopLevelIds = fetchedComments
            .filter((c) => c.parentId === null)
            .map((c) => c._id);
          newTopLevelIds.forEach((id) => topLevelIdsSet.add(id));

          const updatedTopLevelIds = [...state.topLevelIds];
          fetchedComments
               .filter(c => c.parentId === null) 
               .map(c => c._id)
               .forEach(id => {
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
          const updatedComments = Array.from(commentsMap.values()).sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

          const newRepliesPagination = new Map(state.repliesPagination);
          const currentParentPagination = newRepliesPagination.get(parentId)!;

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
      }finally {
        set(state => {
           const newRepliesPagination = new Map(state.repliesPagination);
           const parentPagination = newRepliesPagination.get(parentId)!;
           newRepliesPagination.set(parentId, { ...parentPagination, isLoading: false });
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

        set((state) => ({
          comments: [...state.comments, newComment],
          replyingToId: null,
        }));

        if (newComment.parentId === null) {
          set((state) => ({
            topLevelIds: [...state.topLevelIds, newComment._id],
            topLevelTotalCount: state.topLevelTotalCount + 1,
          }));
        } else {
          const parentIdString = newComment.parentId as string; 

          set((state) => {
            const parentCommentIndex = state.comments.findIndex(
              (c) => c._id === parentIdString
            );
            if (parentCommentIndex === -1) return state; 

            const parentComment = state.comments[parentCommentIndex];
            const updatedParent = {
              ...parentComment,
              replyCount: (parentComment.totalDescendantCount  || 0) + 1, 
            };

            const newComments = [...state.comments];
            newComments[parentCommentIndex] = updatedParent;
            return { comments: newComments };
          });

          set((state) => {
            const newRepliesPagination = new Map(state.repliesPagination);
            const parentPagination = newRepliesPagination.get(parentIdString);

            if (parentPagination && parentPagination.isVisible) {
              newRepliesPagination.set(parentIdString, {
                ...parentPagination,
                ids: [...parentPagination.ids, newComment._id],
                totalCount: parentPagination.totalCount + 1,
              });
              return { repliesPagination: newRepliesPagination };
            } else {
              const updatedPagination = getOrCreateReplyPaginationState(
                newRepliesPagination,
                parentIdString
              );
              newRepliesPagination.set(parentIdString, {
                ...updatedPagination,
                totalCount: updatedPagination.totalCount + 1, 
              });
              return { repliesPagination: newRepliesPagination };
            }
          });
        }
        toast.success(
          parentId ? "Reply added successfully!" : "Comment added successfully!"
        );
      } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        const message = err.response?.data?.error || "Failed to add comment";
        toast.error(message);
        set({ error: message });
        set((state) => {
          const comments = state.comments.filter(
            (c) => c._id !== (error as any)?.response?.data?._id
          ); 
          if (parentId) {
            const parentIdString = parentId as string;
            const parentCommentIndex = comments.findIndex(
              (c) => c._id === parentIdString
            );
            if (parentCommentIndex !== -1) {
              const parentComment = comments[parentCommentIndex];
              comments[parentCommentIndex] = {
                ...parentComment,
                totalDescendantCount : Math.max(0, (parentComment.totalDescendantCount  || 0) - 1),
              };
            }
            const newRepliesPagination = new Map(state.repliesPagination);
            const parentPagination = newRepliesPagination.get(parentIdString);
            if (parentPagination) {
              newRepliesPagination.set(parentIdString, {
                ...parentPagination,
                ids: parentPagination.ids.filter(
                  (id) => id !== (error as any)?.response?.data?._id
                ), 
                totalCount: Math.max(0, parentPagination.totalCount - 1), 
              });
            }
            return { comments, repliesPagination: newRepliesPagination };
          } else {
            return {
              comments,
              topLevelIds: state.topLevelIds.filter(
                (id) => id !== (error as any)?.response?.data?._id
              ),
              topLevelTotalCount: Math.max(0, state.topLevelTotalCount - 1),
            };
          }
        });
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

        const result = await commentService.toggleLikeComment(commentId);

        toast.success(result.liked ? "Comment liked!" : "Comment unliked!");
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
