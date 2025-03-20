import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/button";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-black">
      <div className="text-center p-6 lg:p-12 border rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button
          className="w-fit py-2 px-4 text-lg mt-5 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-700 dark:text-white bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700 active:scale-95"
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;