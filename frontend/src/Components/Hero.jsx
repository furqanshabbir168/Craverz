import { useState, useEffect } from "react";
import heroimage from "../assets/hero.jpg";
import { ArrowRight } from "lucide-react";
import pizzaimg from "../assets/pizza.png";
import burgeraimg from "../assets/burger.png";
import friedimg from "../assets/fried-c.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);
  const navigate = useNavigate();

  const headings = [
    { id: 1, text: "Grilled to Perfection, Stacked High", image: burgeraimg },
    { id: 2, text: "Melting Cheese, Fresh Cravez Pizza", image: pizzaimg },
    { id: 3, text: "Crispy Crunchy, Cravez Chicken", image: friedimg },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % headings.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = headings[heroIndex];

  return (
    <div
      className="relative h-[600px] sm:h-[650px] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${heroimage})` }}
    >
      <div className="absolute inset-0 bg-opacity-50" />

      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-24 py-10 h-full gap-8 sm:gap-14">
        {/* Left Text Side */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start gap-3 max-w-[650px]">
          <motion.h2
            key={"h2-" + current.id}
            className="text-orange-400 text-xl sm:text-2xl font-medium"
            initial={{ x: 750, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          >
            Welcome to Cravez
          </motion.h2>

          <motion.h1
            key={"h1-" + current.id}
            className="text-white text-3xl sm:text-5xl font-bold leading-tight"
            initial={{ x: 750, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
          >
            {current.text}
          </motion.h1>

          <motion.button
            onClick={() => navigate('/shop')}
            initial={{ x: 750, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 3 }}
            className="relative mt-4 inline-flex items-center gap-2 bg-red-500 text-white font-semibold px-6 py-3 rounded-full transition-all overflow-hidden group hover:bg-white cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-red-500">
              Order Now <ArrowRight size={20} />
            </span>
            <span className="absolute left-1/2 top-0 w-0 h-full bg-white transition-all duration-500 ease-in-out group-hover:w-full group-hover:left-0 -z-10 rounded-full"></span>
          </motion.button>
        </div>

        {/* Right Image Side */}
        <motion.div
          className="w-[220px] sm:w-[300px] lg:w-[400px] h-[220px] sm:h-[300px] lg:h-[400px] flex items-center justify-center rounded-full overflow-hidden"
          key={"img-" + current.id}
          initial={{ x: -800, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 2 }}
        >
          <img
            src={current.image}
            alt="Hero Food"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
