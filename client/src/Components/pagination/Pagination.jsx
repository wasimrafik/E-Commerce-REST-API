import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({ currentPage, setPage, totalProducts }) => {
  const productPerPage = 21;
  const totalPages = Math.ceil(totalProducts / productPerPage);

  console.log(totalPages);
  const handlePageChange = (value) => {
    if (value >= 1 && value <= totalPages) {
      setPage(value);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {currentPage * productPerPage - productPerPage + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(currentPage * productPerPage, totalProducts)}
            </span>{' '}
            of <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <ul>
              <li
                onClick={() => handlePageChange(currentPage - 1)}
                className={`${
                  currentPage === 1 ? 'pointer-events-none' : 'hover:bg-gray-50'
                } relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:outline-none`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
              </li>
              {[...Array(totalPages).keys()].map((number) => (
                <li
                  key={number + 1}
                  onClick={() => handlePageChange(number + 1)}
                  className={`${
                    currentPage === number + 1
                      ? 'bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      : 'text-gray-900 hover:bg-gray-50'
                  } relative inline-flex items-center px-4 py-2 text-s font-semibold ring-1 ring-inset ring-gray-300 focus:outline-none`}
                >
                  {number + 1}
                </li>
              ))}
              <li
                onClick={() => handlePageChange(currentPage + 1)}
                className={`${
                  currentPage === totalPages ? 'pointer-events-none' : 'hover:bg-gray-50'
                } relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:outline-none`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-4 w-5" aria-hidden="true" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
