import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { SlUser } from "react-icons/sl";
import { MdOutlineMail } from "react-icons/md";
import { BsMailbox } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { FiPhone } from "react-icons/fi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const RightBar = ({
  children,
  item,
}: {
  children: React.ReactNode;
  item: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    const stringifiedItem = JSON.stringify(item);
    const encodedItem = encodeURIComponent(stringifiedItem);
    navigate(`${item.id}/${encodedItem}`);
  };

  const userDetails = [
    {
      title: "Full Name",
      value: `${item.firstName} ${item.lastName}`,
      icon: <SlUser className="text-[var(--iconGray)]" size={15} />,
    },
    {
      title: "Address",
      value: item.address || "-",
      icon: <MdOutlineMail className="text-[var(--iconGray)] " size={18} />,
    },
    {
      title: "Postal Code",
      value: item.postalCode || "-",
      icon: <BsMailbox className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Country",
      value: item.country || "-",
      icon: <GrMapLocation className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Mobile Number",
      value: item.contactNumber || "-",
      icon: <FiPhone className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Email",
      value: item.primaryEmail || "-",
      icon: (
        <MdOutlineAlternateEmail className="text-[var(--iconGray)]" size={18} />
      ),
    },
    // {
    //   title: "Currency",
    //   value: item.currency || "-",
    //   icon: <LiaCoinsSolid className="text-[var(--iconGray)]" size={20} />,
    // },
    {
      title: "NIC Number",
      value: item.identityNumber || "-",
      icon: <FaRegAddressCard className="text-[var(--iconGray)]" size={16} />,
    },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        {children}
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
            Customer Details
          </h1>

          <div className="w-full">
            <div className="w-full h-[70px] rounded-[10px] flex items-center gap-3 px-4 ">
              <div className="flex justify-between w-full items-center">
                <div>
                  <p className="text-[20px] text-[#101928] font-semibold ">
                    {item.firstName} {item.lastName}
                  </p>
                  <p className="text-[14px] text-[var(--primary)]/60 font-normal">
                    {item.primaryEmail}
                  </p>
                </div>
                {/* Edit Button */}
                <button
                  onClick={handleEditClick} // Call the function to handle navigation
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-[#293446]/10 transition-all duration-150"
                >
                  <BiSolidEdit color="#293446" size={21} />
                </button>
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

          <div className="flex gap-2 mt-5">
            <Link
              to={`/admin/invoice?searchString=${item.primaryEmail}`}
              className="bg-[#04334D] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md font-normal flex items-center gap-2 h-[36px] w-full transition-all duration-150 outline-none justify-center text-[14px]"
            >
              View Invoices
            </Link>
            <Link
              to={`/admin/payment?searchString=${item.primaryEmail}`}
              className="bg-[#04334D] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md font-normal flex items-center gap-2 h-[36px] w-full transition-all duration-150 outline-none justify-center text-[14px]"
            >
              View Payment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightBar;
