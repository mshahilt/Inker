import { useDispatch, useSelector } from "react-redux";
import { setViewMode } from "@/store/slices/blogSlice";
import type { RootState } from "@/store/store";
import { Editor } from "./Editor";
import { BlogList } from "./BlogList";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogPostEditor() {
  const dispatch = useDispatch();
  const { viewMode } = useSelector((state: RootState) => state.blogEditor);

  return (
    <div className="flex justify-center p-8 md:p-8 min-h-screen w-full md:w-auto">
      <Card className="w-full md:w-full md:max-w-3xl border-0 md:border rounded-none md:rounded-xl bg-background">
        <div className="px-4 py-2 md:px-6 md:py-4 border-b border-border flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className={`relative px-2 py-1 md:px-4 md:py-2 text-sm font-medium transition ${viewMode === "editor" ? "text-primary after:w-full after:h-[2px] after:bg-primary after:absolute after:bottom-0 after:left-0" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => dispatch(setViewMode("editor"))}
            >
              New Post
            </Button>
            <Button
              variant="ghost"
              className={`relative px-2 py-1 md:px-4 md:py-2 text-sm font-medium transition ${viewMode === "blogs" ? "text-primary after:w-full after:h-[2px] after:bg-primary after:absolute after:bottom-0 after:left-0" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => dispatch(setViewMode("blogs"))}
            >
              View Blogs
            </Button>
          </div>
        </div>
        <div className="flex-1 w-full p-2 md:p-6 md:space-y-6">
          {viewMode === "editor" ? <Editor /> : <BlogList />}
        </div>
      </Card>
    </div>
  );
}