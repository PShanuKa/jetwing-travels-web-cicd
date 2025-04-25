import { CiMenuKebab } from "react-icons/ci";

import RightBar from "./RightBar";
import { useGetAllCustomersQuery } from "@/services/customerSlice";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";

const Table = ({ searchString }: { searchString: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetAllCustomersQuery({ searchText: searchString , page: currentPage-1,size : 10 });

  return (
    <div className="  rounded-lg  border border-[var(--borderGray)]/50 w-[100%] overflow-x-auto ">
      <table className="w-full text-sm text-left text-[var(--primary)] dark:text-gray-400 ">
        <thead className="text-[14px]   bg-[var(--tableHeaderBg)] dark:bg-gray-700 dark:text-gray-400 font-normal  ">
          <tr>
            <th scope="col" className="py-3 px-6 font-normal">
              No
            </th>
            <th scope="col" className="py-3 px-6 font-normal">
              First Name
            </th>
            <th scope="col" className="py-3 px-6 font-normal">
              Last Name
            </th>
            <th scope="col" className="py-3 px-6 font-normal">
              Email
            </th>
            <th scope="col" className="py-3 px-6 font-normal">
              Phone Number
            </th>
            <th scope="col" className="py-3 px-6 font-normal">
              Address
            </th>
            {/* <th scope="col" className="py-3 px-6 font-normal">
              Currency
            </th> */}
            <th scope="col" className="py-3 px-6 font-normal">
              Status
            </th>
            <th scope="col" className="py-3 px-6 font-normal">
              Action
            </th>
          </tr>
        </thead>
        {data?.data?.content?.map((customer: any) => (
          <tbody key={customer.id}>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-[var(--borderGray)]/50 text-[var(--primary)]/60 hover:bg-[var(--tableHeaderBg)] transition-all duration-150">
              <td className="py-4 px-6">{customer.id}</td>
              <td className="py-4 px-6">{customer.firstName}</td>
              <td className="py-4 px-6">{customer.lastName}</td>
              <td className="py-4 px-6">{customer.primaryEmail}</td>
              <td className="py-4 px-6">{customer.contactNumber}</td>
              <td className="py-4 px-6">{customer.address}</td>
              {/* <td className="py-4 px-6">{customer.currency}</td> */}
              <td className="py-4 px-6">
                {customer.status !== "ACTIVE" ? (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Active
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Inactive
                  </span>
                )}
              </td>
              <td className="py-4 px-6">
                <RightBar item={customer}>
                  <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline border border-[var(--borderGray)]/50 rounded-md p-2 hover:bg-gray-200 transition-all duration-150">
                    <CiMenuKebab />
                  </div>
                </RightBar>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <Pagination totalPages={data?.data?.totalPages} currentPage={currentPage} onPageChange={(value) => {
        setCurrentPage(value);
      }} />
    </div>
  );
};

export default Table;
