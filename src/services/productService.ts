
// This file simulates a product API service
// In a real application, this would connect to a backend server
// that would handle web scraping or external API calls

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  rating: number;
  reviews: number;
  retailer: string;
  category: string;
  inStock: boolean;
  link: string;
}

interface PriceHistory {
  date: string;
  price: number;
}

// Mock product data (simulating data from multiple retailers)
const mockProducts: Product[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max - 256GB",
    description: "The latest iPhone with A17 Pro chip, titanium design, and advanced camera system.",
    price: 1099,
    originalPrice: 1199,
    discountPercentage: 8,
    image: "https://placehold.co/300x300?text=iPhone+15",
    rating: 4.8,
    reviews: 320,
    retailer: "Amazon",
    category: "Electronics",
    inStock: true,
    link: "https://example.com/iphone15-amazon"
  },
  {
    id: "2",
    title: "iPhone 15 Pro Max - 256GB",
    description: "Apple iPhone 15 Pro Max with Pro-level camera and all-day battery life.",
    price: 1149,
    originalPrice: 1199,
    discountPercentage: 4,
    image: "https://placehold.co/300x300?text=iPhone+15",
    rating: 4.7,
    reviews: 215,
    retailer: "Best Buy",
    category: "Electronics",
    inStock: true,
    link: "https://example.com/iphone15-bestbuy"
  },
  {
    id: "3",
    title: "iPhone 15 Pro Max - 256GB",
    description: "Experience the ultimate iPhone with amazing camera and the powerful A17 Pro chip.",
    price: 1199,
    image: "https://placehold.co/300x300?text=iPhone+15",
    rating: 4.9,
    reviews: 189,
    retailer: "Apple Store",
    category: "Electronics",
    inStock: true,
    link: "https://example.com/iphone15-apple"
  },
  {
    id: "4",
    title: "Samsung Galaxy S23 Ultra",
    description: "Samsung's flagship phone with S Pen, 200MP camera and powerful performance.",
    price: 949,
    originalPrice: 1199,
    discountPercentage: 21,
    image: "https://placehold.co/300x300?text=Galaxy+S23",
    rating: 4.6,
    reviews: 412,
    retailer: "Amazon",
    category: "Electronics",
    inStock: true,
    link: "https://example.com/s23ultra-amazon"
  },
  {
    id: "5",
    title: "Samsung Galaxy S23 Ultra",
    description: "The ultimate Galaxy experience with incredible camera capabilities.",
    price: 999,
    originalPrice: 1199,
    discountPercentage: 17,
    image: "https://placehold.co/300x300?text=Galaxy+S23",
    rating: 4.5,
    reviews: 308,
    retailer: "Samsung",
    category: "Electronics",
    inStock: true,
    link: "https://example.com/s23ultra-samsung"
  },
  {
    id: "6",
    title: "Sony WH-1000XM5",
    description: "Industry-leading noise cancelling headphones with exceptional sound quality.",
    price: 299,
    originalPrice: 399,
    discountPercentage: 25,
    image: "https://placehold.co/300x300?text=Sony+WH-1000XM5",
    rating: 4.7,
    reviews: 532,
    retailer: "Amazon",
    category: "Electronics",
    inStock: true,
    link: "https://example.com/sony-wh1000xm5-amazon"
  },
  {
    id: "7",
    title: "Sony WH-1000XM5",
    description: "Premium wireless headphones with best-in-class noise cancellation.",
    price: 329,
    originalPrice: 399,
    discountPercentage: 18,
    image: "https://placehold.co/300x300?text=Sony+WH-1000XM5",
    rating: 4.8,
    reviews: 429,
    retailer: "Best Buy",
    category: "Electronics",
    inStock: true,
    link: "https://example.com/sony-wh1000xm5-bestbuy"
  }
];

