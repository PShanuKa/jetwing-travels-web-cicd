import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { SlUser } from "react-icons/sl";
import { MdOutlineMail } from "react-icons/md";
import { BsMailbox } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { FiPhone } from "react-icons/fi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { LiaCoinsSolid } from "react-icons/lia";
import { FaRegAddressCard } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";

import { IoDocumentTextOutline } from "react-icons/io5";
import { FaSortAmountUp } from "react-icons/fa";
import { SlWallet } from "react-icons/sl";
import { TiPen } from "react-icons/ti";
import { PiCursorClick } from "react-icons/pi";
import { TbMessageReport } from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa6";
import PayLinkDialog from "./PayLinkDialog";

const RightBar = ({
  children,
  item,
}: {
  children: React.ReactNode;
  item: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("invoiceDetails");

  const InvoiceDetails = [
    {
      title: "Invoice Number",
      value: item.id,
      icon: (
        <IoDocumentTextOutline className="text-[var(--iconGray)]" size={15} />
      ),
    },
    {
      title: "Customer Name",
      value: item.firstName + " " + item.lastName,
      icon: <SlUser className="text-[var(--iconGray)] " size={18} />,
    },
    {
      title: "Currency",
      value: "LKR",
      icon: <LiaCoinsSolid className="text-[var(--iconGray)]" size={20} />,
    },
    {
      title: "Amount",
      value: item.balancePayment + " " + (item.currency || "LKR"),
      icon: <FaSortAmountUp className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Payment Type",
      value: "-",
      icon: <SlWallet className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Invoice creator",
      value: "-",
      icon: <TiPen className="text-[var(--iconGray)]" size={18} />,
    },
    {
      title: "Click Time",
      value: "-",
      icon: <PiCursorClick className="text-[var(--iconGray)]" size={20} />,
    },
    {
      title: "Reason for invoice fall Status",
      value: "-",
      icon: <TbMessageReport className="text-[var(--iconGray)]" size={18} />,
    },
  ];

  const userDetails = [
    {
      title: "Full Name",
      value: item.firstName + " " + item.lastName,
      icon: <SlUser className="text-[var(--iconGray)]" size={15} />,
    },
    {
      title: "Address",
      value: item.address,
      icon: <MdOutlineMail className="text-[var(--iconGray)] " size={18} />,
    },
    {
      title: "Postal Code",
      value: item.postalCode,
      icon: <BsMailbox className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Country",
      value: item.country,
      icon: <GrMapLocation className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Mobile Number",
      value: item.contactNumber,
      icon: <FiPhone className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Email",
      value: item.primaryEmail,
      icon: (
        <MdOutlineAlternateEmail className="text-[var(--iconGray)]" size={18} />
      ),
    },
    {
      title: "Currency",
      value: item.currency || "LKR",
      icon: <LiaCoinsSolid className="text-[var(--iconGray)]" size={20} />,
    },
    {
      title: "NIC Number",
      value: item.nicNumber || "-",
      icon: <FaRegAddressCard className="text-[var(--iconGray)]" size={16} />,
    },
  ];

  const transactions = [
    {
      transactions: "Invoice No: JT-INV-1001",
      referenceNo: "REF-20240213-001",
      paymentMethod: "Credit Card",
      status: "Pending",
      amount: "11,000.00",
      date: "20-02-17 08:45 AM",
    },
    {
      transactions: "Invoice No: JT-INV-1001",
      referenceNo: "REF-20240213-001",
      paymentMethod: "Credit Card",
      status: "Pending",
      amount: "11,000.00",
      date: "20-02-17 08:45 AM",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(item?.paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <div className="flex flex-col gap-3 px-5 md:px-[50px] flex-1">
          <div className="grid grid-cols-3 gap-5 border-b border-[var(--borderGray)] ">
            <div
              onClick={() => setActiveTab("invoiceDetails")}
              className={`pb-3 items-center justify-center flex cursor-pointer ${
                activeTab === "invoiceDetails"
                  ? "border-b-2 border-[var(--primary)]"
                  : ""
              }`}
            >
              <p
                className={`text-[12px] md:text-[14px] ${
                  activeTab === "invoiceDetails"
                    ? "text-[var(--primary)]"
                    : "text-[#475467]/60"
                } font-semibold text-center`}
              >
                Invoice Details
              </p>
            </div>
            <div
              onClick={() => setActiveTab("customerDetails")}
              className={`pb-3 items-center justify-center flex cursor-pointer ${
                activeTab === "customerDetails"
                  ? "border-b-2 border-[var(--primary)]"
                  : ""
              }`}
            >
              <p
                className={`text-[12px] md:text-[14px] ${
                  activeTab === "customerDetails"
                    ? "text-[var(--primary)]"
                    : "text-[#475467]/60"
                } font-semibold text-center`}
              >
                Customer Details
              </p>
            </div>
            <div
              onClick={() => setActiveTab("transactionDetails")}
              className={`pb-3 items-center justify-center flex cursor-pointer ${
                activeTab === "transactionDetails"
                  ? "border-b-2 border-[var(--primary)]"
                  : ""
              }`}
            >
              <p
                className={`text-[12px] md:text-[14px] ${
                  activeTab === "transactionDetails"
                    ? "text-[var(--primary)]"
                    : "text-[#475467]/60"
                } font-semibold text-center`}
              >
                Transaction Details
              </p>
            </div>
          </div>
          {activeTab !== "transactionDetails" && (
            <div className="w-full">
              <div className="w-full   flex items-center gap-3 px-4 border-b border-[var(--borderGray)] pb-3">
                <div className="flex justify-between w-full items-center ">
                  <div>
                    <p className="text-[14px] text-[#475467] font-semibold ">
                      2025-03-06 08:45 AM
                    </p>
                  </div>
                  <Link
                    to="edit/45451"
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-[#293446]/10 transition-all duration-150"
                  >
                    <BiSolidEdit color="#293446" size={21} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === "invoiceDetails" && (
            <>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex  gap-4 items-center">
                  <p className="md:text-[14px] text-[11px] text-[var(--primary)] font-semibold">
                    Invoice Status
                  </p>
                  <div className="flex items-center  px-3  rounded-full bg-green-500/10">
                    <p className="md:text-[14px] text-[11px] text-green-500 font-semibold">
                      Active
                    </p>
                  </div>
                </div>
                <div className="flex  gap-4 items-center">
                  <p className="md:text-[14px] text-[11px] text-[var(--primary)] font-semibold">
                    Payment Status
                  </p>
                  <div className="flex items-center  px-3  rounded-full bg-green-500/10">
                    <p className="md:text-[14px] text-[11px] text-green-500 font-semibold">
                      Partial
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-5 mt-5 md:mt-0">
                {InvoiceDetails.map((detail) => (
                  <div className="w-full md:pl-5 ">
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

              <div className="w-full md:mt-10 mt-5">
                <div className="w-full md:pl-5">
                  <div className="flex items-center gap-5 ">
                    <div className="w-[24px] h-[24px] flex items-center justify-center">
                      <FaFilePdf className="text-[var(--iconGray)]" size={16} />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p className="text-[12px] text-[#475467] font-normal">
                          Name of document.pdf
                        </p>
                        <p className="text-[11px] text-[#475467]/50 font-normal">
                          11 Sep, 2023 | 12:24pm . 13MB
                        </p>
                      </div>
                      <button className="w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-[#293446]/10 transition-all duration-150">
                        <AiOutlineDownload color="#293446" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === "customerDetails" && (
            <>
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

              {item?.paymentLink && (
                <div className="mt-5">
                  <p className="text-[14px] font-medium text-[#101928] text-start">
                    First Payment Link(initial payment)
                  </p>
                  <div className="flex rounded-md mt-3 border border-[var(--borderGray)] p-2 items-center justify-between">
                    <p className="text-[14px] font-normal text-[#101928] text-start break-all truncate">
                      {item?.paymentLink}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="bg-[#04334D] w-[200px] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 h-[24px] rounded-md font-normal flex items-center gap-2   transition-all duration-150 outline-none justify-center text-[9px]">
                      {copied ? "Copied" : "Copy Link"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "transactionDetails" && (
            <>
              {transactions.map((transaction) => (
                <div className="w-full flex flex-col gap-2 p-3 border border-[var(--borderGray)] rounded-lg">
                  <div>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-2">
                        <p className="text-[14px] text-[var(--primary)] font-semibold">
                          {transaction.transactions}
                        </p>
                        <p className="text-[14px] text-[var(--primary)] font-normal">
                          Reference no: {transaction.referenceNo}
                        </p>
                        <div>
                          <p className="text-[14px] text-[var(--primary)] font-normal">
                            Payment Method:
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center  px-3  rounded-full bg-green-500/10">
                          <p className="text-[14px] text-green-500 font-semibold">
                            {transaction.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-3">
                      <p className="text-[16px] text-[var(--primary)] font-semibold">
                        (LKR) {transaction.amount}
                      </p>
                      <p className="text-[12px] text-[#475467] font-normal">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <PayLinkDialog item={item}>
            <div className="flex gap-2 ">
              <button className="bg-[#04334D] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md font-normal flex items-center gap-2 h-[36px] w-full transition-all duration-150 outline-none justify-center text-[14px]">
                Send Payment Link
              </button>
            </div>
          </PayLinkDialog>
        </div>
      </div>
    </>
  );
};

export default RightBar;
