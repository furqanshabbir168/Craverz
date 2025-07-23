import bg from "../assets/bg-banner-3.webp";
import banner from "../assets/pizza-banner-bg.png";
import {motion} from 'framer-motion'

function PizzaBanner() {
  return (
    <div
      className="relative w-full flex items-center justify-center px-4 py-10 sm:py-16"
      style={{ backgroundImage: `url(${bg})`, backgroundPosition:"center"}}
    >
        <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col-reverse sm:flex-row items-center justify-between max-w-6xl w-full gap-10">
        {/* Left Text */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left text-white max-w-md">
          <motion.h2 className="text-xl sm:text-2xl font-medium uppercase tracking-wide text-red-500
          00"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          >Welcome Craverz</motion.h2>
          <motion.h1 className="text-3xl sm:text-5xl font-bold mt-2 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          >Today's Special Food</motion.h1>
          <motion.p className="mt-2 text-sm sm:text-base text-gray-200"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          >LIMITED TIME OFFERS</motion.p>

          <motion.button className="mt-4 px-5 py-2 bg-red-500 rounded text-white font-semibold hover:bg-white hover:text-red-500 transition duration-300 w-[200px]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          >
            Order Now
          </motion.button>
        </div>

        {/* Right Image */}
        <div className="w-[250px] sm:w-[350px] md:w-[400px]">
          <img src={banner} alt="Pizza Banner" className="w-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default PizzaBanner;
