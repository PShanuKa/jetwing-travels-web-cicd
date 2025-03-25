import { IoSearchOutline } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";

import { SelectNative } from "@/components/ui/select-native";
import { FaPlus } from "react-icons/fa6";
import Table from "./Table";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "@/components/common/SearchInput";

const InvoiceManagement = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  return (
    <div className="md:p-4 p-2 border-[var(--borderGray)]  md:border rounded-lg w-full flex flex-col gap-4 bg-white ">
      <div className="flex  items-center justify-between">
        <div className=" items-center gap-2 hidden md:flex">
          <SearchInput
            value={searchString}
            name={""}
            onChange={(e: any) => {
              setSearchString(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <div
            onClick={() => setSearchIsOpen(!searchIsOpen)}
            className="border-[var(--borderGray)] border rounded-md p-2"
          >
            <IoSearchOutline size={20} />
          </div>
          <button
            onClick={() => setFilterIsOpen(!filterIsOpen)}
            className="border-[var(--borderGray)] border rounded-md p-2 cursor-pointer active:scale-95 transition-all duration-150 hover:bg-gray-100"
          >
            <GiSettingsKnobs className="-rotate-90" size={20} />
          </button>
        </div>


        <div>
          <Link
            to="add"
            className="bg-[var(--primary)] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[44px] h-[36px] transition-all duration-150 outline-none"
          >
            <FaPlus />
            Add New Invoice
          </Link>
        </div>
      </div>
      
    
      <MobileSearch
        onChange={(e) => setSearchString(e.target.value)}
        value={searchString}
        filterIsOpen={searchIsOpen}
      />

      <MobileFilter filterIsOpen={filterIsOpen} />

      <div>
        <Table searchString={searchString} />
      </div>
    </div>
  );
};

export default InvoiceManagement;

const MobileSearch = ({
  onChange,
  value,
  filterIsOpen,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  filterIsOpen: boolean;
}) => {
  return (
    <div
      className={`flex w-full flex-col  overflow-hidden transition-all duration-150 ${
        filterIsOpen ? "h-[45px]" : "h-0"
      }`}
    >
      <SearchInput value={value} name="searchString" onChange={onChange} />
    </div>
  );
};


const MobileFilter = ({ filterIsOpen }: { filterIsOpen: boolean }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (contentRef.current) {
    
      const measuredHeight = filterIsOpen ? contentRef.current.scrollHeight : 0;
      setHeight(measuredHeight);
    }
  }, [filterIsOpen]);

  return (
    <div
      className={`flex w-full flex-col gap-5 overflow-hidden transition-all duration-300`}
      style={{ height: height !== null ? `${height}px` : undefined }}
    >
      <div ref={contentRef} className="w-full flex flex-col items-center gap-2">
        <div className="w-full">
          <SelectNative>
            <option value="1">Payment Status</option>
            <option value="admin">Paid</option>
            <option value="executive">Unpaid</option>
          </SelectNative>
        </div>
        <div className="w-full">
          <SelectNative className="w-full">
            <option value="1">Currency</option>
            <option value="admin">Credit Card</option>
            <option value="executive">Debit Card</option>
          </SelectNative>
        </div>
        <div className="w-full">
          <SelectNative className="w-full">
            <option value="1">Payment Type</option>
            <option value="admin">Yes</option>
            <option value="executive">No</option>
          </SelectNative>
        </div>
      </div>
    </div>
  );
};