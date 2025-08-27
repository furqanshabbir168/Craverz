import bg from "../assets/bg-banner-3.webp";
import friedimg from "../assets/fried-c.png";
import pizzaimg from "../assets/pizza.png";
import burgeraimg from "../assets/burger.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BurgerBanner() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 py-6">
      {/* Banner 1 */}
      <motion.div
        className="flex-1 h-40 sm:h-52 md:h-64 lg:h-72 bg-cover bg-center rounded-lg relative overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between h-full p-4">
          <div className="text-white flex flex-col gap-2">
            <h5 className="text-red-500 text-[20px] font-bold">On this week</h5>
            <h2 className="text-white text-2xl sm:text-3xl font-bold">
              CRUNCHY FRIED CHICKEN
            </h2>
            <h5 className="text-sm text-gray-200">Limited Time Offer</h5>
            <button
              onClick={() => navigate("/shop")}
              className="mt-2 px-5 py-2 bg-red-500 rounded text-white font-semibold hover:bg-white hover:text-red-500 transition duration-300 w-[200px]"
            >
              Order Now
            </button>
          </div>
          {/* Image hidden on mobile */}
          <img
            src={friedimg}
            alt="fried chicken"
            className="hidden sm:block w-[110px] h-[140px] md:w-[100px] md:h-[150px] object-contain"
          />
        </div>
      </motion.div>

      {/* Banner 2 */}
      <motion.div
        className="flex-1 h-40 sm:h-52 md:h-64 lg:h-72 bg-cover bg-center rounded-lg relative overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between h-full p-4">
          <div className="text-white flex flex-col gap-2">
            <h5 className="text-red-500 text-[20px] font-bold">Welcome Cravez</h5>
            <h2 className="text-white text-2xl sm:text-3xl font-bold">
              TODAY SPECIAL FOOD
            </h2>
            <h5 className="text-sm text-gray-200">Limited Time Offer</h5>
            <button
              onClick={() => navigate("/shop")}
              className="mt-2 px-5 py-2 bg-yellow-300 rounded text-black font-semibold hover:bg-white hover:text-black transition duration-300 w-[200px]"
            >
              Order Now
            </button>
          </div>
          {/* Image hidden on mobile */}
          <img
            src={pizzaimg}
            alt="pizza"
            className="hidden sm:block w-[110px] h-[140px] md:w-[150px] md:h-[150px] object-contain"
          />
        </div>
      </motion.div>

      {/* Banner 3 */}
      <motion.div
        className="flex-1 h-40 sm:h-52 md:h-64 lg:h-72 bg-cover bg-center rounded-lg relative overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between h-full p-4">
          <div className="text-white flex flex-col gap-2">
            <h5 className="text-red-500 text-[20px] font-bold">On this week</h5>
            <h2 className="text-white text-2xl sm:text-3xl font-bold">
              SPICY GRILLED BURGER
            </h2>
            <h5 className="text-sm text-gray-200">Limited Time Offer</h5>
            <button
              onClick={() => navigate("/shop")}
              className="mt-2 px-5 py-2 bg-green-600 rounded text-white font-semibold hover:bg-white hover:text-green-600 transition duration-300 w-[200px]"
            >
              Order Now
            </button>
          </div>
          {/* Image hidden on mobile */}
          <img
            src={burgeraimg}
            alt="burger"
            className="hidden sm:block w-[110px] h-[140px] md:w-[150px] md:h-[150px] object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default BurgerBanner;
