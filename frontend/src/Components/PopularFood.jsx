import { Utensils } from "lucide-react";
import { motion } from "framer-motion";
import PopularFoods from "../assets/PopularFoods";

function PopularFood() {
  return (
    <div className="flex flex-col items-center p-4 mx-auto bg-gray-300">
      {/* Header */}
      <div className="flex items-center gap-4 text-red-500 mb-4">
        <Utensils className="w-6 h-6" />
        <p className="text-xl font-semibold text-gray-800">Best Food</p>
        <Utensils className="w-6 h-6" />
      </div>

      <motion.h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        Popular Food
      </motion.h2>

      {/* Cards – All in One Row & Centered */}
      <div className="flex flex-wrap justify-center gap-6 w-full px-2">
        {PopularFoods.map((dish, index) => (
          <motion.div
            key={dish.id}
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
              src={dish.img}
              alt={dish.title}
              className="w-40 h-40 object-cover rounded-full border-4 border-red-100 shadow-sm"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">{dish.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{dish.description}</p>
            <p className="text-red-500 font-bold text-base mt-2">${dish.price}</p>
          </motion.div>
        ))}
      </div>
      {/* View All Button */}
      <button className="mt-8 px-6 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition">
        VIEW ALL ITEMS
      </button>
    </div>
  );
}

export default PopularFood;
