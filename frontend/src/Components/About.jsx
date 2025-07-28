import { UserCircle } from 'lucide-react';
import imgone from "../assets/about-1.jpeg";
import imgtwo from "../assets/about-2.jpg";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center justify-between p-4 flex-wrap gap-4">
      <img
        className="object-cover rounded-r-full w-[500px] sm:h-[400px] h-[250px]"
        src={imgone}
        alt=""
      />

      <div className="flex flex-col items-center text-center max-w-md px-4">
        <motion.div
          className="flex items-center gap-4 text-red-500 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <UserCircle className="w-6 h-6 text-red-500" />
          <p className="text-xl font-semibold text-gray-800">About Us</p>
          <UserCircle className="w-6 h-6 text-red-500" />
        </motion.div>

        <motion.h2
          className="text-2xl font-extrabold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Big Bites. Desi Cravings. One Spot — Craverz
        </motion.h2>

        <motion.p
          className="text-gray-600 leading-relaxed mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Made fresh, served hot, and always packed with flavor — <br />
          that’s the CraverZ promise.
        </motion.p>

        <motion.button
          className="mt-2 px-5 py-2 bg-red-500 rounded text-white font-semibold hover:bg-yellow-400 hover:text-black transition duration-300 w-[200px]"
          onClick={() => {
            navigate('/shop');
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Order Now
        </motion.button>
      </div>

      <img
        className="object-cover rounded-l-full w-[500px] sm:h-[400px] h-[250px]"
        src={imgtwo}
        alt=""
      />
    </div>
  );
}

export default About;
