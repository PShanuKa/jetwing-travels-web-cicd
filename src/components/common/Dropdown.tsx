import { useState } from "react";

const Dropdown = ({
  options,
  onChangeHandler,
  value,
  name,
  errors,
  placeholder,
}: {
  options: { name: string; value: string }[];
  onChangeHandler: (e: any) => void;
  value: string;
  name: string;
  errors?: string;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  


 const valueName = options.find((option) => option.value === value)?.name;

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className={`w-full h-[44px] border border-[var(--borderGray)]/50 rounded-md p-2 text-left text-[14px] outline-none hover:bg-gray-100 transition-all duration-300 ${errors ? "border-[var(--red)]" : ""}`}
      >
        {valueName ? valueName  :   (placeholder || "Select an option")}
      </button>
      {isOpen && (
        <ul className="absolute top-[48px] left-0 w-full bg-white border border-[var(--borderGray)]/50 rounded-md shadow-md z-10 overflow-hidden">
          {(options || [])?.map((option) => (
            <li
              key={option.value}
              className="p-2 text-[14px] cursor-pointer hover:bg-gray-100 transition-all duration-300"
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
