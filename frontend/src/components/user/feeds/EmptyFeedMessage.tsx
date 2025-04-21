

const EmptyFeedMessage = () => {
  return (
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
  )
}

export default EmptyFeedMessage
