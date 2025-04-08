import { 
  BookOpen, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Monitor, 
  Sofa, 
  Bike, 
  Camera, 
  Music, 
  Film, 
  Coffee, 
  Car, 
  Ticket,
  Users 
} from "lucide-react";

export type Category = {
  id: string;
  name: string;
  icon?: any;
  imageUrl?: string;
  type: 'buy' | 'rent' | 'share';
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'buy' | 'rent' | 'share';
  category: string;
  condition?: string;
  duration?: string;
  location: string;
  images: string[];
  owner: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  createdAt: string;
  featured?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  college: string;
  avatar: string;
  memberSince: string;
  listings: string[];
  activeRentals: Listing[];
  activeShares: Listing[];
};

// Categories data
export const categories: Category[] = [
  { id: 'books', name: 'Books', icon: BookOpen, type: 'buy' },
  { id: 'electronics', name: 'Electronics', icon: Smartphone, type: 'buy' },
  { id: 'gadgets', name: 'Gadgets', icon: Headphones, type: 'buy' },
  { id: 'laptops', name: 'Laptops', icon: Laptop, type: 'buy' },
  
  { id: 'furniture', name: 'Furniture', icon: Sofa, type: 'rent' },
  { id: 'electronics-rent', name: 'Electronics', icon: Monitor, type: 'rent' },
  { id: 'bikes', name: 'Bikes', icon: Bike, type: 'rent' },
  { id: 'cameras', name: 'Cameras', icon: Camera, type: 'rent' },
  
  { 
    id: 'music', 
    name: 'Music', 
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&h=200', 
    type: 'share' 
  },
  { 
    id: 'streaming', 
    name: 'Streaming', 
    imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=200&h=200', 
    type: 'share' 
  },
  { 
    id: 'food', 
    name: 'Food', 
    imageUrl: 'https://images.unsplash.com/photo-1484659619207-9165d119dafe?auto=format&fit=crop&w=200&h=200', 
    type: 'share' 
  },
  { 
    id: 'rides', 
    name: 'Rides', 
    imageUrl: 'https://images.unsplash.com/photo-1471958680802-1345a694ba6d?auto=format&fit=crop&w=200&h=200', 
    type: 'share' 
  },
  { 
    id: 'tickets', 
    name: 'Tickets', 
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=200&h=200', 
    type: 'share' 
  },
  { 
    id: 'group-buys', 
    name: 'Group Buys', 
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&h=200', 
    type: 'share' 
  },
];

