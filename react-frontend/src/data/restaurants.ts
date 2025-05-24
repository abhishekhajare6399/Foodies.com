import { Restaurant, MenuItem } from '../types';

// Define the data for restaurants
export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Paradise',
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
    description: 'Authentic Italian pizzas made with fresh ingredients and traditional recipes.',
    rating: 4.8,
    category: 'Italian',
    prepTime: '20-30 min',
    discount: '10% off on orders above $30',
    address: '123 Pizza Street, Foodville',
    contact: '+1 (555) 123-4567',
    isOpen: true
  },
  {
    id: '2',
    name: 'Burger Bliss',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    description: 'Juicy burgers with premium beef patties and gourmet toppings.',
    rating: 4.6,
    category: 'American',
    prepTime: '15-25 min',
    discount: 'Free drink with every burger',
    address: '456 Burger Avenue, Meattown',
    contact: '+1 (555) 234-5678',
    isOpen: true
  },
  {
    id: '3',
    name: 'Sushi Sensation',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    description: 'Fresh and flavorful sushi made by expert Japanese chefs.',
    rating: 4.9,
    category: 'Japanese',
    prepTime: '25-35 min',
    address: '789 Sushi Lane, Fishburg',
    contact: '+1 (555) 345-6789',
    isOpen: true
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg',
    description: 'Authentic Mexican tacos with homemade tortillas and fresh fillings.',
    rating: 4.7,
    category: 'Mexican',
    prepTime: '15-20 min',
    discount: '15% off on Taco Tuesday',
    address: '321 Taco Road, Spiceville',
    contact: '+1 (555) 456-7890',
    isOpen: true
  },
  {
    id: '5',
    name: 'Curry House',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    description: 'Flavorful Indian curries with aromatic spices and rich flavors.',
    rating: 4.5,
    category: 'Indian',
    prepTime: '30-40 min',
    address: '567 Curry Street, Spicetown',
    contact: '+1 (555) 567-8901',
    isOpen: false
  },
  {
    id: '6',
    name: 'Noodle Palace',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    description: 'Delicious Asian noodles in various styles from ramen to pho.',
    rating: 4.4,
    category: 'Asian',
    prepTime: '20-30 min',
    discount: 'Buy 1 Get 1 Free on Weekends',
    address: '890 Noodle Boulevard, Slurpville',
    contact: '+1 (555) 678-9012',
    isOpen: true
  },
  {
    id: '7',
    name: 'Salad Spot',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    description: 'Fresh and healthy salads with locally sourced ingredients.',
    rating: 4.3,
    category: 'Healthy',
    prepTime: '10-15 min',
    discount: '5% off on all orders',
    address: '432 Green Street, Healthville',
    contact: '+1 (555) 789-0123',
    isOpen: true
  },
  {
    id: '8',
    name: 'Breakfast Barn',
    image: 'https://images.pexels.com/photos/2662875/pexels-photo-2662875.jpeg',
    description: 'All-day breakfast classics from pancakes to eggs benedict.',
    rating: 4.7,
    category: 'Breakfast',
    prepTime: '15-25 min',
    address: '654 Morning Avenue, Eggtown',
    contact: '+1 (555) 890-1234',
    isOpen: true
  }
];

export const menuItems: Record<string, MenuItem[]> = {
  '1': [ // Pizza Paradise
    {
      id: '1-1',
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato sauce, mozzarella, and basil.',
      image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
      price: 12.99,
      category: 'Pizza',
      restaurantId: '1'
    },
    {
      id: '1-2',
      name: 'Pepperoni Pizza',
      description: 'Pizza topped with tomato sauce, mozzarella, and pepperoni slices.',
      image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
      price: 14.99,
      category: 'Pizza',
      restaurantId: '1'
    },
    {
      id: '1-3',
      name: 'Veggie Supreme',
      description: 'Pizza loaded with bell peppers, onions, mushrooms, olives, and tomatoes.',
      image: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg',
      price: 15.99,
      category: 'Pizza',
      restaurantId: '1'
    },
    {
      id: '1-4',
      name: 'Garlic Breadsticks',
      description: 'Freshly baked breadsticks topped with garlic butter and herbs.',
      image: 'https://images.pexels.com/photos/1885578/pexels-photo-1885578.jpeg',
      price: 5.99,
      category: 'Sides',
      restaurantId: '1'
    },
    {
      id: '1-5',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.',
      image: 'https://images.pexels.com/photos/6163263/pexels-photo-6163263.jpeg',
      price: 6.99,
      category: 'Dessert',
      restaurantId: '1'
    }
  ],
  '2': [ // Burger Bliss
    {
      id: '2-1',
      name: 'Classic Cheeseburger',
      description: 'Beef patty with cheese, lettuce, tomato, onion, and special sauce.',
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
      price: 8.99,
      category: 'Burger',
      restaurantId: '2'
    },
    {
      id: '2-2',
      name: 'Bacon Deluxe',
      description: 'Beef patty with crispy bacon, cheddar cheese, lettuce, and BBQ sauce.',
      image: 'https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg',
      price: 10.99,
      category: 'Burger',
      restaurantId: '2'
    },
    {
      id: '2-3',
      name: 'Veggie Burger',
      description: 'Plant-based patty with avocado, lettuce, tomato, and vegan mayo.',
      image: 'https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg',
      price: 9.99,
      category: 'Burger',
      restaurantId: '2'
    },
    {
      id: '2-4',
      name: 'French Fries',
      description: 'Crispy golden fries seasoned with sea salt.',
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
      price: 3.99,
      category: 'Sides',
      restaurantId: '2'
    },
    {
      id: '2-5',
      name: 'Chocolate Milkshake',
      description: 'Thick and creamy chocolate milkshake topped with whipped cream.',
      image: 'https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg',
      price: 4.99,
      category: 'Drinks',
      restaurantId: '2'
    }
  ]
};

// Demo orders
export const demoOrders = [
  {
    id: 'ord-001',
    userId: '123',
    restaurantId: '1',
    restaurantName: 'Pizza Paradise',
    items: [
      {
        ...menuItems['1'][0],
        quantity: 2
      },
      {
        ...menuItems['1'][3],
        quantity: 1
      }
    ],
    total: 31.97,
    status: 'delivered',
    date: new Date('2023-08-15T18:30:00'),
    address: '123 Main St, Anytown, USA',
    contact: '+1 (555) 123-4567'
  },
  {
    id: 'ord-002',
    userId: '123',
    restaurantId: '2',
    restaurantName: 'Burger Bliss',
    items: [
      {
        ...menuItems['2'][1],
        quantity: 1
      },
      {
        ...menuItems['2'][3],
        quantity: 1
      },
      {
        ...menuItems['2'][4],
        quantity: 1
      }
    ],
    total: 19.97,
    status: 'delivered',
    date: new Date('2023-08-10T19:45:00'),
    address: '123 Main St, Anytown, USA',
    contact: '+1 (555) 123-4567'
  },
  {
    id: 'ord-003',
    userId: '123',
    restaurantId: '1',
    restaurantName: 'Pizza Paradise',
    items: [
      {
        ...menuItems['1'][2],
        quantity: 1
      }
    ],
    total: 15.99,
    status: 'pending',
    date: new Date(),
    address: '123 Main St, Anytown, USA',
    contact: '+1 (555) 123-4567'
  }
];