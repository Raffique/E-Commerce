import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import ProductGrid from '../components/products/ProductGrid';
import SearchBar from '../components/search/SearchBar';
import { products } from '../data/products';
import { Product } from '../types';
import { Search as SearchIcon } from 'lucide-react';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParams({ q: query });
    
    // Filter products based on search query
    if (query.trim()) {
      const results = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };
  
  return (
    <div className="py-8">
      <Container>
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Search Products
          </h1>
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for products, brands, categories..." 
            autoFocus
            className="mb-4"
          />
        </div>
        
        {searchQuery ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {searchResults.length} results for "{searchQuery}"
              </h2>
            </div>
            
            {searchResults.length > 0 ? (
              <ProductGrid products={searchResults} />
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any products matching "{searchQuery}". Try using different keywords or check for typos.
                </p>
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Popular searches:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Electronics', 'Headphones', 'Kitchen', 'Clothing', 'Beauty'].map(term => (
                      <button
                        key={term}
                        onClick={() => handleSearch(term)}
                        className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Start your search</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Search for products by name, category, or description
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default SearchPage;