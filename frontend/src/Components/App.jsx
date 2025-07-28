import pic from '../assets/app-banner.png';
import bg from "../assets/bg-banner-3.webp";
import { Apple, Play } from 'lucide-react';
import { motion } from "framer-motion"

function App() {
  return (
    <div
      className="relative w-full flex items-center justify-center px-4 py-10 sm:py-16"
      style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundSize: "contain" }}
    >
      <div className="absolute inset-0 bg-black/40 rounded-lg"></div>

      <div className="relative z-10 flex flex-col-reverse sm:flex-row items-center justify-between max-w-6xl w-full gap-10">
        {/* Text & Buttons */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left text-white max-w-md">
          <motion.h2 className="text-xl sm:text-2xl font-medium uppercase tracking-wide text-red-500"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          >Welcome Cravez</motion.h2>
          <motion.h1 className="text-3xl sm:text-5xl font-bold mt-2 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          >
            Download food app Order today!
          </motion.h1>

          {/* Store Buttons */}
          <div className="flex gap-4 mt-6 flex-wrap justify-center sm:justify-start">
            {/* Apple Store Button */}
            <motion.div className="flex items-center gap-2 border border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            >
              <Apple className="w-5 h-5" />
              <div className="text-sm">
                <p className="leading-none">Get it on</p>
                <span className="font-semibold">Apple Store</span>
              </div>
            </motion.div>

            {/* Play Store Button */}
            <motion.div className="flex items-center gap-2 border border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            >
              <Play className="w-5 h-5" />
              <div className="text-sm">
                <p className="leading-none">Get it on</p>
                <span className="font-semibold">Play Store</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Image */}
        <div>
          <img src={pic} alt="App promo" className="w-[280px] sm:w-[380px]" />
        </div>
      </div>
    </div>
  );
}

export default App;
