
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

// Backend service to connect with our Supabase backend
// This will replace the mock API calls in the future
export const backendService = {
  // Get all products matching search query
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      // For now, use the existing mock data service
      // In the future, this will connect to Supabase
      const { productService } = await import('./productService');
      return await productService.searchProducts(query);
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },
  
  // Get product details by ID
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const { productService } = await import('./productService');
      return await productService.getProductById(id);
    } catch (error) {
      console.error('Error getting product details:', error);
      return null;
    }
  },
  
  // Get price history for a product
  getPriceHistory: async (productId: string): Promise<PriceHistory[]> => {
    try {
      const { productService } = await import('./productService');
      return await productService.getPriceHistory(productId);
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
      
      // In the future, this would connect to an OpenAI integration
      // via Supabase Edge Functions
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
      return await productService.getPriceComparison(productTitle);
    } catch (error) {
      console.error('Error getting price comparisons:', error);
      return [];
    }
  }
};
