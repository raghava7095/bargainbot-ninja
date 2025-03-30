import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ChevronDown,
  ChevronUp,
  Store,
  Star
} from 'lucide-react';
import ProductCard, { Product } from '@/components/ProductCard';
import { Separator } from '@/components/ui/separator';

const mockProducts: Product[] = [
  {
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
    aiRecommendation: 'Buy now! Price is at its 6-month low.',
    link: '#'
  },
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
  },
  {
    id: '4',
    title: 'Apple iPhone 12 Pro Max, 256GB, Pacific Blue - Unlocked',
    image: 'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
    currentPrice: 849.99,
    originalPrice: 1099.99,
    store: 'Walmart',
    rating: 4.7,
    priceChange: {
      amount: 250,
      direction: 'down'
    },
    isBestDeal: true,
    link: '#'
  },
  {
    id: '5',
    title: 'Apple iPhone SE (2022), 64GB, Starlight - Unlocked',
    image: 'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
    currentPrice: 379.99,
    originalPrice: 429.99,
    store: 'Target',
    rating: 4.3,
    priceChange: {
      amount: 50,
      direction: 'down'
    },
    link: '#'
  },
  {
    id: '6',
    title: 'Apple iPhone 13 Pro Max, 256GB, Graphite - Unlocked',
    image: 'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
    currentPrice: 1099.99,
    originalPrice: 1199.99,
    store: 'Amazon',
    rating: 4.9,
    priceChange: {
      amount: 100,
      direction: 'down'
    },
    link: '#'
  },
  {
    id: '7',
    title: 'Apple iPhone 12, 128GB, Blue - Unlocked',
    image: 'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
    currentPrice: 649.99,
    originalPrice: 749.99,
    store: 'BestBuy',
    rating: 4.5,
    priceChange: {
      amount: 100,
      direction: 'down'
    },
    link: '#'
  },
  {
    id: '8',
    title: 'Apple iPhone 12 Mini, 64GB, Red - Unlocked',
    image: 'https://img.freepik.com/free-photo/smartphone-screen-with-white-background_23-2149455865.jpg',
    currentPrice: 499.99,
    originalPrice: 599.99,
    store: 'Walmart',
    rating: 4.4,
    priceChange: {
      amount: 100,
      direction: 'down'
    },
    link: '#'
  },
];

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('bestMatch');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1200]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setSearchResults(
        mockProducts.filter(product => 
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      );
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    
    let sortedResults = [...searchResults];
    
    switch (value) {
      case 'priceLow':
        sortedResults.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'priceHigh':
        sortedResults.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'bestDiscount':
        sortedResults.sort((a, b) => {
          const discountA = a.originalPrice - a.currentPrice;
          const discountB = b.originalPrice - b.currentPrice;
          return discountB - discountA;
        });
        break;
      case 'rating':
        sortedResults.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setSearchResults(sortedResults);
  };
  
  const toggleStoreFilter = (store: string) => {
    setSelectedStores(prev => 
      prev.includes(store) 
        ? prev.filter(s => s !== store) 
        : [...prev, store]
    );
  };
  
  const toggleRatingFilter = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };
  
  const applyFilters = () => {
    let filteredResults = [...mockProducts];
    
    filteredResults = filteredResults.filter(
      product => product.currentPrice >= priceRange[0] && product.currentPrice <= priceRange[1]
    );
    
    if (selectedStores.length > 0) {
      filteredResults = filteredResults.filter(
        product => selectedStores.includes(product.store)
      );
    }
    
    if (selectedRatings.length > 0) {
      filteredResults = filteredResults.filter(
        product => selectedRatings.includes(Math.floor(product.rating))
      );
    }
    
    setSearchResults(filteredResults);
  };
  
  const resetFilters = () => {
    setPriceRange([0, 1200]);
    setSelectedStores([]);
    setSelectedRatings([]);
    
    setSearchResults(
      mockProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
          
          <div className="flex w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Refine your search..."
                defaultValue={query}
                className="pl-10"
              />
            </div>
            
            <Button 
              variant="outline" 
              className="ml-2 flex items-center" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {showFilters ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
          <p className="text-gray-600">
            Found {searchResults.length} results ({isLoading ? '...' : '0.5'} seconds)
          </p>
          
          <div className="flex items-center mt-2 sm:mt-0">
            <span className="text-gray-600 mr-2">Sort by:</span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Best Match" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bestMatch">Best Match</SelectItem>
                <SelectItem value="priceLow">Price: Low to High</SelectItem>
                <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                <SelectItem value="bestDiscount">Best Discount</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h3 className="font-medium">Filter Results</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="h-3 w-3 mr-1" />
              Reset Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Price Range</h4>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 1200]}
                  min={0}
                  max={1500}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Stores</h4>
              <div className="space-y-2">
                {['Amazon', 'BestBuy', 'Walmart', 'Target'].map((store) => (
                  <div key={store} className="flex items-center">
                    <Checkbox 
                      id={`store-${store}`}
                      checked={selectedStores.includes(store as any)}
                      onCheckedChange={() => toggleStoreFilter(store as any)}
                    />
                    <label 
                      htmlFor={`store-${store}`}
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {store}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Ratings</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <Checkbox 
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={() => toggleRatingFilter(rating)}
                    />
                    <label 
                      htmlFor={`rating-${rating}`}
                      className="ml-2 text-sm cursor-pointer flex items-center"
                    >
                      {rating}+ <Star className="h-3 w-3 ml-1 fill-brand-yellow text-brand-yellow" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
      
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((placeholder) => (
              <div 
                key={placeholder} 
                className="border rounded-lg p-4 h-[400px] bg-gray-50 animate-pulse-light"
              ></div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                showRecommendation={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any products matching "{query}"
            </p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
