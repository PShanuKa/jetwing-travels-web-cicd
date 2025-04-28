import Input from "@/components/common/Input";
import {
  useCreateInvoiceMutation,
  useGetCurrencyQuery,
} from "@/services/invoiceSlice";
import { useGetSettingQuery } from "@/services/settingSlice";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setPageHeader } from "@/features/metaSlice";
import Dropdown from "@/components/common/Dropdown";
import SearchDropDown from "@/components/common/SearchDropDown";

import { DatePicker } from "@/components/ui/date-picker";
import { format, set } from "date-fns";
import { useGetSettingQuery } from "@/services/settingSlice";

const initialFormData = {
  title: "",
  firstName: "",
  lastName: "",
  address: "",
  country: "",
  contactNumber: "",
  primaryEmail: "",
  secondaryEmail: "",
  ccEmail: "",
  postalCode: "",
  tourNumber: "",
  organizationId: "",
  items: [{ description: "", amount: "" }],
  fullAmount: "",
  paymentPercentage: 100,
  initialPayment: "",
  balancePayment: "",
  balancePaymentDueDate: new Date().toISOString().split("T")[0],
  attachments: null,
  currency: "LKR",
  bankCharge: 0,
};

const titleOptions = [
  {
    name: "Mr",
    value: "Mr",
  },
  {
    name: "Mrs",
    value: "Mrs",
  },
  {
    name: "Ms",
    value: "Ms",
  },
];

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  tourNumber: Yup.string().required("Tour number is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  primaryEmail: Yup.string()
    .email("Invalid email format")
    .required("Primary email is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  // postalCode: Yup.string().required("Postal code is required"),
  contactNumber: Yup.string().required("Contact number is required"),
  initialPayment: Yup.string().required("Initial payment is required"),
  fullAmount: Yup.string().required("Full amount is required"),
  // balancePayment: Yup.string().required("Balance payment is required"),
});

