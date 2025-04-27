import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PageLayout from '../components/Layout/PageLayout';
import BackHeader from '../components/Layout/BackHeader';
import { useVoice } from '../context/VoiceContext';
import { voiceOptions } from '../data/voiceData';

const Voice = () => {
  const { currentVoice, setVoice } = useVoice();
  
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
        title="Text-to-Speech Voice" 
        subtitle="Select the text-to-speech voice driver"
      />
      
      <motion.div
        className="space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="space-y-4">
          <motion.div variants={item}>
            <h2 className="text-xl font-semibold text-gray-900">Based On Your Location</h2>
            <p className="text-gray-500 text-sm">Voice drivers that match with both your language and location</p>
          </motion.div>
          
          {voiceOptions.map((voice) => (
            <motion.div
              key={voice.id}
              variants={item}
              className="flex items-center justify-between py-4 px-2 cursor-pointer hover:bg-gray-50 rounded-xl"
              onClick={() => setVoice(voice)}
            >
              <div>
                <h3 className="text-lg text-gray-800">{voice.name}</h3>
                <p className="text-gray-500">{voice.locale} - {voice.quality}</p>
                <p className="text-gray-400 text-sm">{voice.identifier}</p>
              </div>
              {currentVoice.id === voice.id && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
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

export default Voice;