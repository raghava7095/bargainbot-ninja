
import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import ProductScraper from '@/components/ProductScraper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrapedProduct } from '@/services/scrapingService';
import PriceHistoryChart from '@/components/PriceHistoryChart';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Clock, Clipboard, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TrackProduct = () => {
  const [scrapedProduct, setScrapedProduct] = useState<ScrapedProduct | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const { toast } = useToast();

  // Set page title on component mount
  useEffect(() => {
    document.title = "Track Product Price | PriceWise";
    return () => {
      document.title = "PriceWise"; // Reset title on unmount
    };
  }, []);

  // Handle when a product is found via scraping
  const handleProductFound = (product: ScrapedProduct) => {
    setScrapedProduct(product);
  };

  // Toggle price tracking notifications
  const toggleTracking = () => {
    setIsTracking(!isTracking);
    
    toast({
      title: isTracking ? "Tracking Disabled" : "Tracking Enabled",
      description: isTracking 
        ? "You will no longer receive alerts for this product." 
        : "You'll be notified when the price drops.",
    });
  };

  // Mock price history data for the chart
  const mockPriceHistory = [
    { date: '2023-06-01', price: 299.99 },
    { date: '2023-07-01', price: 289.99 },
    { date: '2023-08-01', price: 279.99 },
    { date: '2023-09-01', price: 269.99 },
    { date: '2023-10-01', price: 259.99 },
    { date: '2023-11-01', price: scrapedProduct?.price || 249.99 },
  ];

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Track Product Price</h1>
        
        {/* Product Scraper */}
        <ProductScraper 
          onProductFound={handleProductFound} 
          className="mb-8"
        />
        
        {/* Scraped Product Details */}
        {scrapedProduct && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full md:w-1/3">
                    <img 
                      src={scrapedProduct.image} 
                      alt={scrapedProduct.title} 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="w-full md:w-2/3 space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        {scrapedProduct.title}
                      </h2>
                      <div className="text-sm text-gray-500">
                        From {scrapedProduct.retailer}
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">
                        ${scrapedProduct.price.toFixed(2)}
                      </span>
                      {scrapedProduct.originalPrice && (
                        <span className="text-gray-500 line-through">
                          ${scrapedProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button
                        variant={isTracking ? "outline" : "default"}
                        onClick={toggleTracking}
                      >
                        {isTracking ? (
                          <>
                            <BellOff className="h-4 w-4 mr-2" />
                            Stop Tracking
                          </>
                        ) : (
                          <>
                            <Bell className="h-4 w-4 mr-2" />
                            Track Price
                          </>
                        )}
                      </Button>
                      
                      <Button variant="outline">
                        <Clock className="h-4 w-4 mr-2" />
                        Price History
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(scrapedProduct.link);
                          toast({
                            title: "Link Copied",
                            description: "Product link copied to clipboard",
                          });
                        }}
                      >
                        <Clipboard className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                      
                      <Button
                        variant="outline" 
                        asChild
                      >
                        <a 
                          href={scrapedProduct.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Store
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Price History</CardTitle>
              </CardHeader>
              <CardContent>
                <PriceHistoryChart 
                  data={mockPriceHistory} 
                  currentPrice={scrapedProduct.price}
                  lowestPrice={Math.min(...mockPriceHistory.map(d => d.price))}
                  expectedPrice={scrapedProduct.price * 0.9} // Simulated expected price (10% lower)
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Container>
  );
};

export default TrackProduct;
