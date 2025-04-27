import { useNotifyPaymentMutation } from "@/services/paymentSlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MasterCardNotify = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const resultIndicator = searchParams.get("resultIndicator");
  const [pageView, setPageView] = useState("Loading...");

  const [notifyPayment] =
    useNotifyPaymentMutation();

  useEffect(() => {
    notifyPayment({
      sessionId: sessionId,
      resultIndicator: resultIndicator,
      merchantId: localStorage.getItem("merchantId"),
    }).then((res) => {
      console.log(res);
      localStorage.removeItem("merchantId");
      setPageView("Processing Payment...");
      setTimeout(() => {
        window.location.href = "/payment/success";
      }, 3000);
    });
  }, []);

  return <div>{pageView}</div>;
};

export default MasterCardNotify;
