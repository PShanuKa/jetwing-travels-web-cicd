import logo from "../../assets/logo.png";
import payment from "../../assets/paymentimg.png";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineTravelExplore } from "react-icons/md";
import paymentlogo from "../../assets/visa.png";

const Payment = () => {
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
            <div className=" py-4 md:py-5 items-center ">
              <h1 className="text-white  text-[24px] md:text-[25px] font-semibold">
                PayNow
              </h1>
              <p className="text-white text-[14px] md:text-[16px] font-normal">
                The "Pay Now" screen allows users to securely complete their
                payment. It displays <br className="hidden md:block" /> the
                total amount, payment methods, and a confirmation button for a
                seamless <br className="hidden md:block" /> checkout.
              </p>
            </div>
            <div className="max-w-7xl w-full   mx-auto  items-center ">
              <h1 className="text-white text-[18px] font-normal">
                $ <span className="text-[46px] font-semibold">87.50</span> / USD
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
          <div>
            <h1 className="text-black/80 text-[24px]  md:text-[32px] font-semibold">
              Hi, Pasindu Shanuka
            </h1>
            <p className="text-black/50 text-[11px] md:text-[18px] font-normal">
              shanuka200018@gmail.com
            </p>
          </div>
          <div className="md:block hidden">
            <h1 className="text-black/50  text-[32px] font-normal">
              #00075412
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-20 gap-10 mt-5">
          <div>
            <div className="flex items-center gap-4">
              <MdLocationPin className="text-black/50  text-[20px] md:text-[25px]" />
              <h1 className="text-black  text-[11px] md:text-[15px] font-semibold">
                37, Samanpura, Olugantota,
                <br /> Balangoda
              </h1>
            </div>
            <div className="mt-8">
              <h1 className="text-black text-[24px] font-semibold">
                Invoice Details
              </h1>
              <p className="text-black/50  text-[18px] font-normal">
                #00075412
              </p>

              <div className="flex items-center mt-5 gap-4">
                <MdOutlineTravelExplore className="text-black/50  text-[20px] md:text-[25px]" />
                <h1 className="text-black  text-[11px] md:text-[15px] font-semibold">
                  37, Samanpura, Olugantota,
                  <br /> Balangoda
                </h1>
              </div>
              <div className="flex items-center mt-5 gap-4">
                <MdOutlineTravelExplore className="text-black/50  text-[20px] md:text-[25px]" />
                <h1 className="text-black  text-[11px] md:text-[15px] font-semibold">
                  37, Samanpura, Olugantota,
                  <br /> Balangoda
                </h1>
              </div>
            </div>
            <div className="mt-8">
              <h1 className="text-black text-[24px] font-semibold">
                Item Setup
              </h1>
              <p className="text-black/50  text-[18px] font-normal">
                #00075412
              </p>

              <div className="flex flex-col gap-3 mt-5">
                <div className="flex flex-col gap-1 border border-black/30 rounded-lg p-2">
                  <p className="text-[15px] font-normal ">
                    The "Pay Now" screen allows users to securely complete their
                     The "Pay Now" screen allows users to securely
                    complete their payment.
                  </p>
                  <p className="text-[15px] font-bold text-end">75.50$</p>
                </div>

                <div className="flex flex-col gap-1 border border-black/30 rounded-lg p-2">
                  <p className="text-[15px] font-normal ">
                    The "Pay Now" screen allows users to securely complete their
                    payment.
                  </p>
                  <p className="text-[15px] font-bold text-end">75.50$</p>
                </div>

                <div className="flex justify-end gap-1 pb-2">
                  <div className="flex flex-col gap-1 border-b border-black/30">
                    <p className="text-[15px] font-normal text-end">
                      TOTAL: 75.50$
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
                    Last Payment : 75.00 $ on 11/14/2025 11.02:04 AM
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
                <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Payment Gateway</h1>
                  <p>Stripe</p>
                </div>
                <hr className="border-black/30" />
                <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Balance Payment(2024.12.03)</h1>
                  <p>75.00$</p>
                </div>
                <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Service Charge(2024.12.03)</h1>
                  <p>18.00$</p>
                </div>
                <div className="flex text-black text-[13px] font-semibold justify-between items-center">
                  <h1>Tax</h1>
                  <p>15.00$</p>
                </div>
                <div className="flex text-black text-[19px] font-semibold justify-between items-center border-t border-black/30 pt-2">
                  <h1>TOTAL</h1>
                  <p>108.00$</p>
                </div>
                <div className="flex justify-end mt-3">
                  <button className="bg-black text-white px-15 py-2 rounded-md">
                    <p className="text-[16px]">Pay Now</p>
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
