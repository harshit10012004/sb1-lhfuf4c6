import { motion } from 'framer-motion';
import { RefreshCw, Star } from 'lucide-react';
import useSpeech from '../../hooks/useSpeech';

interface Phrase {
  id: string;
  text: string;
  icon: string;
}

interface PhraseListProps {
  phrases: Phrase[];
}

const PhraseList = ({ phrases }: PhraseListProps) => {
  const { speak } = useSpeech();

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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className="space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {phrases.map((phrase) => (
        <motion.div
          key={phrase.id}
          variants={item}
          className="flex items-center bg-white rounded-xl p-4 shadow-sm"
          onClick={() => speak(phrase.text)}
        >
          <span className="text-2xl mr-4">{phrase.icon}</span>
          <span className="flex-1 text-lg text-gray-800">{phrase.text}</span>
          <div className="flex space-x-2">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600">
              <RefreshCw size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-yellow-500">
              <Star size={18} />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PhraseList;