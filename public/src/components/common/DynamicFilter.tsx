import React from "react";
import { cn } from "@/lib/utils"; // Assuming `cn` is a utility function like `clsx` or `tailwind-merge`

interface FilterProps {
  children?: React.ReactNode;
  onChangeFilter: (e: any) => void;
  filterSchema: any;
}

const DynamicFilter = ({ onChangeFilter, filterSchema }: FilterProps) => {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-4 gap-5 relative mt-5">
        {(filterSchema || []).map((item: any, index: number) => (
          <div key={index}>
            {/* <label className="text-[12px] text-fontGray">
              {item.filterName}
            </label> */}

            {item.dataType === "text" && (
              <input
                type={item?.dataType}
                name={item.filterName}
                onChange={(e) => {
                  const data = {
                    target: {
                      name: item.filterParameter,
                      value: {
                        filterParameter: item.filterParameter,
                        value: e.target.value,
                        options: [],
                      },
                    },
                  };
                  onChangeFilter(data);
                }}
                placeholder={item?.placeHolder || ""}
                className={cn(
                  "peer border-input focus:scale-105 border-[var(--borderGray)] bg-white text-foreground has-[option[disabled]:checked]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-full cursor-pointer appearance-none items-center rounded-md border text-sm shadow-xs outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-[#667185] transition-all duration-150",
                  "h-[44px] ps-3 pe-8"
                )}
              />
            )}
            {item.dataType === "select" && (
              <select
                name={item.name}
                onChange={(e) => {
                  const data = {
                    target: {
                      name: item.filterParameter,
                      value: {
                        filterParameter: item.filterParameter,
                        value: e.target.value,
                        options: [],
                      },
                    },
                  };
                  onChangeFilter(data);
                }}
                className={cn(
                  "peer border-input focus:scale-105 border-[var(--borderGray)] bg-white text-foreground has-[option[disabled]:checked]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-full cursor-pointer appearance-none items-center rounded-md border text-sm shadow-xs outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-[#667185] transition-all duration-150",
                  "h-[44px] ps-3 pe-8"
                )}
              >
                {item.selectValue?.map((option: any, idx: number) => (
                  <option key={idx} value={option}>
                    {option || ""}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicFilter;