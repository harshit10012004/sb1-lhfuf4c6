import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import StatusBar from './StatusBar';

interface PageLayoutProps {
  children: ReactNode;
  backgroundColor?: string;
  statusBarColor?: string;
  statusBarTextColor?: string;
  withPadding?: boolean;
}

const PageLayout = ({ 
  children, 
  backgroundColor = 'bg-white', 
  statusBarColor = 'bg-primary-500',
  statusBarTextColor = 'text-white',
  withPadding = true
}: PageLayoutProps) => {
  return (
    <motion.div 
      className={`min-h-screen flex flex-col ${backgroundColor}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <StatusBar backgroundColor={statusBarColor} textColor={statusBarTextColor} />
      <div className={`flex-1 ${withPadding ? 'px-4 py-6' : ''}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default PageLayout;