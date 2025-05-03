import React from 'react';
import Container from '../components/ui/Container';
import ProductGrid from '../components/products/ProductGrid';
import { products } from '../data/products';
import Button from '../components/ui/Button';

const DealsPage = () => {
  // Get products with discounts
  const discountedProducts = products.filter(product => product.discount > 0);
  
  // Group products by discount percentage
  const productsByDiscount = discountedProducts.reduce((acc, product) => {
    const discount = product.discount;
    if (!acc[discount]) {
      acc[discount] = [];
    }
    acc[discount].push(product);
    return acc;
  }, {} as Record<number, typeof products>);
  
  // Sort discount percentages from highest to lowest
  const discountPercentages = Object.keys(productsByDiscount)
    .map(Number)
    .sort((a, b) => b - a);
  
  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Special Deals & Offers</h1>
          <p className="text-gray-600 max-w-3xl">
            Explore our limited-time offers and discounts on popular products. Act fast before they're gone!
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-6 sm:p-10 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              Summer Sale
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Up to 50% off on selected items. Limited time offer. Don't miss out!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm text-white">
                <div className="text-3xl sm:text-4xl font-bold mb-1">15%</div>
                <p className="text-sm sm:text-base">Off Electronics</p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm text-white">
                <div className="text-3xl sm:text-4xl font-bold mb-1">20%</div>
                <p className="text-sm sm:text-base">Off Clothing</p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm text-white">
                <div className="text-3xl sm:text-4xl font-bold mb-1">10%</div>
                <p className="text-sm sm:text-base">Off Home & Kitchen</p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm text-white">
                <div className="text-3xl sm:text-4xl font-bold mb-1">50%</div>
                <p className="text-sm sm:text-base">Off Accessories</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-white text-sm mb-2">Sale ends in:</p>
              <div className="flex justify-center gap-4">
                <div className="bg-white rounded-lg p-2 w-16">
                  <div className="text-2xl font-bold text-blue-700">3</div>
                  <div className="text-xs text-gray-600">Days</div>
                </div>
                <div className="bg-white rounded-lg p-2 w-16">
                  <div className="text-2xl font-bold text-blue-700">8</div>
                  <div className="text-xs text-gray-600">Hours</div>
                </div>
                <div className="bg-white rounded-lg p-2 w-16">
                  <div className="text-2xl font-bold text-blue-700">24</div>
                  <div className="text-xs text-gray-600">Minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {discountPercentages.map((discount) => (
          <div key={discount} className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {discount}% Off
              </h2>
              <Button variant="outline">View All</Button>
            </div>
            <ProductGrid products={productsByDiscount[discount]} />
          </div>
        ))}
        
        <div className="bg-gray-50 rounded-lg p-8 mt-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Subscribe for Exclusive Deals
            </h2>
            <p className="text-gray-600 mb-6">
              Be the first to know about our special offers, new products, and exclusive promotions.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DealsPage;