import Input from "@/components/common/SearchInput";
import { SelectNative } from "@/components/ui/select-native";
import { FaPlus } from "react-icons/fa6";
import Table from "./Table";
import { IoSearchOutline } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllOrganizationsQuery } from "@/services/organizationSlice";
import { useDispatch } from "react-redux";
import { setPageHeader } from "@/features/metaSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  dispatch(setPageHeader("User Management"));
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const { data: companies } = useGetAllOrganizationsQuery(undefined);

  const [formData, setFormData] = useState({
    role: "",
    organizationId: "",
    searchString: "",
  });

  return (
    <div className="md:p-4 p-2 border-[var(--borderGray)] md:border rounded-lg   flex flex-col gap-4 bg-white">
      <div className="flex  items-center justify-between w-full">
        <div className=" items-center gap-2 hidden md:flex">
          <Input
            value={formData.searchString}
            name={"searchString"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, searchString: e.target.value })
            }
          />
          <div>
            <SelectNative
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-40"
            >
              <option value="">Role</option>
              <option value="admin">Admin</option>

              <option value="executive">Executive</option>
            </SelectNative>
          </div>

          <div>
            <SelectNative
              value={formData.organizationId}
              onChange={(e) =>
                setFormData({ ...formData, organizationId: e.target.value })
              }
              className="w-40"
            >
              <option value="">Company</option>
              {companies?.data?.content?.map((company: any) => (
                <option value={company.id}>{company.name}</option>
              ))}
            </SelectNative>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <div className="border-[var(--borderGray)] border rounded-md p-2">
            <IoSearchOutline size={20} />
          </div>
          <button
            onClick={() => setFilterIsOpen(!filterIsOpen)}
            className="border-[var(--borderGray)] border rounded-md p-2 cursor-pointer active:scale-95 transition-all duration-150 hover:bg-gray-100"
          >
            <GiSettingsKnobs className="-rotate-90" size={20} />
          </button>
        </div>

        <div>
          <Link
            to="add"
            className="bg-[var(--primary)] hover:opacity-80 focus:opacity-90 active:scale-95 text-white px-4 py-2 rounded-md text-[14px] font-normal flex items-center gap-2 md:h-[44px] h-[36px] transition-all duration-150 outline-none"
          >
            <FaPlus />
            Add New User
          </Link>
        </div>
      </div>
      <div
        className={`flex w-full flex-col gap-2 overflow-hidden ${
          filterIsOpen ? "" : "h-0 hidden"
        }`}
      >
        <div>
            <SelectNative value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full">
              <option value="">Role</option>
              <option value="admin">Admin</option>
          
              <option value="executive">Executive</option>
            </SelectNative>
          </div>
        
          <div>
            <SelectNative value={formData.organizationId} onChange={(e) => setFormData({ ...formData, organizationId: e.target.value })} className="w-full">
              <option value="">Company</option>
              {companies?.data?.content?.map((company: any) => (
                <option value={company.id}>{company.name}</option>
              ))}
            </SelectNative>
          </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="w-full">
          <Table
            role={formData.role}
            organizationId={formData.organizationId}
            searchString={formData.searchString}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
