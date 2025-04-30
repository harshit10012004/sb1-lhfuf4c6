import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguageService } from '../../hooks/useLanguageService';
import { languages } from '../../data/languageData';

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useLanguageService();

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
      {languages.map((language) => (
        <motion.div
          key={language.code}
          variants={item}
          className="flex items-center justify-between py-4 px-2 cursor-pointer hover:bg-gray-50 rounded-xl"
          onClick={() => changeLanguage(language)}
        >
          <div>
            <h3 className="text-lg text-gray-800">{language.title}</h3>
            <p className="text-gray-500">{language.native}</p>
          </div>
          {currentLanguage.code === language.code && (
            <div className="w-8 h-8 bg-secondary-300 rounded-full flex items-center justify-center">
              <Check size={18} className="text-white" />
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}