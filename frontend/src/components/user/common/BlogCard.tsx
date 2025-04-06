
import { CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogs } from "@/store/slices/blogSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Blog } from "@/types";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.blogEditor);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);


  const fallbackThumbnail = "https://tse1.mm.bing.net/th?id=OIP.kkJ4tBMv2tT9OqxmUWlQFgHaEK&pid=Api&P=0&h=180";

  if (loading) return <p className="text-center text-muted-foreground">Loading blogs...</p>;
  if (error) return <p className="text-destructive text-center">Error: {error}</p>;



  return (
    <div className="max-w-[400px] w-full rounded-lg justify-items-stretch">
      <CardHeader className="p-1">
        <CardTitle className="text-xl font-semibold text-foreground line-clamp-2">
          {blog.title || "Untitled Blog"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          By {blog.authorName || "Unknown Author"} |{" "}
          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Date Unknown"}
        </p>
      </CardHeader>

      <div className="flex flex-wrap gap-2 mt-2">
        {blog.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="px-2 py-[1px] text-xs border dark:border-gray-700 rounded-md text-gray-400  hover:cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-3">
        <img
          src={fallbackThumbnail}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-md  hover:cursor-pointer"
        />
      </div>
      <p className="text-gray-400 text-xs mt-2">
        {/* {post.date} • {post.minute}m read time */}
        30 12m read time
      </p>
    </div>
  );
};

export default BlogCard;
