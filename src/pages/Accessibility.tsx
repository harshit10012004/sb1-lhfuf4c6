import { motion } from 'framer-motion';
import PageLayout from '../components/Layout/PageLayout';
import BackHeader from '../components/Layout/BackHeader';
import { useAccessibility } from '../context/AccessibilityContext';

const Accessibility = () => {
  const { settings, updateSettings } = useAccessibility();
  
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
        title="Accessibility" 
        subtitle="Customize the accessibility properties of your AAC application"
      />
      
      <motion.div
        className="space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="space-y-4">
          <motion.div variants={item}>
            <h2 className="text-xl font-semibold text-gray-900">Sensory Preferences</h2>
            <p className="text-gray-500 text-sm">Customize the sensory input/output settings of the aac application</p>
          </motion.div>
          
          <motion.div variants={item}>
            <div 
              className="flex items-center justify-between py-4 cursor-pointer"
              onClick={() => updateSettings({ hapticFeedback: !settings.hapticFeedback })}
            >
              <div>
                <h3 className="text-lg text-gray-800">Haptic & Vibration</h3>
                <p className="text-gray-500">If enabled the app will give small haptic feedbacks when using app</p>
              </div>
              <div 
                className={`w-12 h-7 rounded-full transition-colors duration-200 ${
                  settings.hapticFeedback ? 'bg-secondary-300' : 'bg-gray-200'
                } relative cursor-pointer`}
              >
                <div 
                  className={`absolute w-5 h-5 rounded-full bg-white top-1 transition-transform duration-200 ${
                    settings.hapticFeedback ? 'translate-x-6' : 'translate-x-1'
                  }`} 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Accessibility;