import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ViewMode, TabMode, BlogEditorState, Blog } from '@/types/index';

const initialState: BlogEditorState = {
  title: "",
  content: "",
  activeTab: "write",
  saved: false,
  thumbnail: null,
  attachments: [],
  attachmentUrls: [],
  blogs: [],
  viewMode: "editor",
  loading: false,
  error: null,
  editingBlogId: null,
};

export const blogSlice = createSlice({
  name: "blogEditor",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      state.saved = false;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
      state.saved = false;
    },
    setActiveTab: (state, action: PayloadAction<TabMode>) => {
      state.activeTab = action.payload;
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    addBlog: (state, action: PayloadAction<Blog>) => {
      state.blogs.push(action.payload);
      state.saved = true;
      state.viewMode = "blogs";
    },
    updateBlog: (state, action: PayloadAction<Blog>) => {
      const index = state.blogs.findIndex(b => b._id === action.payload._id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
        state.saved = true;
        state.viewMode = "blogs";
      }
    },
    editBlog: (state, action: PayloadAction<Blog>) => {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.thumbnail = null;
      state.attachments = [];
      state.attachmentUrls = action.payload.attachmentUrls || [];
      state.editingBlogId = action.payload._id;
      state.viewMode = "editor";
      state.saved = true;
    },
    setThumbnail: (state, action: PayloadAction<File | null>) => {
      if (state.thumbnail) {
        URL.revokeObjectURL(URL.createObjectURL(state.thumbnail));
      }
      state.thumbnail = action.payload;
      state.saved = false;
    },
    addAttachment: (state, action: PayloadAction<{ file: File; url: string }>) => {
      state.attachments.push(action.payload.file);
      state.attachmentUrls.push(action.payload.url);
      state.saved = false;
    },
    removeAttachment: (state, action: PayloadAction<number>) => {
      state.attachments.splice(action.payload, 1);
      state.attachmentUrls.splice(action.payload, 1);
      state.saved = false;
    },
    resetEditor: (state) => {
      state.title = "";
      state.content = "";
      state.thumbnail = null;
      state.attachments = [];
      state.attachmentUrls = [];
      state.saved = false;
      state.editingBlogId = null;
    },
    setSaved: (state, action: PayloadAction<boolean>) => { 
      state.saved = action.payload;
    },
  },
});

export const {
  setTitle,
  setContent,
  setActiveTab,
  setViewMode,
  addBlog,
  updateBlog,
  editBlog,
  setThumbnail,
  addAttachment,
  removeAttachment,
  resetEditor,
  setSaved, 
} = blogSlice.actions;

export default blogSlice.reducer;