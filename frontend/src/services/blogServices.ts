import { axiosInstance } from "@/config/axios";
import { Blog } from "@/types";

export const blogService = {
  createBlog: async (blogData: { title: string; content: string; tags: string[] }) => {
    const response = await axiosInstance.post<{ status: number; message: string }>("/api/blog", blogData);
    return response.data;
  },

  deleteBlog: async ({ blogId, authorId }: { blogId: string; authorId: string }) => {
    const response = await axiosInstance.delete<{ status: number; message: string }>(`/api/blog/${blogId}`, {
      params: { authorId },
    });
    return response.data;
  },

  editBlog: async (blogId: string, blogData: { title: string; content: string; tags: string[] }) => {
    const response = await axiosInstance.put<{ status: number; message: string }>(`/api/blog/${blogId}`, blogData);
    return response.data;
  },

  getAllBlogs: async () => {
    const response = await axiosInstance.get<{ blogs: Blog[]; totalPages: number }>("/api/blog");
    return response.data;
  },

  getBlogById: async (blogId: string) => {
    const response = await axiosInstance.get<Blog>(`/api/blog/${blogId}`);
    return response.data;
  },

  getBlogsByAuthor: async (authorId: string): Promise<{ blogs: Blog[]; totalPages: number }> => {
    const response = await axiosInstance.get<{ blogs: Blog[]; totalPages: number }>(`/api/blog/user/${authorId}`);
    return response.data;
  },
};
