import { CiMenuKebab } from "react-icons/ci";
import RightBar from "./RightBar";
import { useGetAllInvoicesQuery } from "@/services/invoiceSlice";
import { useState, useEffect } from "react";
import Pagination from "@/components/common/Pagination";
import {
  TableSkeleton,
  EmptyState,
} from "@/components/common/TableSkeletonAndEmpty";
import { format, parseISO } from "date-fns";

const Table = ({ searchString = "" }: { searchString: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [companyId, setCompanyId] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const selectedCompany = localStorage.getItem("companySelected");
    if (selectedCompany) {
      try {
        const companyData = JSON.parse(selectedCompany);
        setCompanyId(companyData.id || "");
      } catch (error) {
        console.error("Error parsing company data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    if (searchString) {
      setIsSearching(true);
    }
  }, [searchString]);

  const { data, isLoading, isFetching } = useGetAllInvoicesQuery({
    "Company-id": companyId,
    page: currentPage - 1,
    size: 10,
    searchText: searchString,
  });

  useEffect(() => {
    if (!isFetching && isSearching) {
      setIsSearching(false);
    }
  }, [isFetching]);

  const hasData = data?.data?.content && data.data.content.length > 0;
  const showLoader = isLoading || (isSearching && isFetching);

  return (
    <div className="mt-5 rounded-lg border border-[var(--borderGray)]/50 overflow-x-auto w-[100%] ">
      {showLoader ? (
        <TableSkeleton columns={11} />
      ) : !hasData ? (
        <EmptyState
          message={
            searchString ? "No search results found" : "No invoices found"
          }
        />
      ) : (
        <>
          <table className="w-full text-sm text-left text-[var(--primary)] dark:text-gray-400">
            <thead className="text-[14px] bg-[var(--tableHeaderBg)] dark:bg-gray-700 dark:text-gray-400 font-normal">
              <tr>
                <th scope="col" className="py-3 px-6 font-normal">
                  Invoice No
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
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Click Counts
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Invoice Type
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Currency
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Transaction Fee
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Sub Total
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Full Amount
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Paid Amount
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Balance Amount
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.content?.map((invoice: any) => (
                <tr
                  key={invoice.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-[var(--borderGray)]/50 text-[var(--primary)]/60 hover:bg-[var(--tableHeaderBg)] transition-all duration-150"
                >
                  <td className="py-4 px-6">{invoice.id}</td>
                  <td className="py-4 px-6">
                    {invoice.createdAt ? (
                      <>
                        {format(parseISO(invoice.createdAt), "dd/MM/yyyy")}
                        <br />
                        {format(parseISO(invoice.createdAt), "h:mm a")}
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-4 px-6">{invoice.tourNumber}</td>
                  <td className="py-4 px-6">
                    {invoice.firstName} {invoice.lastName}
                  </td>
                  <td className="py-4 px-6 justify-center items-center">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded ${
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
                  <td className="py-4 px-6 text-center">
                    {invoice.paymentLinkClickedTimes}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {invoice.invoiceType}
                  </td>
                  <td className="py-4 px-6">{invoice.currency || "LKR"}</td>
                  <td className="py-4 px-6">{invoice.bankCharge}</td>
                  <td className="py-4 px-6 text-right">
                    {Number(invoice.netTotal).toLocaleString() || 0.0}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {Number(invoice.totalAmount).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {Number(invoice.paidAmount || 0.0).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {Number(invoice.balancePayment).toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <RightBar key={`rightbar-${invoice.id}`} item={invoice}>
                      <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline border border-[var(--borderGray)]/50 rounded-md p-2 hover:bg-gray-200 transition-all duration-150 cursor-pointer">
                        <CiMenuKebab />
                      </div>
                    </RightBar>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalPages={data?.data?.totalPages}
            currentPage={currentPage}
            onPageChange={(value) => {
              setCurrentPage(value);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Table;
