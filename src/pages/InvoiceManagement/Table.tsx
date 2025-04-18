import { CiMenuKebab } from "react-icons/ci";
import RightBar from "./RightBar";
import { useGetAllInvoicesQuery } from "@/services/invoiceSlice";
import { useState } from "react";
import Pagination from "@/components/common/Pagination";

const Table = ({ searchString = "" }: { searchString: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetAllInvoicesQuery({
    searchText: searchString,
    page: currentPage - 1,
    size: 10,
  });

  return (
    <div className="mt-5 rounded-lg border border-[var(--borderGray)]/50 overflow-x-auto w-[100%] ">
      {/* Wrapper for horizontal scrolling */}
      <div className="min-w-full inline-block">
        <table className="w-full text-sm text-left text-[var(--primary)] dark:text-gray-400">
          <thead className="text-[14px] bg-[var(--tableHeaderBg)] dark:bg-gray-700 dark:text-gray-400 font-normal">
            <tr>
              <th scope="col" className="py-3 px-6 font-normal">
                No
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Date/Time
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Tour No
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Cust Name
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
                Click Counts
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Action
              </th>
            </tr>
          </thead>
          {data?.data?.content?.map((invoice: any) => (
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-[var(--borderGray)]/50 text-[var(--primary)]/60 hover:bg-[var(--tableHeaderBg)] transition-all duration-150">
                <td className="py-4 px-6">{invoice.id}</td>
                <td className="py-4 px-6">-</td>
                <td className="py-4 px-6"> {invoice.tourNumber}</td>
                <td className="py-4 px-6">
                  {invoice.firstName} {invoice.lastName}
                </td>
                <td className="py-4 px-6">{invoice.currency || "LKR"}</td>
                <td className="py-4 px-6">
                  {invoice.balancePayment} {invoice.currency || "LKR"}
                </td>
                <td className="py-4 px-6">-</td>
                <td className="py-4 px-6 justify-center items-center">
                  <span
                    className={` text-xs font-medium px-2.5 py-0.5 rounded ${
                      invoice.invoiceStatus === "PENDING"
                        ? "bg-blue-100 text-blue-800"
                        : invoice.invoiceStatus === "CANCELLED"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {invoice.invoiceStatus}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Active
                  </span>
                </td>
                <td className="py-4 px-6">-</td>
                <td className="py-4 px-6">
                  <RightBar item={invoice}>
                    
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline border border-[var(--borderGray)]/50 rounded-md p-2 hover:bg-gray-200 transition-all duration-150">
                      <CiMenuKebab />
                    </div>
                  </RightBar>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <Pagination
          totalPages={data?.data?.totalPages}
          currentPage={currentPage}
          onPageChange={(value) => {
            setCurrentPage(value);
          }}
        />
      </div>
    </div>
  );
};

export default Table;
