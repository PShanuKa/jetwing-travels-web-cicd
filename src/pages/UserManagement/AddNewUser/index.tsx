import Input from "@/components/common/Input";
import logo from "@/assets/logo.png";
import RightBar from "./RightBar";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "@/services/userSlice";
import { useGetAllOrganizationsQuery } from "@/services/organizationSlice";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

const initialFormData: {
  firstName: string;
  lastName: string;
  address: string;
  mobileNumber: string;
  email: string;
  roleName: string;
  permissionNames: string[];
  organizationIds: number[]; // Explicitly set the type to an array of numbers
  nicOrPassportNumber: string;
  password: string;
} = {
  firstName: "",
  lastName: "",
  address: "",
  mobileNumber: "",
  email: "",
  roleName: "",
  permissionNames: [],
  organizationIds: [], // This will now correctly infer an array of numbers
  nicOrPassportNumber: "",
  password: "",
};


const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  nicOrPassportNumber: Yup.string().required(
    "NIC or Passport Number is required"
  ),
});

const AddNewUser = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState<any>({});
  const navigate = useNavigate();

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

  const [createUser, { isLoading: isLoadingCreateUser }] = useCreateUserMutation();
  const { data: organizations , isLoading: isLoadingOrganizations } = useGetAllOrganizationsQuery(undefined);

  // Handle organization card click
  const handleOrganizationClick = (organizationId: number) => {
    setFormData((prevData: any) => {
      const updatedOrganizationIds = prevData.organizationIds.includes(organizationId)
        ? prevData.organizationIds.filter((id: number) => id !== organizationId)
        : [...prevData.organizationIds, organizationId];
  
      return {
        ...prevData,
        organizationIds: updatedOrganizationIds,
      };
    });
  };

  console.log(formData);

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      await createUser({
        email: formData.email,
        name: formData.firstName + " " + formData.lastName,
        address: formData.address,
        identityNumber: formData.nicOrPassportNumber,
        mobileNumber: formData.mobileNumber,
        organizationIds: formData.organizationIds,
        roleName: formData.roleName,
        password: formData.password,

      })
        .unwrap()
        .then((res: any) => {
          toast.success(res.message);
          setFormData(initialFormData);
          navigate("/admin/user");
        })
        .catch((err: any) => {
          toast.error(err.data.message || "Something went wrong");
        });
    } catch (err: any) {
      const errors: any = {};
      err.inner.forEach((error: any) => {
        errors[error.path] = error.message;
      });
      setFormErrors(errors);
    }
  };

  // Add this function to handle role selection
  const handleRoleChange = (role: string) => {
    setFormData((prevData) => ({
      ...prevData,
      roleName: role, // Set the selected role name
    }));
  };

  console.log(formData);

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="mt-5 rounded-lg md:border border-[var(--borderGray)]/50 md:p-10 bg-[#fff]">
        <h1 className="text-[24px] font-medium text-[var(--primary)] mb-5">
          Enter User Details
        </h1>

        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                label="First Name"
                placeholder="Enter first name"
                name="firstName"
                required
                value={formData.firstName}
                onChangeHandler={handleChange}
                errors={formErrors.firstName}
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
                errors={formErrors.lastName}
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
              errors={formErrors.address}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                label="Mobile Number"
                placeholder="Enter mobile number"
                name="mobileNumber"
                required
                value={formData.mobileNumber}
                onChangeHandler={handleChange}
                errors={formErrors.mobileNumber}
              />
            </div>
            <div>
              <Input
                label="Email"
                placeholder="Enter email address"
                name="email"
                required
                value={formData.email}
                onChangeHandler={handleChange}
                errors={formErrors.email}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                label="Password"
                placeholder="Enter password"
                name="password"
                required
                value={formData.password}
                onChangeHandler={handleChange}
                errors={formErrors.password}
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
                errors={formErrors.nicOrPassportNumber}
              />
            </div>
          </div>
        </div>

        <h1 className="text-[24px] font-medium text-[var(--primary)] my-5">
          Set User Role
        </h1>

        <div className="flex flex-wrap gap-10">
          {/* <div className="flex items-center gap-2">
            <input
              type="radio" // Use radio buttons instead of checkboxes
              id="superAdmin"
              name="roleName"
              value="Super Admin"
              checked={formData.roleName === "Super Admin"} // Check if this role is selected
              onChange={() => handleRoleChange("Super Admin")} // Update the role name
              className="w-[16px] h-[16px]"
            />
            <label htmlFor="superAdmin">Super Admin</label>
          </div> */}
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="admin"
              name="roleName"
              value="Admin"
              checked={formData.roleName === "Admin"}
              onChange={() => handleRoleChange("Admin")}
              className="w-[16px] h-[16px]"
            />
            <label htmlFor="admin">Admin</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="executive"
              name="roleName"
              value="Executive"
              checked={formData.roleName === "Executive"}
              onChange={() => handleRoleChange("Executive")}
              className="w-[16px] h-[16px]"
            />
            <label htmlFor="executive">Executive</label>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-lg md:border border-[var(--borderGray)]/50 md:p-10 bg-[#fff]">
        <h1 className="text-[24px] font-medium text-[var(--primary)] mb-5">
          Select Assigned Company
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoadingOrganizations && (
            <div className="flex">
            <BiLoaderAlt className="text-[var(--primary)] text-[24px] animate-spin" />
          </div>
          )}





          {organizations?.data?.content?.map((organization: any) => (
            <div
              key={organization.id}
              onClick={() => handleOrganizationClick(organization.id)} // Pass the organization ID
              className={`w-full aspect-square transition-all duration-150 border rounded-lg p-1 flex flex-col active:scale-95 justify-center items-center gap-2 group cursor-pointer ${
                formData.organizationIds.includes(organization.id) // Check if the ID is selected
                  ? "bg-[var(--primary)] border-transparent hover:bg-[var(--primary)]/80"
                  : "border-[var(--borderGray)]/20 hover:bg-[var(--primary)]/50"
              }`}
            >
              <img src={logo} alt="" className="object-cover w-[80%]" />
              <p
                className={`text-[22px] text-center font-medium transition-all duration-150 ${
                  formData.organizationIds.includes(organization.id) // Highlight if the ID is selected
                    ? "text-[#fff]"
                    : "text-[var(--textGray)] group-hover:text-[#fff]"
                }`}
              >
                {organization.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-10 gap-3">
          <RightBar>
            <button className="border-[var(--primary)]/20 border hover:opacity-80 focus:opacity-90 active:scale-95 text-[var(--primary)]/60 px-10 py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36x] h-[36px] transition-all duration-150 outline-none">
              Cancel
            </button>
          </RightBar>
          <button
            className="bg-[var(--primary)] hover:opacity-80 focus:opacity-90 active:scale-95 text-white py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36px] h-[36px] transition-all duration-150 outline-none px-10"
            onClick={handleSubmit}
          >
            {isLoadingCreateUser ? (
              <BiLoaderAlt className=" text-[24px] animate-spin" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
