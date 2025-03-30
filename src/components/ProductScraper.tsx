
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ExternalLink, AlertCircle } from 'lucide-react';
import { ScrapedProduct, ScrapingService } from '@/services/scrapingService';
import { useToast } from '@/hooks/use-toast';

interface ProductScraperProps {
  onProductFound?: (product: ScrapedProduct) => void;
  className?: string;
}

const ProductScraper = ({ onProductFound, className }: ProductScraperProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleScrape = async () => {
    if (!url) {
      setError('Please enter a product URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let scrapedProduct: ScrapedProduct | null = null;
      
      // Simple detection of retailer based on URL
      if (url.includes('amazon')) {
        scrapedProduct = await ScrapingService.scrapeAmazon(url);
      } else if (url.includes('flipkart')) {
        scrapedProduct = await ScrapingService.scrapeFlipkart(url);
      } else {
        throw new Error('Unsupported retailer. Currently we support Amazon and Flipkart.');
      }

      if (!scrapedProduct) {
        throw new Error('Failed to scrape product data');
      }

      toast({
        title: "Product Found!",
        description: `Successfully scraped data for ${scrapedProduct.title}`,
      });
      
      if (onProductFound) {
        onProductFound(scrapedProduct);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to scrape product data';
      setError(errorMessage);
      toast({
        title: "Scraping Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Track Product Price</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Paste a product URL from Amazon or Flipkart to track its price
            </p>
            <div className="flex space-x-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.amazon.com/product/..."
                className="flex-1"
              />
              <Button 
                onClick={handleScrape} 
                disabled={isLoading}
              >
                {isLoading ? "Scraping..." : "Track"}
                {!isLoading && <Search className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 p-3 rounded-md border border-red-200 text-red-800 text-sm flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-red-500" />
              <p>{error}</p>
            </div>
          )}

          <div className="pt-2">
            <p className="text-xs text-gray-500">
              We currently support product URLs from:
            </p>
            <div className="flex space-x-4 mt-1">
              <a 
                href="https://www.amazon.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm flex items-center text-brand-purple hover:underline"
              >
                Amazon <ExternalLink className="ml-1 h-3 w-3" />
              </a>
              <a 
                href="https://www.flipkart.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm flex items-center text-brand-purple hover:underline"
              >
                Flipkart <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductScraper;
