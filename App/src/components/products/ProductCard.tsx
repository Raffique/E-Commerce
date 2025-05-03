import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full text-gray-600 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
        
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 text-xs font-semibold rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-amber-500 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="ml-1 text-xs text-gray-600">({product.reviews} reviews)</span>
        </div>
        
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mb-3">
          {product.discount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        <Button 
          onClick={() => addToCart(product)} 
          className="w-full"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;