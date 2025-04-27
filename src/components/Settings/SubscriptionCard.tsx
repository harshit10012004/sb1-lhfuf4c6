import { motion } from 'framer-motion';

const SubscriptionCard = () => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={item}
      className="mt-6 rounded-xl overflow-hidden bg-secondary-300 text-white shadow-lg"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-6 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold mb-1">Priya Premium</h3>
          <p className="opacity-90">Subscribe to get more</p>
          <p className="opacity-90">Try 3 days for free</p>
        </div>
        <div className="relative">
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
          >
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="white" />
              <path d="M65 35C65 35 60 30 50 30C40 30 35 35 35 35" stroke="#333" strokeWidth="3" strokeLinecap="round" />
              <circle cx="40" cy="45" r="5" fill="#4FD1C5" />
              <circle cx="60" cy="45" r="5" fill="#4FD1C5" />
              <path d="M45 65C45 65 47.5 70 50 70C52.5 70 55 65 55 65" stroke="#333" strokeWidth="3" strokeLinecap="round" />
              <path d="M28 50C28 50 22 65 35 78" stroke="white" strokeWidth="8" strokeLinecap="round" />
              <path d="M72 50C72 50 78 65 65 78" stroke="white" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionCard;