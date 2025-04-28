import { useNotifyPaymentMutation } from "@/services/paymentSlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MasterCardNotify = () => {
  const [searchParams] = useSearchParams();
  const resultIndicator = searchParams.get("resultIndicator");
  const [pageView, setPageView] = useState("Loading...");

  const [notifyPayment] = useNotifyPaymentMutation();

  useEffect(() => {
    console.log("MasterCardNotify component loaded");
    console.log("ResultIndicator:", resultIndicator);

    if (resultIndicator) {
      const sessionId = localStorage.getItem("sessionId");
      const merchantId = localStorage.getItem("merchantId");
      const invoiceToken = localStorage.getItem("invoiceToken");

      console.log("Retrieved from localStorage:");
      console.log("SessionId:", sessionId);
      console.log("MerchantId:", merchantId);
      console.log("InvoiceToken:", invoiceToken);

      if (!sessionId) {
        console.error("SessionId is missing in localStorage");
        setPageView("Error: Session ID not found");
        return;
      }

      try {
        console.log("Preparing payload for notifyPayment API");
        const payload: {
          sessionId: string;
          resultIndicator: string;
          merchantId: string | null;
          invoiceToken?: string;
        } = {
          sessionId: sessionId,
          resultIndicator: resultIndicator,
          merchantId: merchantId,
        };

        // Add invoiceToken if it exists
        if (invoiceToken) {
          payload.invoiceToken = invoiceToken;
        }

        console.log("Sending payload to API:", payload);

        notifyPayment(payload)
          .then((res) => {
            console.log("API Response:", res);
            setPageView("Processing Payment...");

            // Clean up localStorage
            console.log("Cleaning up localStorage");
            localStorage.removeItem("merchantId");
            localStorage.removeItem("sessionId");
            if (invoiceToken) localStorage.removeItem("invoiceToken");

            if (res?.data) {
              console.log("Redirecting to:", res.data);
              setTimeout(() => {
                window.location.href = res.data;
              }, 1000);
            } else {
              console.error("No redirect URL in response");
              setPageView("Payment processed, but no redirect URL provided");
            }
          })
          .catch((error) => {
            console.error("Payment notification failed:", error);
            setPageView("Payment processing failed. Please try again.");
          });
      } catch (error) {
        console.error("Error during payment notification:", error);
        setPageView("An unexpected error occurred");
      }
    } else {
      console.error("No resultIndicator in URL parameters");
      setPageView("Invalid Request: Missing result indicator");
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center p-6 max-w-md">
        <h2 className="text-xl font-semibold mb-4">{pageView}</h2>
        {pageView.includes("failed") || pageView.includes("Error") ? (
          <p className="text-red-500">
            There was a problem processing your payment. Please contact support
            if this issue persists.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default MasterCardNotify;
