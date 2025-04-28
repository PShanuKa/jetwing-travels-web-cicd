import { RootState } from "@/app/store";
import { clearCompanySelected,  setIsSidebarOpen } from "@/features/metaSlice";

import { HiMenuAlt2 } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.meta.isSidebarOpen
  );

  const company = useSelector(
    (state: RootState) => state.meta.companySelected
  );
  const pageHeader = useSelector(
    (state: RootState) => state.meta.pageHeader
  );


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  useEffect(() => {
    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 10000); 
  
      return () => clearTimeout(timer); 
    }
  }, [isDropdownOpen]);

  const user = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <div className="w-full h-[70px] bg-white flex items-center justify-between md:px-4 px-2 shadow-lg z-50">

      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
          className="md:hidden"
        >
          <HiMenuAlt2 size={28} color="#101928" />
        </button>
        <div>
          {company?.name ? (
            <h1 className="text-[24px] font-medium hidden md:block">
              Welcome To {company?.name}
            </h1>
          ) : (
            <h1 className="text-[24px] font-medium hidden md:block">
              Welcome {user?.name}
            </h1>
          )}
          <h1 className="text-[22px] md:text-[14px] font-medium md:font-normal md:text-[var(--textBlue)]">
            {pageHeader}
          </h1>
        </div>
      </div>

  
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2"
        >
          {/* <img
            src="https://res.cloudinary.com/dldtrjalo/image/upload/v1732767281/oav7dzuhqxvouhciglcd.jpg"
            alt="Profile"
            className="md:w-[55px] h-[55px] rounded-full object-cover"
          /> */}
          <div className="hidden md:flex items-center gap-1">
            <p className="text-[14px] text-[var(--primary)] font-normal">
              Hello, {user?.name }
            </p>
            <IoChevronDown size={14}  className={`${isDropdownOpen ? 'rotate-180' : ''} transition-all duration-300`}/>
          </div>
        </button>

      
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <ul className="py-2">
              <li className="px-4 py-2 cursor-pointer font-semibold">
                {company?.name}
              </li>
              <li onClick={() =>{ dispatch(clearCompanySelected()); setIsDropdownOpen(false)}} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Change Company
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;