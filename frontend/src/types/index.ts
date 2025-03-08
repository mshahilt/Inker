export interface Blog {
  title: string;
  content: string;
  thumbnail: File | null;
  attachments: File[];
}

export type ViewMode = "editor" | "blogs";
export type TabMode = "write" | "preview";

export interface BlogEditorState {
  title: string;
  content: string;
  activeTab: TabMode;
  saved: boolean;
  thumbnail: File | null;
  attachments: File[];
  blogs: Blog[];
  viewMode: ViewMode;
}