import Input from "@/components/common/Input";
import { setPageHeader } from "@/features/metaSlice";
import {
  useGetSettingQuery,
  useUpdateSettingMutation,
} from "@/services/settingSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Settings = () => {
  const dispatch = useDispatch();
  dispatch(setPageHeader("Settings"));
  const [formData, setFormData] = useState({
    jetwingTravelRate: 0,
    jetwingEcoRate: 0,
    jetwingAdventureRate: 0,
  });

  const { data } = useGetSettingQuery(undefined);

  const [updateSetting, { isLoading }] = useUpdateSettingMutation();

  const handleUpdateSetting = async () => {
    await updateSetting({
      jetwingTravelRate: Number(formData.jetwingTravelRate),
      jetwingEcoRate: Number(formData.jetwingEcoRate),
      jetwingAdventureRate: Number(formData.jetwingAdventureRate),
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
        jetwingTravelRate: Number(data?.data?.jetwingTravelRate) || 0,
        jetwingEcoRate: Number(data?.data?.jetwingEcoRate) || 0,
        jetwingAdventureRate: Number(data?.data?.jetwingAdventureRate) || 0,
      });
    }
  }, [data]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
      <div className="mt-5  rounded-lg  border border-[var(--borderGray)]/50 p-10 bg-[#fff]">
        <div className="flex justify-between items-center">
          <h1 className="text-[24px] font-medium text-[var(--primary)] mb-5">
            Company Payment Rates
          </h1>
        </div>

        <div className="mt-5">
          <div className="grid grid-cols-1 gap-5 ">
            {/* <div>
              <button
                className="bg-[var(--primary)] text-white px-10 py-2 rounded-lg cursor-pointer active:scale-95 transition-all duration-150 hover:bg-[var(--primary)]/80"
                onClick={handleUpdateSetting}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div> */}

            <Input
              label="Jetwing Travel %"
              placeholder="0.00"
              name="jetwingTravelRate"
              type="number"
              value={formData.jetwingTravelRate}
              // errors={formErrors.masterVisa || ""}
              onChangeHandler={handleChange}
             
            />

            <Input
              label="Jetwing Eco %"
              placeholder="0.00"
              name="jetwingEcoRate"
              type="number"
              value={formData.jetwingEcoRate}
              // errors={formErrors.masterVisa || ""}
              onChangeHandler={handleChange}
            
            />
             <Input
              label="Jetwing Adventure %"
              placeholder="0.00"
              name="jetwingAdventureRate"
              type="number"
              value={formData.jetwingAdventureRate}
              // errors={formErrors.masterVisa || ""}
              onChangeHandler={handleChange}
           
            />
            <div className="flex justify-end">
              <button
                className="bg-[var(--primary)] text-white px-10 py-2 rounded-lg cursor-pointer active:scale-95 transition-all duration-150 hover:bg-[var(--primary)]/80"
                onClick={handleUpdateSetting}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
