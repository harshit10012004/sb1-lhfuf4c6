import { Category, CategoryItem } from '../types/categories';

export const categories: Category[] = [
  { id: 1, slug: 'conversation', color: '#FFE5E6', premium: 0, locale: 'konuşma', count: 18 },
  { id: 2, slug: 'people', color: '#E3F3FF', premium: 0, locale: 'İnsanlar', count: 21 },
  { id: 3, slug: 'feelings', color: '#FFF6D6', premium: 0, locale: 'duygular', count: 18 },
  { id: 4, slug: 'food', color: '#EEF7F2', premium: 0, locale: 'Gıda', count: 33 },
  { id: 5, slug: 'animals', color: '#FFE7F4', premium: 0, locale: 'Hayvanlar', count: 53 },
  { id: 6, slug: 'school', color: '#F5F3FE', premium: 0, locale: 'Okul', count: 21 },
  { id: 7, slug: 'activities', color: '#FFEAD1', premium: 0, locale: 'faaliyetler', count: 26 },
  { id: 8, slug: 'shapes', color: '#EAFDFF', premium: 0, locale: 'Şekiller', count: 18 },
  { id: 9, slug: 'colors', color: '#FFDEEA', premium: 0, locale: 'Renkler', count: 22 },
  { id: 10, slug: 'clothes', color: '#C9D3FF', premium: 0, locale: 'Çamaşırlar', count: 42 },
  { id: 11, slug: 'numbers', color: '#FFD8D8', premium: 0, locale: 'sayılar', count: 18 },
  { id: 12, slug: 'transport', color: '#FFE6BA', premium: 0, locale: 'Ulaşım', count: 22 },
  { id: 13, slug: 'quarantine', color: '#E8F6F8', premium: 0, locale: 'Karantina', count: 21 },
  { id: 15, slug: 'toys', color: '#F9D9FF', premium: 1, locale: 'Oyuncak', count: 24 },
  { id: 16, slug: 'drinks', color: '#FDCBD8', premium: 1, locale: 'İçecekler', count: 18 },
  { id: 17, slug: 'snacks', color: '#C7F5F7', premium: 1, locale: 'Atıştırmalıklar', count: 19 },
  { id: 18, slug: 'occupations', color: '#EDEEE7', premium: 1, locale: 'Meslekler', count: 47 },
  { id: 19, slug: 'party', color: '#EDE7F9', premium: 1, locale: 'Parti', count: 27 },
  { id: 20, slug: 'fruits', color: '#E9F5FE', premium: 1, locale: 'meyve', count: 25 },
  { id: 21, slug: 'vegetables', color: '#E6F5F3', premium: 1, locale: 'sebzeler', count: 27 },
  { id: 22, slug: 'fair', color: '#FFEAD1', premium: 1, locale: 'adil', count: 20 },
  { id: 23, slug: 'sports', color: '#DCDFE1', premium: 1, locale: 'Spor Dalları', count: 19 },
  { id: 24, slug: 'pirates', color: '#EDF8FF', premium: 1, locale: 'Korsanlar', count: 21 },
  { id: 25, slug: 'travel', color: '#E6F5F3', premium: 1, locale: 'Seyahat', count: 20 },
  { id: 26, slug: 'gardening', color: '#DFF4F1', premium: 1, locale: 'Bahçıvanlık', count: 24 },
  { id: 27, slug: 'medical', color: '#E6F7FD', premium: 1, locale: 'Tıbbi', count: 21 },
  { id: 28, slug: 'kitchen', color: '#F1F7F3', premium: 1, locale: 'Mutfak', count: 26 },
  { id: 29, slug: 'places', color: '#F4C6E3', premium: 1, locale: 'Yerler', count: 24 }
];

