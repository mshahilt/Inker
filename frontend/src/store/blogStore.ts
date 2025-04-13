import { create } from "zustand";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Blog } from "@/types";
import { blogService } from "@/services/blogServices";

interface BlogState {
  authorId: string | null;
  blogs: Blog[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  setAuthorId: (authorId: string) => void;
  fetchAllBlogs: () => Promise<void>;
  getBlogById: (blogId: string) => Promise<Blog | null>;
  getBlogsByAuthor: (authorId: string) => Promise<void>;
  createBlog: (data: { title: string; content: string; tags: string[] }) => Promise<void>;
  deleteBlog: (blogId: string, authorId: string) => Promise<void>;
  editBlog: (blogId: string, data: { title: string; content: string; tags: string[] }) => Promise<void>;
}

export const useBlogStore = create<BlogState>((set) => ({
  authorId: null,
  blogs: [],
  totalPages: 0,
  loading: false,
  error: null,

  setAuthorId: (authorId: string) => {
    set({authorId})
  },

  fetchAllBlogs: async () => {
    try {
      set({ loading: true, error: null });
      const res = await blogService.getAllBlogs()
      set({ blogs: res.blogs, totalPages: res.totalPages });
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to fetch blogs";
      toast.error(message);
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  getBlogById: async (blogId: string) => {
    try {
      const res = await blogService.getBlogById(blogId)
      return res;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to fetch blog";
      toast.error(message);
      return null;
    }
  },

  getBlogsByAuthor: async (authorId: string) => {
    try {
      set({ loading: true, error: null });
      const res = await blogService.getBlogsByAuthor(authorId)
      set({ blogs: res.blogs, totalPages: res.totalPages });
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Failed to fetch author's blogs";
      toast.error(message);
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  createBlog: async (data) => {
    try {
      const res = await blogService.createBlog(data)
      toast.success(res.message);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Blog creation failed";
      toast.error(message);
      set({ error: message });
    }
  },

  deleteBlog: async (blogId, authorId) => {
    try {
      const res = await blogService.deleteBlog({ blogId, authorId })
      toast.success(res.message);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Blog deletion failed";
      toast.error(message);
      set({ error: message });
    }
  },

  editBlog: async (blogId, data) => {
    try {
      const res = await blogService.editBlog( blogId, data)
      toast.success(res.message);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || "Blog update failed";
      toast.error(message);
      set({ error: message });
    }
  },
}));
