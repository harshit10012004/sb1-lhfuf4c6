import { motion } from 'framer-motion';
import { Search, Star, MessageSquare, Users, Smile, Apple, Cat, BookOpen, User, Shapes, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import CategoryCard from '../components/Categories/CategoryCard';
import { useAuth } from '../context/AuthContext';

const Categories = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const categories = [
    { 
      id: 'favorites', 
      title: 'Favorites',
      icon: <Star className="w-full h-full text-yellow-500" />,
      bgColor: 'bg-green-50'
    },
    { 
      id: 'conversation', 
      title: 'Conversation',
      icon: <MessageSquare className="w-full h-full text-red-400" />,
      bgColor: 'bg-red-50'
    },
    { 
      id: 'people', 
      title: 'People',
      icon: <Users className="w-full h-full text-blue-400" />,
      bgColor: 'bg-blue-50'
    },
    { 
      id: 'feelings', 
      title: 'Feelings',
      icon: <Smile className="w-full h-full text-yellow-400" />,
      bgColor: 'bg-yellow-50'
    },
    { 
      id: 'food', 
      title: 'Food',
      icon: <Apple className="w-full h-full text-red-500" />,
      bgColor: 'bg-green-50'
    },
    { 
      id: 'animals', 
      title: 'Animals',
      icon: <Cat className="w-full h-full text-purple-400" />,
      bgColor: 'bg-pink-50'
    },
    { 
      id: 'school', 
      title: 'School',
      icon: <BookOpen className="w-full h-full text-purple-500" />,
      bgColor: 'bg-purple-50'
    },
    { 
      id: 'activities', 
      title: 'Activities',
      icon: <User className="w-full h-full text-orange-400" />,
      bgColor: 'bg-orange-50'
    },
    { 
      id: 'shapes', 
      title: 'Shapes',
      icon: <Shapes className="w-full h-full text-blue-500" />,
      bgColor: 'bg-blue-50'
    },
    { 
      id: 'colors', 
      title: 'Colors',
      icon: <Palette className="w-full h-full text-pink-400" />,
      bgColor: 'bg-pink-50'
    }
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <PageLayout backgroundColor="bg-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hello {user?.name}</h1>
        </div>
        <button 
          onClick={() => navigate('/settings')}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm"
        >
          <img 
            src={`/avatars/${user?.avatar}.png`} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </button>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Type your phrases..."
          className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>
      
      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <CategoryCard
              title={category.title}
              icon={category.icon}
              bgColor={category.bgColor}
              onClick={() => navigate(`/category/${category.id}`)}
            />
          </motion.div>
        ))}
        
        <motion.div 
          variants={item}
          className="border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center aspect-square cursor-pointer hover:border-primary-500 transition-colors duration-200"
          onClick={() => {}}
        >
          <div className="text-4xl text-primary-500 mb-2">+</div>
          <span className="text-primary-500 font-medium">Add Pack</span>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Categories;