export const categoryItems: Record<string, CategoryItem[]> = {
  conversation: [
    { id: 'me', label: 'Me', icon: 'https://assistivecards.com/cards/conversation/me.svg' },
    { id: 'hello', label: 'Hello', icon: 'https://assistivecards.com/cards/conversation/hello.svg' },
    { id: 'help', label: 'Help', icon: 'https://assistivecards.com/cards/conversation/help.svg' },
    { id: 'yes', label: 'Yes', icon: 'https://assistivecards.com/cards/conversation/yes.svg' },
    { id: 'no', label: 'No', icon: 'https://assistivecards.com/cards/conversation/no.svg' },
    { id: 'toilet', label: 'Toilet', icon: 'https://assistivecards.com/cards/conversation/toilet.svg' },
    { id: 'what', label: 'What', icon: 'https://assistivecards.com/cards/conversation/what.svg' },
    { id: 'why', label: 'Why', icon: 'https://assistivecards.com/cards/conversation/why.svg' },
    { id: 'sleep', label: 'Sleep', icon: 'https://assistivecards.com/cards/conversation/sleep.svg' },
    { id: 'bath', label: 'Bath', icon: 'https://assistivecards.com/cards/conversation/bath.svg' },
    { id: 'listen', label: 'Listen', icon: 'https://assistivecards.com/cards/conversation/listen.svg' },
    { id: 'morning', label: 'Morning', icon: 'https://assistivecards.com/cards/conversation/morning.svg' },
    { id: 'night', label: 'Night', icon: 'https://assistivecards.com/cards/conversation/night.svg' },
    { id: 'look', label: 'Look', icon: 'https://assistivecards.com/cards/conversation/look.svg' },
    { id: 'speak', label: 'Speak', icon: 'https://assistivecards.com/cards/conversation/speak.svg' }
  ],
  me: [
    { id: 'name', label: 'My name is', icon: '👆' },
    { id: 'intro', label: "I'm", icon: '🤗' },
    { id: 'ask-name', label: 'Do you know my name?', icon: '❓' },
    { id: 'what-name', label: 'What is your name?', icon: '❓' },
    { id: 'nice', label: 'Nice to meet you!', icon: '🤝' },
    { id: 'like', label: 'Do you like me?', icon: '❓' },
    { id: 'friends', label: 'Can we be friends?', icon: '👫' },
    { id: 'app', label: "I'm using an assistive communication app.", icon: '📱' },
    { id: 'who', label: 'Who are you?', icon: '❓' }
  ],
  toys: [
    { id: 'doll', label: 'Doll', icon: 'https://assistivecards.com/cards/toys/doll.svg' },
    { id: 'teddy-bear', label: 'Teddy Bear', icon: 'https://assistivecards.com/cards/toys/teddy-bear.svg' },
    { id: 'blocks', label: 'Blocks', icon: 'https://assistivecards.com/cards/toys/blocks.svg' },
    { id: 'spinner', label: 'Spinner', icon: 'https://assistivecards.com/cards/toys/spinner.svg' },
    { id: 'nutcracker', label: 'Nutcracker', icon: 'https://assistivecards.com/cards/toys/nutcracker.svg' },
    { id: 'video-games', label: 'Video Games', icon: 'https://assistivecards.com/cards/toys/video-games.svg' }
  ],
  drinks: [
    { id: 'coffee', label: 'Coffee', icon: 'https://assistivecards.com/cards/drinks/coffee.svg' },
    { id: 'water', label: 'Water', icon: 'https://assistivecards.com/cards/drinks/water.svg' },
    { id: 'juice', label: 'Juice', icon: 'https://assistivecards.com/cards/drinks/juice.svg' },
    { id: 'tea', label: 'Tea', icon: 'https://assistivecards.com/cards/drinks/tea.svg' },
    { id: 'milk', label: 'Milk', icon: 'https://assistivecards.com/cards/drinks/milk.svg' }
  ],
  feelings: [
    { id: 'happy', label: 'Happy', icon: 'https://assistivecards.com/cards/feelings/happy.svg' },
    { id: 'sad', label: 'Sad', icon: 'https://assistivecards.com/cards/feelings/sad.svg' },
    { id: 'angry', label: 'Angry', icon: 'https://assistivecards.com/cards/feelings/angry.svg' },
    { id: 'scared', label: 'Scared', icon: 'https://assistivecards.com/cards/feelings/scared.svg' },
    { id: 'tired', label: 'Tired', icon: 'https://assistivecards.com/cards/feelings/tired.svg' }
  ],
  animals: [
    { id: 'cat', label: 'Cat', icon: 'https://assistivecards.com/cards/animals/cat.svg' },
    { id: 'dog', label: 'Dog', icon: 'https://assistivecards.com/cards/animals/dog.svg' },
    { id: 'bird', label: 'Bird', icon: 'https://assistivecards.com/cards/animals/bird.svg' },
    { id: 'fish', label: 'Fish', icon: 'https://assistivecards.com/cards/animals/fish.svg' },
    { id: 'rabbit', label: 'Rabbit', icon: 'https://assistivecards.com/cards/animals/rabbit.svg' }
  ]
};