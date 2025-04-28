import { IoSearchOutline } from "react-icons/io5";

const SearchInput = ({onChange,name,value}:{onChange:any,name:string,value:string}) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-md p-2 border h-[44px] border-[var(--borderGray)]">
      <IoSearchOutline />
      <input
        type="text"
        name={name}
        onChange={onChange}
        className="h-full w-full outline-none"
        placeholder="Search here..."
        value={value || ""}
      />
    </div>
  );
};

export default SearchInput;
