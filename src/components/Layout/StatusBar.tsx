import { useState, useEffect } from 'react';
import { Battery, Wifi, Volume2 } from 'lucide-react';

interface StatusBarProps {
  backgroundColor?: string;
  textColor?: string;
}

const StatusBar = ({ backgroundColor = 'transparent', textColor = 'text-white' }: StatusBarProps) => {
  const [currentTime, setCurrentTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(78);
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`${formattedHours}:${formattedMinutes}${ampm}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`status-bar ${backgroundColor} ${textColor}`}>
      <div className="flex items-center">
        <span className="font-medium">{currentTime}</span>
        <span className="ml-2 text-xs font-normal">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Wifi size={16} />
        <Volume2 size={16} />
        <div className="flex items-center">
          <span className="mr-1 text-xs">{batteryLevel}%</span>
          <Battery size={16} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;