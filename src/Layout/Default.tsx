import CompanySelector from "./Company";
import LeftSidebar from "./LeftSidebar";
import Navbar from "./Navbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className=" h-screen ">
        <LeftSidebar />
        {/* <div className="md:w-[272px]"></div> */}
      </div>

      <div className="flex flex-col w-full  ">
        <div className="md:pl-[272px]">
          <Navbar />
        </div>
        <CompanySelector />
      
        <div className="flex-1 md:p-5 p-1 bg-white md:bg-[#F9FAFB] w-full md:pl-[290px] ">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
