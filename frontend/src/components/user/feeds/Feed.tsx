import { Link } from "react-router-dom";
import BlogCard from "../common/BlogCard";
import {
} from "react-icons/fa";
import { useSidebar } from "@/components/ui/sidebar";
import { useBlogStore } from "@/store/blogStore";
import { useEffect, useState } from "react";
import Pagination from "@/components/user/common/Pagination";
import useAuthStore from "@/store/authStore";
import Loader from "../common/Loader";
import BlogActionBar from "./BlogActionBar";
import BlogAuthorInfo from "./BlogAuthorInfo";


const Feeds = () => {
  const { feeds, fetchAllBlogs } = useBlogStore()
  const { isAuthenticated, accessToken, isLoading } = useAuthStore()
  const { state } = useSidebar()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (isAuthenticated && accessToken) fetchAllBlogs(currentPage)
  }, [fetchAllBlogs, isAuthenticated, accessToken, currentPage])

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
      {feeds?.blogs.length > 0 ? (
        <>
          <div className={`grid ${state === 'expanded' ? "xl:grid-cols-3  md:grid-cols-2 " : "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"} grid-cols-1 gap-4 h-fit justify-center  mt-5 p-2`}>
            {feeds.blogs.map((blog, index) => (
              <article
                key={index}
                className="bg-white dark:bg-black border border-muted rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 mx-auto flex flex-col h-full relative p-2 w-full max-w-[400px]"
              >

                <BlogAuthorInfo authorName={blog?.authorName} authorProfilePicture={blog?.authorProfilePicture} />

                <Link
                  to={`/blog/${blog._id}`}
                  className="flex-grow"
                  aria-label={`Read post ${blog.title || "Untitled"}`}
                >
                  <div className="p-1">
                    <BlogCard blog={blog} />
                  </div>
                </Link>

                <BlogActionBar blogId={blog?._id} comments={blog?.comments} upVotes={blog?.upVotes}  downVotes={blog?.downVotes}/>

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