// Listings data
export const listings: Listing[] = [
  {
    id: '1',
    title: 'Physics Textbook - University Year 1',
    description: 'Almost new physics textbook for first-year students. Covers mechanics, thermodynamics, and basic quantum physics.',
    price: 1200,
    type: 'buy',
    category: 'books',
    condition: 'Like New',
    location: 'Stanford University',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1973&auto=format&fit=crop'
    ],
    owner: {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop',
      rating: 4.8
    },
    createdAt: '2025-02-15',
    featured: true
  },
  {
    id: '2',
    title: 'iPhone 13 Pro - Great Condition',
    description: 'iPhone 13 Pro, 128GB, Graphite color. Minor scratches on the back but perfect screen. Includes original charger and box.',
    price: 35000,
    type: 'buy',
    category: 'electronics',
    condition: 'Good',
    location: 'MIT',
    images: [
      'https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565104781149-e8109775beab?q=80&w=2015&auto=format&fit=crop'
    ],
    owner: {
      id: 'user2',
      name: 'Maya Peters',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
      rating: 4.9
    },
    createdAt: '2025-03-01',
    featured: true
  },
  {
    id: '3',
    title: 'Wireless Noise-Cancelling Headphones',
    description: 'Sony WH-1000XM4 headphones, purchased 6 months ago. Great sound quality and noise cancellation.',
    price: 12000,
    type: 'buy',
    category: 'gadgets',
    condition: 'Excellent',
    location: 'UCLA',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1976&auto=format&fit=crop'
    ],
    owner: {
      id: 'user3',
      name: 'Tyler Wong',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1480&auto=format&fit=crop',
      rating: 4.6
    },
    createdAt: '2025-02-28',
    featured: false
  },
  {
    id: '4',
    title: 'MacBook Pro 14" M1 Pro',
    description: 'MacBook Pro with M1 Pro chip, 16GB RAM, 512GB SSD. Used for one semester for design projects.',
    price: 92000,
    type: 'buy',
    category: 'laptops',
    condition: 'Like New',
    location: 'NYU',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1452&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop'
    ],
    owner: {
      id: 'user4',
      name: 'Jamie Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop',
      rating: 5.0
    },
    createdAt: '2025-03-05',
    featured: true
  },
  {
    id: '5',
    title: 'Modern Study Desk with Chair',
    description: 'Contemporary study desk with ergonomic chair. Perfect for small dorm rooms. Available for the semester.',
    price: 800,
    type: 'rent',
    category: 'furniture',
    duration: 'Per Week',
    location: 'Columbia University',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=2039&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580480055273-00dcc994a43e?q=80&w=2000&auto=format&fit=crop'
    ],
    owner: {
      id: 'user5',
      name: 'Sam Taylor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
      rating: 4.7
    },
    createdAt: '2025-02-20',
    featured: true
  },
  {
    id: '6',
    title: 'Gaming Monitor - 27" 144Hz',
    description: 'High refresh rate gaming monitor, perfect for gaming sessions or design work. Rent for a few days or weeks.',
    price: 500,
    type: 'rent',
    category: 'electronics-rent',
    duration: 'Per Day',
    location: 'UC Berkeley',
    images: [
      'https://images.unsplash.com/photo-1629429407756-28d4acf2cc52?q=80&w=2066&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593152167544-085d3b9c4938?q=80&w=2071&auto=format&fit=crop'
    ],
    owner: {
      id: 'user6',
      name: 'Riley Clark',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
      rating: 4.5
    },
    createdAt: '2025-02-25',
    featured: false
  },
  {
    id: '7',
    title: 'City Bike - Perfect for Campus',
    description: 'Trek FX 2 bike, perfect for getting around campus. Available for daily, weekly, or monthly rental.',
    price: 400,
    type: 'rent',
    category: 'bikes',
    duration: 'Per Day',
    location: 'Harvard University',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=2068&auto=format&fit=crop'
    ],
    owner: {
      id: 'user7',
      name: 'Jordan Smith',
      avatar: 'https://images.unsplash.com/photo-1544005313-9feb3edaa68d?q=80&w=1976&auto=format&fit=crop',
      rating: 4.8
    },
    createdAt: '2025-03-02',
    featured: true
  },
  {
    id: '8',
    title: 'DSLR Camera with Lens Kit',
    description: 'Canon EOS Rebel T7 with 18-55mm lens. Great for photography projects or weekend trips. Includes SD card and bag.',
    price: 1000,
    type: 'rent',
    category: 'cameras',
    duration: 'Per Day',
    location: 'Princeton University',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=2070&auto=format&fit=crop'
    ],
    owner: {
      id: 'user8',
      name: 'Casey Jones',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
      rating: 4.9
    },
    createdAt: '2025-02-18',
    featured: false
  },
  {
    id: '9',
    title: 'Spotify Premium Family (2 slots)',
    description: 'Sharing 2 slots on my Spotify Premium Family plan. ₹250 per month per slot. Ad-free music and offline listening.',
    price: 250,
    type: 'share',
    category: 'music',
    duration: 'Per Month',
    location: 'Yale University',
    images: [
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?q=80&w=2074&auto=format&fit=crop'
    ],
    owner: {
      id: 'user9',
      name: 'Taylor Reed',
      avatar: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=1964&auto=format&fit=crop',
      rating: 4.7
    },
    createdAt: '2025-03-10',
    featured: true
  },
  {
    id: '10',
    title: 'Netflix Standard Plan Share',
    description: 'Sharing Netflix Standard plan (1080p, 2 screens). ₹200 per month for your own profile.',
    price: 200,
    type: 'share',
    category: 'streaming',
    duration: 'Per Month',
    location: 'Duke University',
    images: [
      'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1170&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=1170&auto=format&fit=crop'
    ],
    owner: {
      id: 'user10',
      name: 'Morgan Lee',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1022&auto=format&fit=crop',
      rating: 4.6
    },
    createdAt: '2025-02-22',
    featured: false
  },
  {
    id: '11',
    title: 'Grubhub+ Membership Split',
    description: 'Split my Grubhub+ membership for free delivery on food orders. ₹150 per month.',
    price: 150,
    type: 'share',
    category: 'food',
    duration: 'Per Month',
    location: 'University of Chicago',
    images: [
      'https://images.unsplash.com/photo-1615719413546-198b25453f85?q=80&w=1036&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484659619207-9165d119dafe?q=80&w=1170&auto=format&fit=crop'
    ],
    owner: {
      id: 'user11',
      name: 'Avery Kim',
      avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1123&auto=format&fit=crop',
      rating: 4.8
    },
    createdAt: '2025-03-08',
    featured: true
  },
  {
    id: '12',
    title: 'Weekend Ride to Chicago',
    description: 'Driving to Chicago this weekend (Mar 15-17). Have 3 empty seats. Split gas and tolls, approximately ₹750 per person.',
    price: 750,
    type: 'share',
    category: 'rides',
    duration: 'One Time',
    location: 'University of Michigan',
    images: [
      'https://images.unsplash.com/photo-1471958680802-1345a694ba6d?q=80&w=2066&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1931&auto=format&fit=crop'
    ],
    owner: {
      id: 'user12',
      name: 'Quinn Wilson',
      avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1935&auto=format&fit=crop',
      rating: 4.9
    },
    createdAt: '2025-03-05',
    featured: false
  },
  {
    id: '13',
    title: 'Concert Tickets - The Weeknd (2 available)',
    description: 'Two tickets to The Weeknd concert at Madison Square Garden on April 10. Section B, Row 15. Selling at face value.',
    price: 5500,
    type: 'share',
    category: 'tickets',
    duration: 'One Time',
    location: 'NYU',
    images: [
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop'
    ],
    owner: {
      id: 'user13',
      name: 'Jesse Patel',
      avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1989&auto=format&fit=crop',
      rating: 5.0
    },
    createdAt: '2025-03-01',
    featured: true
  },
  {
    id: '14',
    title: 'Amazon Prime Student Group Buy',
    description: 'Setting up an Amazon Prime Student group (up to 4 people). ₹180 per month per person for Prime benefits.',
    price: 180,
    type: 'share',
    category: 'group-buys',
    duration: 'Per Month',
    location: 'Stanford University',
    images: [
      'https://images.unsplash.com/photo-1612103198005-b298c0e5eb42?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605752651290-6c7b8e0b0e9f?q=80&w=1169&auto=format&fit=crop'
    ],
    owner: {
      id: 'user14',
      name: 'Blake Thompson',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop',
      rating: 4.7
    },
    createdAt: '2025-03-07',
    featured: false
  }
];

// Current user data
export const currentUser: User = {
  id: 'user20',
  name: 'Jordan Taylor',
  email: 'jordan.taylor@university.edu',
  college: 'Stanford University',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
  memberSince: '2024-09-01',
  listings: ['5', '9', '11'],
  activeRentals: [
    listings[6], // Bike
    listings[7], // Camera
  ],
  activeShares: [
    listings[9], // Netflix
  ]
};

// Helper functions
export const getListingsByType = (type: 'buy' | 'rent' | 'share'): Listing[] => {
  return listings.filter(listing => listing.type === type);
};

export const getFeaturedListings = (): Listing[] => {
  return listings.filter(listing => listing.featured);
};

export const getListingById = (id: string): Listing | undefined => {
  return listings.find(listing => listing.id === id);
};

export const getCategoriesByType = (type: 'buy' | 'rent' | 'share'): Category[] => {
  return categories.filter(category => category.type === type);
};

export const getRelatedListings = (listing: Listing, count: number = 3): Listing[] => {
  return listings
    .filter(item => item.id !== listing.id && item.category === listing.category)
    .slice(0, count);
};
