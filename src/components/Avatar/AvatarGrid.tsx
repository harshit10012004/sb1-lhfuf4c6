import { motion } from 'framer-motion';

interface AvatarType {
  id: string;
  src: string;
}

interface AvatarGridProps {
  avatars: AvatarType[];
  selectedAvatar: string;
  onSelect: (avatarId: string) => void;
}

const AvatarGrid = ({ avatars, selectedAvatar, onSelect }: AvatarGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      className="grid grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {avatars.map((avatar) => (
        <motion.div
          key={avatar.id}
          variants={item}
          className={`relative p-2 rounded-lg cursor-pointer ${
            selectedAvatar === avatar.id ? 'bg-secondary-100' : 'hover:bg-gray-100'
          }`}
          onClick={() => onSelect(avatar.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src={avatar.src} 
            alt={`Avatar ${avatar.id}`} 
            className="w-full h-auto"
          />
          {selectedAvatar === avatar.id && (
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-secondary-300 rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AvatarGrid;