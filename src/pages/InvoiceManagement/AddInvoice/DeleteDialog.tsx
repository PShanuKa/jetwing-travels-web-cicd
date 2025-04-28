// import Input from "@/components/common/Input";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PiWarningCircle } from "react-icons/pi";

const DeleteDialog = ({ children }: { children: React.ReactNode }) => {
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
                    Delete Confirmation
              </h1>
              <div className="w-full my-3 flex items-center gap-2">
                <PiWarningCircle color="#F59E0B" size={30} />
                <p className="text-[14px] md:text-[20px] text-[#101928]/40 font-normal">
                  Do you want to delete this invoice?
                </p>
              </div>
        
             

              <div className="flex justify-center mt-5">
                <div className="flex gap-3">
                  <button className="border-[var(--primary)]/20 border hover:opacity-80 focus:opacity-90 active:scale-95 text-[var(--primary)]/60 px-10 py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36x] h-[36px] transition-all duration-150 outline-none">
                    No
                  </button>

                  <button className="bg-red-400 hover:opacity-80 focus:opacity-90 active:scale-95 text-white  py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[36px] h-[36px] transition-all duration-150 outline-none px-10">
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
