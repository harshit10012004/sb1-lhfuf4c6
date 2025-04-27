import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, RotateCcw, Star } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import BackHeader from '../components/Layout/BackHeader';
import CategoryItem from '../components/Categories/CategoryItem';
import PhraseList from '../components/Phrases/PhraseList';
import { categoryItems } from '../data/categoryData';
import useSpeech from '../hooks/useSpeech';

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { speak } = useSpeech();
  
  const items = categoryItems[id as keyof typeof categoryItems] || [];
  
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

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    const selectedPhrase = items.find(i => i.id === itemId);
    if (selectedPhrase) {
      speak(selectedPhrase.label);
    }
  };

  const phrases = [
    { id: '1', text: 'My name is Harshit', icon: '👆' },
    { id: '2', text: "I'm Harshit", icon: '🤗' },
    { id: '3', text: 'Do you know my name?', icon: '❓' },
    { id: '4', text: 'What is your name?', icon: '❓' },
    { id: '5', text: 'Nice to meet you!', icon: '🤝' },
    { id: '6', text: 'Do you like me?', icon: '❓' },
    { id: '7', text: 'Can we be friends?', icon: '👫' },
    { id: '8', text: "I'm using an assistive communication app.", icon: '📱' },
    { id: '9', text: 'Who are you?', icon: '❓' }
  ];

  return (
    <PageLayout backgroundColor="bg-red-50">
      <BackHeader 
        title={id ? id.charAt(0).toUpperCase() + id.slice(1) : ''} 
        rightContent={
          selectedItem && (
            <div className="flex space-x-2">
              <button 
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm"
                onClick={() => {
                  const selectedPhrase = items.find(i => i.id === selectedItem);
                  if (selectedPhrase) {
                    speak(selectedPhrase.label);
                  }
                }}
              >
                <Volume2 size={20} className="text-gray-700" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
                <RotateCcw size={20} className="text-gray-700" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
                <Star size={20} className="text-gray-700" />
              </button>
            </div>
          )
        }
      />
      
      {id === 'me' ? (
        <div className="mt-4">
          <PhraseList phrases={phrases} />
        </div>
      ) : selectedItem ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-40 h-40 bg-white rounded-3xl p-8 shadow-lg mb-8"
          >
            <img 
              src={items.find(i => i.id === selectedItem)?.icon} 
              alt={items.find(i => i.id === selectedItem)?.label}
              className="w-full h-full object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-semibold text-gray-800"
          >
            {items.find(i => i.id === selectedItem)?.label}
          </motion.div>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-2 gap-4 mt-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {items.map((categoryItem) => (
            <motion.div key={categoryItem.id} variants={item}>
              <CategoryItem
                icon={categoryItem.icon}
                label={categoryItem.label}
                onClick={() => handleItemClick(categoryItem.id)}
                isImage={!categoryItem.icon.startsWith('👆')}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageLayout>
  );
};

export default CategoryDetail;