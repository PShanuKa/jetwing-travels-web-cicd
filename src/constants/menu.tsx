import { GrHomeRounded } from "react-icons/gr";
import { RiBankLine } from "react-icons/ri";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi2";
import { TbReportSearch } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";



export const MenuItems = [
    {
        name: "Dashboard",
        path: "/admin/",
        targetName: "dashboard",
        icon: <GrHomeRounded  color="#98A2B3" />
    },
    {
        name: "Invoice Management",
        targetName: "invoice",
        path: "/admin/invoice",  
        icon: <RiMoneyDollarBoxLine color="#98A2B3" size={20} />
    },
    {
        name: "Payment Management",
        path: "/admin/payment",
        targetName: "payment",
        icon: <RiBankLine color="#98A2B3" size={20} />
    },
    {
        name: "Customer Management",
        path: "/admin/customer",
        targetName: "customer",
        icon: <HiOutlineUser color="#98A2B3" size={20} />
    },
    {
        name: "Report",
        path: "/admin/report",
        targetName: "report",
        icon: <TbReportSearch color="#98A2B3" size={20} />
    },
    {
        name: "User Management",
        path: "/admin/user",
        targetName: "user",
        icon: <FiUsers color="#98A2B3" size={20} />
    },
    
    
  
    
]

