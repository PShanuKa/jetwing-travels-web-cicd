import { CiMenuKebab } from "react-icons/ci";
import RightBar from "./RightBar";
import { useState } from "react";
import { useGetAllUsersQuery } from "@/services/userSlice";
import Pagination from "@/components/common/Pagination";
import {
  TableSkeleton,
  EmptyState,
} from "@/components/common/TableSkeletonAndEmpty";

const Table = ({
  role,
  organizationId,
  searchString,
}: {
  role: string;
  organizationId: string;
  searchString: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllUsersQuery({
    page: currentPage - 1,
    size: 10,
    role: role,
    organizationId: organizationId,
    searchString: searchString,
  });

  const hasData = data?.data?.content && data.data.content.length > 0;

  return (
    <div className="mt-5 rounded-lg border border-[var(--borderGray)]/50 w-full overflow-x-auto">
      {isLoading ? (
        <TableSkeleton columns={7} />
      ) : !hasData ? (
        <EmptyState message="No users found" />
      ) : (
        <>
          <table className="w-full text-sm text-left text-[var(--primary)] dark:text-gray-400">
            <thead className="text-[14px] bg-[var(--tableHeaderBg)] dark:bg-gray-700 dark:text-gray-400 font-normal">
              <tr>
                <th scope="col" className="py-3 px-6 font-normal">
                  No
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Full Name
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Email
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Role
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Company Assigned
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Status
                </th>
                <th scope="col" className="py-3 px-6 font-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.content?.map((user: any) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border border-[var(--borderGray)]/50 text-[var(--primary)]/60 hover:bg-[var(--tableHeaderBg)] transition-all duration-150"
                >
                  <td className="py-4 px-6">{user.id}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6"> {user.email}</td>
                  <td className="py-4 px-6">{user.roleName}</td>
                  <td className="py-4 px-6">
                    {user?.organizationsList
                      ?.map((organizations: any) => `${organizations.name}`)
                      .join(",")}
                  </td>

                  <td className="py-4 px-6">
                    {user.isEnabled ? (
                      <span
                        className={`bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded ${
                          user.isEnabled === true
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {user.isEnabled ? "Active" : "Inactive"}
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    <RightBar
                      item={user}
                      trigger={
                        <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline border border-[var(--borderGray)]/50 rounded-md p-2 hover:bg-gray-200 transition-all duration-150">
                          <CiMenuKebab />
                        </div>
                      }
                    />
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
