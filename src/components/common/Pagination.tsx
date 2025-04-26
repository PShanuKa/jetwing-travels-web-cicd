import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const Pagination = ({
  totalPages = 10,
  currentPage = 1,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const maxVisiblePages = 5;
  const pageNumbers = [];

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="md:flex md:justify-between items-center gap-2 p-4 justify-center">
      <div className="text-sm md:text-[14px] text-[12px] text-gray-500 md:block hidden">
        Showing {currentPage} of {totalPages} pages
      </div>
      <div className="flex items-center gap-2 justify-center md:justify-start">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 hover:bg-[var(--primary)]/10 border-[var(--primary)]/50 rounded disabled:opacity-50 flex h-[34px] items-center justify-center"
        >
          <FaAnglesLeft className="text-[var(--primary)]/70 md:text-[16px] text-[10px]" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="md:px-3 px-2 py-1 hover:bg-[var(--primary)]/10 border-[var(--primary)]/50 rounded disabled:opacity-50 h-[34px] items-center justify-center"
        >
          <FaAngleLeft className="text-[var(--primary)]/70 md:text-[16px] text-[10px]" />
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`md:px-3 px-2 py-1 rounded h-[34px] items-center justify-center hover:bg-[var(--primary)]/10 ${
              currentPage === page ? "border-[var(--primary)]/50 border" : ""
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 hover:bg-[var(--primary)]/10  rounded disabled:opacity-50 h-[34px] items-center justify-center border-[var(--primary)]/50"
        >
          <FaAngleLeft className="text-[var(--primary)]/50 rotate-180 md:text-[16px] text-[10px]" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 hover:bg-[var(--primary)]/10  rounded disabled:opacity-50 h-[34px] items-center justify-center border-[var(--primary)]/50"
        >
          <FaAnglesLeft className="text-[var(--primary)]/50 rotate-180 md:text-[16px] text-[10px]" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
