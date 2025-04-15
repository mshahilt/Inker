export type ViewMode = "editor" | "blogs";
export type TabMode = "write" | "preview";

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  authorName: string;
  authorProfilePicture: string;
  tags: string[];
  thumbnail: string | null;
  attachments: Array<{
    name: string;
    url: string;
  }>;
  attachmentUrls: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
}

export interface BlogEditorState {
  title: string;
  content: string;
  activeTab: TabMode;
  saved: boolean;
  thumbnail: null | {
    name: string;
    url: string;
  };
  currentBlog: Blog | null;
  attachments: Array<{
    name: string;
    url: string;
  }>;
  attachmentUrls: string[];
  feeds: {
    blogs: Blog[];
    totalPage: number;
  };
  profileFeeds: {
    blogs: Blog[];
    totalPage: number;
  };
  viewMode: ViewMode;
  loading: boolean;
  error: string | null;
  editingBlogId: string | null;
  tags: string[];
}

export interface DecodedToken {
  id: string;
  username: string;
  role: string;
}