import logo from '../assets/cravez-logo.png';
import { ShoppingCart, Menu } from 'lucide-react';

function NavBar() {
  return (
    <nav className="flex justify-around items-center p-8 shadow-md bg-white">
      {/* Logo Section */}
      <div className="flex flex-row items-center gap-3 text-center">
        <img src={logo} alt="Cravez Logo" className="w-10 h-10 object-contain" />
        <h1 className="text-4xl text-red-500 font-bold">Cravez</h1>
      </div>

      {/* Menu Links */}
      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <li className="hover:text-red-500 cursor-pointer transition">Home</li>
        <li className="hover:text-red-500 cursor-pointer transition">About Us</li>
        <li className="hover:text-red-500 cursor-pointer transition">Shop</li>
        <li className="hover:text-red-500 cursor-pointer transition">Pages</li>
        <li className="hover:text-red-500 cursor-pointer transition">Contact Us</li>
        <li className="hover:text-red-500 cursor-pointer transition">Blog</li>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-red-500 cursor-pointer transition" />
        <Menu className="w-6 h-6 text-gray-700 hover:text-red-500 cursor-pointer transition" />
      </div>
    </nav>
  );
}

export default NavBar;
