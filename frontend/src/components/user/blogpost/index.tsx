import { useDispatch, useSelector } from "react-redux";
import { setViewMode } from "@/store/blogSlice";
import type { RootState } from "@/store/store";
import { Editor } from "./Editor";
import { BlogList } from "./BlogList";

export default function BlogPostEditor() {
  const dispatch = useDispatch();
  const viewMode = useSelector((state: RootState) => state.blogEditor.viewMode);

  return (
    <div className=" flex justify-center p-8">
      <div className="w-full max-w-3xl  border rounded-xl">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div>
            <button
              className={`px-4 py-2 font-medium ${viewMode === "editor" ? "dark:text-white border-b-2 dark:border-white" : "text-gray-400 hover:text-white"}`}
              onClick={() => dispatch(setViewMode("editor"))}
            >
              New Post
            </button>
            <button
              className={`px-4 py-2 font-medium ${viewMode === "blogs" ? "text-white border-b-2 border-purple-500" : "text-gray-400 hover:text-white"}`}
              onClick={() => dispatch(setViewMode("blogs"))}
            >
              View Blogs
            </button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {viewMode === "editor" ? <Editor /> : <BlogList />}
        </div>
      </div>
    </div>
  );
}