import { useState, useEffect } from "react";
import { SlUser } from "react-icons/sl";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import { FiCopy } from "react-icons/fi";
import { AiOutlineLoading3Quarters, AiOutlineDownload } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { PiBankBold } from "react-icons/pi";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import PayLinkDialog from "./PayLinkDialog";
import { useDownloadInvoiceMutation } from "@/services/invoiceSlice";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";

// Add custom styles for payment buttons
import "./paymentButtons.css";

const RightBar = ({
  children,
  item,
}: {
  children: React.ReactNode;
  item: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("invoiceDetails");

  const [downloadInvoice, { isLoading }] = useDownloadInvoiceMutation();

  const handleDownload = async () => {
    try {
      const response = await downloadInvoice({
        invoiceId: item.id,
      });

      if (response.data) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice-${item.id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    try {
      return format(parseISO(dateString), "yyyy-MM-dd hh:mm a");
    } catch (error) {
      return dateString;
    }
  };

  const InvoiceDetails = [
    {
      title: "Invoice Number",
      value: item.id || "-",
      icon: (
        <FaFileInvoiceDollar className="text-[var(--iconGray)]" size={15} />
      ),
    },
    {
      title: "Transaction Fee",
      value: item.currency + " " + item.bankCharge || "-",
      icon: <PiBankBold className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Initial Payment",
      value:
        item.currency +
          " " +
          item.initialPayment +
          " " +
          "(" +
          item.paymentPercentage +
          "%" +
          ")" || "-",
      icon: <GiReceiveMoney className="text-[var(--iconGray)]" size={18} />,
    },
    {
      title: "Balance Payment",
      value:
        item.currency +
          " " +
          item.balancePayment +
          " " +
          "(" +
          (100 - item.paymentPercentage) +
          "%)" || "-",
      icon: <GiPayMoney className="text-[var(--iconGray)]" size={18} />,
    },
    {
      title: "Total Amount",
      value: item.currency + " " + item.totalAmount || "-",
      icon: (
        <FaFileInvoiceDollar className="text-[var(--iconGray)]" size={18} />
      ),
    },
    {
      title: "Balance Payment Due Date",
      value: item.balancePaymentDueDate || "-",
      icon: <FaCalendarAlt className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Payment Type",
      value: item.invoiceType || "-",
      icon: <PiBankBold className="text-[var(--iconGray)]" size={16} />,
    },
    {
      title: "Initial Payment Link Clicked Times",
      value: item.initialPaymentLinkClickedTimes || "0",
      icon: <PiBankBold className="text-[var(--iconGray)]" size={20} />,
    },
    {
      title: "Balance Payment Link Clicked Times",
      value: item.balancePaymentLinkClickedTimes || "0",
      icon: <PiBankBold className="text-[var(--iconGray)]" size={20} />,
    },
  ];

  const userDetails = [
    {
      title: "Full Name",
      value:
        item.firstName && item.lastName
          ? `${item.firstName} ${item.lastName}`
          : "-",
      icon: <SlUser className="text-[var(--iconGray)]" size={15} />,
    },
    {
      title: "Email",
      value: item.primaryEmail || "-",
      icon: (
        <MdOutlineAlternateEmail className="text-[var(--iconGray)]" size={18} />
      ),
    },
    {
      title: "Secondary Email",
      value: item.secondaryEmail || "-",
      icon: (
        <MdOutlineAlternateEmail className="text-[var(--iconGray)]" size={18} />
      ),
    },
    {
      title: "CC Email",
      value: item.ccEmail || "-",
      icon: (
        <MdOutlineAlternateEmail className="text-[var(--iconGray)]" size={18} />
      ),
    },
    {
      title: "Address",
      value: item.address + " " + item.postalCode + " " + item.country || "-",
      icon: <MdOutlineMail className="text-[var(--iconGray)] " size={18} />,
    },
    {
      title: "Mobile Number",
      value: item.contactNumber || "-",
      icon: <FiPhone className="text-[var(--iconGray)]" size={16} />,
    },
  ];

  const transactions = item.transactions || [
    {
      transactions: `Invoice No: ${item.id || "-"}`,
      referenceNo: item.referenceNo || "-",
      paymentMethod: item.paymentMethod || "-",
      status: item.invoiceStatus || "Pending",
      amount: Number(item.totalAmount || 0).toLocaleString(),
      date: formatDate(item.createdAt),
    },
  ];

  const handleCopy = (link: string, type: string) => {
    if (!link) {
      toast.error(`No ${type} payment link available to copy`);
      return;
    }

    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link);
      setCopied(type);
      toast.success(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } payment link copied to clipboard`
      );
      setTimeout(() => setCopied(null), 2000);
    } else {
      // Fallback method for copying
      const textArea = document.createElement("textarea");
      textArea.value = link;
      textArea.style.position = "fixed"; // Avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          setCopied(type);
          toast.success(
            `${
              type.charAt(0).toUpperCase() + type.slice(1)
            } payment link copied to clipboard`
          );
        } else {
          toast.error("Failed to copy link");
        }
      } catch (err) {
        toast.error("Failed to copy link");
        console.error("Fallback: Could not copy text: ", err);
      }

      document.body.removeChild(textArea);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const getPaymentStatusDisplay = (item: any) => {
    // If we have a paymentStatus value, use it directly
    if (item.paymentStatus) {
      return item.paymentStatus;
    }

    // Otherwise calculate based on paid/total amounts
    const paidAmount = Number(item.paidAmount || 0);
    const totalAmount = Number(item.totalAmount || 0);

    if (paidAmount <= 0) {
      return "PENDING";
    } else if (paidAmount >= totalAmount) {
      return "PAID";
    } else {
      return "PARTIALLY_PAID";
    }
  };

  const getPaymentStatusClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PAID":
        return "bg-green-500/10 text-green-500";
      case "PENDING":
        return "bg-blue-500/10 text-blue-500";
      case "PARTIALLY_PAID":
        return "bg-yellow-500/10 text-yellow-600";
      case "PARTIALLY_CANCELLED":
        return "bg-orange-500/10 text-orange-500";
      case "CANCELLED":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  useEffect(() => {
    if (
      (!item.paidAmount || Number(item.paidAmount) <= 0) &&
      activeTab === "transactionDetails"
    ) {
      setActiveTab("invoiceDetails");
    }
  }, [item.paidAmount, activeTab]);

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
          className="flex p-5 items-center cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <IoIosCloseCircleOutline size={30} />
        </div>
        <div className="flex flex-col gap-3 px-5 md:px-[50px] flex-1 overflow-y-auto">
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
            {item.paidAmount && Number(item.paidAmount) > 0 && (
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
            )}
          </div>
          {activeTab !== "transactionDetails" && (
            <div className="w-full">
              <div className="w-full flex items-center gap-3 px-4 border-b border-[var(--borderGray)] pb-3">
                <div className="flex justify-between w-full items-center ">
                  <div>
                    <p className="text-[14px] text-[#475467] font-semibold ">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                  <div
                    // onClick={() => navigate(`/admin/invoice/edit/${item.id}`)}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-[#293446]/10 transition-all duration-150"
                  >
                    {/* <BiSolidEdit color="#293446" size={21} /> */}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "invoiceDetails" && (
            <>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="flex gap-4 items-center ">
                  <p className="md:text-[14px] text-[11px] text-[var(--primary)] font-semibold text-nowrap">
                    Payment Status
                  </p>
                  <div
                    className={`flex items-center px-3 rounded-full ${getPaymentStatusClass(
                      getPaymentStatusDisplay(item)
                    )}`}
                  >
                    <p className="md:text-[14px] text-[11px] font-semibold">
                      {getPaymentStatusDisplay(item)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-5 mt-5 md:mt-0">
                {InvoiceDetails.map((detail, index) => (
                  <div
                    key={`invoice-detail-${index}`}
                    className="w-full md:pl-5 "
                  >
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
                      <FaFileInvoiceDollar
                        className="text-[var(--iconGray)]"
                        size={16}
                      />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p className="text-[12px] text-[#475467] font-normal">
                          invoice-{item.id}.pdf invoice-{item.id}.pdf
                        </p>
                        <p className="text-[11px] text-[#475467]/50 font-normal">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>

                      <button
                        onClick={handleDownload}
                        className="w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-[#293446]/10 transition-all duration-150"
                      >
                        {isLoading ? (
                          <AiOutlineLoading3Quarters
                            className="animate-spin"
                            size={20}
                          />
                        ) : (
                          <AiOutlineDownload color="#293446" size={20} />
                        )}
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
                {userDetails.map((detail, index) => (
                  <div key={`user-detail-${index}`} className="w-full pl-5">
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

          {activeTab === "transactionDetails" && (
            <>
              {transactions.map((transaction: any, index: number) => (
                <div
                  key={`transaction-${index}`}
                  className="w-full flex flex-col gap-2 p-3 border border-[var(--borderGray)] rounded-lg"
                >
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
                        <div
                          className={`flex items-center px-3 rounded-full ${getPaymentStatusClass(
                            transaction.status || "PENDING"
                          )}`}
                        >
                          <p className={`text-[14px] font-semibold`}>
                            {transaction.status || "PENDING"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-3">
                      <p className="text-[16px] text-[var(--primary)] font-semibold">
                        ({item.currency || "LKR"}) {transaction.amount}
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

          <div className="flex gap-2 mt-4 w-full payButtonContainer mb-1">
            <PayLinkDialog item={item} linkType="initialPaymentLink">
              <button className="bg-[#04334D] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md font-normal flex items-center gap-2 h-[36px] w-full transition-all duration-150 outline-none justify-center text-[14px]">
                Send initial payment link
              </button>
            </PayLinkDialog>
            <button
              onClick={() => handleCopy(item?.initialPaymentLink, "initial")}
              className="border border-[#04334D] hover:bg-[#04334D]/10 active:scale-95 text-[#04334D] px-2 rounded-md font-normal flex items-center justify-center transition-all duration-150 outline-none h-[36px] w-[50px]"
            >
              {copied === "initial" ? (
                <BiCheck size={20} />
              ) : (
                <FiCopy size={20} />
              )}
            </button>
          </div>

          {item.balancePayment > 0 && (
            <div className="flex gap-2 mb-4 mt-2 w-full payButtonContainer">
              <PayLinkDialog item={item} linkType="balancePaymentLink">
                <button className="text-[#04334D] border border-[#04334D] hover:opacity-80 focus:opacity-90 active:scale-95 px-4 py-2 rounded-md font-normal flex items-center gap-2 h-[36px] w-full transition-all duration-150 outline-none justify-center text-[14px]">
                  Send Balance payment link
                </button>
              </PayLinkDialog>
              <button
                onClick={() => handleCopy(item?.balancePaymentLink, "balance")}
                className="border border-[#04334D] hover:bg-[#04334D]/10 active:scale-95 text-[#04334D] px-2 rounded-md font-normal flex items-center justify-center transition-all duration-150 outline-none h-[36px] w-[50px]"
              >
                {copied === "balance" ? (
                  <BiCheck size={20} />
                ) : (
                  <FiCopy size={20} />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RightBar;
