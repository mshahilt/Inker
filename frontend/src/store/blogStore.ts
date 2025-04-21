import { create } from "zustand";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Blog } from "@/types";
import { blogService } from "@/services/blogServices";
import { devtools, persist } from "zustand/middleware";

interface BlogState {
  authorId: string | null;
  feeds: { blogs: Blog[], totalPages: number };
  profileFeeds: { blogs: Blog[], totalPages: number };
  totalPages: number;
  error: string | null;
  isLoading: boolean;
}

interface BlogStore extends BlogState {
    setLoading: (isLoading: boolean) => void;
  setAuthorId: (authorId: string) => void;
  fetchAllBlogs: (page: number) => Promise<void>;
  getBlogById: (blogId: string) => Promise<Blog | null>;
  getBlogsByAuthorName: (authorId: string, page: number) => Promise<void>;
  createBlog: (data: {
    title: string;
    content: string;
    tags: string[];
  }) => Promise<void>;
  deleteBlog: (blogId: string, authorId: string) => Promise<void>;
  editBlog: (
    blogId: string,
    data: { title: string; content: string; tags: string[] }
  ) => Promise<void>;
}

const BlogStore = create<BlogStore>();

export const useBlogStore = create<BlogStore>()(
    devtools(
      persist(
        (set) => ({
          authorId: null,
          feeds: { blogs: [], totalPages: 0 },
          profileFeeds: { blogs: [], totalPages: 0 },
          totalPages: 0,
          isLoading: false,
          error: null,

          setLoading: (isLoading: boolean) => set({isLoading}),
  
          setAuthorId: (authorId: string) => {
            set({ authorId });
          },
  
          fetchAllBlogs: async (page: number) => {
            try {
                
              const res = await blogService.getAllBlogs(page);
              set({ feeds: res });
            } catch (error) {
              const err = error as AxiosError<{ error: string }>;
              const message = err.response?.data?.error || "Failed to fetch blogs";
              toast.error(message);
              set({ error: message });
            } finally {
              set({ isLoading: false });
            }
          },
  
          getBlogById: async (blogId: string) => {
            try {
              set({ isLoading: true });
              const res = await blogService.getBlogById(blogId);
              return res;
            } catch (error) {
              const err = error as AxiosError<{ error: string }>;
              const message = err.response?.data?.error || "Failed to fetch blog";
              toast.error(message);
              return null;
            } finally {
              set({ isLoading: false });
            }
          },
  
          getBlogsByAuthorName: async (authorName: string, page: number) => {
            try {
              set({ isLoading: true, error: null });
              const res = await blogService.getBlogsByAuthorName(authorName, page);
              set({ profileFeeds: res });
            } catch (error) {
              const err = error as AxiosError<{ error: string }>;
              const message =
                err.response?.data?.error || "Failed to fetch author's blogs";
              toast.error(message);
              set({ error: message });
            } finally {
              set({ isLoading: false });
            }
          },
  
          createBlog: async (data) => {
            try {
              set({ isLoading: true });
              const res = await blogService.createBlog(data);
              toast.success(res.message || "Created blog successfully");
            } catch (error) {
              const err = error as AxiosError<{ error: string }>;
              const message = err.response?.data?.error || "Blog creation failed";
              toast.error(message);
              set({ error: message });
            } finally {
              set({ isLoading: false });
            }
          },
  
          deleteBlog: async (blogId, authorId) => {
            try {
              set({ isLoading: true });
              const res = await blogService.deleteBlog({ blogId, authorId });
              toast.success(res.message || "Blog deleted successfully");
          
              set((state) => ({
                profileFeeds: { blogs: state.profileFeeds.blogs.filter((blog) => blog._id !== blogId), totalPages: state.profileFeeds.totalPages },
              }));
            } catch (error) {
              const err = error as AxiosError<{ error: string }>;
              const message = err.response?.data?.error || "Blog deletion failed";
              toast.error(message);
              set({ error: message });
            } finally {
              set({ isLoading: false });
            }
          },
          
  
          editBlog: async (blogId, data) => {
            try {
              set({ isLoading: true });
              const res = await blogService.editBlog(blogId, data);
              toast.success(res.message || "Blog updated successfully");
            } catch (error) {
              const err = error as AxiosError<{ error: string }>;
              const message = err.response?.data?.error || "Blog update failed";
              toast.error(message);
              set({ error: message });
            } finally {
              set({ isLoading: false });
            }
          },
        }),
        {
          name: "blog-storage",
        }
      )
    )
  );
  
