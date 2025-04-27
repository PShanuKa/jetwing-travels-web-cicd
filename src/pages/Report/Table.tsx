import Pagination from "@/components/common/Pagination";
import { useGetReportDataQuery } from "@/services/reportSlice";
import { useState } from "react";
import {
  TableSkeleton,
  EmptyState,
} from "@/components/common/TableSkeletonAndEmpty";

const Table = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { data: reportData } = useGetReportDataQuery({
    name: "Payment-Report",
    query: {
      page: currentPage - 1,
      size: 10,
    },
  });

  const hasData =
    reportData?.reportData?.content && reportData.reportData.content.length > 0;

  return (
    <div>

    <div className="mt-5  rounded-lg  border border-[var(--borderGray)]/50  w-full overflow-x-scroll">
      <table className="w-full text-sm text-left text-[var(--primary)] dark:text-gray-400 ">
        <thead className="text-[14px] w-full  bg-[var(--tableHeaderBg)] dark:bg-gray-700 dark:text-gray-400 font-normal  ">
          <tr>
            {reportData?.headers?.map((header: any) => (
              <th scope="col" className="py-3 px-6 font-normal">
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reportData?.reportData?.content?.map(
            (row: any, rowIndex: number) => (
              <tr
                key={rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-[var(--borderGray)]/50 text-[var(--primary)]/60 hover:bg-[var(--tableHeaderBg)] transition-all duration-150"
              >
                {reportData?.headers?.map((header: any, colIndex: number) => (
                  <td key={colIndex} className="py-4 px-6">
                    {row[header.field] ?? "-"}
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
      <Pagination
          totalPages={reportData?.reportData?.totalPages}
          currentPage={currentPage}
          onPageChange={(value) => {
            setCurrentPage(value);
          }}
        />
    </div>
  );
};

export default Table;
