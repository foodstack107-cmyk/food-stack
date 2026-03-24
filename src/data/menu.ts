export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  spicyLevel: number;
  dietary: string[];
}

export const categories = [
  'Appetizers',
  'Main',
  'Desserts',
  'Drinks',
  'Lassi',
  'Falooda',
];

export const dietaryTags = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Low-Carb',
  'Drinks',
  'Lassi',
  'Falooda',
];

export const menuItems: MenuItem[] = [
  // Appetizers

  {
    id: 1,
    name: 'Crispy Spring Rolls',
    description:
      'Fresh vegetables wrapped in crispy rice paper, served with sweet chili sauce',
    price: 746,
    category: 'Appetizers',
    image:
      'https://themom100.com/wp-content/uploads/2024/01/vietnamese-spring-rolls-5580.jpg',
    spicyLevel: 1,
    dietary: ['Vegetarian'],
  },
  {
    id: 6,
    name: 'Bruschetta',
    description: 'Toasted bread topped with fresh tomatoes, garlic, and basil',
    price: 663,
    category: 'Appetizers',
    image:
      'https://cookingwithwineblog.com/wp-content/uploads/2023/11/Marinated-Tomato-and-Balsamic-Bruschetta-Featured-1.jpg',
    spicyLevel: 0,
    dietary: ['Vegetarian', 'Vegan'],
  },
  {
    id: 23,
    name: 'Pani puri (8 pcs.)',
    description:
      'Round hollow fried crisp served with the mixture of potato. onions and black chickpeas accompained by spicy mint chutney and tamarind chutney.',
    price: 912,
    category: 'Appetizers',
    image:
      'https://content.jdmagicbox.com/comp/def_content/pani_puri_centres/default-pani-puri-centres-4.jpg',
    spicyLevel: 0,
    dietary: ['Vegetarian', 'Vegan'],
  },
  {
    id: 24,
    name: 'Dahi puri (8 pcs.)',
    description:
      'A snack made with puris suﬀed with Dahi (sweet yogart), Green chutney, sev ( fried thin gram flour vermicell), potato and black chickpeas.',
    price: 1078,
    category: 'Appetizers',
    image:
      'https://tastedrecipes.com/wp-content/uploads/2022/08/dahi-puri-3-848x424.jpg',
    spicyLevel: 0,
    dietary: ['Vegetarian', 'Vegan'],
  },
  {
    id: 25,
    name: 'Ragda puri (8 pcs.)',
    description:
      "Round hollow fried crisp puris topped with hot ragada gravy. garnished with onions and coriander served with shivshakti special panipuri's water.",
    price: 1078,
    category: 'Appetizers',
    image:
      'https://i.ytimg.com/vi/nWgDXiFDI3g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC_Ug6TLwC0WbLN79xpB0mhjLzbfQ',
    spicyLevel: 0,
    dietary: ['Vegetarian', 'Vegan'],
  },
  {
    id: 26,
    name: 'Sev puri (8 pcs.)',
    description:
      'Combination of puri (Round hollow fried crisp), Sev ( a lot of sev) black chickpeas & boiled potato served with green chutney and tamarind chutney.',
    price: 1078,
    category: 'Appetizers',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTUyGzQaJ6BgrfHv19f2QtGUdu02HT_sOzLA&s',
    spicyLevel: 0,
    dietary: ['Vegetarian', 'Vegan'],
  },

  // Main

  {
    id: 2,
    name: 'Grilled Salmon',
    description:
      'Fresh Atlantic salmon with lemon herb butter sauce and seasonal vegetables',
    price: 2074,
    category: 'Main',
    image:
      'https://www.thespruceeats.com/thmb/HgM2h42z1HGEcSWkWk5CgAjDDpQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-grill-salmon-2216658-hero-01-a9c948f8a238400ebaafc0caf509c7fa.jpg',
    spicyLevel: 0,
    dietary: ['Gluten-Free', 'Keto'],
  },
  {
    id: 3,
    name: 'Spicy Thai Curry',
    description:
      'Authentic Thai red curry with coconut milk, vegetables, and your choice of protein',
    price: 1576,
    category: 'Main',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/thai-red-curry-34c1e6d.jpg',
    spicyLevel: 3,
    dietary: ['Dairy-Free', 'Gluten-Free'],
  },
  {
    id: 7,
    name: 'Quinoa Buddha Bowl',
    description: 'Fresh mixed vegetables, quinoa, avocado, and tahini dressing',
    price: 1410,
    category: 'Main',
    image:
      'https://www.vibrantplate.com/wp-content/uploads/2018/05/Quinoa-buddha-bowl-03.jpg',
    spicyLevel: 0,
    dietary: ['Vegan', 'Gluten-Free', 'Low-Carb'],
  },

  //Desserts

  {
    id: 4,
    name: 'Chocolate Lava Cake',
    description:
      'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 829,
    category: 'Desserts',
    image:
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1000',
    spicyLevel: 0,
    dietary: ['Vegetarian'],
  },

  // Drinks
  {
    id: 5,
    name: 'Craft Mojito',
    description:
      'Fresh mint, lime, rum, and soda water with a hint of sweetness',
    price: 1078,
    category: 'Drinks',
    image:
      'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1000',
    spicyLevel: 0,
    dietary: ['Vegan', 'Gluten-Free'],
  },

  {
    id: 8,
    name: 'Matcha Green Tea Latte',
    description: 'Premium matcha green tea with steamed oat milk',
    price: 497,
    category: 'Drinks',
    image:
      'https://thumbs.dreamstime.com/b/matcha-latte-art-heart-shape-top-wooden-table-some-gr-green-tea-powder-tools-tea-making-japanese-style-87708022.jpg',
    spicyLevel: 0,
    dietary: ['Vegan', 'Dairy-Free'],
  },
  {
    id: 9,
    name: 'Rose',
    description: 'Refreshing, creamy, floral',
    price: 829,
    category: 'Falooda',
    image:
      'https://southindianfoods.in/recipe_picture_enlarge/rose-falooda.jpg',
    spicyLevel: 0,
    dietary: ['Drinks', 'Falooda'],
  },
  {
    id: 10,
    name: 'Kesar Pista',
    description: 'Saffron Pistacho',
    price: 829,
    category: 'Falooda',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKpHgf6KqiOnMDch245Bd-BJiZ-XzW44dvgNt892y03GyJrFhOkGclkpWijMCOwqCcYmkbDRTdkxmgunvgllfOGAnJD08dj3bxU0qStiVU4_Hz_pN2XJtWOdV2gJm22BnvxiwY16c2IKak/s1600/Kesar+Pista+Falooda+Mix+Recipe+-+Instant+Falooda+Mix+-+Priya+R+-+Magic+of+Indian+Rasoi+%25283%2529.JPG',
    spicyLevel: 0,
    dietary: ['Drinks', 'Falooda'],
  },
  {
    id: 11,
    name: 'Rabdi',
    description: 'Conditioned Milk Flouvar',
    price: 829,
    category: 'Falooda',
    image:
      'https://www.chefkunalkapur.com/wp-content/uploads/2022/05/Rabri-Falooda-scaled.jpg?v=1651374892',
    spicyLevel: 0,
    dietary: ['Drinks', 'Falooda'],
  },
  {
    id: 12,
    name: 'Rajbhog',
    description: 'Best Fusion of Flowers & Dryfruits',
    price: 829,
    category: 'Falooda',
    image:
      'https://rukminim2.flixcart.com/image/850/1000/kqttg280/milk-drink-mix/p/n/j/200-rajbhog-falooda-mix-200-gm-milk-products-for-children-and-original-imag4rfye9syv5jg.jpeg?q=90&crop=false',
    spicyLevel: 0,
    dietary: ['Drinks', 'Falooda'],
  },
  {
    id: 13,
    name: 'Rose',
    description: 'Fragrant, elegant, timeless',
    price: 497,
    category: 'Lassi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsoA3bsRzbuDLJd9BrEhHnpjdbHHf5yw4ZNQ&s',
    spicyLevel: 0,
    dietary: ['Drinks', 'Lassi'],
  },
  {
    id: 14,
    name: 'Mango',
    description: 'Juicy, tropical, vibrant',
    price: 497,
    category: 'Lassi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPacdvq97vGkJg_I5jrtj3D2wwPHDdpg3tPA&s',
    spicyLevel: 0,
    dietary: ['Drinks', 'Lassi'],
  },
  {
    id: 15,
    name: 'Chocolate',
    description: 'Rich, decadent, indulgent',
    price: 497,
    category: 'Lassi',
    image:
      'https://thepepper.in/wp-content/uploads/2019/02/Chocolate-Lassi.jpg',
    spicyLevel: 0,
    dietary: ['Drinks', 'Lassi'],
  },
  {
    id: 16,
    name: 'Butterscoth',
    description: 'Crunchy, buttery, caramelized',
    price: 497,
    category: 'Lassi',
    image:
      'https://d36v5spmfzyapc.cloudfront.net/wp-content/uploads/2022/07/Coconut-Lassi-3.jpg',
    spicyLevel: 0,
    dietary: ['Drinks', 'Lassi'],
  },
  {
    id: 17,
    name: 'Safron',
    description: 'Aromatic, golden, exotic',
    price: 497,
    category: 'Lassi',
    image:
      'https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/Kesar_Pista_Lassi_Recipe-3.jpg',
    spicyLevel: 0,
    dietary: ['Drinks', 'Lassi'],
  },
  {
    id: 18,
    name: 'Kesar Pista',
    description: 'Saffron Pistacho',
    price: 497,
    category: 'Lassi',
    image:
      'https://www.yummyfoodrecipes.com/resources/picture/org/Kesar-Pista-Lassi-Recipe.jpg',
    spicyLevel: 0,
    dietary: ['Drinks', 'Lassi'],
  },
  {
    id: 19,
    name: 'Variyali',
    description: 'Green Fennel Seeds',
    price: 497,
    category: 'Lassi',
    image:
      'https://img-global.cpcdn.com/recipes/3ac12a724a0abf84/680x482cq70/%E0%AA%B5%E0%AA%B0%E0%AA%AF%E0%AA%B3-%E0%AA%B2%E0%AA%B8%E0%AA%B8-variyali-lassi-recipe-in-gujarati-%E0%AA%B0%E0%AA%B8%E0%AA%AA-%E0%AA%AE%E0%AA%96%E0%AA%AF-%E0%AA%AB%E0%AA%9F.jpg',
    spicyLevel: 0,
    dietary: ['Drinks', 'Lassi'],
  },
  {
    id: 20,
    name: 'Rabdi',
    description: 'Conditioned Milk Flouvar',
    price: 497,
    category: 'Lassi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrQExnlNJYMYSYyx8zYdvVX3r9BP9ar-fFBQ&s',
    spicyLevel: 0,
    dietary: ['Drinks', 'Lassi'],
  },
  {
    id: 21,
    name: 'Khus',
    description: 'Flavourfull Indian Hurb',
    price: 497,
    category: 'Lassi',
    image:
      'https://www.vidhyashomecooking.com/wp-content/uploads/2023/06/CucumberLassiRecipe.jpg',
    spicyLevel: 0,
    dietary: ['Drinks', 'Lassi'],
  },
  {
    id: 22,
    name: 'Rajbhog',
    description: 'Best Fusion of Flowers & Dryfruits',
    price: 497,
    category: 'Lassi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwu_W05gDeZANgBAtZD58yNUMBPMzSjHF8Rg&s',
    spicyLevel: 0,
    dietary: ['Drinks', 'Lassi'],
  },
];
