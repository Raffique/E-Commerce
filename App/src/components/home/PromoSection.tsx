import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const PromoSection = () => {
  return (
    <section className="py-16 bg-blue-600">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Summer Sale
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Up to 50% off on selected items. Limited time offer. Don't miss out!
            </p>
            <Link to="/deals">
              <Button variant="secondary" size="lg">
                Shop the Sale
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <div className="text-amber-500 font-bold text-5xl mb-2">30%</div>
              <p className="text-gray-800 font-medium">Off Electronics</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <div className="text-amber-500 font-bold text-5xl mb-2">40%</div>
              <p className="text-gray-800 font-medium">Off Clothing</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <div className="text-amber-500 font-bold text-5xl mb-2">25%</div>
              <p className="text-gray-800 font-medium">Off Home Goods</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <div className="text-amber-500 font-bold text-5xl mb-2">50%</div>
              <p className="text-gray-800 font-medium">Off Accessories</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PromoSection;