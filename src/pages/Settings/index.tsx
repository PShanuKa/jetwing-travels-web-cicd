

const Settings = () => {
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
                <p className="text-[14px] text-[var(--primary)] font-medium">Master / Visa</p>
              </div>
              <div>
                <input
                  type="text"
                  value="03%"
                  placeholder="Enter Card Number"
                  className="w-full border border-[var(--borderGray)] rounded-lg p-2 outline-none"
                />
              </div>
            </div>
            
            <div>
                <button className="bg-[var(--primary)] text-white px-10 py-2 rounded-lg">
                    Edit
                </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[14px] text-[var(--primary)] font-medium">Amex</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Card Number"
                  value="03%"
                  className="w-full border border-[var(--borderGray)] rounded-lg p-2 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
