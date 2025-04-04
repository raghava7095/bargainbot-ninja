
import { Product } from '@/components/ProductCard';

// Define types for API responses
export interface PriceHistory {
  date: string;
  price: number;
  retailer: string;
}

export interface AIAdvice {
  recommendation: string;
  confidence: number;
  reasoning: string;
}

// Helper function to ensure retailer name matches allowed values
const mapRetailerToStore = (retailer: string): 'Amazon' | 'Flipkart' | 'Walmart' | 'Target' | 'BestBuy' => {
  // Map retailer names to the allowed store values
  switch(retailer) {
    case 'Amazon':
      return 'Amazon';
    case 'Best Buy':
      return 'BestBuy';
    case 'Walmart':
      return 'Walmart';
    case 'Target':
      return 'Target';
    case 'Flipkart':
      return 'Flipkart';
    default:
      // Default to Amazon if the retailer isn't in our allowed list
      console.warn(`Unknown retailer: ${retailer}, defaulting to Amazon`);
      return 'Amazon';
  }
};

// Backend service to connect with our backend
export const backendService = {
  // Get all products matching search query
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      // For now, use the existing mock data service
      const { productService } = await import('./productService');
      const products = await productService.searchProducts(query);
      
      // Map to match the Product interface from ProductCard
      return products.map(p => ({
        id: p.id,
        title: p.title,
        image: p.image,
        rating: p.rating,
        // reviewCount has been changed to match Product interface
        reviewCount: p.reviews,
        description: p.description,
        currentPrice: p.price,
        originalPrice: p.originalPrice || p.price,
        discountPercentage: p.discountPercentage,
        store: mapRetailerToStore(p.retailer),
        inStock: p.inStock,
        priceChange: {
          amount: 0,
          direction: 'stable' as const
        },
        link: p.link
      }));
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },
  
  // Get product details by ID
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const { productService } = await import('./productService');
      const product = await productService.getProductById(id);
      
      if (!product) return null;
      
      // Map to match the Product interface from ProductCard
      return {
        id: product.id,
        title: product.title,
        image: product.image,
        rating: product.rating,
        reviewCount: product.reviews,
        currentPrice: product.price,
        originalPrice: product.originalPrice || product.price,
        discountPercentage: product.discountPercentage,
        store: mapRetailerToStore(product.retailer),
        inStock: product.inStock,
        priceChange: {
          amount: 0,
          direction: 'stable' as const
        },
        link: product.link
      };
    } catch (error) {
      console.error('Error getting product details:', error);
      return null;
    }
  },
  
  // Get price history for a product
  getPriceHistory: async (productId: string): Promise<PriceHistory[]> => {
    try {
      const { productService } = await import('./productService');
      const priceHistoryData = await productService.getPriceHistory(productId);
      
      // Add retailer field to match our PriceHistory interface
      const product = await productService.getProductById(productId);
      return priceHistoryData.map(item => ({
        ...item,
        retailer: product?.retailer || 'Unknown'
      }));
    } catch (error) {
      console.error('Error getting price history:', error);
      return [];
    }
  },
  
  // Get AI buying advice for a product
  getAIAdvice: async (productId: string): Promise<AIAdvice> => {
    try {
      // Simulate an AI advice API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // In the future, this would connect to an AI integration
      return {
        recommendation: "Wait for a better price",
        confidence: 0.85,
        reasoning: "Based on historical data, this product typically sees a 15% discount during end-of-month sales."
      };
    } catch (error) {
      console.error('Error getting AI advice:', error);
      return {
        recommendation: "No recommendation available",
        confidence: 0,
        reasoning: "Unable to process data at this time."
      };
    }
  },
  
  // Get price comparisons across retailers
  getPriceComparisons: async (productTitle: string): Promise<Product[]> => {
    try {
      const { productService } = await import('./productService');
      const products = await productService.getPriceComparison(productTitle);
      
      // Map to match the Product interface from ProductCard
      return products.map(p => ({
        id: p.id,
        title: p.title,
        image: p.image,
        rating: p.rating,
        reviewCount: p.reviews,
        currentPrice: p.price,
        originalPrice: p.originalPrice || p.price,
        discountPercentage: p.discountPercentage,
        store: mapRetailerToStore(p.retailer),
        inStock: p.inStock,
        priceChange: {
          amount: 0,
          direction: 'stable' as const
        },
        link: p.link
      }));
    } catch (error) {
      console.error('Error getting price comparisons:', error);
      return [];
    }
  }
};
