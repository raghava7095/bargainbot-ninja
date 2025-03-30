
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import PriceHistoryChart from '@/components/PriceHistoryChart';
import AIChatBox from '@/components/AIChatBox';
import ProductCard, { Product } from '@/components/ProductCard';
import { 
  Star, 
  ExternalLink, 
  ArrowRight, 
  Bell, 
  CheckCircle, 
  XCircle,
  MessageSquare, 
  TrendingDown,
  ShoppingCart,
  Store,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart
} from 'lucide-react';

// Mock price history data
const priceHistoryData = [
  { date: '2023-01-01', price: 999.99, store: 'Amazon' },
  { date: '2023-02-01', price: 979.99, store: 'Amazon' },
  { date: '2023-03-01', price: 949.99, store: 'BestBuy' },
  { date: '2023-04-01', price: 929.99, store: 'Amazon' },
  { date: '2023-05-01', price: 899.99, store: 'Walmart' },
  { date: '2023-06-01', price: 949.99, store: 'Amazon' },
  { date: '2023-07-01', price: 899.99, store: 'Amazon' },
];

// Mock product data
const productData: Product = {
  id: '1',
  title: 'Apple iPhone 13 Pro, 128GB, Sierra Blue - Unlocked',
  image: 'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
  currentPrice: 899.99,
  originalPrice: 999.99,
  store: 'Amazon',
  rating: 4.8,
  priceChange: {
    amount: 100,
    direction: 'down'
  },
  isBestDeal: true,
  aiRecommendation: 'This is a good time to buy. The price is currently 10% below average and unlikely to drop further in the next 30 days.',
  link: '#'
};

// Mock similar products
const similarProducts: Product[] = [
  {
    id: '2',
    title: 'Apple iPhone 13, 128GB, Blue - Unlocked',
    image: 'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
    currentPrice: 699.99,
    originalPrice: 799.99,
    store: 'BestBuy',
    rating: 4.6,
    priceChange: {
      amount: 100,
      direction: 'down'
    },
    link: '#'
  },
  {
    id: '3',
    title: 'Apple iPhone 13 Pro Max, 128GB, Graphite - Unlocked',
    image: 'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
    currentPrice: 999.99,
    originalPrice: 1099.99,
    store: 'Walmart',
    rating: 4.9,
    priceChange: {
      amount: 100,
      direction: 'down'
    },
    link: '#'
  },
  {
    id: '4',
    title: 'Apple iPhone 13 Mini, 128GB, Midnight - Unlocked',
    image: 'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
    currentPrice: 599.99,
    originalPrice: 699.99,
    store: 'Amazon',
    rating: 4.5,
    priceChange: {
      amount: 100,
      direction: 'down'
    },
    link: '#'
  }
];

