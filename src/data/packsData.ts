import { Pack } from '../types/categories';

// Import all packs data from Leeloo AAC
export const packs: Pack[] = [
  {
    "slug": "doll",
    "title": "Oyuncak bebek",
    "phrases": [
      { "type": "❤️", "phrase": "Bebekleri severim." },
      { "type": "☝️", "phrase": "Oyuncak bebeklerimle oynayabilir miyim?" },
      { "type": "🙋", "phrase": "Hediye olarak bir bebek istiyorum." }
    ]
  },
  {
    "slug": "teddy-bear",
    "title": "oyuncak ayı",
    "phrases": [
      { "type": "❤️", "phrase": "Oyuncak ayıları severim." },
      { "type": "☝️", "phrase": "Oyuncak ayımla oynayabilir miyim?" },
      { "type": "🙋", "phrase": "Hediye olarak bir oyuncak ayı istiyorum." }
    ]
  },
  {
    "slug": "blocks",
    "title": "Bloklar",
    "phrases": [
      { "type": "❤️", "phrase": "Blokları severim." },
      { "type": "☝️", "phrase": "Bloklarımla oynayabilir miyim?" },
      { "type": "🙋", "phrase": "Hediye olarak bir blok istiyorum." }
    ]
  },
  {
    "slug": "spinner",
    "title": "topaç",
    "phrases": [
      { "type": "❤️", "phrase": "Dönücü severim." },
      { "type": "☝️", "phrase": "Dönücü ile oynayabilir miyim?" },
      { "type": "🙋", "phrase": "Hediye olarak bir dönücü istiyorum." }
    ]
  },
  {
    "slug": "nutcracker",
    "title": "fındıkkıran",
    "phrases": [
      { "type": "❤️", "phrase": "Fındıkkıranları severim." },
      { "type": "☝️", "phrase": "Fındıkkıranımla oynayabilir miyim?" },
      { "type": "🙋", "phrase": "Hediye olarak bir fındıkkıran istiyorum." }
    ]
  },
  {
    "slug": "video-games",
    "title": "Video oyunları",
    "phrases": [
      { "type": "❤️", "phrase": "Video oyunlarını severim." },
      { "type": "☝️", "phrase": "Birlikte video oyunları oynayabilir miyiz?" },
      { "type": "🙋", "phrase": "Video oyunlarını hediye olarak istiyorum." }
    ]
  },
  {
    "slug": "cards",
    "title": "Kartlar",
    "phrases": [
      { "type": "❤️", "phrase": "Oyun kartlarını severim." },
      { "type": "☝️", "phrase": "Kartlarımla oynayabilir miyim?" },
      { "type": "🙋", "phrase": "Hediye olarak oyun kağıdı istiyorum." }
    ]
  },
  {
    "slug": "toy-car",
    "title": "Oyuncak araba",
    "phrases": [
      { "type": "❤️", "phrase": "Oyuncak arabaları severim." },
      { "type": "☝️", "phrase": "Oyuncak arabamla oynayabilir miyim?" },
      { "type": "🙋", "phrase": "Hediye olarak bir oyuncak araba istiyorum." }
    ]
  }
];

// Add image URLs for each pack
export const packImages: Record<string, string> = {
  "doll": "https://assistivecards.com/cards/toys/doll.svg",
  "teddy-bear": "https://assistivecards.com/cards/toys/teddy-bear.svg", 
  "blocks": "https://assistivecards.com/cards/toys/blocks.svg",
  "spinner": "https://assistivecards.com/cards/toys/spinner.svg",
  "nutcracker": "https://assistivecards.com/cards/toys/nutcracker.svg",
  "video-games": "https://assistivecards.com/cards/toys/video-games.svg",
  "cards": "https://assistivecards.com/cards/toys/cards.svg",
  "toy-car": "https://assistivecards.com/cards/toys/toy-car.svg"
};