// import { useState } from "react";
import logo from "@/assets/logo.png";
import { FaPlane } from "react-icons/fa";
import { LuLeafyGreen } from "react-icons/lu";
import { MdTravelExplore } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setCompanySelectedOpen } from "@/features/metaSlice";

const CompanySelector = () => {
  // State to manage modal visibility
  // const [isOpen, setIsOpen] = useState(true);

  const companySelected = useSelector(
    (state: RootState) => state.meta.companySelectedOpen
  );

  const dispatch = useDispatch();

  // Function to open the modal
  //   const openModal = () => setIsOpen(true);

  // Function to close the modal
  // const closeModal = () => setIsOpen(false);

  const companies = [
    {
      name: "Travels",
      logo: logo,
      icon: <FaPlane color="white" size={20} />,
    },
    {
      name: "ECO Holidays",
      logo: logo,
      icon: <LuLeafyGreen color="white" size={20} />,
    },
    {
      name: "Adventure",
      logo: logo,
      icon: <MdTravelExplore color="white" size={20} />,
    },
    {
      name: "Tailer made",
      logo: logo,
      icon: <FaCarAlt color="white" size={20} />,
    },
  ];
  return (
    <>
      {/* Trigger Button */}
      {/* <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {children}
      </button> */}

      {/* Modal Overlay */}
      {companySelected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => dispatch(setCompanySelectedOpen(false))} // Close modal when clicking outside
        >
          {/* Modal Content */}
          <div
            className="w-[1000px] bg-white rounded-lg shadow-lg p-8 relative"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
          >
            {/* Close Button */}
            <button
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
            </button>

            {/* Header */}
            <div className="flex flex-col gap-4">
              <h1 className="text-[32px] font-medium text-[var(--primary)]">
                Good Morning, Alison!
              </h1>
              <div className="w-full h-[2px] bg-[#E5E7EB] rounded-full"></div>
              <p className="text-[16px] text-[#04334D] font-medium">
                We are ready for you to begin. Please select your company to get
                started with your tasks. We’re excited to have you onboard!
              </p>
            </div>

            <div className="grid grid-cols-4 gap-6 mt-10">
              {companies.map((company) => (
                <div
                  onClick={() => dispatch(setCompanySelectedOpen(false))}
                  className="w-full aspect-square  flex-col  gap-4 rounded-lg bg-[#225451] relative overflow-hidden border border-[#225451] flex justify-center items-center hover:scale-105 transition-all duration-150"
                >
                  <div className="w-[70%] h-[70%] p-5 bg-white rounded-full flex justify-center items-center absolute top-[-40px] left-[-10px]">
                    <img src={logo} className="w-full" alt="company" />
                  </div>
                  <div className="flex flex-col gap-2 mt-20">
                    <h1 className="text-[27px] text-white font-medium text-center uppercase">
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
