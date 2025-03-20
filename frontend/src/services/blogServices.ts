import { axiosInstance } from "@/config/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";



export const blogService = {
  createBlogService: async (formData: FormData): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.post<{status: number; message: string;}>("/api/blog", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Blog creation failed. Please try again.");
      throw new Error(err.response?.data?.error || "Blog creation failed.");
    }
  },

  deleteBlogService: async ({blogId, authorId}: {blogId: string; authorId: string}): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.delete<{status: number; message: string;}>("/api/blog", {
        params: {
            blogId,
            authorId
        }
      });
      return response.data
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Blog deletion failed. Please try again.");
      throw new Error(err.response?.data?.error || "Blog deletion failed.");
    }
  },

  editBlogService: async (formData: FormData): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.put<{status: number; message: string;}>("/api/blog", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Blog update failed. Please try again.");
      throw new Error(err.response?.data?.error || "Blog update failed.");
    }
  }
};
