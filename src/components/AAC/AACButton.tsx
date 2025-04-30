import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Star } from 'lucide-react';
import { useAssetLoader } from '../../hooks/useAssetLoader';
import useSpeech from '../../hooks/useSpeech';

interface AACButtonProps {
  category: string;
  name: string;
  lang?: string;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

const AACButton = ({ 
  category, 
  name, 
  lang = 'en',
  onFavorite,
  isFavorite = false 
}: AACButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { speak } = useSpeech();
  
  const imageResponse = useAssetLoader('image', {
    category,
    name,
    hd: true
  });
  
  const dataResponse = useAssetLoader('language', {
    category,
    lang
  });

  const handlePress = () => {
    setIsPressed(true);
    if (dataResponse.success && dataResponse.data) {
      const item = dataResponse.data.items.find(i => i.name === name);
      if (item) {
        speak(item.name);
      }
    }
    setTimeout(() => setIsPressed(false), 200);
  };

  if (imageResponse.loading || dataResponse.loading) {
    return (
      <div 
        className="w-full aspect-square bg-gray-100 rounded-2xl animate-pulse"
        role="progressbar"
        aria-label={`Loading ${name} button`}
      />
    );
  }

  if (!imageResponse.success || !dataResponse.success) {
    return (
      <div 
        className="w-full aspect-square bg-red-50 rounded-2xl flex items-center justify-center text-red-500"
        role="alert"
        aria-label={`Error loading ${name} button`}
      >
        Error
      </div>
    );
  }

  const item = dataResponse.data.items.find(i => i.name === name);
  
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        ref={buttonRef}
        onClick={handlePress}
        className={`w-full aspect-square bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 ${
          isPressed ? 'bg-gray-50' : ''
        }`}
        role="button"
        aria-label={`Speak ${item?.name || name}`}
        aria-pressed={isPressed}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-20 h-20">
            <img 
              src={imageResponse.data?.url} 
              alt={item?.name || name}
              className="w-full h-full object-contain"
              role="img"
              aria-hidden="true"
            />
          </div>
          <span 
            className="text-lg font-medium text-gray-800"
            aria-hidden="true"
          >
            {item?.name || name}
          </span>
        </div>
      </button>

      <div 
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1"
        role="group"
        aria-label="Button actions"
      >
        <button 
          onClick={() => speak(item?.name || name)}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50"
          aria-label={`Speak ${item?.name || name}`}
        >
          <Volume2 size={16} className="text-gray-600" aria-hidden="true" />
        </button>
        
        {onFavorite && (
          <button 
            onClick={onFavorite}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50"
            aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
            aria-pressed={isFavorite}
          >
            <Star 
              size={16} 
              className={isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-600'} 
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AACButton;