import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoMdLogIn } from "react-icons/io";

// import { Formik, Form, Field, ErrorMessage } from "formik";

import authBackground from "../../../assets/Auth/authbg.jpg";
// import loginPageImage from "../../../assets/Auth/loginImage.png";
import logo from "../../../assets/logo.png";
import logoVideo from "../../../assets/Auth/login.mp4";

import { Loader } from "lucide-react";
import { useState } from "react";
import { useLoginMutation } from "@/services/authSlice";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/authSlice";
const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    MdRememberMe: false,
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { MdRememberMe, ...rest } = formData;
      await validationSchema.validate(rest, { abortEarly: false });

      await login(rest).unwrap().then((res) => {

        const {token, ...userData} = res.data
        const user = {...userData}
        console.log(user)
        toast.success(res.message);
        dispatch(setUser({user , token}));
        // localStorage.setItem("token", token);
      }).catch((error) => {
        toast.error(error.data.message || "Something went wrong");
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
        setFormError(errors as { email: string; password: string });
      } else {
        setFormError({
          email: "",
          password: "",
        });
        console.error("An unexpected error occurred:", error);
     
      }
    }
  };

  return (
    <div
      className="w-full bg-cover min-h-screen flex flex-col relative justify-center items-center"
      style={{ backgroundImage: `url(${authBackground})` }}
    >
      <div className="flex flex-col justify-center items-center p-3 my-14">
        <div className="grid md:grid-cols-2 bg-white rounded-lg shadow-lg p-3 gap-3">
          <div className="flex flex-col p-4">
            <img
              className="object-cover w-[90px] hover:scale-105 transition-all"
              src={logo}
              alt="Logo"
            />
            <div className="mt-[60px] grid gap-1">
              <h1 className="text-[18px] text-fontBlack font-bold">Sign In</h1>
              <p className="text-[12px] text-fontGray">
                Enter your email address and password to access account.
              </p>
            </div>

            <div className="mt-[40px] grid gap-3">
              <div className="flex flex-col gap-3">
                <label className="text-[12px] text-fontGray">
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your Address"
                  className="w-full border border-fontGray/40 focus:outline-none px-2 py-2 text-[12px] rounded-sm"
                />
                {formError.email && (
                  <p className="text-[12px] text-red-500">{formError.email}</p>
                )}
              </div>
              <div className="mt-[20px] grid gap-3">
                <div className="flex flex-col gap-3">
                  <label className="text-[12px] text-fontGray">Password</label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="Enter your Password"
                      className="w-full border border-fontGray/40 focus:outline-none px-2 py-2 text-[12px] rounded-sm"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 opacity-50 flex items-center text-[18px] leading-5 cursor-pointer"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FiEyeOff /> : <FiEye />}
                    </div>
                  </div>
                  {formError.password && (
                    <p className="text-[12px] text-red-500">
                      {formError.password}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-[20px] flex items-center p-2 rounded-sm">
                <input
                  type="checkbox"
                  name="MdRememberMe"
                  checked={formData.MdRememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, MdRememberMe: e.target.checked })
                  }
                  className="mr-2 custom-checkbox "
                />
                <label
                  htmlFor="MdRememberMe"
                  className="text-[12px] text-fontGray hover:text-primary"
                >
                  Remember Me
                </label>
              </div>
              <div className="mt-[20px]">
                <button
                  type="submit"
                  className="w-full bg-slate-200 text-primary hover:bg-primary hover:text-white transition-all font-bold text-[14px] py-2 rounded-sm flex items-center justify-center gap-1 transform hover:scale-[98%] duration-200"
                  onClick={(e: any) => handleSubmit(e)}
                >
                  {isLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <IoMdLogIn />
                  )}{" "}
                  Log In
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden md:flex hidden">
            <video
              src={logoVideo}
              className="object-cover h-full w-full max-w-[400px] hover:scale-110 transition-all duration-1000"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 p-3 text-sm">
        <p className="text-center">
          © Copyright 2024. All Rights Reserved. <br className="md:hidden" />{" "}
          Designed by Capricorn
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
