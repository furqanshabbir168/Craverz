import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  ListOrdered,
  ShoppingCart,
  BookOpen,
  HelpCircle,
  LogOut,
  Home,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SideBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Dashboard", path: "/myaccount/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "My Profile", path: "/myaccount/profile", icon: <User size={20} /> },
    { name: "My Orders", path: "/account/orders", icon: <ListOrdered size={20} /> },
    { name: "My Cart", path: "/myaccount/cart", icon: <ShoppingCart size={20} /> },
    { name: "Reservation", path: "/account/reservation", icon: <BookOpen size={20} /> },
    { name: "Help & Support", path: "/account/help", icon: <HelpCircle size={20} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 fixed left-0 top-0 flex-col z-50">
        <div className="text-2xl font-bold text-center py-6 border-b border-gray-700 text-white">
          Cravez
        </div>
        <nav className="flex flex-col mt-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-red-400 transition m-1.5 rounded-4xl text-white ${
                location.pathname === link.path ? "bg-red-500" : "text-gray-100"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              localStorage.removeItem("cravez_token");
              window.location.href = "/account";
            }}
            className="flex items-center gap-3 px-7 py-3 text-sm font-medium text-gray-100 hover:bg-red-400 transition w-full text-left cursor-pointer"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </div>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-[100]">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition cursor-pointer"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-[99]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Slide-in */}
            <motion.div
              className="w-64 h-full bg-[#1a1a1a] text-white fixed left-0 top-0 flex flex-col z-[100]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-between items-center px-6 py-6 border-b border-gray-700">
                <h2 className="text-xl font-bold">Cravez</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-700 transition cursor-pointer">
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col mt-4">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-red-400 transition m-1.5 rounded-lg text-white ${
                      location.pathname === link.path ? "bg-red-500" : "text-gray-100"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}

                <button
                  onClick={() => {
                    localStorage.removeItem("cravez_token");
                    window.location.href = "/account";
                  }}
                  className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-100 hover:bg-red-400 transition w-full text-left cursor-pointer"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default SideBar;
