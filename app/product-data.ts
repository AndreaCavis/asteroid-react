export interface Product {
    id: string;
    imageUrl: string;
    brand: string;
    name: string;
    suggested_use: string;
    price: number;
  }
  
  export const products: Product[] = [{
    id: '123',
    brand: 'Optimum Nutrition',
    name: 'BCAA',
    imageUrl: 'on_bcaa.png',
    suggested_use: 'BCAA 1000 Caps are recommended first thing in the morning and/or during the 30 minutes just before or immediately after training. Simply take 2 capsules with your favourite beverage, or with your protein shake.',
    price: 29,
  }, {
    id: '234',
    brand: 'Optimum Nutrition',
    name: 'Beta Alanine',
    imageUrl: 'on_beta_alanine.jpg',
    suggested_use: 'Mix 21 g (~3 level scoops) in 400 ml of cold water.\nRecommended consumption of 1 serving per day.',
    price: 16.55,
  }, {
      id: '345',
    brand: 'Optimum Nutrition',
      name: 'Creatine',
    imageUrl: 'on_creatine.png',
    suggested_use: 'Simply mix 1 rounded teaspoon with water or juice in your shaker.\nFor extra convenience, you can also add it to your pre/post-workout Optimum Nutrition protein or weight gainer shake.\nCreatine can be added to your whey protein shake, daily fruit juice or smoothie.',
    price: 26,
  }, {
    id: '456',
    brand: 'Optimum Nutrition',
    name: 'Whey Protein',
    imageUrl: 'on_whey.png',
    suggested_use: 'GOLD STANDARD 100% WHEY is best enjoyed first thing in the morning and/or during the 30 minutes just before or immediately after training.\nSimply mix one rounded scoop (31 g )in 180-240 ml of cold water. You can also add a serving to smoothies, protein balls, muffins, porridge or other meals as another great way to get a protein hit in the kitchen.',
    price: 24.55,
  }];