// Mock price history data
const mockPriceHistory: Record<string, PriceHistory[]> = {
  "1": [
    { date: "2023-06-01", price: 1199 },
    { date: "2023-07-01", price: 1199 },
    { date: "2023-08-01", price: 1149 },
    { date: "2023-09-01", price: 1149 },
    { date: "2023-10-01", price: 1099 },
    { date: "2023-11-01", price: 1099 }
  ],
  "2": [
    { date: "2023-06-01", price: 1199 },
    { date: "2023-07-01", price: 1199 },
    { date: "2023-08-01", price: 1179 },
    { date: "2023-09-01", price: 1179 },
    { date: "2023-10-01", price: 1149 },
    { date: "2023-11-01", price: 1149 }
  ],
  "3": [
    { date: "2023-06-01", price: 1199 },
    { date: "2023-07-01", price: 1199 },
    { date: "2023-08-01", price: 1199 },
    { date: "2023-09-01", price: 1199 },
    { date: "2023-10-01", price: 1199 },
    { date: "2023-11-01", price: 1199 }
  ],
  "4": [
    { date: "2023-06-01", price: 1199 },
    { date: "2023-07-01", price: 1149 },
    { date: "2023-08-01", price: 1099 },
    { date: "2023-09-01", price: 1049 },
    { date: "2023-10-01", price: 999 },
    { date: "2023-11-01", price: 949 }
  ],
  "5": [
    { date: "2023-06-01", price: 1199 },
    { date: "2023-07-01", price: 1199 },
    { date: "2023-08-01", price: 1099 },
    { date: "2023-09-01", price: 1099 },
    { date: "2023-10-01", price: 999 },
    { date: "2023-11-01", price: 999 }
  ],
  "6": [
    { date: "2023-06-01", price: 399 },
    { date: "2023-07-01", price: 379 },
    { date: "2023-08-01", price: 349 },
    { date: "2023-09-01", price: 349 },
    { date: "2023-10-01", price: 329 },
    { date: "2023-11-01", price: 299 }
  ],
  "7": [
    { date: "2023-06-01", price: 399 },
    { date: "2023-07-01", price: 389 },
    { date: "2023-08-01", price: 369 },
    { date: "2023-09-01", price: 349 },
    { date: "2023-10-01", price: 349 },
    { date: "2023-11-01", price: 329 }
  ]
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Product service with methods that simulate API calls
export const productService = {
  // Search for products across all retailers
  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(800); // Simulate network delay
    
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(product => 
      product.title.toLowerCase().includes(lowerQuery) || 
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  },
  
  // Get product by ID
  getProductById: async (id: string): Promise<Product | null> => {
    await delay(500);
    return mockProducts.find(product => product.id === id) || null;
  },
  
  // Get price comparison for a product across retailers
  getPriceComparison: async (productTitle: string): Promise<Product[]> => {
    await delay(800);
    
    const lowerTitle = productTitle.toLowerCase();
    return mockProducts.filter(product => 
      product.title.toLowerCase().includes(lowerTitle)
    );
  },
  
  // Get price history for a product
  getPriceHistory: async (productId: string): Promise<PriceHistory[]> => {
    await delay(700);
    return mockPriceHistory[productId] || [];
  },
  
  // Get product recommendations
  getRecommendations: async (productId: string): Promise<Product[]> => {
    await delay(900);
    
    // Get current product category
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return [];
    
    // Return products in the same category (excluding the current product)
    return mockProducts
      .filter(p => p.category === product.category && p.id !== productId)
      .slice(0, 4);
  },
  
  // Get trending products
  getTrendingProducts: async (): Promise<Product[]> => {
    await delay(600);
    // In a real app, this would return products based on popularity metrics
    return mockProducts.slice(0, 6);
  },
  
  // Get deals (products with discounts)
  getDeals: async (): Promise<Product[]> => {
    await delay(700);
    return mockProducts.filter(product => product.discountPercentage && product.discountPercentage > 0)
      .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
  }
};
