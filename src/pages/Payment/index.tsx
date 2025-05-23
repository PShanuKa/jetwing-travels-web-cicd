import logo from "../../assets/logo.png";
import payment from "../../assets/paymentimg.png";
import paymentlogo from "../../assets/visa.png";
import {
  useGetPaymentDetailsQuery,
  useInitiatePaymentAmexMutation,
  useInitiatePaymentMutation,
  useNotifyPaymentMutation,
} from "../../services/paymentSlice";
import { GiDetour } from "react-icons/gi";
import { BsCalendar2Date } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useGetFiltersSchemaQuery } from "@/services/reportSlice";

const Payment = () => {
  const { id, token } = useParams();
  // const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    cartType: "",
  });
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { data, isLoading } = useGetPaymentDetailsQuery({
    invoiceId: id,
    token: token,
  });

  const [initiatePayment, { isLoading: isInitiating }] =
    useInitiatePaymentMutation();
  const [initiatePaymentAmex] = useInitiatePaymentAmexMutation();

  // const [notifyPayment] = useNotifyPaymentMutation();

  const handleInitiatePayment = async () => {
    if (!formData.cartType) {
      setError("Please select a card type to proceed");
      return;
    }

    setError("");
    setIsRedirecting(true);
    console.log(formData.cartType);
    if (formData.cartType == "Master/Visa") {
      await initiatePayment({
        amount:
          data?.data?.invoiceStatus == "PENDING"
            ? data?.data?.initialPayment
            : data?.data?.balancePayment,
        invoiceToken: data?.data?.token,
        currency: data?.data?.currency,
        gateway: "mastercard",
      })
        .then((res) => {
          console.log(res);
          if (res?.data?.data?.paymentUrl?.sessionId) {
            localStorage.setItem(
              "merchantId",
              res?.data?.data?.paymentUrl?.merchant
            );
            localStorage.setItem(
              "sessionId",
              res?.data?.data?.paymentUrl?.sessionId
            );
            window.Checkout.configure({
              session: {
                id: res?.data?.data?.paymentUrl?.sessionId,
              },
            });
            window.Checkout.showEmbeddedPage("#embed-target");
            setIsRedirecting(false);
          }
        })
        .catch((error) => {
          console.error("Payment error:", error);
          setIsRedirecting(false);
        });
    }

    if (formData.cartType == "CyberSource") {
      try {
        const res = await initiatePayment({
          amount:
            data?.data?.invoiceStatus == "PENDING"
              ? data?.data?.initialPayment
              : data?.data?.balancePayment,
          invoiceToken: data?.data?.token,
          currency: data?.data?.currency,
          gateway: "cybersource",
        });

        // console.log("Initiate Payment Response:", res);

        // const paymentResponse = res?.data?.data?.paymentResponse;
        const cyberSourceValues = res?.data?.data?.cyberSourceValues;

        console.log("CyberSource Values:", cyberSourceValues);

        const formData = {
          // access_key: paymentResponse.access_key,
          // profile_id: paymentResponse.profile_id,
          // transaction_uuid: paymentResponse.transaction_uuid,
          // unsigned_field_names: paymentResponse.unsigned_field_names,
          // signed_date_time: paymentResponse.signed_date_time,
          // signed_field_names: paymentResponse.signed_field_names,
          // locale: paymentResponse.locale,
          // transaction_type: paymentResponse.transaction_type,
          // reference_number: paymentResponse.reference_number,
          // amount: paymentResponse.amount,
          // currency: paymentResponse.currency,
          // signed_field_names: paymentResponse.signed_field_names,
          // payment_method: paymentResponse.payment_method,
          // signature: paymentResponse.signature,
          // return_url: paymentResponse.return_url,
          // cancel_url: paymentResponse.cancel_url,
          // notify_url: paymentResponse.notify_url,
        };

        Object.entries(cyberSourceValues).forEach(([key, value]) => {
          formData[key] = value;
        });

        console.log("Form Data Payload:", formData);

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://testsecureacceptance.cybersource.com/pay";

        Object.entries(formData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } catch (error) {
        console.error("Error during payment initiation:", error.message);
        setIsRedirecting(false);
      }
    }
    // Direct Pay
    // if( formData.cartType == "Amex") {
    //   await initiatePayment({
    //     amount: data?.data?.balancePayment,
    //     invoiceToken: data?.data?.token,
    //     currency: data?.data?.currency,
    //     gateway: "directpay",
    //   }).then((res) => {
    //     const dp = new DirectPayIpg.Init({
    //       signature: res?.data?.data?.paymentUrl.signature.signature,
    //       dataString: res?.data?.data?.paymentUrl.signature.payload,
    //       stage: res?.data?.data?.paymentUrl.stage,
    //     });
    //     dp.doInAppCheckout()
    //   });
    // }

    if (formData.cartType == "Amex") {
      await initiatePaymentAmex({
        clientId: data?.data?.primaryEmail,
        transactionAmount: {
          totalAmount:
            data?.data?.invoiceStatus == "PENDING"
              ? data?.data?.initialPayment
              : data?.data?.balancePayment,
          paymentAmount:
            data?.data?.invoiceStatus == "PENDING"
              ? data?.data?.initialPayment
              : data?.data?.balancePayment,
          serviceFeeAmount: 50.0,
          currency: data?.data?.currency,
        },
        invoiceToken: token,
        comment: "Test payment",
      })
        .then((res) => {
          localStorage.setItem("clientId", data?.data?.primaryEmail);
          console.log(res);
          const paymentPageUrl = res?.data?.responseData?.paymentPageUrl;

          if (paymentPageUrl) {
            window.location.href = paymentPageUrl;
          } else {
            console.error("Payment page URL not found in the response.");
            setIsRedirecting(false);
          }
        })
        .catch((error) => {
          console.error("Amex payment error:", error);
          setIsRedirecting(false);
        });
    }
  };

  // useEffect(() => {
  //   window.completeCallback = (resultIndicator: any, sessionVersion: any) => {
  //     console.log("Payment Completed Successfully!", resultIndicator, sessionVersion);
  //     notifyPayment({
  //       resultIndicator: resultIndicator,
  //       sessionId: sessionId,
  //     }).then((res) => {
  //       window.location.href = "https://jetwing.duckdns.org/payment/success";
  //     });
  //   };
  //   return () => {
  //     delete window.completeCallback;
  //   };
  // }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data) {
    return <ExpirePayLink id={id} />;
  }

  return (
    <div className="w-full min-h-screen ">
      {isRedirecting && <FullPageLoader />}
      <div className="w-full  bg-[var(--publicBg)] pb-7 px-7">
        {/* header */}
        <div className="max-w-7xl w-full py-2 md:py-5  mx-auto flex items-center ">
          <img src={logo} alt="logo" className="h-[44px]" />
        </div>

        {/* main */}
        <div className="flex justify-between max-w-7xl w-full  mx-auto">
          <div>
            <div>
              <h1 className="text-white text-[24px] md:text-[32px] font-semibold">
                Hi, {data?.data?.firstName} {data?.data?.lastName}
              </h1>
              <p className="text-white text-[11px] md:text-[18px] font-normal">
                {data?.data?.primaryEmail}
              </p>
            </div>
            <div className="max-w-7xl w-full mt-10  mx-auto  items-center ">
              <h1 className="text-white text-[18px] font-normal">
                <span className="text-[50px] font-semibold">
                  {data?.data?.invoiceStatus == "PENDING"
                    ? data?.data?.initialPayment?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : data?.data?.balancePayment?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </span>{" "}
                / {data?.data?.currency}
              </h1>
              <p className="text-white/50  text-[13px] md:text-[16px] font-normal">
                Balance Payment Due Date: {data?.data?.balancePaymentDueDate}
              </p>
            </div>
          </div>
          <div className=" items-center justify-end hidden md:block">
            <img src={payment} alt="payment" className="h-[200px]" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto mt-5 px-7 pb-10">
        <div className="flex justify-between">
          {/* <div className="md:block hidden">
            <h1 className="text-black/50  text-[32px] font-normal">
             #{data?.data?.tourNumber}
            </h1>
          </div> */}
        </div>

        <div className="grid md:grid-cols-2 md:gap-20 gap-10 ">
          <div>
            <div className="">
              <h1 className="text-black text-[24px] font-semibold">
                Invoice Details
              </h1>
              <p className="text-black/50  text-[18px] font-normal">
                ID: #000{data?.data?.invoiceNumber}
              </p>

              <div className="flex items-center mt-5 gap-4">
                <GiDetour className="text-black/50  text-[20px] md:text-[25px]" />
                <div>
                  <p className="text-black/50  text-[12px] font-normal">
                    Tour Number
                  </p>
                  <h1 className="text-black  text-[11px] md:text-[15px] font-semibold">
                    {data?.data?.tourNumber}
                  </h1>
                </div>
              </div>

              <div className="flex items-center mt-5 gap-4">
                <BsCalendar2Date className="text-black/50  text-[20px] md:text-[25px]" />
                <div>
                  <p className="text-black/50  text-[12px] font-normal">
                    Balance Payment Due Date
                  </p>
                  <h1 className="text-black  text-[11px] md:text-[15px] font-semibold">
                    {data?.data?.balancePaymentDueDate}
                  </h1>
                </div>
              </div>

              {/* <div className="flex items-center mt-5 gap-4">
                <MdOutlineTravelExplore className="text-black/50  text-[20px] md:text-[25px]" />
                <h1 className="text-black  text-[11px] md:text-[15px] font-semibold">
                  37, Samanpura, Olugantota,
                  <br /> Balangoda
                </h1>
              </div> */}
            </div>
            {data?.data?.itemList.length > 0 && (
              <div className="mt-8">
                <h1 className="text-black text-[24px] font-semibold">
                  Item Setup
                </h1>

                <div className="flex flex-col gap-3 mt-5">
                  {data?.data?.itemList?.map((item: any) => (
                    <div
                      key={item?.itemId}
                      className="flex flex-col md:flex-row md:justify-between gap-1 border border-black/30 rounded-lg p-3 hover:shadow-sm transition-all"
                    >
                      <p className="text-[15px] font-normal">
                        {item?.description}
                      </p>
                      <p className="text-[15px] font-bold text-end">
                        {data?.data?.currency}{" "}
                        {item?.amount?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  ))}

                  <div className="flex justify-end gap-1 pb-2">
                    <div className="flex flex-col gap-1 border-b border-black/30 px-3">
                      <p className="text-[16px] font-semibold text-end">
                        TOTAL: {data?.data?.currency}{" "}
                        {data?.data?.itemTotal?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="md:border border-black/70 rounded-sm md:p-6 ">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-black text-[24px] font-semibold">
                    Payment Details
                  </h1>
                  <p className="font-normal text-black/50 text-[12px]">
                    Balance Payment Due Date:{" "}
                    {data?.data?.balancePaymentDueDate}
                  </p>
                </div>
                <div className="md:block hidden">
                  <img
                    src={paymentlogo}
                    alt="paymentlogo"
                    className="h-[20px]"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                {data?.data?.paymentMethod && (
                  <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                    <h1>Payment Method</h1>
                    <p>{data?.data?.paymentMethod}</p>
                  </div>
                )}
                {/* <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Invoice Status</h1>
                  <p>{data?.data?.invoiceStatus}</p>
                </div> */}
                <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Currency</h1>
                  <p>{data?.data?.currency}</p>
                </div>
                {/* <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Payment Gateway</h1>
                  <p>Stripe</p>
                </div> */}
                {/* <hr className="border-black/30" />
                <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Balance Payment</h1>
                  <p>{ data?.data?.balancePayment}</p>
                </div> */}
                {/* <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Service Charge(2024.12.03)</h1>
                  <p>18.00$</p>
                </div>
                <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Tax</h1>
                  <p>15.00$</p>
                </div> */}
                <div className="flex text-black text-[19px] font-semibold justify-between items-center border-t border-black/30 pt-2">
                  <h1>TOTAL</h1>
                  <p>
                    {data?.data?.invoiceStatus == "PENDING"
                      ? data?.data?.initialPayment?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : data?.data?.balancePayment?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </p>
                </div>

                {data?.data?.invoiceStatus != "PAID" ? (
                  <>
                    <div className="flex flex-col gap-3 mt-2">
                      <p className="text-[13px] text-black/50">
                        Select Your Card Type
                      </p>
                      <div className="flex flex-row gap-5">
                        {(data?.data?.paymentGatewayDetailsDtoList || []).map(
                          (item: any) => (
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="payment"
                                id={item?.name}
                                value={item?.name}
                                checked={formData.cartType === item?.name} // Bind the checked state
                                onChange={() => {
                                  setFormData({
                                    ...formData,
                                    cartType: item?.name,
                                  });
                                  setError("");
                                }} // Update state on change
                              />
                              <label
                                htmlFor="visa"
                                className="text-[13px] font-semibold"
                              >
                                {item?.name === "CyberSource"
                                  ? "Visa/Master"
                                  : item?.name}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                      {error && (
                        <p className="text-red-500 text-[13px] mt-1">{error}</p>
                      )}
                    </div>
                    <div className="flex md:flex-row flex-col justify-end mt-2">
                      <button
                        className="bg-black text-white px-15 py-2 rounded-md hover:bg-black/80 transition-all duration-150 cursor-pointer active:scale-95"
                        onClick={handleInitiatePayment}
                      >
                        {isInitiating ? (
                          <div className="animate-spin mx-auto rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        ) : (
                          <p className="text-[16px]">Pay Now</p>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-end mt-2">
                    <p className=" text-[12px] bg-green-500 text-white px-4 py-2 rounded-md">
                      Payment Already Completed
                    </p>
                  </div>
                )}

                <div id="embed-target"></div>
                <div className="flex justify-end mt-3">
                  <p className="text-black/50 text-[12px]">
                    Click the "Pay Now" button to complete your payment. By
                    proceeding, you agree to our
                    <a
                      href="/terms-and-conditions"
                      className="text-blue-500 underline"
                    >
                      {" "}
                      Terms & Conditions
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex bg-[var(--publicBg)] py-4 px-7 justify-center items-center  relative bottom-0 left-0 right-0 ">
        <p className="text-white text-[12px]">
          Copyright © {new Date().getFullYear()} jetwing. All rights reserved.
        </p>
      </div>

      {/* footer */}
    </div>
  );
};

export default Payment;

const Loading = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--publicBg)]">
      <div className="max-w-7xl mx-auto px-7 py-8">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="h-[44px] w-32 bg-white/10 rounded-lg mb-8" />

          {/* Main Content Skeleton */}
          <div className="flex justify-between">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-8 w-48 bg-white/10 rounded-lg" />
                <div className="h-4 w-32 bg-white/10 rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="h-12 w-64 bg-white/10 rounded-lg" />
                <div className="h-4 w-40 bg-white/10 rounded-lg" />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="h-[200px] w-[300px] bg-white/10 rounded-lg" />
            </div>
          </div>

          {/* Payment Details Skeleton */}
          <div className="mt-10 grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-8 w-40 bg-white/10 rounded-lg" />
                <div className="h-4 w-24 bg-white/10 rounded-lg" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-8 w-8 bg-white/10 rounded-lg" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-white/10 rounded-lg" />
                        <div className="h-4 w-24 bg-white/10 rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border border-white/20 rounded-lg p-6 space-y-6">
              <div className="space-y-4">
                <div className="h-8 w-48 bg-white/10 rounded-lg" />
                <div className="h-4 w-64 bg-white/10 rounded-lg" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 w-32 bg-white/10 rounded-lg" />
                    <div className="h-4 w-24 bg-white/10 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpirePayLink = ({ id }: { id: string | undefined }) => {
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

          <h1 className="text-sm font-semibold text-gray-800 mb-3">
            Invoice ID: #000{id}
          </h1>
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Payment Link Expired
          </h1>

          <p className="text-gray-600 mb-6">
            Sorry, this payment link has expired or is no longer valid. Please
            contact our support team or check your email for a new payment link.
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

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-r-transparent border-white rounded-full animate-spin"></div>
          <div
            className="absolute top-1 left-1 w-[70px] h-[70px] border-4 border-b-transparent border-l-transparent border-[var(--publicBg)] rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
          ></div>
        </div>
        <p className="text-white mt-4 font-medium tracking-wider">
          PROCESSING PAYMENT
        </p>
      </div>
    </div>
  );
};
