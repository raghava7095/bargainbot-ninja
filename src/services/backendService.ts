
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
        reviewCount: p.reviews,
        description: p.description,
        currentPrice: p.price,
        originalPrice: p.originalPrice,
        discountPercentage: p.discountPercentage,
        store: p.retailer,
        inStock: p.inStock,
        priceChange: 0, // Default value for compatibility
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
        description: product.description,
        currentPrice: product.price,
        originalPrice: product.originalPrice,
        discountPercentage: product.discountPercentage,
        store: product.retailer,
        inStock: product.inStock,
        priceChange: 0, // Default value for compatibility
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
        description: p.description,
        currentPrice: p.price,
        originalPrice: p.originalPrice,
        discountPercentage: p.discountPercentage,
        store: p.retailer,
        inStock: p.inStock,
        priceChange: 0, // Default value for compatibility
        link: p.link
      }));
    } catch (error) {
      console.error('Error getting price comparisons:', error);
      return [];
    }
  }
};
