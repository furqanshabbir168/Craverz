import { Utensils } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

function BestSellingFoodSection() {
  const navigate = useNavigate();
  const { food } = useContext(ShopContext);

  const BestSellingFood = food.filter((dish) => dish.isBestSeller);

  return (
    <div className="flex flex-col items-center p-4 sm:px-10 mx-auto bg-gray-200">
      {/* Header */}
      <div className="flex items-center gap-4 text-red-500 mb-4">
        <Utensils className="w-6 h-6" />
        <p className="text-xl font-semibold text-gray-800">Best Food</p>
        <Utensils className="w-6 h-6" />
      </div>

      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        Best Selling Dishes
      </motion.h2>

      {/* Cards – Responsive and Centered */}
      {BestSellingFood.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-6 w-full px-2 sm:px-10">
          {BestSellingFood.map((dish, index) => (
            <motion.div
              key={dish._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + index * 0.3,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white shadow-md rounded-xl p-4 w-full sm:w-60 max-w-[270px] flex flex-col items-center text-center"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-red-100 shadow-sm"
              />
              <h3 className="mt-4 text-sm sm:text-lg font-semibold text-gray-800">
                {dish.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                {dish.description}
              </p>
              <p className="text-red-500 font-bold text-sm sm:text-base mt-2">
                ${dish.price}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No best selling food found.</p>
      )}

      {/* View All Button */}
      <button
        onClick={() => {
          navigate("/shop");
        }}
        className="mt-8 px-6 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition cursor-pointer"
      >
        VIEW ALL ITEMS
      </button>
    </div>
  );
}

export default BestSellingFoodSection;
