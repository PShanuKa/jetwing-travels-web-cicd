import { CiMenuKebab } from "react-icons/ci";

import RightBar from "./RightBar";
import Pagination from "@/components/common/Pagination";

const Table = () => {
  return (
    <div className="mt-5 rounded-lg border border-[var(--borderGray)]/50  ">
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
              Reference No
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
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-[var(--borderGray)]/50 text-[var(--primary)]/60 hover:bg-[var(--tableHeaderBg)] transition-all duration-150">
            <td className="py-4 px-6">01</td>
            <td className="py-4 px-6">2025-03-06 10:00:00</td>
            <td className="py-4 px-6">JT-INV-1001</td>
            <td className="py-4 px-6">REF-1234567890</td>
            <td className="py-4 px-6">John Doe</td>
            <td className="py-4 px-6">LKR</td>
            <td className="py-4 px-6">$1,000.00</td>
            <td className="py-4 px-6">Credit Card</td>
           
            <td className="py-4 px-6">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Active
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
          {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-[var(--borderGray)]/50 text-[var(--primary)]/60 hover:bg-[var(--tableHeaderBg)] transition-all duration-150">
            <td className="py-4 px-6">01</td>
            <td className="py-4 px-6">Jane Doe</td>
            <td className="py-4 px-6">Jane Doe</td>
            <td className="py-4 px-6">jane.doe@example.com</td>
            <td className="py-4 px-6">070 123 4567</td>
            <td className="py-4 px-6">12, Galle Road, Colombo 03, Sri Lanka</td>
            <td className="py-4 px-6">LKR</td>
            <td className="py-4 px-6">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Active
              </span>
            </td>
            <td className="py-4 px-6">
              <RightBar>
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline border border-[var(--borderGray)]/50 rounded-md p-2 hover:bg-gray-200 transition-all duration-150">
                  <CiMenuKebab />
                </button>
              </RightBar>
            </td>
          </tr> */}
        </tbody>
      </table>
      <Pagination totalPages={10} currentPage={1} onPageChange={() => {}} />
    </div>
  );
};

export default Table;