const AddNewInvoice = () => {
  const dispatch = useDispatch();
  dispatch(setPageHeader("Invoice Management / Create New Invoice"));
  const { id, encodedItem } = useParams();
  const type = id && encodedItem ? "edit" : "view";
  const [formData, setFormData] = useState<any>(initialFormData);
  const [formErrors, setFormErrors] = useState<any>({});
  const [balancePaymentDueDate, setBalancePaymentDueDate] = useState<
    Date | undefined
  >(undefined);
  const navigate = useNavigate();
  const companyId = useSelector((state: any) => state.meta.companySelected.id);
  const [organizationRate, setOrganizationRate] = useState<number | null>(null);

  // Get settings data to retrieve organization rate
  const { data: settingsData } = useGetSettingQuery({});

  // Extract organization rate based on company ID
  useEffect(() => {

    if (settingsData?.data?.organizationList && companyId) {
      const selectedOrganization = settingsData.data.organizationList.find(
        (org: any) => org.id === companyId
      );

      if (selectedOrganization) {
        setOrganizationRate(selectedOrganization.organizationRate);
      }
    }
  }, [settingsData, companyId]);


  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const handleAddItem = (afterIndex = -1) => {
    const newItem = { description: "", amount: "" };

    if (afterIndex >= 0 && afterIndex < formData.items.length) {
      // Insert after the specified index
      const newItems = [...formData.items];
      newItems.splice(afterIndex + 1, 0, newItem);
      setFormData({
        ...formData,
        items: newItems,
      });
    } else {
      // Add to the end of the list
      setFormData({
        ...formData,
        items: [...formData.items, newItem],
      });
    }
  };

  const handleAddItemClick = (e: React.MouseEvent, afterIndex = -1) => {
    e.preventDefault();
    handleAddItem(afterIndex);
  };

  // Function to format number with thousand separators
  const formatNumberWithCommas = (value: string | number) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Function to parse formatted number back to raw number
  const parseFormattedNumber = (formattedValue: string) => {
    return formattedValue.replace(/,/g, "");
  };

  useEffect(() => {
    // Calculate initial payment amount based on full amount and percentage
    const initialPaymentAmount =
      Number(formData.fullAmount) * (Number(formData.paymentPercentage) / 100);

    // Calculate balance payment amount
    const balancePaymentAmount =
      Number(formData.fullAmount) - initialPaymentAmount;

    setFormData({
      ...formData,
      initialPayment: initialPaymentAmount.toFixed(2),
      balancePayment: balancePaymentAmount.toFixed(2),
    });
  }, [formData.fullAmount, formData.paymentPercentage]);

  useEffect(() => {
    if (balancePaymentDueDate) {
      setFormData({
        ...formData,
        balancePaymentDueDate: format(balancePaymentDueDate, "yyyy-MM-dd"),
      });
      setFormErrors({
        ...formErrors,
        balancePaymentDueDate: "",
      });
    }
  }, [balancePaymentDueDate]);

  // Ensure there is always at least one item
  useEffect(() => {
    if (formData.items.length === 0) {
      setFormData({
        ...formData,
        items: [{ description: "", amount: "" }],
      });
    }
  }, [formData.items.length]);

  const { data: currencyData } = useGetCurrencyQuery({
    organizationId: companyId,
  });

  const handleDeleteItem = (index: number) => {
    // Prevent deleting the last item
    if (formData.items.length <= 1) {
      return;
    }

    const updatedItems = formData.items.filter(
      (_: any, i: number) => i !== index
    );
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = formData.items.map((item: any, i: number) =>
      i === index ? { ...item, [field]: value, itemId: i } : item
    );
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const calculateTotalAmount = () => {
    return formData.items.reduce((total: number, item: any) => {
      const amount = parseFloat(item.amount) || 0;
      return total + amount;
    }, 0);
  };

  // Function to calculate bank charge using organization rate
  const calculateBankCharge = (amount: number) => {
    if (organizationRate !== null) {
      return (amount * organizationRate) / 100;
    }
    // Fallback to 3% if rate not available
    return amount * 0.03;
  };

  // Add a useEffect to update fullAmount based on item totals
  useEffect(() => {
    const subtotal = calculateTotalAmount();
    const transactionFee =
      organizationRate !== null
        ? (subtotal * organizationRate) / 100
        : subtotal * 0.03; // Use organization rate or default to 3%
    const totalAmount = subtotal + transactionFee;

    setFormData({
      ...formData,
      fullAmount: totalAmount.toFixed(2),
    });
  }, [formData.items, organizationRate]);

  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();

  const handleSubmit = async () => {
    const formDataToSubmit = new FormData();

    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("tourNumber", formData.tourNumber);
    formDataToSubmit.append("firstName", formData.firstName);
    formDataToSubmit.append("lastName", formData.lastName);
    formDataToSubmit.append("primaryEmail", formData.primaryEmail);
    formDataToSubmit.append("secondaryEmail", formData.secondaryEmail);
    formDataToSubmit.append("ccEmail", formData.ccEmail);
    if (formData.items.length > 0) {
      formDataToSubmit.append("itemList", JSON.stringify(formData.items));
    }
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("country", formData.country);
    formDataToSubmit.append("postalCode", formData.postalCode);
    formDataToSubmit.append("contactNumber", formData.contactNumber);
    formDataToSubmit.append("fullAmount", formData.fullAmount);
    formDataToSubmit.append("paymentPercentage", formData.paymentPercentage);
    formDataToSubmit.append("initialPayment", formData.initialPayment);
    formDataToSubmit.append("balancePayment", formData.balancePayment);
    formDataToSubmit.append("paymentPercentage", formData.paymentPercentage);
    formDataToSubmit.append("currency", formData.currency);


    // Calculate the proper values
    const itemTotalValue = calculateTotalAmount();
    const bankChargeValue = calculateBankCharge(itemTotalValue);
    const fullAmountValue = itemTotalValue + bankChargeValue;

    // itemTotal and netTotal are the sum of all items (without bank charge)
    formDataToSubmit.append("itemTotal", itemTotalValue.toString());
    formDataToSubmit.append("netTotal", itemTotalValue.toString());

    // bankCharge is the calculated bank charge
    formDataToSubmit.append("bankCharge", bankChargeValue.toFixed(2));

    // fullAmount is the total with bank charge included
    formDataToSubmit.append("fullAmount", fullAmountValue.toFixed(2));
    formDataToSubmit.append("totalAmount", fullAmountValue.toFixed(2));


    formDataToSubmit.append(
      "balancePaymentDueDate",
      formData.balancePaymentDueDate
    );
    if (companyId) {
      formDataToSubmit.append("organizationId", companyId);
    }
    formDataToSubmit.append(
      "attachments",
      formData.attachments as unknown as Blob
    );

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      if (type === "edit") {
        // await editCustomer({
        //   formData: formData,
        //   id: id,
        // })
        //   .unwrap()
        //   .then((res) => {
        //     toast.success(res.message);
        //     // setFormData(initialFormData);
        //     navigate("/admin/customer");
        //   })
        //   .catch((err) => {
        //     toast.error(err.data.message || "Something went wrong");
        //   });
        return;
      } else {
        await createInvoice(formDataToSubmit)
          .unwrap()
          .then((res: any) => {
            toast.success(res.message);
            setFormData(initialFormData);
            navigate("/admin/invoice");
          })
          .catch((err: any) => {
            toast.error(err.data.message || "Something went wrong");
          });
      }
    } catch (err: any) {
      console.log(err);
      const errors: any = {};
      err?.inner?.forEach((error: any) => {
        errors[error.path] = error.message;
      });
      setFormErrors(errors);
    }
  };

  const SearchDropDownHandler = (value: any) => {
    setFormData({
      ...formData,
      title: value.title || "",
      firstName: value.firstName || "",
      lastName: value.lastName || "",
      primaryEmail: value.primaryEmail || "",
      secondaryEmail: value.secondaryEmail || "",
      ccEmail: value.ccEmail || "",
      address: value.address || "",
      country: value.country || "",
      postalCode: value.postalCode || "",
      contactNumber: value.contactNumber || "",
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-5 p-3">
      <div className="mt-5  rounded-lg  md:border border-[var(--borderGray)]/50 md:p-10 bg-[#fff]">
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] font-medium text-[var(--primary)] mb-5">
            Create New Invoice
          </h1>
        </div>

        <div className="grid gap-3">
          <div>
            <p className="text-[12px] font-medium text-[var(--primary)] text-start mb-2">
              Search Existing Customer Using Customer Name Or Email
            </p>
            <SearchDropDown onChange={SearchDropDownHandler} size="small" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                label="Title"
                placeholder="Select title"
                name="title"
                required
                type="dropdown"
                value={formData.title}
                options={titleOptions}
                errors={formErrors.title || ""}
                onChangeHandler={handleChange}
                size="small"
              />
            </div>
            <div>
              <Input
                label="Tour Number"
                placeholder="Enter tour number"
                name="tourNumber"
                value={formData.tourNumber}
                errors={formErrors.tourNumber || ""}
                onChangeHandler={handleChange}
                required
                size="small"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                label="First Name"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                errors={formErrors.firstName || ""}
                onChangeHandler={handleChange}
                required
                size="small"
              />
            </div>
            <div>
              <Input
                label="Last Name"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                errors={formErrors.lastName || ""}
                onChangeHandler={handleChange}
                required
                size="small"
              />
            </div>
          </div>
          <div>
            <Input
              label="Primary Email"
              placeholder="Enter primary email"
              name="primaryEmail"
              value={formData.primaryEmail}
              errors={formErrors.primaryEmail || ""}
              onChangeHandler={handleChange}
              required
              size="small"
            />
          </div>
          <div>
            <Input
              label="Secondary Email"
              placeholder="Enter secondary email"
              name="secondaryEmail"
              value={formData.secondaryEmail}
              errors={formErrors.secondaryEmail || ""}
              onChangeHandler={handleChange}
              size="small"
            />
          </div>
          <div>
            <Input
              label="CC Email "
              placeholder="Enter cc email"
              name="ccEmail"
              value={formData.ccEmail || ""}
              errors={formErrors.ccEmail || ""}
              onChangeHandler={handleChange}
              size="small"
            />
          </div>

          <div>
            <Input
              label="Address"
              placeholder="Enter address"
              name="address"
              value={formData.address}
              errors={formErrors.address || ""}
              onChangeHandler={handleChange}
              required
              size="small"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                label="Country"
                placeholder="Enter country"
                name="country"
                value={formData.country}
                errors={formErrors.country || ""}
                onChangeHandler={handleChange}
                required
                size="small"
              />
            </div>
            <div>
              <Input
                label="Postal Code"
                placeholder="Enter postal code"
                name="postalCode"
                value={formData.postalCode}
                errors={formErrors.postalCode || ""}
                onChangeHandler={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  e.target.value = numericValue;
                  handleChange(e);
                }}
                size="small"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                label="Phone Number"
                placeholder="Enter phone number"
                name="contactNumber"
                value={formData.contactNumber}
                errors={formErrors.contactNumber || ""}
                onChangeHandler={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  e.target.value = numericValue;
                  handleChange(e);
                }}
                required
                size="small"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-5  rounded-lg  md:border border-[var(--borderGray)]/50 md:p-10 bg-[#fff]">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-[16px] font-medium text-[var(--primary)]">
              Item Setup
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <p className="text-[12px] font-medium text-gray-600">
                  Currency:
                </p>
                <div className="relative w-[60px]">
                  <Dropdown
                    options={currencyData?.data?.map((item: any) => {
                      return {
                        name: item.currency,
                        value: item.currency,
                      };
                    })}
                    value={formData.currency}
                    onChangeHandler={handleChange}
                    name="currency"
                    size="small"
                  />
                </div>
              </div>

              <button
                onClick={(e) => handleAddItemClick(e)}
                className="bg-[#003049] hover:opacity-90 focus:opacity-90 active:scale-95 text-white py-1 rounded-md text-[12px] font-normal flex items-center gap-1 h-[32px] transition-all duration-150 outline-none px-3"
              >
                <FaPlus size={10} />
                Add Item
              </button>
            </div>
          </div>

          <div className="">
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-6">
                <p className="text-[12px] font-medium text-[var(--primary)]">
                  Description
                </p>
              </div>
              <div className="col-span-5">
                <p className="text-[12px] font-medium text-[var(--primary)]">
                  Amount
                </p>
              </div>
              <div className="col-span-1"></div>
            </div>

            {formData.items.map((item: any, index: number) => (
              <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                <div className="col-span-6">
                  <input
                    type="text"
                    placeholder="Enter Description"
                    name={`description-${index}`}
                    value={item.description || ""}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    className="w-full h-[32px] border border-gray-300 rounded-md px-2 outline-none text-[12px] placeholder:text-gray-400"
                  />
                </div>
                <div className="col-span-5">
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    name={`amount-${index}`}
                    value={item.amount}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9.]/g,
                        ""
                      );
                      e.target.value = numericValue;
                      handleItemChange(index, "amount", e.target.value);
                    }}
                    className="w-full h-[32px] border border-gray-300 rounded-md px-2 outline-none text-[12px] placeholder:text-gray-400"
                  />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className={`w-[32px] h-[32px] flex items-center justify-center rounded-md ${
                      formData.items.length === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                    title={
                      formData.items.length === 1
                        ? "Cannot remove the only item"
                        : "Remove this item"
                    }
                    disabled={formData.items.length === 1}
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            ))}

            {/* Total Amount */}
            <div className="flex flex-col gap-1 justify-end mt-5 border-t border-gray-300 pt-5">
              <div className="grid grid-cols-3 items-center gap-2">
                <p className="font-medium text-[14px] text-gray-600 col-span-1">
                  Sub Total
                </p>
                <p className="font-medium text-[14px] text-gray-900 col-span-2 text-end">
                  {formData.currency}{" "}
                  {formatNumberWithCommas(calculateTotalAmount().toFixed(2))}
                </p>
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <p className="font-medium text-[14px] text-gray-600 col-span-1">
                  Transaction Fee (
                  {organizationRate !== null ? organizationRate : 3}%)
                </p>
                <p className="font-medium text-[14px] text-gray-900 col-span-2 text-end">
                  {formData.currency}{" "}
                  {formatNumberWithCommas(
                    (
                      calculateTotalAmount() *
                      (organizationRate !== null
                        ? organizationRate / 100
                        : 0.03)
                    ).toFixed(2)
                  )}
                </p>
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <p className="font-medium text-[14px] text-gray-600 col-span-1">
                  Total Amount
                </p>
                <p className="font-medium text-[14px] text-gray-900 col-span-2 text-end">
                  {formData.currency}{" "}
                  {formatNumberWithCommas(
                    (
                      calculateTotalAmount() *
                      (1 +
                        (organizationRate !== null
                          ? organizationRate / 100
                          : 0.03))
                    ).toFixed(2)
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5  rounded-lg  md:border border-[var(--borderGray)]/50 md:p-10 bg-[#fff]">
          <div>
            <label className="text-[12px] font-medium text-[var(--primary)] text-start">
              Initial Payment
            </label>
            <div className="grid grid-cols-5 gap-4 items-top mb-5">
              <div>
                <div className="relative">
                  <Input
                    placeholder="100%"
                    name="paymentPercentage"
                    value={formData.paymentPercentage || 100}
                    errors={formErrors.paymentPercentage || ""}
                    onChangeHandler={handleChange}
                    size="small"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
              </div>
              <div className="col-span-4">
                <Input
                  placeholder="0.00"
                  name="initialPayment"
                  value={formatNumberWithCommas(formData.initialPayment)}
                  errors={formErrors.initialPayment || ""}
                  disabled={true}
                  onChangeHandler={(e) => {
                    const numericValue = parseFormattedNumber(
                      e.target.value
                    ).replace(/[^0-9.]/g, "");
                    e.target.value = numericValue;
                    handleChange(e);
                  }}
                  size="small"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {Number(formData.paymentPercentage) < 100 && (
                <>
                  <div>
                    <Input
                      label="Balance Payment"
                      placeholder="0.00"
                      name="balancePayment"
                      value={formatNumberWithCommas(formData.balancePayment)}
                      errors={formErrors.balancePayment || ""}
                      disabled={true}
                      size="small"
                      onChangeHandler={(e) => {
                        const numericValue = parseFormattedNumber(
                          e.target.value
                        ).replace(/[^0-9.]/g, "");
                        e.target.value = numericValue;
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-[var(--primary)] text-start">
                      Balance Payment Due Date
                      {formErrors.balancePaymentDueDate && (
                        <span className="text-[var(--red)]"> *</span>
                      )}
                    </label>
                    <DatePicker
                      date={balancePaymentDueDate}
                      setDate={setBalancePaymentDueDate}
                      placeholder="Select due date"
                      className="h-[32px] text-[12px]"
                    />
                    {formErrors.balancePaymentDueDate && (
                      <p className="text-[var(--red)] text-[12px]">
                        {formErrors.balancePaymentDueDate}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mt-3">
            <div>
              <label className="text-[12px] font-medium text-[var(--primary)] text-start">
                Attachment
              </label>
              <div className="grid grid-cols-5 gap-4">
                <label className="col-span-5 text-[12px] font-medium text-[var(--primary)] text-start">
                  <div className="w-full  border border-[var(--borderGray)]/50 rounded-md p-2 outline-none text-[12px] flex items-center justify-center h-[100px]">
                    <FaPlus />
                    Add Attachment
                  </div>
                  <input
                    type="file"
                    name="attachments"
                    onChange={(e: any) => {
                      setFormData({
                        ...formData,
                        attachments: e.target.files?.[0],
                      });
                    }}
                    className="col-span-5 hidden"
                  />
                </label>
              </div>
              <div className="flex gap-2 mt-2">
                {formData.attachments && (
                  <div className="flex justify-between items-center p-2 gap-2 border border-[var(--borderGray)]/50 pb-2">
                    <p className="text-[12px]">
                      {formData.attachments.name || ""}
                    </p>
                    <button
                      onClick={() => {
                        setFormData({
                          ...formData,
                          attachments: null,
                        });
                      }}
                    >
                      <IoClose size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-10 gap-3">
            <div className="flex gap-3">
              <button
                disabled={isLoading}
                onClick={() => {
                  // setFormData(initialFormData);
                  navigate("/admin/invoice");
                }}
                className="border-[var(--primary)]/20 border hover:opacity-80 focus:opacity-90 active:scale-95 text-[var(--primary)]/60 px-6 py-1 rounded-md text-[12px] font-normal flex items-center gap-2 h-[30px] transition-all duration-150 outline-none"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="bg-[var(--primary)] hover:opacity-80 focus:opacity-90 active:scale-95 text-white py-1 rounded-md text-[12px] font-normal flex items-center gap-2 h-[30px] transition-all duration-150 outline-none px-6"
              >
                {isLoading && (
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size={12}
                  />
                )}
                {type === "edit" ? "Update" : "Create New Invoice"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewInvoice;
