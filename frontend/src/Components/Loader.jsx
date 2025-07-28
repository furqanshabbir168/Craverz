import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

function Loader() {
  const panelVariants = {
    hidden: { y: "100%" },
    visible: (i) => ({
      y: "0%",
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center overflow-hidden">
      
      {/* BACKGROUND PANELS */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-1/4 h-full bg-gradient-to-b from-red-600 via-red-500 to-red-400 opacity-20"
          style={{ left: `${i * 25}%` }}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={panelVariants}
        />
      ))}

      {/* CENTERED CONTENT */}
      <div className="z-20 text-center">
        <Loader2 className="w-12 h-12 text-red-400 animate-spin mx-auto mb-4" />
        <motion.h1
          className="text-5xl font-extrabold text-white tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Cravez
        </motion.h1>
        <p className="text-sm text-gray-300 mt-2">Delighting Your Taste Buds...</p>
      </div>
    </div>
  );
}

export default Loader;
