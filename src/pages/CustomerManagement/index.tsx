import { IoSearchOutline } from "react-icons/io5";

import { FaPlus } from "react-icons/fa6";
import Table from "./Table";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "@/components/common/SearchInput";
import { useDispatch } from "react-redux";
import { setPageHeader } from "@/features/metaSlice";

const CustomerManagement = () => {
  const dispatch = useDispatch();
  dispatch(setPageHeader("Customer Management"));

  const [filterIsOpen
    // , setFilterIsOpen
  ] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");

  const searchHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  return (
    <div className="md:p-4 p-2 border-[var(--borderGray)] md:border rounded-lg w-full flex flex-col gap-4 bg-white">
      <div className="flex  items-center justify-between">
        <div className=" items-center gap-2 hidden md:flex ">
          <SearchInput
            value={searchString}
            name={searchString}
            onChange={searchHandleChange}
          />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <div
            onClick={() => setSearchIsOpen(!searchIsOpen)}
            className="border-[var(--borderGray)] border rounded-md p-2"
          >
            <IoSearchOutline size={20} />
          </div>
          {/* <button
            onClick={() => setFilterIsOpen(!filterIsOpen)}
            className="border-[var(--borderGray)] border rounded-md p-2 cursor-pointer active:scale-95 transition-all duration-150 hover:bg-gray-100"
          >
            <GiSettingsKnobs className="-rotate-90" size={20} />
          </button> */}
        </div>

        <div>
          <Link
            to="add"
            className="bg-[var(--primary)] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[44px] h-[36px] transition-all duration-150 outline-none"
          >
            <FaPlus />
            Add New Customer
          </Link>
        </div>
      </div>
      <MobileSearch
        onChange={(e) => setSearchString(e.target.value)}
        value={searchString}
        filterIsOpen={searchIsOpen}
      />

      <MobileFilter filterIsOpen={filterIsOpen} />

      <div className="w-full overflow-x-auto">
        <div className="w-full">
          <Table searchString={searchString} />
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;

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
  return (
    <div
      className={`flex w-full flex-col gap-5 overflow-hidden ${
        filterIsOpen ? "" : "h-0 hidden"
      }`}
    >
      <div>
        <h1 className="text-[16px] font-medium">User Role</h1>
        <div className="flex flex-wrap gap-5 mt-3 px-2">
          <div className="flex items-center gap-2 ">
            <input type="checkbox" />
            <p>Admin</p>
          </div>
          <div className="flex items-center gap-2 ">
            <input type="checkbox" />
            <p>Executive</p>
          </div>

          <div className="flex items-center gap-2 ">
            <input type="checkbox" />
            <p>User</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-[16px] font-medium">User Status</h1>
        <div className="flex flex-wrap gap-5 mt-3 px-2">
          <div className="flex items-center gap-2 ">
            <input type="checkbox" />
            <p>Active</p>
          </div>
          <div className="flex items-center gap-2 ">
            <input type="checkbox" />
            <p>Executive</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-[16px] font-medium">Company</h1>
        <div className="flex flex-wrap gap-5 mt-3 px-2">
          <div className="flex items-center gap-2 ">
            <input type="checkbox" />
            <p>Travels</p>
          </div>
          <div className="flex items-center gap-2 ">
            <input type="checkbox" />
            <p>Eco Holding</p>
          </div>
          <div className="flex items-center gap-2 ">
            <input type="checkbox" />
            <p>Adventure</p>
          </div>
          <div className="flex items-center gap-2 ">
            <input type="checkbox" />
            <p>Trailer Made</p>
          </div>
        </div>
      </div>
    </div>
  );
};
