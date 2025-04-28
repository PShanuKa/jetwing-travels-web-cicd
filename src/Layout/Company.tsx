// import { useState } from "react";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  setCompanySelected,
  setCompanySelectedOpen,
} from "@/features/metaSlice";
import { useGetAllOrganizationsQuery } from "@/services/organizationSlice";

const CompanySelector = () => {
  // State to manage modal visibility
  // const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const userData = JSON.parse(userString);
        if (userData && userData.name) {
          setUserName(userData.name);
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const companySelected = useSelector(
    (state: RootState) => state.meta.companySelected
  );
  const user = useSelector((state: RootState) => state.auth.userInfo);

  const { data: companies } = useGetAllOrganizationsQuery(undefined);

  const dispatch = useDispatch();

  const selectedHandler = (company: any) => {
    dispatch(setCompanySelected(company));
    setTimeout(() => {
      // set full reload
      window.location.reload();
    }, 200);
  };

  return (
    <>
      {!companySelected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => dispatch(setCompanySelectedOpen(false))} // Close modal when clicking outside
        >
          {/* Modal Content */}
          <div
            className="w-[1000px] bg-white rounded-lg shadow-lg p-8 relative m-2"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
          >
            {/* Close Button */}
            {/* <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => dispatch(setCompanySelectedOpen(false))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button> */}

            {/* Header */}
            <div className="flex flex-col gap-4">
              <h1 className="md:text-[32px] text-[24px] font-medium text-[var(--primary)]">
                Welcome, {user?.name}!
              </h1>
              <div className="w-full h-[2px] bg-[#E5E7EB] rounded-full"></div>
              <p className="md:text-[16px] text-[14px] text-[#04334D] font-medium">
                We are ready for you to begin. Please select your company to get
                started with your tasks. We're excited to have you onboard!
              </p>
            </div>

            <div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-6 mt-10">
              {companies?.data?.content?.map((company: any) => (
                <div
                  onClick={() => selectedHandler(company)}
                  className="w-full aspect-square  flex-col  gap-4 rounded-lg bg-[#225451] relative overflow-hidden border border-[#225451] flex justify-center items-center hover:scale-105 transition-all duration-150 "
                >
                  <div className="w-[70%] h-[70%] p-5 bg-white rounded-full flex justify-center items-center absolute md:top-[-40px] top-[-20px] left-[-10px]">
                    <img src={logo} className="w-full" alt="company" />
                  </div>
                  <div className="flex flex-col gap-2 mt-20">
                    <h1 className="md:text-[24px] text-[14px] text-white font-medium text-center uppercase">
                      {company.name}
                    </h1>
                    <div className="w-full flex justify-center items-center">
                      {company.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanySelector;
