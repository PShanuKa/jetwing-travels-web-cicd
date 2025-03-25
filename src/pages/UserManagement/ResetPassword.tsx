import Input from "@/components/common/Input";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PiWarningCircle } from "react-icons/pi";

const ResetPassword = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {/* <DialogTitle>Reset Password</DialogTitle> */}
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}

            <div className="flex flex-col gap-4 ">
              <h1 className="text-[22px] font-medium text-[var(--primary)]">
                Reset Password
              </h1>
              <div className="w-full my-3 flex items-center gap-2">
                <PiWarningCircle color="#F59E0B" size={30} />
                <p className="text-[14px] md:text-[20px] text-[#101928]/40 font-normal">
                  Reset your password to regain access.
                </p>
              </div>
              <p className="text-[16px] text-[#101928] font-medium text-start">
                Create a new password. Ensure it differs from previous ones for
                security
              </p>

              <div className="flex flex-col gap-2 mt-3">
                <Input
                  label="New Password"
                  placeholder="Enter new password"
                  name="password"
                />
                <Input
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  name="confirmPassword"
                />
              </div>

              <div className="flex flex-col gap-2 mt-5">
                <button className="bg-[#04334D] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md font-normal flex items-center gap-2 h-[36px] transition-all duration-150 outline-none justify-center text-[14px]">
                  Update Password
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResetPassword;
