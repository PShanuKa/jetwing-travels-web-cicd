import logo from "../../../assets/logo.png";
import { MdOutlineErrorOutline } from "react-icons/md";

const PaymentFailed = () => {
  return (
    <div className="w-full">
      <div className="w-full bg-[var(--publicBg)] pb-7 px-7 min-h-screen">
        {/* header */}
        <div className="max-w-7xl w-full py-2 md:py-5 mx-auto flex items-center">
          <img src={logo} alt="logo" className="h-[44px]" />
        </div>

        {/* main failed content */}
        <div className="max-w-7xl w-full mx-auto mt-10">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <MdOutlineErrorOutline className="text-red-500 text-6xl" />
              </div>
            </div>

            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Payment Failed
            </h1>

            <p className="text-gray-600 mb-6">
              We're sorry, but your payment could not be processed. Please try again or contact our support team for assistance.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">Possible reasons for failure:</p>
              <ul className="text-center text-gray-600 space-y-2">
                <li>• Insufficient funds in your account</li>
                <li>• Incorrect card details</li>
                <li>• Bank declined the transaction</li>
                <li>• Network connectivity issues</li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              {/* <button
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-black/80 transition-all duration-150"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button> */}

              <p className="text-sm text-gray-500">
                If the problem persists, please contact our support team at support@jetwing.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="w-full flex bg-[var(--publicBg)] py-4 px-7 justify-center items-center relative bottom-0 left-0 right-0">
        <p className="text-white text-[12px]">
          Copyright © {new Date().getFullYear()} jetwing. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PaymentFailed;
