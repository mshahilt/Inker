import { axiosInstance } from "@/config/axios";
import { IComment } from "shared/types";

interface PaginatedComments {
  comments: IComment[];
  totalPages: number;
  totalCount: number;
}

export const commentService = {

  createComment: async (data: {
    blogId: string;
    content: string;
    parentId?: string | null;
  }): Promise<IComment> => {
    const response = await axiosInstance.post<IComment>("/api/comment", data);
    return response.data;
  },


  getTopLevelComments: async (
    blogId: string,
    page: number,
    limit: number
  ): Promise<PaginatedComments> => {
    const response = await axiosInstance.get<PaginatedComments>(
      `/api/comment/blogs/${blogId}/top-level`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  },


  getReplies: async (
    parentId: string,
    page: number,
    limit: number
  ): Promise<PaginatedComments> => {
    const response = await axiosInstance.get<PaginatedComments>(
      `/api/comment/${parentId}/replies`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  },

  toggleLikeComment: async (
    commentId: string
  ): Promise<{ likes: number; liked: boolean }> => {
    const response = await axiosInstance.post<{
      likes: number;
      liked: boolean;
    }>(`/api/comment/${commentId}/like`);
    return response.data;
  },
};
