import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CategoryCardProps {
  title: string;
  icon: ReactNode;
  bgColor: string;
  onClick: () => void;
}

const CategoryCard = ({ title, icon, bgColor, onClick }: CategoryCardProps) => {
  return (
    <motion.div
      className={`${bgColor} rounded-3xl p-6 cursor-pointer flex flex-col items-center justify-center aspect-square`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-16 h-16 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 text-center">{title}</h3>
    </motion.div>
  );
};

export default CategoryCard;