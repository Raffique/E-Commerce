import React from 'react';
import Container from '../ui/Container';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
    count: 120,
  },
  {
    id: 2,
    name: 'Clothing',
    image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg',
    count: 245,
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    count: 189,
  },
  {
    id: 4,
    name: 'Beauty',
    image: 'https://images.pexels.com/photos/3373740/pexels-photo-3373740.jpeg',
    count: 97,
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of products across popular categories designed to meet your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-semibold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {category.count} Products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCategories;