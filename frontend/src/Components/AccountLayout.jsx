import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function AccountLayout() {
  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      <SideBar />
      <div className="w-full p-4 md:ml-64 md:p-6 mt-2">
        <Outlet />
      </div>
    </div>
  );
}

export default AccountLayout;
