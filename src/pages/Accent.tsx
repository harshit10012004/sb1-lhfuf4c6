import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PageLayout from '../components/Layout/PageLayout';
import BackHeader from '../components/Layout/BackHeader';
import { useAccent } from '../context/AccentContext';
import { accents } from '../data/accentData';

const Accent = () => {
  const { currentAccent, setAccent } = useAccent();
  
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
    <PageLayout backgroundColor="bg-white" statusBarColor="bg-secondary-300">
      <BackHeader 
        title="Accent & Locale" 
        subtitle="Choose the preferred speech Accent for the voice recognition system"
      />
      
      <motion.div
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {accents.map((accent) => (
          <motion.div
            key={accent.code}
            variants={item}
            className="flex items-center justify-between py-4 px-2 cursor-pointer hover:bg-gray-50 rounded-xl"
            onClick={() => setAccent(accent)}
          >
            <div>
              <h3 className="text-lg text-gray-800">{accent.code}</h3>
              <p className="text-gray-500">{accent.language}</p>
            </div>
            {currentAccent.code === accent.code && (
              <div className="w-8 h-8 bg-secondary-300 rounded-full flex items-center justify-center">
                <Check size={18} className="text-white" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </PageLayout>
  );
};

export default Accent;