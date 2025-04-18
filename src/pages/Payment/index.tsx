import logo from "../../assets/logo.png";
import payment from "../../assets/paymentimg.png";
import paymentlogo from "../../assets/visa.png";
import {
  useGetPaymentDetailsQuery,
  useInitiatePaymentMutation,
} from "../../services/paymentSlice";
import { GiDetour } from "react-icons/gi";
import { BsCalendar2Date } from "react-icons/bs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";

const Payment = () => {
  const { id, token } = useParams();
  const { data, isLoading } = useGetPaymentDetailsQuery({
    invoiceId: id,
    token: token,
  });


  const [initiatePayment, { isLoading: isInitiating }] =
    useInitiatePaymentMutation();

  const handleInitiatePayment = async () => {
    await initiatePayment({
      amount: data?.data?.balancePayment,
      invoiceToken: data?.data?.token,
      currency: "LKR",
      gateway: "mastercard",
    }).unwrap();
  };

  const [formData, setFormData] = useState({
    cartType: "",
  });

  if (isLoading) {
    return <Loading />;
  }

    if(!data?.data){
      return <ExpirePayLink id={id}  />
    }


  // if (data?.data?.paymentLink) {
  //   return <Redirect to={data?.data?.paymentLink} />;
  // }

  console.log(formData);

  return (
    <div className="w-full">
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
                ${" "}
                <span className="text-[50px] font-semibold">
                  {data?.data?.balancePayment}
                </span>{" "}
                / LKR
              </h1>
              <p className="text-white/50  text-[13px] md:text-[16px] font-normal">
                Next Payment will be changed in 25th September
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
                ID: {data?.data?.id}
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
            <div className="mt-8">
              <h1 className="text-black text-[24px] font-semibold">
                Item Setup
              </h1>

              <div className="flex flex-col gap-3 mt-5">
                {data?.data?.itemList?.map((item: any) => (
                  <div
                    key={item?.itemId}
                    className="flex flex-col gap-1 border border-black/30 rounded-lg p-2"
                  >
                    <p className="text-[15px] font-normal ">
                      {item?.description}
                    </p>
                    <p className="text-[15px] font-bold text-end">
                      ${item?.amount?.toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="flex justify-end gap-1 pb-2">
                  <div className="flex flex-col gap-1 border-b border-black/30">
                    <p className="text-[15px] font-normal text-end">
                      TOTAL: {data?.data?.itemTotal?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Payment Method</h1>
                  <p>CARD</p>
                </div>
                <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Currency</h1>
                  <p>USD</p>
                </div>
                {/* <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Payment Gateway</h1>
                  <p>Stripe</p>
                </div> */}
                <hr className="border-black/30" />
                <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Balance Payment(2024.12.03)</h1>
                  <p>{data?.data?.balancePayment}</p>
                </div>
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
                  <p>{data?.data?.balancePayment}</p>
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <p className="text-[13px] text-black/50">
                    Select Your Card Type
                  </p>
                  <div className="flex flex-row gap-5">
                    {/* Visa/Master Radio Button */}
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        id="visa"
                        value="visa"
                        checked={formData.cartType === "visa"} // Bind the checked state
                        onChange={() =>
                          setFormData({ ...formData, cartType: "visa" })
                        } // Update state on change
                      />
                      <label
                        htmlFor="visa"
                        className="text-[13px] font-semibold"
                      >
                        Visa/Master
                      </label>
                    </div>

                    {/* AMEX Radio Button */}
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        id="amex"
                        value="amex"
                        checked={formData.cartType === "amex"} // Bind the checked state
                        onChange={() =>
                          setFormData({ ...formData, cartType: "amex" })
                        } // Update state on change
                      />
                      <label
                        htmlFor="amex"
                        className="text-[13px] font-semibold"
                      >
                        AMEX
                      </label>
                    </div>
                  </div>
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
      <div className="w-full flex bg-[var(--publicBg)] py-4 px-7 justify-center items-center ">
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



const ExpirePayLink = ({id}: {id: string | undefined}) => {
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