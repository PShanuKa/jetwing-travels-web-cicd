import { CiMenuKebab } from "react-icons/ci";

import RightBar from "./RightBar";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";
import { useGetAllPaymentQuery } from "@/services/paymentSlice";

const Table = ({
  searchString = "",
  status = "",
  currency = "",
  paymentType = "",
}: {
  searchString: string;
  status: string;
  currency: string;
  paymentType: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetAllPaymentQuery({
    ...(searchString && { searchText: searchString }),
    page: currentPage - 1,
    size: 10,
    ...(status && { status: status }),
    ...(currency && { currency: currency }),
    ...(paymentType && { paymentType: paymentType }),
  });

  return (
    <div>
      <div className="mt-5 rounded-lg border border-[var(--borderGray)]/50 overflow-x-auto w-[100%] ">
        <table className="w-full text-sm text-left text-[var(--primary)] dark:text-gray-400 ">
          <thead className="text-[14px]   bg-[var(--tableHeaderBg)] dark:bg-gray-700 dark:text-gray-400 font-normal  ">
            <tr>
              <th scope="col" className="py-3 px-6 font-normal">
                No
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Date & Time
              </th>

              <th scope="col" className="py-3 px-6 font-normal">
                Invoice No
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Transaction No
              </th>
              <th scope="col" className="py-3 px-6 font-normal">
                Customer Name
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
                Payment Status
              </th>

              <th scope="col" className="py-3 px-6 font-normal">
                Action
              </th>
            </tr>
          </thead>
          {data?.data?.content?.map((payment: any) => (
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-[var(--borderGray)]/50 text-[var(--primary)]/60 hover:bg-[var(--tableHeaderBg)] transition-all duration-150">
                <td className="py-4 px-6">{payment.id}</td>
                <td className="py-4 px-6">{payment?.transactionDate}</td>
                <td className="py-4 px-6">{payment?.invoiceDto?.id}</td>
                <td className="py-4 px-6">{payment?.transactionId}</td>
                <td className="py-4 px-6">
                  {payment?.customerDto?.firstName}{" "}
                  {payment?.customerDto?.lastName}
                </td>
                <td className="py-4 px-6">{payment?.invoiceDto?.currency}</td>
                <td className="py-4 px-6">{payment?.amount}</td>
                <td className="py-4 px-6">{payment?.paymentMethod}</td>
                <td className="py-4 px-6">{payment?.status}</td>
                {/* <td className="py-4 px-6">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Active
              </span>
            </td> */}

                <td className="py-4 px-6">
                  <RightBar payment={payment}>
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline border border-[var(--borderGray)]/50 rounded-md p-2 hover:bg-gray-200 transition-all duration-150">
                      <CiMenuKebab />
                    </button>
                  </RightBar>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <Pagination
        totalPages={data?.data?.totalPages}
        currentPage={currentPage}
        onPageChange={(value) => {
          setCurrentPage(value);
        }}
      />
    </div>
  );
};

export default Table;
