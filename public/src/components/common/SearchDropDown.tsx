import { useExistingCustomerQuery } from "@/services/invoiceSlice";
import { Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { IoSearchOutline, IoChevronDown } from "react-icons/io5";

interface SearchDropDownProps {
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: "small" | "default";
}

const SearchDropDown = ({
  onChange,
  placeholder = "Search here...",
  className = "",
  size = "default",
}: SearchDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: existingCustomerData, isFetching: isExistingCustomerLoading } =
    useExistingCustomerQuery(
      { searchString: searchString },
      { skip: !searchString }
    );

  const inputHeight = size === "small" ? "h-[32px]" : "h-[44px]";
  const fontSize = size === "small" ? "text-[12px]" : "text-[14px]";
  const iconSize = size === "small" ? "text-sm" : "text-base";

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue: any) => {
    setSearchValue(selectedValue.firstName + " " + selectedValue.lastName);
    setIsOpen(false);
    onChange(selectedValue);
  };

  const handleChange = (e: any) => {
    setSearchString(e.target.value);
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (existingCustomerData?.data.length > 0) {
      setIsOpen(true);
    }
  }, [existingCustomerData?.data]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`flex items-center gap-2 bg-white rounded-md p-2 border ${inputHeight} border-[var(--borderGray)] cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoSearchOutline className={`text-gray-400 ${iconSize}`} />
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          className={`h-full w-full outline-none ${fontSize}`}
          placeholder={placeholder}
          onClick={(e) => e.stopPropagation()}
        />
        {isExistingCustomerLoading && (
          <Loader2
            className="text-gray-400 animate-spin"
            size={size === "small" ? 16 : 20}
          />
        )}
        <IoChevronDown
          className={`text-gray-400 transition-transform ${iconSize} ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[var(--borderGray)] rounded-md shadow-lg max-h-60 overflow-auto">
          {existingCustomerData?.data.length > 0 ? (
            existingCustomerData?.data?.map((item: any) => (
              <div
                key={item.value}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  searchValue === item.firstName + " " + item.lastName
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => handleSelect(item)}
              >
                <p className={`${fontSize} font-medium`}>
                  {item.firstName} {item.lastName}
                </p>
                <p className={`${fontSize} text-gray-500`}>
                  {item.primaryEmail}
                </p>
              </div>
            ))
          ) : (
            <div className={`px-4 py-2 text-gray-500 ${fontSize}`}>
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropDown;
