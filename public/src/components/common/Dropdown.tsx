import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const Dropdown = ({
  options,
  onChangeHandler,
  value,
  name,
  errors,
  placeholder,
  size = "default",
}: {
  options: { name: string; value: string }[];
  onChangeHandler: (e: any) => void;
  value: string;
  name: string;
  errors?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "default";
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const valueName = options?.find((option) => option.value === value)?.name;

  const dropdownHeight = size === "small" ? "h-[32px]" : "h-[44px]";
  const fontSize = size === "small" ? "text-[12px]" : "text-[14px]";
  const topOffset = size === "small" ? "top-[36px]" : "top-[48px]";

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className={`w-full ${dropdownHeight} border border-[var(--borderGray)]/50 rounded-md p-2 text-left ${fontSize} outline-none hover:bg-gray-100 transition-all duration-300 flex items-center justify-between ${
          errors ? "border-[var(--red)]" : ""
        }`}
      >
        <span>{valueName ? valueName : placeholder || "Select an option"}</span>
        <IoChevronDown
          className={`text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <ul
          className={`absolute ${topOffset} left-0 w-full bg-white border border-[var(--borderGray)]/50 rounded-md shadow-md z-10 overflow-hidden`}
        >
          {(options || [])?.map((option) => (
            <li
              key={option.value}
              className={`p-2 ${fontSize} cursor-pointer hover:bg-gray-100 transition-all duration-300`}
              onClick={() => {
                setIsOpen(false);
                onChangeHandler({
                  target: {
                    value: option.value,
                    name: name || "",
                  },
                });
              }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
