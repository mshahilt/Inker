import { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }

const Pagination:FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {


    
      const visiblePages = () => {
        if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
    
        if (currentPage === 1) return [1, 2, 3];
        if (currentPage === totalPages) return [totalPages - 2, totalPages - 1, totalPages];
        return [currentPage - 1, currentPage, currentPage + 1];
      };
    
      const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
      };
    
      const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
      };
    
  return (
     <nav className="flex justify-center py-10" aria-label="Pagination">
          <ul className="flex items-center space-x-1">
            <li>
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 disabled:opacity-50">
                <FaChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </button>
            </li>
    
            {visiblePages().map((page) => (
              <li key={page}>
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-4 py-2 rounded-md text-sm font-medium border ${
                    page === currentPage
                      ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                      : "text-gray-700 dark:text-gray-300"
                  }`}>
                  {page}
                </button>
              </li>
            ))}
    
            {totalPages > 3 && currentPage < totalPages - 1 && (
              <li>
                <span className="px-2 py-2 text-gray-500 dark:text-gray-400">...</span>
              </li>
            )}
    
            <li>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 disabled:opacity-50">
                Next
                <FaChevronRight className="ml-2 h-4 w-4" />
              </button>
            </li>
          </ul>
        </nav>
  )
}

export default Pagination
