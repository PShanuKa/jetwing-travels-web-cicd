import Input from "@/components/common/Input";
import {
  useAddCustomerMutation,
  useGetUpdatedCustomersMutation,
} from "@/services/customerSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { setPageHeader } from "@/features/metaSlice";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contactNumber: Yup.string()
    .matches(/^\d{10}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  address: Yup.string()
    .min(3, "Address must be at least 3 characters")
    .required("Address is required"),
  country: Yup.string()
    .min(3, "Country must be at least 3 characters")
    .required("Country is required"),
  postalCode: Yup.string()
    .matches(/^\d{5}$/, "Invalid postal code")
    .required("Postal code is required"),
  nicOrPassportNumber: Yup.string()
    // .matches(/^\d{9}$/, "Invalid NIC or passport number")
    .required("NIC or passport number is required"),
});

const AddNewCustomer = () => {
  const dispatch = useDispatch();
  const { id, encodedItem } = useParams();
  const navigate = useNavigate();
  const type = id && encodedItem ? "edit" : "view";
  if (type === "edit") {
    dispatch(setPageHeader("Customer Management / Edit Customer Details"));
  } else {
    dispatch(setPageHeader("Customer Management / Create New Customer"));
  }
  const decodedItem = decodeURIComponent(encodedItem || "");
  const parsedItem = JSON.parse(decodedItem || "{}");

  const initialFormData = {
    title: "",
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    contactNumber: "",
    email: "",
    nicOrPassportNumber: "",
    postalCode: "",
    secondaryEmail: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [formErrors, setFormErrors] = useState(initialFormData);

  useEffect(() => {
    if (type === "edit") {
      setFormData({
        title: parsedItem.title,
        firstName: parsedItem.firstName,
        lastName: parsedItem.lastName,
        address: parsedItem.address,
        country: parsedItem.country,
        contactNumber: parsedItem.contactNumber,
        email: parsedItem.primaryEmail,
        nicOrPassportNumber: parsedItem.identityNumber,
        postalCode: parsedItem.postalCode,
        secondaryEmail: parsedItem.secondaryEmail,
      });
    }
  }, [type]);

  const [addCustomer, { isLoading }] = useAddCustomerMutation();
  const [editCustomer, { isLoading: isEditLoading }] =
    useGetUpdatedCustomersMutation();
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

  const handleSubmit = async () => {
    try {
      const {
        email: primaryEmail,
        nicOrPassportNumber: identityNumber,
        ...rest
      } = formData;
      await validationSchema.validate(formData, { abortEarly: false });
      if (type === "edit") {
        await editCustomer({
          formData: { ...rest, primaryEmail, identityNumber },
          id: id,
        })
          .unwrap()
          .then((res) => {
            toast.success(res.message);
            // setFormData(initialFormData);
            navigate("/admin/customer");
          })
          .catch((err) => {
            toast.error(err.data.message || "Something went wrong");
          });
      } else {
        await addCustomer({ ...rest, primaryEmail, identityNumber })
          .unwrap()
          .then((res) => {
            toast.success(res.message);
            setFormData(initialFormData);
            navigate("/admin/customer");
          })
          .catch((err) => {
            toast.error(err.data.message || "Something went wrong");
          });
      }
    } catch (err: any) {
      const errors: any = {};
      err.inner.forEach((error: any) => {
        errors[error.path] = error.message;
      });
      setFormErrors(errors);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-5 p-3">
      <div className="mt-5  rounded-lg  md:border border-[var(--borderGray)]/50 md:p-10 bg-[#fff]">
        <div className="flex justify-between items-center">
          <h1 className="text-[24px] font-medium text-[var(--primary)] mb-5">
            {type === "edit"
              ? "Edit Customer Details"
              : "Enter Customer Details"}
          </h1>
        </div>

        <div className="grid gap-5 ">
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
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                label="First Name"
                placeholder="Enter first name"
                name="firstName"
                required
                value={formData.firstName}
                onChangeHandler={handleChange}
                errors={formErrors.firstName || ""}
              />
            </div>
            <div>
              <Input
                label="Last Name"
                placeholder="Enter last name"
                name="lastName"
                required
                value={formData.lastName}
                onChangeHandler={handleChange}
                errors={formErrors.lastName || ""}
              />
            </div>
          </div>
          <div>
            <Input
              label="Address"
              placeholder="Enter address"
              name="address"
              required
              value={formData.address}
              onChangeHandler={handleChange}
              errors={formErrors.address || ""}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                label="Country"
                placeholder="Enter country"
                name="country"
                required
                value={formData.country}
                onChangeHandler={handleChange}
                errors={formErrors.country || ""}
              />
            </div>
            <div>
              <Input
                label="Postal Code"
                placeholder="Enter postal code"
                name="postalCode"
                type="number"
                required
                value={formData.postalCode}
                onChangeHandler={handleChange}
                errors={formErrors.postalCode || ""}
              />
            </div>
          </div>
          <div>
            <Input
              label="Primary Email"
              placeholder="Enter primary email"
              name="email"
              required
              value={formData.email}
              onChangeHandler={handleChange}
              errors={formErrors.email || ""}
            />
          </div>
          <div>
            <Input
              label="Secondary Email"
              placeholder="Enter secondary email"
              name="secondaryEmail"
              // required
              value={formData.secondaryEmail}
              onChangeHandler={handleChange}
              errors={formErrors.secondaryEmail || ""}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                label="Mobile Number"
                type="number"
                placeholder="Enter mobile number"
                name="contactNumber"
                required
                value={formData.contactNumber}
                onChangeHandler={handleChange}
                errors={formErrors.contactNumber || ""}
              />
            </div>
            <div>
              <Input
                label="NIC or Passport Number"
                placeholder="Enter NIC or Passport Number"
                name="nicOrPassportNumber"
                required
                value={formData.nicOrPassportNumber}
                onChangeHandler={handleChange}
                errors={formErrors.nicOrPassportNumber || ""}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-10 gap-3">
          <button
            disabled={isLoading || isEditLoading}
            onClick={() => {
              // setFormData(initialFormData);
              navigate("/admin/customer");
            }}
            className="border-[var(--primary)]/20 border hover:opacity-80 focus:opacity-90 active:scale-95 text-[var(--primary)]/60 px-10 py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36x] h-[36px] transition-all duration-150 outline-none"
          >
            Cancel
          </button>

          <button
            disabled={isLoading || isEditLoading}
            onClick={handleSubmit}
            className="bg-[var(--primary)] hover:opacity-80 focus:opacity-90 active:scale-95 text-white  py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36px] h-[36px] transition-all duration-150 outline-none px-10"
          >
            {isLoading ||
              (isEditLoading && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ))}
            {type === "edit" ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewCustomer;
