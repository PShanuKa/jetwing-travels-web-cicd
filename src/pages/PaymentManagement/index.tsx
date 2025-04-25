import { IoSearchOutline } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";
import Input from "@/components/common/SearchInput";
import { SelectNative } from "@/components/ui/select-native";
import Table from "./Table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageHeader } from "@/features/metaSlice";

const PaymentManagement = () => {
  const dispatch = useDispatch();
  dispatch(setPageHeader("Payment Management"));
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("searchString");

  
    const [formData, setFormData] = useState({
      status: "",
      currency: "",
      text: "",
      company: "",
      paymentType: "",
    });

  useEffect(() => {
    if (search) {
      setFormData({ ...formData, text: search });
    }
  }, [search]);

;

  return (
    <div className="md:p-4 p-2 border-[var(--borderGray)] bg-white md:border rounded-lg w-full flex flex-col gap-4">
      <div className="flex  items-center justify-between">
        <div className=" items-center gap-2 hidden md:flex">
          <Input value={formData.text} name={"text"} onChange={(e) => setFormData({ ...formData, text: e.target.value })} />

          <div>
            <SelectNative className="w-40" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option value="">Payment Status</option>
              <option value="PAID">Paid</option>
              <option value="PARTIALLY_PAID">Partially Paid</option>
              <option value="FAILED">Failed</option>
              <option value="CANCELLED">Cancelled</option>
            </SelectNative>
          </div>
          <div>
            <SelectNative className="w-40" value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })}>
              <option value="">Currency</option>
              <option value="USD">USD</option>
              <option value="LKR">LKR</option>
              <option value="GBP">GBP</option>
              <option value="EURO">EURO</option>
            </SelectNative>
          </div>
          <div>
            <SelectNative className="w-40" value={formData.paymentType} onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}>
              <option value="">Payment Type</option>
              <option value="CyberSource">CyberSource</option>
              <option value="Master/Visa">Master/Visa</option>
              <option value="Amex">Amex</option>
              {/* <option value="executive">No</option> */}
            </SelectNative>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <div className="border-[var(--borderGray)] border rounded-md p-2">
            <IoSearchOutline size={20} />
          </div>
          <button
            onClick={() => setFilterIsOpen(!filterIsOpen)}
            className="border-[var(--borderGray)] border rounded-md p-2 cursor-pointer active:scale-95 transition-all duration-150 hover:bg-gray-100"
          >
            <GiSettingsKnobs className="-rotate-90" size={20} />
          </button>
        </div>
      </div>
      <div
        className={`flex w-full flex-col gap-5 overflow-hidden ${
          filterIsOpen ? "" : "h-0 hidden"
        }`}
      >
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full">
            <SelectNative>
              <option value="1">Payment Status</option>
              <option value="admin">Paid</option>
              <option value="executive">Unpaid</option>
            </SelectNative>
          </div>
          <div className="w-full">
            <SelectNative className="w-full">
              <option value="1">Currency</option>
              <option value="admin">Credit Card</option>
              <option value="executive">Debit Card</option>
            </SelectNative>
          </div>
          <div className="w-full">
            <SelectNative className="w-full">
              <option value="1">Payment Type</option>
              <option value="admin">Yes</option>
              <option value="executive">No</option>
            </SelectNative>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="w-full">
          <Table searchString={formData.text} status={formData.status} currency={formData.currency} paymentType={formData.paymentType} />
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
