export const FOOD_EMOJIS = {
  milk: '🥛', cheese: '🧀', butter: '🧈', yogurt: '🥛', egg: '🥚', eggs: '🥚',
  'ice cream': '🍦', carrot: '🥕', broccoli: '🥦', tomato: '🍅', potato: '🥔',
  onion: '🧅', garlic: '🧄', pepper: '🫑', cucumber: '🥒', eggplant: '🍆',
  corn: '🌽', lettuce: '🥬', spinach: '🥬', mushroom: '🍄', pumpkin: '🎃',
  zucchini: '🥒', apple: '🍎', banana: '🍌', orange: '🍊', strawberry: '🍓',
  grape: '🍇', watermelon: '🍉', lemon: '🍋', peach: '🍑', pear: '🍐',
  cherry: '🍒', mango: '🥭', pineapple: '🍍', avocado: '🥑', coconut: '🥥',
  chicken: '🍗', beef: '🥩', pork: '🥩', fish: '🐟', shrimp: '🍤',
  salmon: '🐟', tuna: '🐟', turkey: '🦃', lamb: '🥩', sausage: '🌭',
  chocolate: '🍫', cookie: '🍪', chips: '🥨', popcorn: '🍿', candy: '🍬',
  bread: '🍞', cake: '🎂', nuts: '🥜', peanut: '🥜', rice: '🍚',
  pasta: '🍝', flour: '🌾', oat: '🌾', oats: '🌾', cereal: '🥣',
  noodle: '🍜', noodles: '🍜', wheat: '🌾', barley: '🌾',
  süt: '🥛', peynir: '🧀', yumurta: '🥚', tereyağı: '🧈', yoğurt: '🥛',
  havuç: '🥕', brokoli: '🥦', domates: '🍅', patates: '🥔', soğan: '🧅',
  sarımsak: '🧄', biber: '🫑', salatalık: '🥒', patlıcan: '🍆', mısır: '🌽',
  ıspanak: '🥬', mantar: '🍄', kabak: '🥒', elma: '🍎', muz: '🍌',
  portakal: '🍊', çilek: '🍓', üzüm: '🍇', karpuz: '🍉', limon: '🍋',
  şeftali: '🍑', armut: '🍐', kiraz: '🍒', avokado: '🥑',
  tavuk: '🍗', et: '🥩', balık: '🐟', somon: '🐟', karides: '🍤',
  çikolata: '🍫', ekmek: '🍞', pirinç: '🍚', makarna: '🍝', un: '🌾',
  yulaf: '🌾', fındık: '🥜', fıstık: '🥜',
};

export const CATEGORY_ICONS = {
  Dairy: '🥛',
  Vegetables: '🥦',
  Fruits: '🍎',
  Meat: '🥩',
  Snacks: '🍿',
  'Grains & Pantry': '🌾',
};

export const getItemEmoji = (name) => {
  const lower = name.toLowerCase();
  if (FOOD_EMOJIS[lower]) return FOOD_EMOJIS[lower];
  const match = Object.keys(FOOD_EMOJIS).find(key => lower.includes(key));
  return match ? FOOD_EMOJIS[match] : null;
};