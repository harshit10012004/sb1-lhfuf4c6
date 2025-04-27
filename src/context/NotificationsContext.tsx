import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type NotificationSettings = {
  dailyReminders: boolean;
  weeklyReminders: boolean;
  usabilityTips: boolean;
  promotions: boolean;
};

type NotificationsContextType = {
  settings: NotificationSettings;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
};

const defaultSettings: NotificationSettings = {
  dailyReminders: false,
  weeklyReminders: true,
  usabilityTips: true,
  promotions: false
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);

  useEffect(() => {
    const storedSettings = localStorage.getItem('priya_notifications');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('priya_notifications', JSON.stringify(updatedSettings));
  };

  return (
    <NotificationsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};