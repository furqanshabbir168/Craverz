import { useLocation } from 'react-router-dom';
import bg from '../assets/pages-banner.jpg';

function TopBanner() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const pageNames = {
    about: "About Us",
    shop: "Shop",
    menu: "Menu",
    gallery: "Gallery",
    services: "Services",
    testimonials: "Testimonials",
    reservations: "Reservations",
    faqs: "FAQ'S",
    account: "My Account",
    contact: "Contact Us",
    blog: "Blog",
  };

  const currentPage = pageNames[path] || "Page";

  return (
    <div
      className="w-full h-[400px] sm:h-[500px] flex flex-col justify-center items-center bg-cover bg-center text-white text-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="text-4xl sm:text-6xl font-extrabold">{currentPage}</h1>
      <p className="text-lg sm:text-2xl mt-2">
        Home / <span className="text-red-500 font-bold">{currentPage}</span>
      </p>
    </div>
  );
}

export default TopBanner;
