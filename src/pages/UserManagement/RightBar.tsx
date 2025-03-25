import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { SlUser } from "react-icons/sl";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LiaUserTagSolid } from "react-icons/lia";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import ResetPassword from "./ResetPassword";
import { Link } from "react-router-dom";

const RightBar = ({ trigger , item }: { trigger: React.ReactNode , item: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const userDetails = [
    {
      title: "Full Name",
      value: item?.name,
      icon: <SlUser className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Address",
      value: item?.address || "-",
      icon: <MdOutlineMail className="text-[var(--iconGray)] " size={18} />,
    },
    // {
    //   title: "Postal Code",
    //   value: "123456",
    //   icon: <BsMailbox className="text-[var(--iconGray)]" size={16} />,
    // },
    // {
    //   title: "Country",
    //   value: "Sri Lanka",
    //   icon: <GrMapLocation className="text-[var(--iconGray)]" size={16} />,
    // },
    {
      title: "Mobile Number",
      value: item?.mobileNumber || "-",
      icon: <FiPhone className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Email",
      value: item?.email || "-",
      icon: (
        <MdOutlineAlternateEmail className="text-[var(--iconGray)]" size={16} />
      ),
    },
    {
      title: "NIC Number",
      value: item?.nicNumber || "-",
      icon: <FaRegAddressCard className="text-[var(--iconGray)]" size={16} />,
    },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        {trigger}
      </button>

      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 z-30 animate-fade-in"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-40 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div
          className="flex p-5 items-center "
          onClick={() => setIsOpen(false)}
        >
          <IoIosCloseCircleOutline size={30} />
        </div>

        <div className="flex flex-col gap-5 px-[50px] flex-1">
          <h1 className="text-[20px] font-normal text-[var(--primary)]">
            User Details
          </h1>

          <div className="w-full">
            <div className="w-full h-[70px] rounded-[10px] flex items-center gap-3 px-4 ">
              <div>
                <img
                  src="https://res.cloudinary.com/dldtrjalo/image/upload/v1732767281/oav7dzuhqxvouhciglcd.jpg"
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
              </div>
              <div className="flex justify-between w-full items-center">
                <div>
                  <p className="text-[20px] text-[#101928] font-semibold ">
                    {item?.name}
                  </p>
                  <p className="text-[14px] text-[var(--primary)]/60 font-normal">
                    {item?.email}
                  </p>
                </div>
                <Link to={`edit/${item?.id}`} className="w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-[#293446]/10 transition-all duration-150">
                  <BiSolidEdit color="#293446" size={21} />
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5">
            {userDetails.map((detail) => (
              <div className="w-full pl-5">
                <div className="flex items-center gap-5 ">
                  <div className="w-[24px] h-[24px] flex items-center justify-center">
                    {detail.icon}
                  </div>
                  <div>
                    <p className="text-[12px] text-[#475467] font-normal">
                      {detail.title}
                    </p>
                    <p className="text-[14px] text-[#101928] font-medium">
                      {detail.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h1 className="text-[20px] font-normal text-[var(--primary)]">
            User Role
          </h1>

          <div className="w-full pl-5">
            <div className="flex items-center gap-5 ">
              <div className="w-[24px] h-[24px] flex items-center justify-center">
                <LiaUserTagSolid className="text-[var(--iconGray)]" size={20} />
              </div>
              <div>
                <p className="text-[14px] text-[#101928] font-medium">
                  {item?.roleName}
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-[20px] font-normal text-[var(--primary)]">
            Assigned Companies
          </h1>

          <div className="w-full pl-5">
            <div className="flex items-center gap-5 ">
              <div className="w-[24px] h-[24px] flex items-center justify-center">
                <HiOutlineBuildingOffice2
                  className="text-[var(--iconGray)]"
                  size={20}
                />
              </div>
              <div>
                {item?.permissionNames?.map((company: any) => (
                  <p className="text-[14px] text-[#101928] font-medium">
                    {company}
                  </p>
                ))}
                {item?.permissionNames?.length === 0 && (
                  <p className="text-[14px] text-[#101928]/50 font-medium">
                    No companies assigned
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-5 justify-end">
            <ResetPassword>
              <button className="bg-[#04334D] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md font-normal flex items-center gap-2 h-[36px] transition-all duration-150 outline-none justify-center text-[14px]">
                Reset Password
              </button>
            </ResetPassword>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightBar;
