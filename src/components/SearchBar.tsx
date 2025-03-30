
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  size?: 'sm' | 'lg';
  className?: string;
}

const SearchBar = ({ size = 'lg', className = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`flex w-full max-w-3xl rounded-full border bg-white ${size === 'lg' ? 'p-1.5' : 'p-1'} shadow-sm ${className}`}
    >
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products, brands, or categories..."
        className={`flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 ${size === 'lg' ? 'text-base' : 'text-sm'}`}
      />
      <Button 
        type="submit" 
        size={size === 'lg' ? 'default' : 'sm'} 
        className={`rounded-full ${size === 'lg' ? 'px-6' : 'px-4'}`}
      >
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
