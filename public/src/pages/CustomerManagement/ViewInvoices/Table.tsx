import { CiMenuKebab } from "react-icons/ci";
import RightBar from "./RightBar";
import {
  TableSkeleton,
  EmptyState,
} from "@/components/common/TableSkeletonAndEmpty";
import { useState } from "react";

const Table = () => {
  // Update to remove unused variables


  const [isLoading] = useState(false);
  const [hasData] = useState(true);

  return (
    <div className="mt-5 rounded-lg border border-[var(--borderGray)]/50">
      {isLoading ? (
        <TableSkeleton columns={8} />
      ) : !hasData ? (
        <EmptyState message="No invoices found for this customer" />
      ) : (
        <table className="w-full text-sm text-left text-[var(--primary)] dark:text-gray-400">
          <thead className="text-[14px] bg-[var(--tableHeaderBg)] dark:bg-gray-700 dark:text-gray-400 font-normal">
            <tr>
              <th scope="col" className="py-3 px-6 font-normal">
                No
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Invoice No
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Currency
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Amount
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Payment Type
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Invoice Status
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Payment Status
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Click Time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-[var(--borderGray)]/50 text-[var(--primary)]/60 hover:bg-[var(--tableHeaderBg)] transition-all duration-150">
              <td className="py-4 px-6">01</td>
              <td className="py-4 px-6">Jane Doe</td>
              <td className="py-4 px-6">USD</td>
              <td className="py-4 px-6">$80.23</td>
              <td className="py-4 px-6">Credit Card</td>
              <td className="py-4 px-6">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Paid
                </span>
              </td>
              <td className="py-4 px-6">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Paid
                </span>
              </td>
              <td className="py-4 px-6">
                <RightBar>
                  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline border border-[var(--borderGray)]/50 rounded-md p-2 hover:bg-gray-200 transition-all duration-150">
                    <CiMenuKebab />
                  </button>
                </RightBar>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
