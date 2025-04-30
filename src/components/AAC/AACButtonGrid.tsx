import { useRef } from 'react';
import { motion } from 'framer-motion';
import AACButton from './AACButton';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface AACButtonGridProps {
  category: string;
  items: string[];
  lang?: string;
  favorites?: string[];
  onToggleFavorite?: (item: string) => void;
}

const AACButtonGrid = ({
  category,
  items,
  lang = 'en',
  favorites = [],
  onToggleFavorite
}: AACButtonGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useKeyboardNavigation({
    gridRef,
    itemSelector: '[role="gridcell"] button',
    columns: 4,
    onSelect: (element) => {
      element.click();
    }
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      ref={gridRef}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
      role="grid"
      aria-label={`${category} communication buttons`}
      tabIndex={-1}
    >
      {items.map((name, index) => (
        <motion.div 
          key={name} 
          variants={item}
          role="gridcell"
          aria-rowindex={Math.floor(index / 4) + 1}
          aria-colindex={(index % 4) + 1}
        >
          <AACButton
            category={category}
            name={name}
            lang={lang}
            isFavorite={favorites.includes(name)}
            onFavorite={onToggleFavorite ? () => onToggleFavorite(name) : undefined}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AACButtonGrid;