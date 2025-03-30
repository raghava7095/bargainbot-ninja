
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import ProductCard, { Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, Laptop, Camera, Tv, Watch, Clock, Headphones, 
  Heart, Zap, Percent, Award, TrendingUp 
} from 'lucide-react';

// Mock data
const featuredProducts: Product[] = [
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
    title: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
    image: 'https://img.freepik.com/free-psd/headphone-mockup_1310-736.jpg',
    currentPrice: 248.00,
    originalPrice: 349.99,
    store: 'BestBuy',
    rating: 4.7,
    priceChange: {
      amount: 101.99,
      direction: 'down'
    },
    isBestDeal: false,
    aiRecommendation: 'Good deal - price drops expected in 2 months.',
    link: '#'
  },
  {
    id: '3',
    title: 'Samsung 65" Class QLED 4K Smart TV',
    image: 'https://img.freepik.com/free-psd/minimalist-smart-tv-mockup_1310-1473.jpg',
    currentPrice: 897.99,
    originalPrice: 1297.99,
    store: 'Walmart',
    rating: 4.5,
    priceChange: {
      amount: 400,
      direction: 'down'
    },
    isBestDeal: true,
    aiRecommendation: 'Great time to buy! Price reduction from recent sale.',
    link: '#'
  },
  {
    id: '4',
    title: 'Dyson V11 Torque Drive Cordless Vacuum Cleaner',
    image: 'https://img.freepik.com/free-psd/floating-vacuum-cleaner-mockup_1310-1367.jpg',
    currentPrice: 599.99,
    originalPrice: 699.99,
    store: 'Target',
    rating: 4.6,
    priceChange: {
      amount: 100,
      direction: 'down'
    },
    isBestDeal: false,
    aiRecommendation: 'Wait if possible. Often discounted during seasonal sales.',
    link: '#'
  }
];

const trendingProducts: Product[] = [
  {
    id: '5',
    title: 'Dell XPS 13 Laptop - 11th Gen Intel Core i7',
    image: 'https://img.freepik.com/free-psd/laptop-mock-up-isolated_1310-1458.jpg',
    currentPrice: 1199.99,
    originalPrice: 1399.99,
    store: 'BestBuy',
    rating: 4.7,
    priceChange: {
      amount: 200,
      direction: 'down'
    },
    isBestDeal: false,
    link: '#'
  },
  {
    id: '6',
    title: 'Bose QuietComfort 45 Wireless Noise Cancelling Headphones',
    image: 'https://img.freepik.com/free-psd/headphone-mockup_1310-736.jpg',
    currentPrice: 279.00,
    originalPrice: 329.00,
    store: 'Amazon',
    rating: 4.6,
    priceChange: {
      amount: 50,
      direction: 'down'
    },
    isBestDeal: true,
    link: '#'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple/10 to-brand-teal/10 py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find the <span className="gradient-text">Best Deals</span><br />
            with AI-Powered Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            BargainBotNinja scans hundreds of online stores to find you the lowest prices,
            tracks price history, and uses AI to predict the best time to buy.
          </p>
          <div className="flex justify-center">
            <SearchBar />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="rounded-full">
              <Smartphone className="w-4 h-4 mr-2" />
              Electronics
            </Button>
            <Button variant="outline" className="rounded-full">
              <Clock className="w-4 h-4 mr-2" />
              Home & Kitchen
            </Button>
            <Button variant="outline" className="rounded-full">
              <Headphones className="w-4 h-4 mr-2" />
              Audio
            </Button>
            <Button variant="outline" className="rounded-full">
              <Tv className="w-4 h-4 mr-2" />
              TVs
            </Button>
            <Button variant="outline" className="rounded-full">
              <Laptop className="w-4 h-4 mr-2" />
              Computers
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How BargainBot<span className="text-brand-purple">Ninja</span> Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform searches across the web to find you the absolute best deals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search & Compare</h3>
              <p className="text-gray-600">
                Enter what you're looking for and instantly compare prices across hundreds of retailers
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-brand-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Price History</h3>
              <p className="text-gray-600">
                View price trends over time and get notified when prices drop on items you care about
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-brand-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
              <p className="text-gray-600">
                Get smart advice on when to buy based on price prediction and historical patterns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Browse Popular Categories</h2>
          <p className="text-gray-600 mb-10">
            Explore top products across categories and find the best deals
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <CategoryCard
              title="Smartphones"
              icon={<Smartphone className="h-6 w-6 text-white" />}
              color="bg-brand-purple"
              bgColor="bg-brand-purple/5"
              href="/category/smartphones"
              count={432}
            />
            <CategoryCard
              title="Laptops"
              icon={<Laptop className="h-6 w-6 text-white" />}
              color="bg-brand-teal"
              bgColor="bg-brand-teal/5"
              href="/category/laptops"
              count={297}
            />
            <CategoryCard
              title="Televisions"
              icon={<Tv className="h-6 w-6 text-white" />}
              color="bg-brand-green"
              bgColor="bg-brand-green/5"
              href="/category/televisions"
              count={186}
            />
            <CategoryCard
              title="Audio"
              icon={<Headphones className="h-6 w-6 text-white" />}
              color="bg-brand-yellow"
              bgColor="bg-brand-yellow/5"
              href="/category/audio"
              count={254}
            />
            <CategoryCard
              title="Cameras"
              icon={<Camera className="h-6 w-6 text-white" />}
              color="bg-brand-red"
              bgColor="bg-brand-red/5"
              href="/category/cameras"
              count={173}
            />
            <CategoryCard
              title="Smartwatches"
              icon={<Watch className="h-6 w-6 text-white" />}
              color="bg-brand-gray"
              bgColor="bg-brand-gray/5"
              href="/category/smartwatches"
              count={128}
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="deals">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Top Products</h2>
              <TabsList>
                <TabsTrigger value="deals" className="flex items-center">
                  <Percent className="w-4 h-4 mr-2" />
                  Best Deals
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="recommended" className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  AI Recommended
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="deals" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {featuredProducts.slice(0, 2).map((product) => (
                  <ProductCard key={`trending-${product.id}`} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommended" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...featuredProducts].sort(() => Math.random() - 0.5).map((product) => (
                  <ProductCard 
                    key={`ai-${product.id}`} 
                    product={product} 
                    showRecommendation={true} 
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full">View All Products</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-purple to-brand-teal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Overpay Again
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create a free account to track prices, set alerts, and get personalized AI recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="rounded-full">
              Sign Up Free
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-brand-purple">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "BargainBotNinja saved me over $300 on my new laptop. The price history feature showed me that I was about to buy at the highest price point of the season!"
              </p>
              <p className="font-medium">Michael K.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The AI recommendations are spot on. I was skeptical at first, but it correctly predicted a price drop on the headphones I wanted just a week later."
              </p>
              <p className="font-medium">Sarah T.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I love how it compares prices across different stores. Found the exact same TV for $200 less than what I was about to pay. This site is a game changer."
              </p>
              <p className="font-medium">David W.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
