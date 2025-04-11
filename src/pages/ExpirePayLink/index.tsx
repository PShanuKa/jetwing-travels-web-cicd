import { MdOutlineErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const ExpirePayLink = () => {
  return (
    <div className="min-h-screen bg-[var(--publicBg)] flex flex-col">
      {/* Header */}
      <div className="w-full py-5 px-7">
        <div className="max-w-7xl mx-auto">
          <img src={logo} alt="logo" className="h-[44px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <MdOutlineErrorOutline className="text-red-500 text-6xl" />
          </div>
          
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Payment Link Expired
          </h1>
          
          <p className="text-gray-600 mb-6">
            Sorry, this payment link has expired or is no longer valid. Please contact our support team or check your email for a new payment link.
          </p>

      
        </div>
      </div>

      {/* Footer */}
      <div className="w-full py-4 px-7 text-center">
        <p className="text-white text-sm">
          Copyright © {new Date().getFullYear()} jetwing. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ExpirePayLink;