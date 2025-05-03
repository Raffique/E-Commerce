import React, { useState, useEffect } from 'react';
import Container from '../components/ui/Container';
import ProductGrid from '../components/products/ProductGrid';
import SearchBar from '../components/search/SearchBar';
import { products } from '../data/products';
import { Product } from '../types';
import { ShoppingBag, Filter, X } from 'lucide-react';

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Get unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Get min and max prices from products
  const prices = products.map(product => product.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  useEffect(() => {
    // Reset price range when products change
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);
  
  useEffect(() => {
    // Apply filters and sorting
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, you'd sort by date
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no specific sorting
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, categoryFilter, priceRange, sortBy]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = Number(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setPriceRange([minPrice, maxPrice]);
    setSortBy('featured');
  };
  
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  
  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse our collection of high-quality products. Use the filters to find exactly what you're looking for.
          </p>
        </div>
        
        <div className="lg:flex mb-8">
          {/* Mobile filter toggle */}
          <button
            className="lg:hidden flex items-center mb-4 text-gray-700 hover:text-blue-600"
            onClick={toggleFilters}
          >
            {filtersVisible ? (
              <>
                <X className="w-5 h-5 mr-2" />
                <span>Hide Filters</span>
              </>
            ) : (
              <>
                <Filter className="w-5 h-5 mr-2" />
                <span>Show Filters</span>
              </>
            )}
          </button>
          
          {/* Filters sidebar - hidden on mobile unless toggled */}
          <div className={`lg:w-1/4 lg:pr-8 ${filtersVisible ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="category-all"
                      name="category"
                      type="radio"
                      checked={categoryFilter === ''}
                      onChange={() => setCategoryFilter('')}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
                      All Categories
                    </label>
                  </div>
                  
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        name="category"
                        type="radio"
                        checked={categoryFilter === category}
                        onChange={() => setCategoryFilter(category)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">${priceRange[0].toFixed(2)}</span>
                    <span className="text-sm text-gray-600">${priceRange[1].toFixed(2)}</span>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="availability-in-stock"
                      name="availability"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="availability-in-stock" className="ml-2 text-sm text-gray-700">
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="availability-on-sale"
                      name="availability"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="availability-on-sale" className="ml-2 text-sm text-gray-700">
                      On Sale
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-auto">
                  <SearchBar 
                    onSearch={handleSearch} 
                    placeholder="Search products..." 
                  />
                </div>
                
                <div className="flex items-center w-full sm:w-auto">
                  <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="block w-full rounded-md border-gray-300 text-base focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="flex flex-col items-center justify-center bg-white p-12 rounded-lg shadow-sm">
                <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                <p className="text-gray-500 text-center mb-4">
                  We couldn't find any products matching your criteria.
                </p>
                <button 
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;