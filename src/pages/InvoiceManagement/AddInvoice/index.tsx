import Input from "@/components/common/Input";
import SearchInput from "@/components/common/SearchInput";
import {
  useCreateInvoiceMutation,
  useGetCurrencyQuery,
} from "@/services/invoiceSlice";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
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
  items: [],
  initialPayment: "",
  balancePayment: "",
  balancePaymentDueDate: new Date().toISOString().split("T")[0],
  paymentPercentage: 100,
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
  const companyRate = useSelector(
    (state: any) => state.meta.companySelected.organizationRate
  );


  useEffect(() => {
    console.log(companyRate)
    setTimeout(() => {
      setFormData({
        ...formData,
        bankCharge: companyRate,
      });

    }, 300);
  }, [companyRate]);

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

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", amount: "" }],
    });
  };

  useEffect(() => {
    // setFormData({
    //   ...formData,
    //   balancePayment: Number(formData.initialPayment) - (Number(formData.initialPayment) * Number(formData.paymentPercentage) / 100),
    // });
    setFormData({
      ...formData,
      balancePayment:
        Number(formData.initialPayment) -
        (Number(formData.initialPayment) * Number(formData.paymentPercentage)) /
          100,
    });
  }, [formData.initialPayment, formData.paymentPercentage]);

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

  const { data: currencyData } = useGetCurrencyQuery({
    organizationId: companyId,
  });

  const handleDeleteItem = (index: number) => {
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
      formDataToSubmit.append("items", JSON.stringify(formData.items));
    }
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("country", formData.country);
    formDataToSubmit.append("postalCode", formData.postalCode);
    formDataToSubmit.append("contactNumber", formData.contactNumber);
    formDataToSubmit.append("initialPayment", formData.initialPayment);
    formDataToSubmit.append("balancePayment", formData.balancePayment);
    formDataToSubmit.append("paymentPercentage", formData.paymentPercentage);
    formDataToSubmit.append("currency", formData.currency);
    formDataToSubmit.append("bankCharge", formData.bankCharge);
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
          <h1 className="text-[24px] font-medium text-[var(--primary)] mb-5">
            Create New Invoice
          </h1>
        </div>

        <div className="grid gap-5 ">
          <div>
            <p className="text-[14px] font-medium text-[var(--primary)] text-start mb-2">
              Search Existing Customer Using Customer Name Or Email
            </p>
            <SearchDropDown onChange={SearchDropDownHandler} />
          </div>
          <div className="grid grid-cols-2 gap-5">
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
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                label="First Name"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                errors={formErrors.firstName || ""}
                onChangeHandler={handleChange}
                required
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
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                label="Country"
                placeholder="Enter country"
                name="country"
                value={formData.country}
                errors={formErrors.country || ""}
                onChangeHandler={handleChange}
                required
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
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
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
              />
            </div>
          </div>
        </div>

        {/* <div className="flex justify-end mt-10 gap-3">
          <button className="border-[var(--primary)]/20 border hover:opacity-80 focus:opacity-90 active:scale-95 text-[var(--primary)]/60 px-10 py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36x] h-[36px] transition-all duration-150 outline-none">
            Cancel
          </button>

          <button className="bg-[var(--primary)] hover:opacity-80 focus:opacity-90 active:scale-95 text-white  py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36px] h-[36px] transition-all duration-150 outline-none px-10">
            Save
          </button>
        </div> */}
      </div>

      <div className="mt-5  rounded-lg  md:border border-[var(--borderGray)]/50 md:p-10 bg-[#fff]">
        <div className="flex justify-between items-center">
          <h1 className="text-[24px] font-medium text-[var(--primary)] mb-5">
            Item Setup
          </h1>

          <div>
            <button
              onClick={handleAddItem}
              className="bg-[var(--primary)] hover:opacity-80 focus:opacity-90 active:scale-95 text-white  py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36px] h-[36px] transition-all duration-150 outline-none px-10"
            >
              <FaPlus />
              Add Item
            </button>
          </div>
        </div>

        <div className="mt-5">
          {formData.items.length > 0 ? (
            formData.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex flex-col gap-1 mb-5 border-b border-[var(--borderGray)]/90 pb-5"
              >
                <h1 className="text-[14px] font-bold text-[var(--primary)] text-start">
                  Item {index + 1}
                </h1>
                <div>
                  <Input
                    label="Description"
                    placeholder="Enter description"
                    name={`description-${index}`}
                    type="textarea"
                    value={item.description || ""}
                    onChangeHandler={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-[var(--primary)] text-start">
                    Amount
                  </label>
                  <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-4">
                      <Input
                        placeholder="Enter amount"
                        name={`amount-${index}`}
                        value={item.amount}
                        type="number"
                        onChangeHandler={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          e.target.value = numericValue;
                          handleItemChange(index, "amount", e.target.value);
                        }}
                      />
                    </div>
                    <button
                      className="col-span-1 flex items-center justify-center bg-red-400 rounded-md text-white hover:opacity-80 focus:opacity-90 active:scale-95 transition-all duration-150 outline-none"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <RiDeleteBin5Line size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items added yet.</p>
          )}

          {/* Display Total Amount */}
          {formData.items.length > 0 && (
            <div className="mt-5">
              <h2 className="text-[16px] font-bold text-[var(--primary)] text-start">
                Total Amount: {calculateTotalAmount().toFixed(2)}{" "}
                {/* Format to 2 decimal places */}
              </h2>
            </div>
          )}
        </div>

        <div className="grid gap-5 mt-10 md:mt-20">
          <div>
            <label className="text-[14px] font-medium text-[var(--primary)] text-start">
              Initial Payment
            </label>
            <div className="grid grid-cols-5 gap-4 items-top">
              <div>
                <div className="relative">
                  <Input
                    placeholder="100%"
                    name="paymentPercentage"
                    value={formData.paymentPercentage || 100}
                    errors={formErrors.paymentPercentage || ""}
                    onChangeHandler={handleChange}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
              </div>
              <div className="col-span-4 flex items-top gap-1">
                <div className="w-full">
                  <Input
                    placeholder="0.00"
                    name="initialPayment"
                    value={formData.initialPayment}
                    errors={formErrors.initialPayment || ""}
                    onChangeHandler={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9.]/g,
                        ""
                      );
                      e.target.value = numericValue;
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="mt-1 w-[100px]">
                  <Dropdown
                    // placeholder="Select currency"
                    options={currencyData?.data?.map((item: any) => {
                      return {
                        name: item.currency,
                        value: item.currency,
                      };
                    })}
                    value={formData.currency}
                    onChangeHandler={handleChange}
                    name="currency"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-[14px] font-medium text-[var(--primary)] text-start">
                Balance Payment Due Date
                {formErrors.balancePaymentDueDate && (
                  <span className="text-[var(--red)]"> *</span>
                )}
              </label>
              <DatePicker
                date={balancePaymentDueDate}
                setDate={setBalancePaymentDueDate}
                placeholder="Select due date"
              />
              {formErrors.balancePaymentDueDate && (
                <p className="text-[var(--red)] text-[12px]">
                  {formErrors.balancePaymentDueDate}
                </p>
              )}
            </div>
            <div>
              <Input
                label="Balance Payment"
                placeholder="0.00"
                name="balancePayment"
                value={formData.balancePayment}
                errors={formErrors.balancePayment || ""}
                onChangeHandler={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9.]/g, "");
                  e.target.value = numericValue;
                  handleChange(e);
                }}
                // required
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div>
            <label className="text-[14px] font-medium text-[var(--primary)] text-start">
              Attachment
            </label>
            <div className="grid grid-cols-5 gap-4">
              <label className="col-span-5 text-[14px] font-medium text-[var(--primary)] text-start">
                <div className="w-full  border border-[var(--borderGray)]/50 rounded-md p-2 outline-none text-[14px] flex items-center justify-center h-[120px]">
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
                <div className="flex justify-between items-center p-3 gap-2 border border-[var(--borderGray)]/50 pb-2">
                  <p>{formData.attachments.name || ""}</p>
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        attachments: null,
                      });
                    }}
                  >
                    <IoClose />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-10 gap-3">
          {/* <DeleteDialog>

          <button className="bg-red-400 hover:opacity-80 focus:opacity-90 active:scale-95 text-white  py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36px] h-[36px] transition-all duration-150 outline-none px-10">
            Delete
          </button>
          </DeleteDialog> */}

          <div className="flex gap-3">
            <button
              disabled={isLoading}
              onClick={() => {
                // setFormData(initialFormData);
                navigate("/admin/invoice");
              }}
              className="border-[var(--primary)]/20 border hover:opacity-80 focus:opacity-90 active:scale-95 text-[var(--primary)]/60 px-10 py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36x] h-[36px] transition-all duration-150 outline-none"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className="bg-[var(--primary)] hover:opacity-80 focus:opacity-90 active:scale-95 text-white  py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36px] h-[36px] transition-all duration-150 outline-none md:px-10 px-5"
            >
              {isLoading && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
              {type === "edit" ? "Update" : "Create New Invoice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewInvoice;
