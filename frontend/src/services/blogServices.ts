import { axiosInstance } from "@/config/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface BlogData {
  title: string;
  author: string;
  authorId: string;
  tags: string[];
  thumbnail: {
    type: string;
    url: string;
  };
  content: string;
}

export const blogService = {
  createBlogService: async (data: BlogData): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.post<{status: number; message: string;}>("/api/blog", data);
      return response.data
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Blog creation failed. Please try again.");
      throw new Error(err.response?.data?.error || "Blog creation failed.");
    }
  },
};
