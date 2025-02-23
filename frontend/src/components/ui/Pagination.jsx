import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

const Pagination = ({
  page,
  totalPages,
  onPreviousPage,
  onNextPage,
  goSpecificPage,
  scrollToRef,
}) => {
  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 my-10">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={onPreviousPage}
          disabled={page === 1}
          className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${
            page === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          <HiArrowLongLeft className="mr-3 h-5 w-5 text-gray-400" />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {[...Array(totalPages)].map((_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              onClick={() => {
                goSpecificPage(pageIndex);
                scrollToRef();
              }}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                page === pageIndex
                  ? "border-coral-red text-coral-red"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={onNextPage}
          disabled={page === totalPages}
          className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium ${
            page === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          Next
          <HiArrowLongRight className="ml-3 h-5 w-5 text-gray-400" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
