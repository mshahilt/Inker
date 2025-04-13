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
    loading: boolean;
    setThumbnail: (thumbnail: { name: string; url: string } | null) => void
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    saveBlog: () => Promise<void>;
    setEditingBlog: (editingBlogId: string | undefined) => Promise<void>
}

export const useBlogEditorStore = create<BlogEditorState>((set, get) => ({
    thumbnail: null,
    title: "",
    content: "",
    tags: [],
    editingBlogId: undefined,
    loading: false,

    setThumbnail: (thumbnail) => set({ thumbnail }),
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),

    saveBlog: async () => {
        const { title, content, tags, editingBlogId } = get();
        set({ loading: true });

        try {
            if (editingBlogId) {
                const res = await blogService.editBlog(editingBlogId, { title, content, tags });
                toast.success(res.message);
            } else {
                const res = await blogService.createBlog({ title, content, tags });
                toast.success(res.message);
            }
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const message = err.response?.data?.error || "Failed to fetch blogs";
            toast.error(message);
        } finally {
            set({ loading: false });
        }
    },

    setEditingBlog: async (editingBlogId: string | undefined) => {
        set({ loading: true });

        try {
            if (editingBlogId) {
                const res = await blogService.getBlogById(editingBlogId);
                const { title, content, tags } = res
                set({ title, content, tags, editingBlogId })
            } else {
                set({ title: '', content: '', tags: [] })
            }
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const message = err.response?.data?.error || "Failed to fetch blogs";
            toast.error(message);
        } finally {
            set({ loading: false });
        }
    }
}));
