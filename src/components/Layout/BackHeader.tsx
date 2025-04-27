import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  onBack?: () => void;
}

const BackHeader = ({ 
  title, 
  subtitle, 
  rightContent,
  onBack
}: BackHeaderProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center text-gray-700 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={24} />
        </button>
        {rightContent}
      </div>
      <div className="mt-4">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default BackHeader;