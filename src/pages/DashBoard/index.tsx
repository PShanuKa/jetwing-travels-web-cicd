import SummeryCard from "@/components/common/SummeryCard";
import { MdCurrencyExchange } from "react-icons/md";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GrMoney } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { setPageHeader } from "@/features/metaSlice";


const monthlyPayments = [
  { month: "1", totalAmount: 1000, unpaidAmount: 800, pendingAmount: 500 },
  { month: "2", totalAmount: 950, unpaidAmount: 700, pendingAmount: 400 },
  { month: "3", totalAmount: 870, unpaidAmount: 600, pendingAmount: 300 },
  { month: "4", totalAmount: 920, unpaidAmount: 750, pendingAmount: 500 },
  { month: "5", totalAmount: 880, unpaidAmount: 500, pendingAmount: 200 },
  { month: "6", totalAmount: 960, unpaidAmount: 820, pendingAmount: 600 },
  { month: "7", totalAmount: 890, unpaidAmount: 620, pendingAmount: 400 },
  { month: "8", totalAmount: 970, unpaidAmount: 800, pendingAmount: 700 },
  { month: "9", totalAmount: 910, unpaidAmount: 650, pendingAmount: 300 },
  { month: "10", totalAmount: 850, unpaidAmount: 550, pendingAmount: 200 },
  { month: "11", totalAmount: 930, unpaidAmount: 720, pendingAmount: 500 },
  { month: "12", totalAmount: 900, unpaidAmount: 600, pendingAmount: 400 },
];


const summaryData = [
  {
    title: "Total Payments",
    value: "$611,200.00",
    icon: <MdCurrencyExchange size={24} />,
  },
  {
    title: "Unpaid Invoices",
    value: "$611,200.00",
    icon: <MdCurrencyExchange size={24} />,
  },
  {
    title: "Balance Pending",
    value: "$611,200.00",
    icon: <GrMoney size={24} />,
  },
  {
    title: "Full Paid",
    value: "$611,200.00",
    icon: <MdCurrencyExchange size={24} />,
  },
  {
    title: "Balance Due Today",
    value: "$611,200.00",
    icon: <MdCurrencyExchange size={24} />,
  },
];
const yearSummaryData = [
  {
    title: "Total Payments",
    value: "$611,200.00",
    icon: <MdCurrencyExchange size={24} />,
  },
  {
    title: "Unpaid Total Amount",
    value: "$611,200.00",
    icon: <MdCurrencyExchange size={24} />,
  },
  {
    title: "Balance Pending Total",
    value: "$611,200.00",
    icon: <MdCurrencyExchange size={24} />,
  },
  


];


const DashBoard = () => {
  const dispatch = useDispatch();
  dispatch(setPageHeader("DashBoard"));
  return (
    <div className="md:p-5">
      {/* Overall Summary */}
      <div>
        <h1 className="md:text-[24px] text-[16px] font-semibold text-[var(--primary)]">
          Jetwing Travels Overall
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-5 border-[var(--borderGray)] border-t pt-5 mt-3">
          {summaryData.map((item, index) => (
            <SummeryCard key={index} title={item.title} value={item.value} icon={item.icon} />
          ))}
        </div>
      </div>

      {/* Currency Wise Payment */}
      <div className="mt-5">
        <h1 className="md:text-[24px] text-[16px] font-semibold text-[var(--primary)]">
          Jetwing Travels Currency Wise Payment
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-[var(--borderGray)] border-t pt-5 mt-3">
          {yearSummaryData.map((item, index) => (
            <SummeryCard key={index} title={item.title} value={item.value} icon={item.icon} />
          ))}
        </div>
      </div>

      {/* Monthly Payments Chart */}
      <div className="mt-5">
        {/* <h1 className="text-[24px] font-semibold text-[var(--primary)]">
          Monthly Payments
        </h1> */}
        <div className="flex items-center gap-5 justify-end">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-[#F56630] rounded-full" />

            <p className="md:text-[16px] text-[10px] font-normal text-[#475367]">
              Total Payments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-[#1671D9] rounded-full" />

            <p className="md:text-[16px] text-[10px] font-normal text-[#475367]">
              Unpaid Total Payments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#F3A218] rounded-full" />

            <p className="md:text-[16px] text-[10px] font-normal text-[#475367]">
              Balance Pending Total
            </p>
          </div>
        </div>
        <div className=" md:p-5 rounded-lg mt-3">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyPayments}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalAmount"
                stroke="#ff7300"
                strokeWidth={1}
              />
              <Line
                type="monotone"
                dataKey="unpaidAmount"
                stroke="#ff7300"
                strokeWidth={1}
              />
              <Line
                type="monotone"
                dataKey="pendingAmount"
                stroke="#ff7300"
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-[24px] font-semibold text-[var(--primary)]">
          Monthly Payments
        </h1>
        <div className=" md:p-5 rounded-lg mt-3">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyPayments}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              {/* <Line type="monotone" dataKey="totalAmount" stroke="#ff7300" strokeWidth={1} />
              <Line type="monotone" dataKey="unpaidAmount" stroke="#ff7300" strokeWidth={1} /> */}
              <Line
                type="monotone"
                dataKey="pendingAmount"
                stroke="#ff7300"
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
