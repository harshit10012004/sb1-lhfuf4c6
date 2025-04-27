import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import BackHeader from '../components/Layout/BackHeader';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  
  const handleSave = () => {
    updateUser({ name });
    navigate('/settings');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };
  
  return (
    <PageLayout backgroundColor="bg-white" statusBarColor="bg-secondary-300">
      <BackHeader 
        title="Profile" 
        subtitle="Change the profile information of this application's user"
        rightContent={
          <button 
            onClick={handleSave}
            className="w-10 h-10 flex items-center justify-center bg-secondary-300 text-white rounded-full"
          >
            <Check size={20} />
          </button>
        }
      />
      
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Name</label>
          <p className="text-sm text-gray-500">Name of the user of this app</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input mt-2"
            placeholder="Enter your name"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Change Avatar</label>
          <p className="text-sm text-gray-500">Choose an avatar to symbolize this profile</p>
          
          <div 
            className="mt-4 flex justify-center"
            onClick={() => navigate('/avatar')}
          >
            <motion.div 
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-4 border-white shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user?.avatar ? (
                <img 
                  src={`/avatars/${user.avatar}.png`} 
                  alt="User avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="#f0f0f0" />
                  <circle cx="40" cy="45" r="5" fill="#333" />
                  <circle cx="60" cy="45" r="5" fill="#333" />
                  <path d="M40 65C40 65 45 70 50 70C55 70 60 65 60 65" stroke="#333" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
            </motion.div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center text-red-500 font-medium"
          >
            <LogOut size={20} className="mr-2" />
            Sign Out
          </button>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Profile;