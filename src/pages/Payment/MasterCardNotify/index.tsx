import { useNotifyPaymentMutation } from "@/services/paymentSlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MasterCardNotify = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const resultIndicator = searchParams.get("resultIndicator");
  const checkoutVersion = searchParams.get("checkoutVersion");
  const [pageView, setPageView] = useState("Loading...");

  const [notifyPayment] =
    useNotifyPaymentMutation();

  useEffect(() => {
    if(resultIndicator){
    notifyPayment({
      sessionId: localStorage.getItem("sessionId") ,
      resultIndicator: resultIndicator,
      merchantId: localStorage.getItem("merchantId"),
    }).then((res) => {
      console.log(res);
      localStorage.removeItem("merchantId");
      localStorage.removeItem("sessionId");
      setPageView("Processing Payment...");
      // setTimeout(() => {
      //   window.location.href = "/payment/success";
      //   }, 3000);
      });
    }else{
      setPageView("Invalid Request");
    }
  }, []);

  return <div>{pageView}</div>;
};

export default MasterCardNotify;
