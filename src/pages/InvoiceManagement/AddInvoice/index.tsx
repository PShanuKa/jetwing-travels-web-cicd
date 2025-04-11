import Input from "@/components/common/Input";
import SearchInput from "@/components/common/SearchInput";
import { useCreateInvoiceMutation } from "@/services/invoiceSlice";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
// import DeleteDialog from "./DeleteDialog";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Dropdown from "@/components/common/Dropdown";

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
  balancePaymentDueDate: "",
  paymentPercentage: 100,
  attachments: null,
  currency: "LKR",
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

const paymentPercentageOptions = [
  {
    name: "100%",
    value: 100,
  },
  {
    name: "75%",
    value: 75,
  },
  {
    name: "50%",
    value: 50,
  },
  {
    name: "25%",
    value: 25,
  },
  {
    name: "0%",
    value: 0,
  },
];

const paymentCurrencyOptions = [
  {
    name: "LKR",
    value: "LKR",
  },
  {
    name: "USD",
    value: "USD",
  },
  {
    name: "EUR",
    value: "EUR",
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
});

const AddNewInvoice = () => {
  const { id, encodedItem } = useParams();
  const type = id && encodedItem ? "edit" : "view";
  const [formData, setFormData] = useState<any>(initialFormData);
  const [formErrors, setFormErrors] = useState<any>({});
  const navigate = useNavigate();
  const companyId = useSelector((state: any) => state.meta.companySelected);

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

  // console.log(formData);

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
    formDataToSubmit.append("currency", formData.currency);
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

  return (
    <div className="grid md:grid-cols-2 gap-5 ">
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
            <SearchInput value={""} name="searchString" onChange={() => {}} />
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
                onChangeHandler={handleChange}
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
                onChangeHandler={handleChange}
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
                        onChangeHandler={(e) =>
                          handleItemChange(index, "amount", e.target.value)
                        }
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
            <div className="grid grid-cols-5 gap-4">
              <div>
                <Input
                  type="dropdown"
                  placeholder="Balance Payment Due Date"
                  name="paymentPercentage"
                  options={paymentPercentageOptions}
                  value={formData.paymentPercentage}
                  errors={formErrors.paymentPercentage || ""}
                  onChangeHandler={handleChange}
                />
              </div>
              {/* <div className="col-span-4">
                <Input
                  placeholder="0.00"
                  name="initialPayment"
                  value={formData.initialPayment}
                  errors={formErrors.initialPayment || ""}
                  onChangeHandler={handleChange}
                />
              </div> */}
              <div className="col-span-4 flex items-center gap-1">
                <input
                  placeholder="0.00"
                  className="w-full h-[44px] mt-1 border border-[var(--borderGray)]/50 rounded-md p-2 outline-none text-[14px]"
                  name="initialPayment"
                  value={formData.initialPayment}
                  onChange={handleChange}
                />
                <div className="mt-1 w-[100px]">
                  <Dropdown
                    // placeholder="Select currency"
                    options={paymentCurrencyOptions}
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
              <Input
                label="Balance Payment Due Date"
                placeholder="Balance Payment Due Date"
                name="balancePaymentDueDate"
                value={formData.balancePaymentDueDate}
                errors={formErrors.balancePaymentDueDate || ""}
                type="date"
                onChangeHandler={handleChange}
                // required
              />
            </div>
            <div>
              <Input
                label="Balance Payment"
                placeholder="0.00"
                name="balancePayment"
                value={formData.balancePayment}
                errors={formErrors.balancePayment || ""}
                onChangeHandler={handleChange}
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
              className="bg-[var(--primary)] hover:opacity-80 focus:opacity-90 active:scale-95 text-white  py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36px] h-[36px] transition-all duration-150 outline-none px-10"
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
