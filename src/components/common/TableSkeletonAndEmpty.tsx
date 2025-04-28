import { Skeleton } from "@/components/ui/skeleton";
import emptyStateImg from "@/assets/empty_status.png";

export const TableSkeleton = ({ columns = 10 }: { columns?: number }) => {
  return (
    <div className="animate-pulse p-4">
      <div className="h-10 bg-gray-200 rounded mb-4"></div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center space-x-2 mb-4">
          {[...Array(columns)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-8 bg-gray-200 rounded w-full"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const EmptyState = ({
  message = "No data found",
}: {
  message?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <img
        src={emptyStateImg}
        alt="No data"
        className="w-40 h-40 object-contain mb-4"
      />
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};
