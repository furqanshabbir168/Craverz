import { useEffect, useState } from 'react';
import bg from '../assets/bg-2.jpg';
import banner from '../assets/burger-3.webp';
import { BadgePercent } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function DisscountBanner() {
  const [timeLeft, setTimeLeft] = useState(10 * 60 * 60 + 35 * 60 + 10); // 10h 35m 10s in seconds
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const getTimeParts = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { h, m, s };
  };

  const { h, m, s } = getTimeParts(timeLeft);

  return (
    <div
      className="relative w-full flex flex-col lg:flex-row items-center justify-between px-8 bg-black/40 bg-cover bg-center pt-8 pb-12 sm:pb-8 lg:pb-0"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <img
        src={banner}
        alt="Burger"
        className="object-cover rounded-t-full w-[300px] sm:w-[400px] lg:w-[700px] xl:w-[700px] h-[300px] sm:h-[400px] lg:h-[600px]"
      />

      <div className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-md shadow-lg">
        <div className="flex items-center gap-4 text-red-500 mb-4">
          <BadgePercent className="w-6 h-6" />
          <p className="text-xl font-semibold text-gray-800">Special Offer</p>
          <BadgePercent className="w-6 h-6" />
        </div>

        <motion.h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Get 30% Discount Every Item
        </motion.h2>

        <motion.div className="flex flex-row gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col items-center px-5 py-4 border-2 border-yellow-500 bg-yellow-500 font-bold text-white rounded">
            <h2 className="text-2xl">{h}</h2>
            <h2 className="text-sm">Hours</h2>
          </div>
          <div className="flex flex-col items-center px-5 py-4 border-2 border-yellow-500 bg-yellow-500 font-bold text-white rounded">
            <h2 className="text-2xl">{m}</h2>
            <h2 className="text-sm">Minutes</h2>
          </div>
          <div className="flex flex-col items-center px-5 py-4 border-2 border-yellow-500 bg-yellow-500 font-bold text-white rounded">
            <h2 className="text-2xl">{s}</h2>
            <h2 className="text-sm">Seconds</h2>
          </div>
        </motion.div>

        <motion.button className="mt-2 px-5 py-2 bg-red-500 rounded text-white font-semibold hover:bg-yellow-500 hover:text-white transition duration-300 w-[200px]"
          onClick={() => { navigate('/shop') }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Order Now
        </motion.button>
      </div>
    </div>
  );
}

export default DisscountBanner;
