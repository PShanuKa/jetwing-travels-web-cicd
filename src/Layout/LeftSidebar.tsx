import logo from "@/assets/logo.png";
import { MenuItems } from "@/constants/menu";
import { LuSettings } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { setIsSidebarOpen } from "@/features/metaSlice";
import { Link } from "react-router-dom";
import { logout } from "@/features/authSlice";
import { useLocation } from "react-router-dom";



const LeftSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
const currentPath = location.pathname;
  const isSidebarOpen = useSelector((state: RootState) => state.meta.isSidebarOpen);
  const user = useSelector((state: RootState) => state.auth.userInfo);
  return (
    <div className={`md:w-[272px] fixed top-0 z-20 left-0 bottom-0 overflow-hidden right-0 w-0 h-full bg-[var(--primary)] pt-1 flex flex-col transition-all duration-150 ${isSidebarOpen ? "w-[80%]" : "w-0"}`}>
      <div className="w-full h-[70px] flex items-center justify-between md:justify-center px-4 ">
        <img
          src={logo}
          alt="logo"
          className="w-[106px] h-[33px] object-cover"
        />
        <button className="md:hidden" onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}>
          <AiOutlineCloseCircle size={28} color="#98A2B3" />
        </button>
      </div>

      <div className="w-full  px-4 mt-5 flex-1 flex  flex-col gap-2 ">
        <div className="w-full flex-1  flex-col  gap-2">
        {MenuItems.map((item) => {
            const isActive = currentPath === item.path; 
            return (
              <Link to={item.path} key={item.name}>
                <div
                  className={`w-full h-[47px] rounded-[10px] flex items-center gap-3 px-4 transition-all duration-150 ${
                    isActive ? "bg-[#2a303a]" : "hover:bg-[#293446]"
                  }`} 
                >
                  <div className="w-[24px] h-[24px] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <p className="text-[14px] text-[#98A2B3] font-normal">{item.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="w-full ">
          <Link to="/admin/settings" className="w-full h-[47px]  hover:bg-[#293446] rounded-[10px] flex items-center gap-3 px-4 transition-all duration-150">
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <LuSettings color="#98A2B3" size={20} />
            </div>
            <p className="text-[14px] text-[#98A2B3] font-normal">Settings</p>
          </Link>

          <div className="w-full h-[70px]  rounded-[10px] flex items-center gap-3 px-4 my-5">
            {/* <div>
                <img src="https://res.cloudinary.com/dldtrjalo/image/upload/v1732767281/oav7dzuhqxvouhciglcd.jpg" alt="" className="w-[50px] h-[40px] rounded-full object-cover" />
            </div> */}
            <div className="flex justify-between w-full items-center">

            <div  >
                <p className="text-[14px] text-[#fff] font-normal">{user?.name}</p>
                <p className="text-[12px] text-[#98A2B3] font-normal">Admin</p>
            </div>
            <button onClick={() => dispatch(logout())} className="w-[40px] h-[40px] rounded-full cursor-pointer flex items-center justify-center hover:bg-[#293446] transition-all duration-150">
                <FiLogOut color="#98A2B3" size={20} />
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
