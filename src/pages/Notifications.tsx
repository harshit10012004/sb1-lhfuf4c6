import { motion } from 'framer-motion';
import PageLayout from '../components/Layout/PageLayout';
import BackHeader from '../components/Layout/BackHeader';
import { useNotifications } from '../context/NotificationsContext';

const Notifications = () => {
  const { settings, updateSettings } = useNotifications();
  
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
        title="Notifications" 
        subtitle="Choose when and why you would like to be notified by the app"
      />
      
      <motion.div
        className="space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="space-y-4">
          <motion.div variants={item}>
            <h2 className="text-xl font-semibold text-gray-900">Reminders</h2>
            <p className="text-gray-500 text-sm">We will remind you to use and practice the app</p>
          </motion.div>
          
          <motion.div variants={item}>
            <div 
              className="flex items-center justify-between py-4 cursor-pointer"
              onClick={() => updateSettings({ dailyReminders: !settings.dailyReminders })}
            >
              <div>
                <h3 className="text-lg text-gray-800">Daily Reminders</h3>
                <p className="text-gray-500">We will send you reminder to practice daily</p>
              </div>
              <div 
                className={`w-12 h-7 rounded-full transition-colors duration-200 ${
                  settings.dailyReminders ? 'bg-secondary-300' : 'bg-gray-200'
                } relative cursor-pointer`}
              >
                <div 
                  className={`absolute w-5 h-5 rounded-full bg-white top-1 transition-transform duration-200 ${
                    settings.dailyReminders ? 'translate-x-6' : 'translate-x-1'
                  }`} 
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={item}>
            <div 
              className="flex items-center justify-between py-4 cursor-pointer"
              onClick={() => updateSettings({ weeklyReminders: !settings.weeklyReminders })}
            >
              <div>
                <h3 className="text-lg text-gray-800">Weekly Reminders</h3>
                <p className="text-gray-500">We will send you reminder to practice weekly</p>
              </div>
              <div 
                className={`w-12 h-7 rounded-full transition-colors duration-200 ${
                  settings.weeklyReminders ? 'bg-secondary-300' : 'bg-gray-200'
                } relative cursor-pointer`}
              >
                <div 
                  className={`absolute w-5 h-5 rounded-full bg-white top-1 transition-transform duration-200 ${
                    settings.weeklyReminders ? 'translate-x-6' : 'translate-x-1'
                  }`} 
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="space-y-4">
          <motion.div variants={item}>
            <h2 className="text-xl font-semibold text-gray-900">Tips & Promotions</h2>
            <p className="text-gray-500 text-sm">Decide if you like us to send you tips for using the app or new promotions</p>
          </motion.div>
          
          <motion.div variants={item}>
            <div 
              className="flex items-center justify-between py-4 cursor-pointer"
              onClick={() => updateSettings({ usabilityTips: !settings.usabilityTips })}
            >
              <div>
                <h3 className="text-lg text-gray-800">Usability Tips</h3>
                <p className="text-gray-500">How to effectively use the app</p>
              </div>
              <div 
                className={`w-12 h-7 rounded-full transition-colors duration-200 ${
                  settings.usabilityTips ? 'bg-secondary-300' : 'bg-gray-200'
                } relative cursor-pointer`}
              >
                <div 
                  className={`absolute w-5 h-5 rounded-full bg-white top-1 transition-transform duration-200 ${
                    settings.usabilityTips ? 'translate-x-6' : 'translate-x-1'
                  }`} 
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={item}>
            <div 
              className="flex items-center justify-between py-4 cursor-pointer"
              onClick={() => updateSettings({ promotions: !settings.promotions })}
            >
              <div>
                <h3 className="text-lg text-gray-800">Promotions</h3>
                <p className="text-gray-500">Let us notify you when we have a discount for the subscription</p>
              </div>
              <div 
                className={`w-12 h-7 rounded-full transition-colors duration-200 ${
                  settings.promotions ? 'bg-secondary-300' : 'bg-gray-200'
                } relative cursor-pointer`}
              >
                <div 
                  className={`absolute w-5 h-5 rounded-full bg-white top-1 transition-transform duration-200 ${
                    settings.promotions ? 'translate-x-6' : 'translate-x-1'
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

export default Notifications;