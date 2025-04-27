import { useSearchParams } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useEffect } from "react";
import { useNotifyPaymentAmexMutation } from "@/services/paymentSlice";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const clientRef = searchParams.get("clientRef");
  const reqid = searchParams.get("reqid");

  const [notifyPaymentAmex] = useNotifyPaymentAmexMutation();

  useEffect(() => {
    if (clientRef && reqid) {
      notifyPaymentAmex({
        requestData: {
          clientRef: clientRef,
          reqid: reqid,
        },
      });
    }
  }, []);

  return (
    <div className="w-full ">
      <div className="w-full bg-[var(--publicBg)] pb-7 px-7 min-h-screen">
        {/* header */}
        <div className="max-w-7xl w-full py-2 md:py-5 mx-auto flex items-center">
          <img src={logo} alt="logo" className="h-[44px]" />
        </div>

        {/* main success content */}
        <div className="max-w-7xl w-full mx-auto mt-10">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Payment Successful!
            </h1>

            <p className="text-gray-600 mb-6">
              Thank you for your payment. Your transaction has been completed
              successfully.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">Transaction Details</p>
              <p className="text-gray-800 font-medium">
                A confirmation email has been sent to your registered email
                address.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* <button
                  className="bg-black text-white px-6 py-3 rounded-md hover:bg-black/80 transition-all duration-150"
                  onClick={() => (window.location.href = "/")}
                >
                  Done
                </button> */}

              <p className="text-sm text-gray-500">
                If you have any questions, please contact our support team.
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

export default PaymentSuccess;
