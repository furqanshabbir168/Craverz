import { Store, CalendarCheck, GalleryVertical, Info } from "lucide-react";
import img from "../assets/welcome.png";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();

  const navBoxes = [
    {
      title: "Visit Our Shop",
      desc: "Explore our fast food menu and order your cravings.",
      icon: <Store className="w-6 h-6 text-red-500" />,
      path: "/shop",
    },
    {
      title: "Reserve a Table",
      desc: "Book a table at your favorite Craverz location.",
      icon: <CalendarCheck className="w-6 h-6 text-red-500" />,
      path: "/reservation",
    },
    {
      title: "View Gallery",
      desc: "Take a peek at our sizzling dishes and vibe.",
      icon: <GalleryVertical className="w-6 h-6 text-red-500" />,
      path: "/gallery",
    },
    {
      title: "About Us",
      desc: "Learn more about our food journey and passion.",
      icon: <Info className="w-6 h-6 text-red-500" />,
      path: "/about",
    },
  ];

  return (
    <div className="bg-gray-200">
      <div className="bg-gray-50 min-h-[92vh] px-4 flex flex-col items-center">
      <div className="max-w-[1300px] w-full">
        {/* Top Greeting */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Hello, username!</h2>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Burger Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img src={img} alt="burger" className="max-w-full h-auto rounded-xl" />
          </div>

          {/* Right Boxes Section */}
          <div className="w-full lg:w-1/2">
            {/* Section Title */}
            <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Welcome to Craverz!
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {navBoxes.map((box, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(box.path)}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {box.icon}
                    <h3 className="text-lg font-semibold text-gray-800">{box.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{box.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-700 font-semibold text-base">
          Thanks for choosing <span className="text-red-500 font-bold">Craverz</span> ❤️
        </div>
      </div>
    </div>
    </div>
  );
}

export default DashBoard;
