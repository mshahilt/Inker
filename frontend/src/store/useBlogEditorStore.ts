import { create } from "zustand";
import { toast } from "sonner";
import { blogService } from "@/services/blogServices";
import { AxiosError } from "axios";

interface BlogEditorState {
    thumbnail: { name: string; url: string } | null;
    title: string;
    content: string;
    tags: string[];
    editingBlogId: string | undefined;
    isLoading: boolean;
    setThumbnail: (thumbnail: { name: string; url: string } | null) => void
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    saveBlog: () => Promise<void>;
    setEditingBlog: (editingBlogId: string | undefined) => Promise<boolean>
}

export const useBlogEditorStore = create<BlogEditorState>((set, get) => ({
    thumbnail: null,
    title: "",
    content: "",
    tags: [],
    editingBlogId: undefined,
    isLoading: false,

    setThumbnail: (thumbnail) => set({ thumbnail }),
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),

    saveBlog: async () => {
        const { title, content, tags, editingBlogId } = get();
        set({ isLoading: true });

        try {
            if (editingBlogId) {
                const res = await blogService.editBlog(editingBlogId, { title, content, tags });
                toast.success(res.message || 'Updated edited blog.');
            } else {
                const res = await blogService.createBlog({ title, content, tags });
                toast.success(res.message || 'Saved new blog');
            }
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const message = err.response?.data?.error || "Failed to fetch blogs";
            toast.error(message);
        } finally {
            set({ isLoading: false });
        }
    },

    setEditingBlog: async (editingBlogId: string | undefined): Promise<boolean> => {
        set({ isLoading: true });

        try {
            if (editingBlogId) {
                const res = await blogService.getBlogById(editingBlogId);
                const { title, content, tags } = res
                set({ title, content, tags, editingBlogId })
            } else {
                set({ title: '', content: '', tags: [] })
            }
            return true
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const message = err.response?.data?.error || "Failed to fetch blogs";
            toast.error(message);
            return false
        } finally {
            set({ isLoading: false });
        }
    }
}));
