import { ChefHat } from "lucide-react";
import Chefs from "../assets/Chefs";
import {motion} from 'framer-motion'

function Chef(){
    return(
        <div className="flex flex-col items-center p-4 mx-auto bg-gray-300">
            <div className="flex items-center gap-4 text-red-500 mb-4">
                <ChefHat className="w-6 h-6"/>
                <p className="text-xl font-semibold text-gray-800">Our Chef</p>
                <ChefHat className="w-6 h-6"/>
            </div>
            <motion.h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            >Meet Our Expert Chef's</motion.h2>
            <div className="flex flex-wrap justify-center gap-6 w-full px-2">
        {Chefs.map((chef, index) => (
          <motion.div
            key={chef.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
            duration: 0.6,
            delay: 0.5 + index * 0.5,
            ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white shadow-md rounded-xl p-4 w-60 flex flex-col items-center text-center"
          >
            <img
              src={chef.image}
              alt={chef.name}
              className="w-60 h-50 object-cover border-4 border-red-100 shadow-sm rounded-tl-4xl rounded-tr-4xl rounded-br-4xl"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">{chef.name}</h3>
            <p className="text-red-500 font-bold text-base mt-2">{chef.position}</p>
          </motion.div>
        ))}
      </div>
      <button className="mt-8 px-6 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition">
        EXPLORE THIER DISHES
      </button>
        </div>
    )
}
export default Chef