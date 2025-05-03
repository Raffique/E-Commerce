import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Discover Quality Products for Your Lifestyle
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Shop the latest trends, essentials, and exclusive deals. Free shipping on orders over $50.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link to="/deals">
                <Button variant="outline" size="lg">
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg" 
              alt="Hero" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-md hidden md:block">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Trusted by 10,000+ customers</p>
                  <p className="text-sm text-gray-600">Secure checkout & fast delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;