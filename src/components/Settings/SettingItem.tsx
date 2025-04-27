import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SettingItemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const SettingItem = ({ icon, label, onClick }: SettingItemProps) => {
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={item}
      className="flex items-center justify-between py-4 px-2 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors duration-200"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 flex items-center justify-center text-gray-700 mr-4">
          {icon}
        </div>
        <span className="text-lg text-gray-800">{label}</span>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </motion.div>
  );
};

export default SettingItem;