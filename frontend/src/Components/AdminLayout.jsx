import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import AdminSideBar from "./AdminSideBar";

function AccountLayout() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  //Trigger loader on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      <AdminSideBar/>
      <div className="w-full p-3 md:ml-62 md:p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AccountLayout;
