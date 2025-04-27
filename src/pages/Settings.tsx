import { motion } from 'framer-motion';
import { Lock, User, Globe2, Volume2, Bell, AccessibilityIcon, Diamond, Send, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import BackHeader from '../components/Layout/BackHeader';
import SettingItem from '../components/Settings/SettingItem';
import SubscriptionCard from '../components/Settings/SubscriptionCard';

const Settings = () => {
  const navigate = useNavigate();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <PageLayout backgroundColor="bg-white" statusBarColor="bg-secondary-300">
      <BackHeader title="Settings" />
      
      <motion.div 
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="space-y-4">
          <SettingItem 
            icon={<User size={22} />} 
            label="Profile" 
            onClick={() => navigate('/profile')}
          />
          <SettingItem 
            icon={<Globe2 size={22} />} 
            label="Language" 
            onClick={() => navigate('/language')}
          />
          <SettingItem 
            icon={<Globe2 size={22} />} 
            label="Accent & Locale" 
            onClick={() => navigate('/accent')}
          />
          <SettingItem 
            icon={<Volume2 size={22} />} 
            label="Text-to-Speech Voice" 
            onClick={() => navigate('/voice')}
          />
          <SettingItem 
            icon={<Bell size={22} />} 
            label="Notifications" 
            onClick={() => navigate('/notifications')}
          />
          <SettingItem 
            icon={<AccessibilityIcon size={22} />} 
            label="Accessibility" 
            onClick={() => navigate('/accessibility')}
          />
          <SettingItem 
            icon={<Diamond size={22} />} 
            label="Subscriptions" 
            onClick={() => {}}
          />
        </div>
        
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <SettingItem 
            icon={<Send size={22} />} 
            label="Send Feedback" 
            onClick={() => {}}
          />
          <SettingItem 
            icon={<Info size={22} />} 
            label="About Application" 
            onClick={() => {}}
          />
        </div>
        
        <SubscriptionCard />
      </motion.div>
    </PageLayout>
  );
};

export default Settings;