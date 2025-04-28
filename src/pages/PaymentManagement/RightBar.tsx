import { useState } from "react";

import { SlUser } from "react-icons/sl";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { IoDocumentTextOutline } from "react-icons/io5";
import { FaSortAmountUp } from "react-icons/fa";
import { SlWallet } from "react-icons/sl";
import { PiCursorClick } from "react-icons/pi";
import { TbMessageReport } from "react-icons/tb";

const RightBar = ({
  children,
  payment,
}: {
  children: React.ReactNode;
  payment: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("invoiceDetails");

  const invoiceDetails = payment?.invoiceDto;
  const customerDetails = payment?.customerDto;

  const InvoiceDetails = [
    {
      title: "Transaction Number",
      value: payment?.transactionId,
      icon: (
        <IoDocumentTextOutline className="text-[var(--iconGray)]" size={15} />
      ),
    },
    {
      title: "Invoice Number",
      value: invoiceDetails?.id,
      icon: (
        <IoDocumentTextOutline className="text-[var(--iconGray)]" size={15} />
      ),
    },
    {
      title: "Tour Number",
      value: payment?.tourNumber,
      icon: (
        <IoDocumentTextOutline className="text-[var(--iconGray)]" size={15} />
      ),
    },
    {
      title: "Customer Name",
      value: customerDetails?.firstName + " " + customerDetails?.lastName,
      icon: <SlUser className="text-[var(--iconGray)] " size={18} />,
    },
    {
      title: "Amount",
      value: invoiceDetails?.balancePayment
        ? Number(invoiceDetails.balancePayment).toLocaleString(undefined, {
            style: "currency",
            currency: invoiceDetails.currency || "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : invoiceDetails?.balancePayment,
      icon: <FaSortAmountUp className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Payment Type",
      value: payment?.paymentMethod,
      icon: <SlWallet className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Click Time",
      value: invoiceDetails?.paymentLinkClickedTimes,
      icon: <PiCursorClick className="text-[var(--iconGray)]" size={20} />,
    },
    {
      title: "Reason for payment failed",
      value: payment?.reason || "-",
      icon: <TbMessageReport className="text-[var(--iconGray)]" size={18} />,
    },
  ];

  const userDetails = [
    {
      title: "Full Name",
      value: customerDetails?.firstName + " " + customerDetails?.lastName,
      icon: <SlUser className="text-[var(--iconGray)]" size={15} />,
    },
    {
      title: "Address",
      value: customerDetails?.address + ", " + customerDetails?.postalCode + ", " + customerDetails?.country,
      icon: <MdOutlineMail className="text-[var(--iconGray)] " size={18} />,
    },
    {
      title: "Mobile Number",
      value: customerDetails?.contactNumber,
      icon: <FiPhone className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Email",
      value: customerDetails?.primaryEmail,
      icon: (
        <MdOutlineAlternateEmail className="text-[var(--iconGray)]" size={18} />
      ),
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
        <div className="flex flex-col gap-3 px-[50px] flex-1">
          <div className="grid grid-cols-2 gap-5 border-b border-[var(--borderGray)] ">
            <div
              onClick={() => setActiveTab("invoiceDetails")}
              className={`pb-3 items-center justify-center flex cursor-pointer ${
                activeTab === "invoiceDetails"
                  ? "border-b-2 border-[var(--primary)]"
                  : ""
              }`}
            >
              <p
                className={`text-[14px] ${
                  activeTab === "invoiceDetails"
                    ? "text-[var(--primary)]"
                    : "text-[#475467]/60"
                } font-semibold`}
              >
                Payment Details
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
                className={`text-[14px] ${
                  activeTab === "customerDetails"
                    ? "text-[var(--primary)]"
                    : "text-[#475467]/60"
                } font-semibold`}
              >
                Customer Details
              </p>
            </div>
          </div>
          {activeTab !== "customerDetails" && (
            <div className="w-full">
              <div className="w-full   flex items-center gap-3 px-4 border-b border-[var(--borderGray)] pb-3">
                <div className="flex justify-between w-full items-center ">
                  <div>
                    <p className="text-[14px] text-[#475467] font-semibold ">
                      {payment?.transactionDate
                        ? (() => {
                            const date = new Date(payment.transactionDate);
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            );
                            const day = String(date.getDate()).padStart(2, "0");
                            const hours = date.getHours();
                            const minutes = String(date.getMinutes()).padStart(
                              2,
                              "0"
                            );
                            const ampm = hours >= 12 ? "PM" : "AM";
                            const formattedHours = String(
                              hours % 12 || 12
                            ).padStart(2, "0");

                            return `${year}-${month}-${day} ${formattedHours}:${minutes} ${ampm}`;
                          })()
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center  px-3  rounded-full bg-green-500/10">
                    <p className="text-[14px]  font-semibold">
                      {payment?.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "invoiceDetails" && (
            <>
              <div className="w-full flex flex-col gap-5 mt-4">
                {InvoiceDetails.map((detail) => (
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
            </>
          )}
          {activeTab === "customerDetails" && (
            <>
              <div className="w-full flex flex-col gap-5 mt-4">
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
            </>
          )}

          {/* <div className="flex gap-2 mt-16">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#04334D] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md font-normal flex items-center gap-2 h-[36px] w-full transition-all duration-150 outline-none justify-center text-[14px]"
            >
              Done
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default RightBar;