// Mock retailer data
const retailers = [
  { name: 'Amazon', price: 899.99, inStock: true, link: '#', logo: 'https://img.freepik.com/free-vector/e-commerce-logo-designs-concept-vector_23987-132.jpg' },
  { name: 'BestBuy', price: 919.99, inStock: true, link: '#', logo: 'https://img.freepik.com/free-vector/e-commerce-logo-designs-concept-vector_23987-132.jpg' },
  { name: 'Walmart', price: 909.99, inStock: true, link: '#', logo: 'https://img.freepik.com/free-vector/e-commerce-logo-designs-concept-vector_23987-132.jpg' },
  { name: 'Target', price: 929.99, inStock: false, link: '#', logo: 'https://img.freepik.com/free-vector/e-commerce-logo-designs-concept-vector_23987-132.jpg' },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAiChat, setShowAiChat] = useState(false);
  
  // Mock product images
  const productImages = [
    'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
    'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
    'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
  ];
  
  const discount = Math.round(((productData.originalPrice - productData.currentPrice) / productData.originalPrice) * 100);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/search" className="flex items-center text-brand-purple hover:text-brand-light-purple transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to search results
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Product Images */}
        <div className="order-1 lg:col-span-1">
          <div className="sticky top-24">
            <div className="relative mb-4">
              <img 
                src={productImages[activeImageIndex]} 
                alt={productData.title} 
                className="w-full h-80 object-contain border rounded-lg"
              />
              
              {/* Navigation buttons */}
              {productImages.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImageIndex(prev => (prev === 0 ? productImages.length - 1 : prev - 1))}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <button 
                    onClick={() => setActiveImageIndex(prev => (prev === productImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex justify-center space-x-2">
                {productImages.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-16 h-16 border rounded ${activeImageIndex === index ? 'border-brand-purple' : 'border-gray-200'}`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
            
            {/* AI Chat Button */}
            <Button 
              onClick={() => setShowAiChat(!showAiChat)} 
              variant="outline" 
              className="mt-6 w-full flex items-center justify-center"
            >
              <Sparkles className="h-4 w-4 mr-2 text-brand-purple" />
              {showAiChat ? 'Close AI Chat' : 'Ask AI Shopping Assistant'}
            </Button>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="order-2 lg:order-3 lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-2xl font-bold mb-4">{productData.title}</h2>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= Math.round(productData.rating) ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">{productData.rating} (3,245 reviews)</span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-brand-purple">${productData.currentPrice.toFixed(2)}</span>
                  {productData.originalPrice > productData.currentPrice && (
                    <span className="ml-2 text-gray-500 line-through">${productData.originalPrice.toFixed(2)}</span>
                  )}
                  {discount > 0 && (
                    <Badge className="ml-2 bg-brand-red">
                      {discount}% OFF
                    </Badge>
                  )}
                </div>
                
                {productData.priceChange.direction !== 'stable' && (
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingDown className="h-4 w-4 text-brand-green mr-1" />
                    <span className="text-brand-green">
                      Price dropped by ${productData.priceChange.amount.toFixed(2)} since last month
                    </span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              {/* AI Recommendation */}
              {productData.aiRecommendation && (
                <div className="p-3 bg-gradient-to-r from-brand-purple/10 to-brand-teal/5 rounded-md mb-4">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-brand-purple mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-purple">AI Price Recommendation:</p>
                      <p className="text-sm text-gray-700">{productData.aiRecommendation}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Retailer Options */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Available from {retailers.length} retailers:</h3>
                
                <div className="space-y-3">
                  {retailers.map((retailer, index) => (
                    <div 
                      key={index}
                      className={`border rounded-lg p-3 flex items-center justify-between ${index === 0 ? 'border-brand-green bg-brand-green/5' : ''}`}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-gray-100 mr-3 flex items-center justify-center">
                          <Store className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{retailer.name}</p>
                          <div className="flex items-center text-sm">
                            {retailer.inStock ? (
                              <span className="text-brand-green flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                In Stock
                              </span>
                            ) : (
                              <span className="text-brand-red flex items-center">
                                <XCircle className="h-3 w-3 mr-1" />
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">${retailer.price.toFixed(2)}</p>
                        <a 
                          href={retailer.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`text-xs flex items-center justify-end ${index === 0 ? 'text-brand-green' : 'text-brand-purple'}`}
                        >
                          View Deal <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mb-4">
                <Button className="w-full flex justify-center">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Best Deal
                </Button>
                
                <Button variant="outline" className="w-full flex justify-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Price Alert
                </Button>
                
                <Button variant="ghost" className="w-full flex justify-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Information Tabs */}
        <div className="order-3 lg:order-2 lg:col-span-1">
          <Tabs defaultValue="overview">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="specs" className="flex-1">Specs</TabsTrigger>
              <TabsTrigger value="price-history" className="flex-1">Price History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Product Description</h3>
                  <p className="text-gray-600">
                    The iPhone 13 Pro features a 6.1-inch Super Retina XDR display with ProMotion, A15 Bionic chip, Pro camera system with new 12MP Telephoto, Wide, and Ultra Wide cameras, and macrophotography.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Key Features</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>6.1-inch Super Retina XDR display with ProMotion</li>
                    <li>A15 Bionic chip with 5-core GPU</li>
                    <li>Pro camera system: Telephoto, Wide, and Ultra Wide</li>
                    <li>Up to 22 hours video playback</li>
                    <li>Ceramic Shield front</li>
                    <li>IP68 water resistance</li>
                    <li>5G capable</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Pros & Cons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-md">
                      <h4 className="flex items-center font-medium text-green-800 mb-2">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Pros
                      </h4>
                      <ul className="text-green-700 space-y-1 text-sm">
                        <li>• Excellent battery life</li>
                        <li>• Stunning camera system</li>
                        <li>• ProMotion display</li>
                        <li>• Powerful performance</li>
                        <li>• Premium build quality</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-md">
                      <h4 className="flex items-center font-medium text-red-800 mb-2">
                        <XCircle className="h-4 w-4 mr-2" />
                        Cons
                      </h4>
                      <ul className="text-red-700 space-y-1 text-sm">
                        <li>• Expensive</li>
                        <li>• No USB-C</li>
                        <li>• Slow charging compared to competitors</li>
                        <li>• No charger in the box</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specs" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Technical Specifications</h3>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="grid grid-cols-3 border-b">
                      <div className="bg-gray-50 p-3 font-medium">Display</div>
                      <div className="col-span-2 p-3">6.1-inch Super Retina XDR with ProMotion</div>
                    </div>
                    <div className="grid grid-cols-3 border-b">
                      <div className="bg-gray-50 p-3 font-medium">Processor</div>
                      <div className="col-span-2 p-3">A15 Bionic chip</div>
                    </div>
                    <div className="grid grid-cols-3 border-b">
                      <div className="bg-gray-50 p-3 font-medium">Storage</div>
                      <div className="col-span-2 p-3">128GB</div>
                    </div>
                    <div className="grid grid-cols-3 border-b">
                      <div className="bg-gray-50 p-3 font-medium">Rear Camera</div>
                      <div className="col-span-2 p-3">Pro 12MP camera system: Telephoto, Wide, and Ultra Wide</div>
                    </div>
                    <div className="grid grid-cols-3 border-b">
                      <div className="bg-gray-50 p-3 font-medium">Front Camera</div>
                      <div className="col-span-2 p-3">12MP TrueDepth camera</div>
                    </div>
                    <div className="grid grid-cols-3 border-b">
                      <div className="bg-gray-50 p-3 font-medium">Battery</div>
                      <div className="col-span-2 p-3">Up to 22 hours video playback</div>
                    </div>
                    <div className="grid grid-cols-3 border-b">
                      <div className="bg-gray-50 p-3 font-medium">OS</div>
                      <div className="col-span-2 p-3">iOS 15</div>
                    </div>
                    <div className="grid grid-cols-3 border-b">
                      <div className="bg-gray-50 p-3 font-medium">Weight</div>
                      <div className="col-span-2 p-3">203 grams</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="bg-gray-50 p-3 font-medium">Dimensions</div>
                      <div className="col-span-2 p-3">146.7 x 71.5 x 7.65 mm</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">In the Box</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>iPhone 13 Pro</li>
                    <li>USB-C to Lightning Cable</li>
                    <li>Documentation</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="price-history" className="mt-6">
              <div className="space-y-6">
                <PriceHistoryChart 
                  data={priceHistoryData}
                  currentPrice={productData.currentPrice}
                  lowestPrice={899.99}
                  expectedPrice={879.99}
                />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Price Analysis</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex">
                      <span className="font-medium w-36">Current Price:</span>
                      <span className="text-brand-purple">${productData.currentPrice.toFixed(2)} at {productData.store}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-36">Highest Price:</span>
                      <span>${productData.originalPrice.toFixed(2)} (January 2023)</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-36">Lowest Price:</span>
                      <span className="text-brand-green">${productData.currentPrice.toFixed(2)} (Current)</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-36">Average Price:</span>
                      <span>${((productData.originalPrice + productData.currentPrice) / 2).toFixed(2)}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-brand-purple/5 rounded-md">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-brand-purple mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-brand-purple">Price Trend Analysis</h3>
                      <p className="text-sm text-gray-700">
                        This product's price has been trending downward over the last 6 months.
                        It's currently at its lowest recorded price, making it a good time to purchase.
                        Based on historical data, we don't expect significant price drops in the next 30 days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Similar Products */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Similar Products</h3>
              <Link 
                to="/search" 
                className="text-sm text-brand-purple hover:text-brand-light-purple transition-colors flex items-center"
              >
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {similarProducts.slice(0, 3).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  showStores={false}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Chat Box */}
      <AIChatBox 
        productName={productData.title}
        isOpen={showAiChat}
        onClose={() => setShowAiChat(false)}
      />
    </div>
  );
};

export default ProductDetails;
