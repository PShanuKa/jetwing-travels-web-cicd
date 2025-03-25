import Input from "@/components/common/Input";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PayLinkDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="w-full md:w-[1500px]">
          <DialogHeader>
            {/* <DialogTitle>Reset Password</DialogTitle> */}
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}

            <div className="flex flex-col gap-4 ">
              <h1 className="text-[22px] font-medium text-[var(--primary)]">
                Send Payment Link
              </h1>

              <p className="text-[16px] text-[#101928] font-normal text-start">
                Choose how you want to send the payment link. You can use the
                existing customer email or enter a new email address.
              </p>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id="html"
                    className="w-5 h-5"
                    name="fav_language"
                    value="false"
                  />
                  <label htmlFor="html">Send to existing Email</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id="css"
                    className="w-5 h-5"
                    name="fav_language"
                    value="true"
                  />
                  <label htmlFor="css">Send to new email</label>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-1">
                <Input
                  //   label="Confirm Password"
                  placeholder="customer@example.com"
                  name="confirmPassword"
                />
              </div>

              <div className="flex flex-col gap-2 mt-5">
                <button className="bg-[#04334D] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md font-normal flex items-center gap-2 h-[36px] transition-all duration-150 outline-none justify-center text-[14px]">
                  Send Payment Link
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PayLinkDialog;
