import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CategoryItemProps {
  icon: ReactNode | string;
  label: string;
  onClick: () => void;
  isImage?: boolean;
}

const CategoryItem = ({ icon, label, onClick, isImage = false }: CategoryItemProps) => {
  return (
    <motion.div
      className="bg-gray-50 rounded-3xl p-6 cursor-pointer flex flex-col items-center justify-center aspect-square"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-16 h-16 mb-4">
        {isImage ? (
          <img src={icon as string} alt={label} className="w-full h-full object-contain" />
        ) : (
          icon
        )}
      </div>
      <span className="text-lg font-medium text-gray-800 text-center">{label}</span>
    </motion.div>
  );
};

export default CategoryItem;