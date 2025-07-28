import { GalleryVertical } from 'lucide-react';
import Gallery from '../assets/Gallery';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function GallerySection() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center p-4 mx-auto'>
      <div className="flex items-center gap-4 text-red-500 mb-4">
        <GalleryVertical className="w-6 h-6" />
        <p className="text-xl font-semibold text-gray-800">Cravez Gallery</p>
        <GalleryVertical className="w-6 h-6" />
      </div>
      <motion.h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center'
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >Our Food Gallery</motion.h2>
      
      <div className="flex flex-wrap justify-center gap-6 w-full px-2">
        {Gallery.filter((item=> item.atHomePage===true)).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5 + index * 0.5,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative group bg-white shadow-md flex flex-col items-center text-center overflow-hidden rounded-md"
          >
            <img
              src={item.img}
              alt="Gallery Photo"
              className="w-[300px] h-[300px] object-cover border-red-100 shadow-sm transition-transform duration-500 group-hover:scale-110"
            />

            {/* Black overlay from bottom */}
            <div className="absolute inset-0 bg-black/50 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out" />
          </motion.div>
        ))}
      </div>

      <button onClick={()=>{navigate('/gallery')}} className="mt-8 px-6 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition cursor-pointer">
        EXPLORE MORE
      </button>
    </div>
  );
}

export default GallerySection;
