import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PageLayout from '../components/Layout/PageLayout';
import BackHeader from '../components/Layout/BackHeader';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../data/languageData';

const Language = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  
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
        title="Language" 
        subtitle="Choose the language for app interface and assistive cards"
      />
      
      <motion.div
        className="space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="space-y-4">
          <motion.div variants={item}>
            <h2 className="text-xl font-semibold text-gray-900">Based On Your Device</h2>
            <p className="text-gray-500 text-sm">Languages from your native settings</p>
          </motion.div>
          
          {languages.slice(0, 1).map((lang) => (
            <motion.div
              key={lang.code}
              variants={item}
              className="flex items-center justify-between py-4 px-2 cursor-pointer hover:bg-gray-50 rounded-xl"
              onClick={() => setLanguage(lang)}
            >
              <div>
                <h3 className="text-lg text-gray-800">{lang.name}</h3>
                <p className="text-gray-500">{lang.nativeName}</p>
              </div>
              {currentLanguage.code === lang.code && (
                <div className="w-8 h-8 bg-secondary-300 rounded-full flex items-center justify-center">
                  <Check size={18} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="space-y-4">
          <motion.div variants={item}>
            <h2 className="text-xl font-semibold text-gray-900">Supported Languages</h2>
            <p className="text-gray-500 text-sm">All the languages that assistive cards support</p>
          </motion.div>
          
          {languages.slice(1).map((lang) => (
            <motion.div
              key={lang.code}
              variants={item}
              className="flex items-center justify-between py-4 px-2 cursor-pointer hover:bg-gray-50 rounded-xl"
              onClick={() => setLanguage(lang)}
            >
              <div>
                <h3 className="text-lg text-gray-800">{lang.name}</h3>
                <p className="text-gray-500">{lang.nativeName}</p>
              </div>
              {currentLanguage.code === lang.code && (
                <div className="w-8 h-8 bg-secondary-300 rounded-full flex items-center justify-center">
                  <Check size={18} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Language;