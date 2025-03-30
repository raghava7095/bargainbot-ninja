
import { Product } from '@/components/ProductCard';

// Mock API response for product search
const mockProductData: Product[] = [
  {
    id: '1',
    title: 'Apple iPhone 15 Pro Max - 256GB - Natural Titanium',
    image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708',
    currentPrice: 1199.99,
    originalPrice: 1299.99,
    store: 'Amazon',
    rating: 4.8,
    priceChange: {
      amount: 100,
      direction: 'down'
    },
    isBestDeal: true,
    aiRecommendation: 'Great time to buy! Price just dropped to its lowest in 6 months.',
    link: 'https://www.amazon.com'
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23 Ultra - 512GB - Phantom Black',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-s918bzkcins/gallery/in-galaxy-s23-ultra-sm-s918-sm-s918bzkcins-534855516?$650_519_PNG$',
    currentPrice: 1149.99,
    originalPrice: 1249.99,
    store: 'BestBuy',
    rating: 4.7,
    priceChange: {
      amount: 50,
      direction: 'down'
    },
    link: 'https://www.bestbuy.com'
  },
  {
    id: '3',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    image: 'https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SL1500_.jpg',
    currentPrice: 348.00,
    originalPrice: 399.99,
    store: 'Amazon',
    rating: 4.6,
    priceChange: {
      amount: 51.99,
      direction: 'down'
    },
    link: 'https://www.amazon.com'
  },
  {
    id: '4',
    title: 'Apple MacBook Air M2 - 13.6" - 8GB RAM - 256GB SSD',
    image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
    currentPrice: 999.00,
    originalPrice: 1199.00,
    store: 'Walmart',
    rating: 4.9,
    priceChange: {
      amount: 200,
      direction: 'down'
    },
    isBestDeal: true,
    aiRecommendation: 'Buy now! This is the lowest price we\'ve seen for the M2 MacBook Air.',
    link: 'https://www.walmart.com'
  },
  {
    id: '5',
    title: 'LG C2 65-inch OLED 4K Smart TV',
    image: 'https://m.media-amazon.com/images/I/81LkYlj9+mL._AC_SL1500_.jpg',
    currentPrice: 1599.99,
    originalPrice: 2099.99,
    store: 'Target',
    rating: 4.8,
    priceChange: {
      amount: 500,
      direction: 'down'
    },
    link: 'https://www.target.com'
  }
];

// In a real app, this would call actual API endpoints for different platforms
export const searchProducts = async (query: string): Promise<Product[]> => {
  console.log(`Searching for: ${query}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Filter mock data based on query (case-insensitive)
  if (query) {
    return mockProductData.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  return mockProductData;
};

// Get product details by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  console.log(`Fetching product details for ID: ${id}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const product = mockProductData.find(product => product.id === id);
  return product || null;
};

// Get trending products
export const getTrendingProducts = async (): Promise<Product[]> => {
  console.log('Fetching trending products');
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Return first 3 products as "trending"
  return mockProductData.slice(0, 3);
};

// Get top deals
export const getTopDeals = async (): Promise<Product[]> => {
  console.log('Fetching top deals');
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return products with biggest price drops
  return mockProductData
    .filter(product => product.priceChange.direction === 'down')
    .sort((a, b) => b.priceChange.amount - a.priceChange.amount);
};

// Get price comparison from multiple stores
export const getPriceComparison = async (productName: string): Promise<Product[]> => {
  console.log(`Comparing prices for: ${productName}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, this would search across different platforms and return matching products
  return mockProductData;
};
