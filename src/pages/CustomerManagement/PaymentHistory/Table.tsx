import {
  TableSkeleton,
  EmptyState,
} from "@/components/common/TableSkeletonAndEmpty";
import { useState } from "react";

const Table = () => {
  // Simulating loading state for demo purposes
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(true);

  return (
    <div className="mt-5 rounded-lg border border-[var(--borderGray)]/50">
      {isLoading ? (
        <TableSkeleton columns={7} />
      ) : !hasData ? (
        <EmptyState message="No payment history found for this customer" />
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
                Payment Method
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Reference No
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-[var(--borderGray)]/50 text-[var(--primary)]/60 hover:bg-[var(--tableHeaderBg)] transition-all duration-150">
              <td className="py-4 px-6">01</td>
              <td className="py-4 px-6">Jane Doe</td>
              <td className="py-4 px-6">USD</td>
              <td className="py-4 px-6">$80.23</td>
              <td className="py-4 px-6">Visa</td>
              <td className="py-4 px-6">REF-20240213-001</td>
              <td className="py-4 px-6">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Paid
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
