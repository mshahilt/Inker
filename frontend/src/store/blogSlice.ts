import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Blog, ViewMode, TabMode, BlogEditorState } from '@/types/index'

const initialState: BlogEditorState = {
  title: "",
  content: "",
  activeTab: "write",
  saved: false,
  thumbnail: null,
  attachments: [],
  blogs: [],
  viewMode: "editor",
};

const blogEditorSlice = createSlice({
  name: "blogEditor",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
      state.saved = false;
    },
    setContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
      state.saved = false;
    },
    setActiveTab(state, action: PayloadAction<TabMode>) {
      state.activeTab = action.payload;
    },
    setSaved(state, action: PayloadAction<boolean>) {
      state.saved = action.payload;
    },
    setThumbnail(state, action: PayloadAction<File | null>) {
      state.thumbnail = action.payload;
      state.saved = false;
    },
    setAttachments(state, action: PayloadAction<File[]>) {
      state.attachments = action.payload;
      state.saved = false;
    },
    addAttachment(state, action: PayloadAction<File[]>) {
      state.attachments = [...state.attachments, ...action.payload];
      state.saved = false;
    },
    removeAttachment(state, action: PayloadAction<number>) {
      state.attachments = state.attachments.filter((_, i) => i !== action.payload);
      state.saved = false;
    },
    setBlogs(state, action: PayloadAction<Blog[]>) {
      state.blogs = action.payload;
    },
    addBlog(state, action: PayloadAction<Blog>) {
      state.blogs.push(action.payload);
      state.title = "";
      state.content = "";
      state.thumbnail = null;
      state.attachments = [];
      state.saved = true;
      state.viewMode = "blogs";
    },
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
    insertLink(state, action: PayloadAction<{ url: string; start: number; end: number }>) {
      const { url, start, end } = action.payload;
      const markdownLink = `[Link](${url})`;
      state.content = state.content.substring(0, start) + markdownLink + state.content.substring(end);
      state.saved = false;
    },
  },
});

export const {
  setTitle,
  setContent,
  setActiveTab,
  setSaved,
  setThumbnail,
  setAttachments,
  addAttachment,
  removeAttachment,
  setBlogs,
  addBlog,
  setViewMode,
  insertLink,
} = blogEditorSlice.actions;

export default blogEditorSlice.reducer;