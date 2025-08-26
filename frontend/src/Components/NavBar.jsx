import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/cravez-logo.png";
import { ShoppingCart, Menu, X } from "lucide-react";
import { ShopContext } from "../Context/ShopContext";
import { User } from "lucide-react";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token, cart , adminToken} = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-2.5">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Cravez Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-4xl text-red-500 font-bold">CraveZ</h1>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
            <Link to="/">
              <li className="hover:text-red-500">Home</li>
            </Link>
            <Link to="/about">
              <li className="hover:text-red-500">About Us</li>
            </Link>
            <Link to="/shop">
              <li className="hover:text-red-500">Shop</li>
            </Link>

            <div className="relative group">
              <li className="hover:text-red-500 cursor-pointer">Pages</li>
              <div className="absolute left-0 top-full mt-1 hidden group-hover:flex flex-col bg-white shadow-lg rounded-md py-2 w-48 z-50 border">
                <Link to="/menu" className="px-4 py-2 hover:bg-red-100">
                  Food Menu
                </Link>
                <Link to="/gallery" className="px-4 py-2 hover:bg-red-100">
                  Gallery
                </Link>
                <Link to="/services" className="px-4 py-2 hover:bg-red-100">
                  Services
                </Link>
                <Link to="/testimonials" className="px-4 py-2 hover:bg-red-100">
                  Testimonial
                </Link>
                <Link to="/reservations" className="px-4 py-2 hover:bg-red-100">
                  Reservations
                </Link>
                <Link to="/faqs" className="px-4 py-2 hover:bg-red-100">
                  FAQ's
                </Link>
                <Link
                  to={token === "" ? "/account" : "/myaccount/dashboard"}
                  className="px-4 py-2 hover:bg-red-100"
                >
                  My Account
                </Link>
              </div>
            </div>

            <Link to="/contact">
              <li className="hover:text-red-500">Contact</li>
            </Link>
            <Link to="/blog">
              <li className="hover:text-red-500">Blog</li>
            </Link>
            <Link to={adminToken === "" ? "/admin" : "/myadmin/dashboard"}>
              <li className="hover:text-red-500">Admin</li>
            </Link>
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <div className="relative cursor-pointer">
              <ShoppingCart
                onClick={() => {
                  navigate("myaccount/cart");
                }}
                className="w-6 h-6 text-gray-700 hover:text-red-500 cursor-pointer hidden md:block"
              />

              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </div>

            {/* Login Button - Desktop */}
            {token === "" ? (
              <Link
                to="/account"
                className="hidden md:block bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition"
              >
                Login
              </Link>
            ) : (
              <Link to="/myaccount/dashboard">
                <div className="w-10 h-10 rounded-full bg-red-100 border border-red-300 flex items-center justify-center transition-all duration-200 hover:bg-red-500 group cursor-pointer">
                  <User className="w-6 h-6 text-red-600 group-hover:text-white" />
                </div>
              </Link>
            )}
            {/* Menu Icon - Mobile */}
            <Menu
              className="md:hidden w-7 h-7 text-gray-700 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>
        </div>
      </nav>

      {/* Padding so content doesn't go under nav */}
      <div className="h-[80px] md:h-[85px]" />

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col gap-6 px-6 py-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-500">Cravez</h2>
            <X
              className="w-6 h-6 text-gray-700 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>

          <nav className="flex flex-col gap-4 text-lg font-medium text-gray-800">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)}>
              Food Menu
            </Link>
            <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>
              Gallery
            </Link>
            <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>
              Services
            </Link>
            <Link to="/testimonials" onClick={() => setIsMobileMenuOpen(false)}>
              Testimonials
            </Link>
            <Link to="/reservations" onClick={() => setIsMobileMenuOpen(false)}>
              Reservations
            </Link>
            <Link to="/faqs" onClick={() => setIsMobileMenuOpen(false)}>
              FAQ's
            </Link>
            <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>
              My Account
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
            <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link to='/admin' onClick={() => setIsMobileMenuOpen(false)}>
              Admin
            </Link>
            <Link
              to="/login"
              className="bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition"
            >
              Login
            </Link>
          </nav>
          <div className="mt-auto">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
