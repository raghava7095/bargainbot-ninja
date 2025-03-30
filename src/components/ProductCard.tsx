
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, ArrowDown, ArrowUp, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Product {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  store: 'Amazon' | 'Flipkart' | 'Walmart' | 'Target' | 'BestBuy';
  rating: number;
  priceChange: {
    amount: number;
    direction: 'up' | 'down' | 'stable';
  };
  isBestDeal?: boolean;
  aiRecommendation?: string;
  link: string;
}

interface ProductCardProps {
  product: Product;
  showStores?: boolean;
  showRecommendation?: boolean;
  className?: string;
}

const ProductCard = ({ 
  product, 
  showStores = true, 
  showRecommendation = false,
  className 
}: ProductCardProps) => {
  const discount = Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);
  
  const storeColors = {
    'Amazon': 'bg-[#FF9900]/10 text-[#FF9900]',
    'Flipkart': 'bg-[#2874F0]/10 text-[#2874F0]',
    'Walmart': 'bg-[#0071DC]/10 text-[#0071DC]',
    'Target': 'bg-[#CC0000]/10 text-[#CC0000]',
    'BestBuy': 'bg-[#0046BE]/10 text-[#0046BE]'
  };

  return (
    <div className={cn("product-card overflow-hidden", className)}>
      <div className="relative">
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-brand-red text-white">
            {discount}% OFF
          </Badge>
        )}
        {product.isBestDeal && (
          <div className="absolute top-2 right-2">
            <Badge className="best-deal-badge">
              <Tag className="h-3 w-3 mr-1" />
              Best Deal
            </Badge>
          </div>
        )}
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-48 object-contain mb-3 hover:scale-105 transition-transform"
          />
        </Link>
      </div>
      
      <div className="space-y-2">
        <Link to={`/product/${product.id}`} className="hover:text-brand-purple transition-colors">
          <h3 className="font-medium line-clamp-2 h-12">{product.title}</h3>
        </Link>
        
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">{product.rating.toFixed(1)}</span>
        </div>
        
        {showStores && (
          <Badge variant="outline" className={cn("font-normal", storeColors[product.store])}>
            {product.store}
          </Badge>
        )}
        
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">${product.currentPrice.toFixed(2)}</span>
            {product.originalPrice > product.currentPrice && (
              <span className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          {product.priceChange.direction !== 'stable' && (
            <div className="flex items-center mt-1">
              {product.priceChange.direction === 'down' ? (
                <>
                  <ArrowDown className="h-4 w-4 text-brand-green mr-1" />
                  <span className="text-brand-green text-sm">
                    ${product.priceChange.amount.toFixed(2)} from last week
                  </span>
                </>
              ) : (
                <>
                  <ArrowUp className="h-4 w-4 text-brand-red mr-1" />
                  <span className="text-brand-red text-sm">
                    ${product.priceChange.amount.toFixed(2)} from last week
                  </span>
                </>
              )}
            </div>
          )}
        </div>
        
        {showRecommendation && product.aiRecommendation && (
          <div className="mt-2 p-2 bg-brand-purple/5 border border-brand-purple/20 rounded text-sm">
            <p className="font-medium text-brand-purple">AI Recommendation:</p>
            <p className="text-gray-700">{product.aiRecommendation}</p>
          </div>
        )}
        
        <div className="pt-2">
          <a 
            href={product.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-sm text-brand-purple hover:text-brand-light-purple transition-colors"
          >
            View on {product.store} <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
