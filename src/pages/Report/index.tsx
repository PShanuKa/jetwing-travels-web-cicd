
import { IoSearchOutline } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";
import Input from "@/components/common/SearchInput";
import Table from "./Table";
import { useState } from "react";
import { CiExport } from "react-icons/ci";
// import DynamicFilter from "@/components/common/DynamicFilter";
// import { useGetReportDataQuery, useGetFiltersSchemaQuery } from "@/services/reportSlice";

// const sampleFilterSchema = [
//   {
//     filterName: "Search by Name", 
//     dataType: "text", 
//     filterParameter: "name",
//     placeHolder: "Enter name...", 
//   },
//   {
//     filterName: "Filter by Age",
//     dataType: "text",
//     filterParameter: "age",
//     placeHolder: "Enter age...",
//   },
//   {
//     filterName: "Select Gender",
//     dataType: "select", 
//     filterParameter: "gender",
//     selectValue: ["Male", "Female", "Other"], 
//   },
//   {
//     filterName: "Filter by Status",
//     dataType: "select",
//     filterParameter: "status",
//     selectValue: ["Active", "Inactive", "Pending"],
//   },
// ];

const Report = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  // const [filters, setFilters] = useState({});

  // const reportType = "Payment-Report"

  // const onChangeFilter = (e: any) => {
  //   setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const { data: reportData } = useGetReportDataQuery({
  //   name: reportType,
  //   query: {
  //     page: 0,
  //     size: 1,
  //   },
  //   // filters: filters,
  // });

  // const { data: filterSchema } = useGetFiltersSchemaQuery(reportType);

  // console.log(filterSchema)


  return <div className="md:p-4 p-2 border-[var(--borderGray)] md:border rounded-lg w-full flex flex-col gap-4 bg-white">
  <div className="flex  items-center justify-between">
    <div className=" items-center gap-2 hidden md:flex">
      <Input value={""} name={""} onChange={()=>{}} />
      
      {/* <DynamicFilter onChangeFilter={onChangeFilter} filterSchema={filterSchema} /> */}

      {/* <div>
        <SelectNative className="w-40">
          <option value="1">Invoice Status</option>
          <option value="admin">Paid</option>
          <option value="executive">Unpaid</option>
        </SelectNative>
      </div>
      <div>
        <SelectNative className="w-40">
          <option value="1">Payment Status</option>
          <option value="admin">Credit Card</option>
          <option value="executive">Debit Card</option>
        </SelectNative>
      </div>
      <div>
        <SelectNative className="w-40">
          <option value="1">Currency</option>
          <option value="admin">USD</option>
          <option value="executive">EUR</option>
        </SelectNative>
      </div>
      <div>
        <SelectNative className="w-40">
          <option value="1">Payment Attachment</option>
          <option value="admin">Yes</option>
          <option value="executive">No</option>
        </SelectNative>
      </div> */}
    </div>

    <div className="flex items-center gap-2 md:hidden">
      <div className="border-[var(--borderGray)] border rounded-md p-2">
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
      <button className="bg-[var(--primary)] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[44px] h-[36px] transition-all duration-150 outline-none">
      <CiExport size={20}/>
       Export Report
      </button>
    </div>
  </div>
  <div
    className={`flex w-full flex-col gap-5 overflow-hidden ${filterIsOpen ? "" : "h-0 hidden"}`}
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

  <div className="w-full overflow-x-auto">
    <div className="w-full"><Table /></div>
  </div>
</div>;
};

export default Report;

