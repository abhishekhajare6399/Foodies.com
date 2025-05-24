import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const popularFoods = [
  'Pizza', 'Burger', 'Sushi', 'Pasta', 'Tacos',
  'Curry', 'Noodles', 'Salad', 'Sandwich', 'Ice Cream',
  'Biryani', 'Ramen', 'Steak', 'Dumplings', 'Pho'
];

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterToggle: () => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch, onFilterToggle }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Filter suggestions based on input
    if (query.trim() === '') {
      setSuggestions(popularFoods.slice(0, 5));
    } else {
      const filtered = popularFoods.filter(food => 
        food.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  }, [query]);
  
  useEffect(() => {
    // Close suggestions when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearch = () => {
    onSearch(query);
    setShowSuggestions(false);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };
  
  const clearSearch = () => {
    setQuery('');
    onSearch('');
    setSuggestions(popularFoods.slice(0, 5));
  };
  
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div ref={searchRef} className="relative flex-grow w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for food, restaurants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="input pl-10 pr-10 w-full py-3"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-neutral-400" />
            </div>
            {query && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={clearSearch}
              >
                <X size={18} className="text-neutral-400 hover:text-neutral-600" />
              </button>
            )}
          </div>
          
          {/* Search suggestions */}
          {showSuggestions && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <ul className="py-1">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 hover:bg-neutral-100 cursor-pointer flex items-center"
                  >
                    <Search size={16} className="text-neutral-400 mr-2" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 w-full md:w-auto">
          <button
            onClick={handleSearch}
            className="btn btn-primary w-full md:w-auto"
          >
            Search
          </button>
          
          <button
            onClick={onFilterToggle}
            className="btn btn-outline w-10 flex items-center justify-center"
            aria-label="Advanced filters"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;