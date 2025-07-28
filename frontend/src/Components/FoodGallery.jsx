import Gallery from "../assets/Gallery";
import { GalleryVertical } from 'lucide-react';
import { Eye } from 'lucide-react'; // you can change icon if needed
import { useNavigate } from "react-router-dom";

function FoodGallery() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center p-4 mx-auto max-w-[1300px]">
      <div className="flex items-center gap-4 text-red-500 mb-4">
        <GalleryVertical className="w-6 h-6" />
        <p className="text-xl font-semibold text-gray-800">Cravez Gallery</p>
        <GalleryVertical className="w-6 h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">Our Food Gallery</h2>

      <div className="grid grid-cols-6 gap-4 auto-rows-[280px]">
        {Gallery.map((item, index) => (
          <div
            onClick={()=>{navigate('/shop')}}
            key={index}
            className={`relative overflow-hidden rounded-lg group ${
              index % 5 === 0 ? "col-span-3" : "col-span-2"
            }`}
          >
            <img
              src={item.img}
              alt={`Food ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                <Eye className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">
                  {item.name || `Dish ${index + 1}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodGallery;
