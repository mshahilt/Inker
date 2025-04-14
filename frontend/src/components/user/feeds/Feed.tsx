import { Link, useNavigate } from "react-router-dom";
import BlogCard from "../common/BlogCard";
import {
} from "react-icons/fa";
import { ArrowBigDown, ArrowBigUp, Clipboard, MessageCircle } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useBlogStore } from "@/store/blogStore";
import { useEffect, useState } from "react";
import Pagination from "@/components/user/common/Pagination";
import useAuthStore from "@/store/authStore";
import { DEFAULT_IMG } from "@/utils/constents";
import Loader from "../common/Loader";
import { toast } from "sonner";


const Feeds = () => {
  const { feeds, fetchAllBlogs } = useBlogStore()
  const { isAuthenticated, accessToken, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const { state } = useSidebar()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (isAuthenticated && accessToken) fetchAllBlogs()
  }, [fetchAllBlogs, isAuthenticated, accessToken])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="max-w-[200px]" />
      </div>
    );
  }

  return (
    <section className="w-full mx-auto  xl:max-w-7xl 2xl:border-x">
      <h1 className="text-2xl font-bold mt-6 ml-4">Filter box</h1>
      {feeds?.blogs.length > 0 ? (
        <>
          <div className={`grid ${state === 'expanded' ? "xl:grid-cols-3  md:grid-cols-2 " : "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"} grid-cols-1 gap-4 h-fit justify-center  mt-5 p-2`}>
            {feeds.blogs.map((blog, index) => (
              <article
                key={index}
                className="bg-white dark:bg-gray-800 border border-muted rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 mx-auto flex flex-col h-full relative p-2 w-full max-w-[400px]"
              >


                <div className="flex w-full items-center">
                  <img
                    src={blog.authorProfilePicture || DEFAULT_IMG}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div className="relative group inline-block">
                    <span className="font-medium cursor-pointer"
                      onClick={() => navigate(`/profile/${blog.authorName}`)}>
                      {blog.authorName}
                    </span>
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black dark:bg-white dark:text-black text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
                      View Profile
                    </div>
                  </div>
                </div>

                <Link
                  to={`/blog/${blog._id}`}
                  className="flex-grow"
                  aria-label={`Read post ${blog.title || "Untitled"}`}
                >
                  <div className="p-1">
                    <BlogCard blog={blog} />
                  </div>
                </Link>
                <div
                  className="flex gap-2 justify-around mt-5 max-h-12 text-muted-foreground border-t py-2">
                  <div
                    className="flex items-center justify-center p-2 w-fit rounded hover:bg-muted cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(`http://inker-dev.vercel.app/blog/${blog?._id}`);
                      toast.success("Blog link copied!");
                    }}
                    title="Copy blog link"
                  >
                    <Clipboard size={17} strokeWidth={1} />
                  </div>
                  <div
                    className="flex items-center justify-center gap-2 p-2 w-fit rounded hover:bg-muted cursor-pointer text-sm">
                    {blog.comments}
                    <MessageCircle size={19} strokeWidth={1} />
                  </div>
                  <div
                    className="flex items-center gap-2 justify-center  w-fit rounded border border-muted">
                    <div className="flex gap-2 justify-center items-center text-sm">
                      <button
                        className="flex items-center justify-center p-2 w-fit rounded hover:bg-muted cursor-pointer">
                        <ArrowBigUp size={17} strokeWidth={1} />
                      </button>
                      {blog?.likes}
                      <div className="h-[25px] bg-muted-foreground/30 w-[1.5px]"></div>
                    </div>
                    <button
                      className="flex items-center justify-center p-2 w-fit rounded hover:bg-muted cursor-pointer">
                      <ArrowBigDown size={17} strokeWidth={1} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Pagination onPageChange={onPageChange} currentPage={currentPage} totalPages={feeds?.totalPages} />
        </>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <p className="text-xl font-medium text-gray-600 dark:text-gray-300">
            No posts available yet
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Check back later for new content
          </p>
        </div>
      )}
    </section>
  );
};

export default Feeds;
