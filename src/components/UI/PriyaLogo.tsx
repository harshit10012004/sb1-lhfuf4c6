import { motion } from 'framer-motion';

interface PriyaLogoProps {
  size?: number;
}

const PriyaLogo = ({ size = 120 }: PriyaLogoProps) => {
  return (
    <motion.div 
      className="relative"
      style={{ width: size, height: size }}
      animate={{ rotate: [0, 5, 0, -5, 0] }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1
      }}
    >
      <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center shadow-lg">
        <motion.div 
          className="flex flex-col items-center justify-center"
          initial="hidden"
          animate="visible"
        >
          {/* Bunny ears */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 flex space-x-2">
            <div className="w-4 h-12 bg-white rounded-full transform -rotate-6"></div>
            <div className="w-4 h-12 bg-white rounded-full transform rotate-6"></div>
          </div>
          
          {/* Face */}
          <motion.div
            className="flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Eyes */}
            <div className="flex space-x-6 mb-1">
              <motion.div 
                className="w-3 h-5 bg-gray-800 rounded-full"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
              ></motion.div>
              <motion.div 
                className="w-3 h-5 bg-gray-800 rounded-full"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
              ></motion.div>
            </div>
          </motion.div>
          
          {/* Smile */}
          <motion.div 
            className="w-10 h-3 border-b-4 border-gray-800 rounded-full"
            animate={{ 
              width: [40, 45, 40], 
              height: [12, 14, 12] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          ></motion.div>
          
          {/* Cheeks */}
          <div className="flex justify-between w-20 absolute top-1/2 mt-2">
            <motion.div 
              className="w-6 h-4 bg-secondary-300 rounded-full opacity-70"
              animate={{ opacity: [0.7, 0.9, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            <motion.div 
              className="w-6 h-4 bg-secondary-300 rounded-full opacity-70"
              animate={{ opacity: [0.7, 0.9, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PriyaLogo;