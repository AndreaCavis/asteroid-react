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
    name: 'Impact Whey Protein',
    imageUrl: 'on_whey.png',
    suggested_use: 'GOLD STANDARD 100% WHEY is best enjoyed first thing in the morning and/or during the 30 minutes just before or immediately after training.\nSimply mix one rounded scoop (31 g )in 180-240 ml of cold water. You can also add a serving to smoothies, protein balls, muffins, porridge or other meals as another great way to get a protein hit in the kitchen.',
    price: 24.55,
  }, {
    id: '567',
    brand: 'Myprotein',
    name: 'Myprotein BCAA',
    imageUrl: 'myp_bcaa.png',
    suggested_use: 'BCAA 1000 Caps are recommended first thing in the morning and/or during the 30 minutes just before or immediately after training. Simply take 2 capsules with your favourite beverage, or with your protein shake.',
    price: 29,
  }, {
    id: '678',
    brand: 'Myprotein',
    name: 'Myprotein Beta Alanine',
    imageUrl: 'myp_beta_alanine.jpg',
    suggested_use: 'Mix 21 g (~3 level scoops) in 400 ml of cold water.\nRecommended consumption of 1 serving per day.',
    price: 16.55,
  }, {
    id: '789',
    brand: 'Myprotein',
      name: 'Impact Creatine',
    imageUrl: 'myp_creatine.png',
    suggested_use: 'Simply mix 1 rounded teaspoon with water or juice in your shaker.\nFor extra convenience, you can also add it to your pre/post-workout Myprotein protein or weight gainer shake.\nCreatine can be added to your whey protein shake, daily fruit juice or smoothie.',
    price: 26,
  }, {
    id: '890',
    brand: 'Myprotein',
    name: 'Impact Protein',
    imageUrl: 'myp_whey.png',
    suggested_use: 'GOLD STANDARD 100% WHEY is best enjoyed first thing in the morning and/or during the 30 minutes just before or immediately after training.\nSimply mix one rounded scoop (31 g )in 180-240 ml of cold water. You can also add a serving to smoothies, protein balls, muffins, porridge or other meals as another great way to get a protein hit in the kitchen.',
    price: 24.55,
  }, {
    id: '001',
    brand: 'Yamamoto Nutrition',
    name: 'Yamamoto BCAA',
    imageUrl: 'ym_bcaa.png',
    suggested_use: 'BCAA 1000 Caps are recommended first thing in the morning and/or during the 30 minutes just before or immediately after training. Simply take 2 capsules with your favourite beverage, or with your protein shake.',
    price: 29,
  }, {
    id: '002',
    brand: 'Yamamoto Nutrition',
    name: 'Yamamoto Beta Alanine',
    imageUrl: 'ym_beta_alanine.jpg',
    suggested_use: 'Mix 21 g (~3 level scoops) in 400 ml of cold water.\nRecommended consumption of 1 serving per day.',
    price: 16.55,
  }, {
    id: '003',
    brand: 'Yamamoto Nutrition',
      name: 'Yamamoto Creatine',
    imageUrl: 'ym_creatine.png',
    suggested_use: 'Simply mix 1 rounded teaspoon with water or juice in your shaker.\nFor extra convenience, you can also add it to your pre/post-workout whey protein or weight gainer shake.\nCreatine can be added to your whey protein shake, daily fruit juice or smoothie.',
    price: 26,
  }, {
    id: '004',
    brand: 'Yamamoto Nutrition',
    name: 'Yamamoto Whey Protein',
    imageUrl: 'ym_whey.png',
    suggested_use: 'GOLD STANDARD 100% WHEY is best enjoyed first thing in the morning and/or during the 30 minutes just before or immediately after training.\nSimply mix one rounded scoop (31 g )in 180-240 ml of cold water. You can also add a serving to smoothies, protein balls, muffins, porridge or other meals as another great way to get a protein hit in the kitchen.',
    price: 24.55,
  }
];