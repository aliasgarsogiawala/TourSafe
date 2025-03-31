import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaMapMarkedAlt, FaCompass } from 'react-icons/fa';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // Automatically hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  // Animation variants for icons
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2 + 0.5, duration: 0.5 }
    })
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-400 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{ 
              duration: 3, 
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="text-center z-10 px-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 100 }}
        >
          <h1 className="text-7xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">
            TOUR<span className="text-yellow-300">SAFE</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="h-1.5 bg-white bg-opacity-70 rounded-full max-w-md mx-auto"
        />
        
        <motion.p 
          className="text-white text-xl mt-4 font-light drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Your safety companion while traveling
        </motion.p>

        {/* Icon row */}
        <div className="flex justify-center space-x-8 mt-8">
          <motion.div
            custom={1}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            className="text-white text-3xl"
          >
            <FaShieldAlt className="mx-auto mb-2" />
            <p className="text-xs font-light">Protection</p>
          </motion.div>
          
          <motion.div
            custom={2}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            className="text-white text-3xl"
          >
            <FaMapMarkedAlt className="mx-auto mb-2" />
            <p className="text-xs font-light">Navigation</p>
          </motion.div>
          
          <motion.div
            custom={3}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            className="text-white text-3xl"
          >
            <FaCompass className="mx-auto mb-2" />
            <p className="text-xs font-light">Guidance</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;