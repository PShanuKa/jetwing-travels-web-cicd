import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

const SelectNative = ({ className, children, ...props }: React.ComponentProps<"select">) => {
  return (
    <div className="relative flex">
      <select
        data-slot="select-native"
        className={cn(
          "peer border-input focus:border-primary border-[var(--borderGray)]  bg-white text-foreground  has-[option[disabled]:checked]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-full cursor-pointer appearance-none items-center rounded-md border text-sm shadow-xs  outline-none  disabled:pointer-events-none   disabled:cursor-not-allowed disabled:opacity-50 text-[#667185] transition-all duration-150",
          props.multiple ? "[&_option:checked]:bg-accent py-1 *:px-3 *:py-1" : "h-[44px] ps-3 pe-8",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {!props.multiple && (
        <span className="text-muted-foreground/80 peer-aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center peer-disabled:opacity-50">
          <ChevronDownIcon size={16} aria-hidden="true" color="#667185" />
        </span>
      )}
    </div>
  );
};

export { SelectNative };
