import { create } from "zustand";
import { toast } from "sonner";
import { blogService } from "@/services/blogServices";
import { AxiosError } from "axios";

interface BlogEditorState {
    thumbnail: { name: string; url: string, file?: File} | null;
    title: string;
    content: string;
    tags: string[];
    editingBlogId: string | undefined;
    isLoading: boolean;
    setThumbnail: (thumbnail: { name: string; url: string, file?: File } | null) => void
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    saveBlog: () => Promise<void>;
    setEditingBlog: (editingBlogId: string | undefined) => Promise<boolean>
    clearBlog: () => Promise<void>
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
        const { title, content, tags, editingBlogId, thumbnail } = get();
        set({ isLoading: true });

        try {

            let thumbnailUrl: string | undefined;
            if (thumbnail?.file) {
                thumbnailUrl = await blogService.uploadImage(thumbnail.file);
            } else if (thumbnail?.url) {
                thumbnailUrl = thumbnail.url; 
            }
            if (editingBlogId) {
                const res = await blogService.editBlog(editingBlogId, { title, content, tags, thumbnail: thumbnailUrl });
                toast.success(res.message || 'Updated edited blog.');
            } else {
                const res = await blogService.createBlog({ title, content, tags, thumbnail: thumbnailUrl });
                console.log(res)
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
                const { title, content, tags, thumbnail } = res
                set({ title, content, tags, editingBlogId, thumbnail: thumbnail ? { name: "thumbnail", url: thumbnail } : null, })
            } else {
                set({ title: '', content: '', tags: [], thumbnail: null, editingBlogId: undefined })
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
    },

    clearBlog: async (): Promise<void> => {
        set({ isLoading: true });
        set({ title: '', content: '', tags: [], thumbnail: null, editingBlogId: undefined })
        set({ isLoading: false });
    }
}));
