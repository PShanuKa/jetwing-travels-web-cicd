import {
  useGetSettingQuery,
  useUpdateSettingMutation,
} from "@/services/settingSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [formData, setFormData] = useState({
    masterVisa: 0,
    amex: 0,
    hnd: 0,
  });

  const { data } = useGetSettingQuery(undefined);




  const [updateSetting, { isLoading }] = useUpdateSettingMutation();


  

  const handleUpdateSetting = async () => {
    await updateSetting({
      masterOrVisaRate: Number(formData.masterVisa),
      amexRate: Number(formData.amex),
      hndRate: Number(formData.hnd),
    })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((error) => {
        toast.error(error.data.message || "Something went wrong");
      });


      
  };

  useEffect(() => {
    if (data) {
      setFormData({
        masterVisa: Number(data?.data?.masterOrVisaRate) || 0,
        amex: Number(data?.data?.amexRate) || 0,
        hnd: Number(data?.data?.hndRate) || 0,
      });
    }
  }, [data]);

  
  return (
    <div className="grid grid-cols-2 gap-5 ">
      <div className="mt-5  rounded-lg  border border-[var(--borderGray)]/50 p-10 bg-[#fff]">
        <div className="flex justify-between items-center">
          <h1 className="text-[24px] font-medium text-[var(--primary)] mb-5">
            Payment Gateway Rates
          </h1>
        </div>

        <div className="mt-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[14px] text-[var(--primary)] font-medium">
                  Master / Visa
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={formData.masterVisa}
                  onChange={(e) =>
                    setFormData({ ...formData, masterVisa: e.target.value })
                  }
                  placeholder="Enter Card Number"
                  className="w-full border border-[var(--borderGray)] rounded-lg p-2 outline-none"
                />
                <p className="text-[14px] text-[var(--primary)] font-medium">
                  %
                </p>
              </div>
            </div>

            <div>
              <button
                className="bg-[var(--primary)] text-white px-10 py-2 rounded-lg cursor-pointer active:scale-95 transition-all duration-150 hover:bg-[var(--primary)]/80"
                onClick={handleUpdateSetting}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Edit"}
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[14px] text-[var(--primary)] font-medium">
                    Amex
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Enter Card Number"
                    value={formData.amex}
                    onChange={(e) =>
                      setFormData({ ...formData, amex: e.target.value })
                    }
                    className="w-full border border-[var(--borderGray)] rounded-lg p-2 outline-none"
                  />
                  <p className="text-[14px] text-[var(--primary)] font-medium">
                    %
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[14px] text-[var(--primary)] font-medium">
                    HND
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Enter Card Number"
                    value={formData.hnd}
                    onChange={(e) =>
                      setFormData({ ...formData, hnd: e.target.value })
                    }
                    className="w-full border border-[var(--borderGray)] rounded-lg p-2 outline-none"
                  />
                  <p className="text-[14px] text-[var(--primary)] font-medium">
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
