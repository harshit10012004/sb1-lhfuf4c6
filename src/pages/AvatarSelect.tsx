import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/Layout/PageLayout';
import BackHeader from '../components/Layout/BackHeader';
import { useAuth } from '../context/AuthContext';
import { avatarData } from '../data/avatarData';
import AvatarGrid from '../components/Avatar/AvatarGrid';

const AvatarSelect = () => {
  const { user, updateUser } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState<string>(user?.avatar || '');
  
  const handleAvatarSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    updateUser({ avatar: avatarId });
  };
  
  return (
    <PageLayout backgroundColor="bg-white" statusBarColor="bg-primary-500">
      <BackHeader 
        title="Change Avatar" 
        subtitle="Choose an avatar to symbolize this profile"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AvatarGrid 
          avatars={avatarData} 
          selectedAvatar={selectedAvatar}
          onSelect={handleAvatarSelect}
        />
      </motion.div>
    </PageLayout>
  );
};

export default AvatarSelect;