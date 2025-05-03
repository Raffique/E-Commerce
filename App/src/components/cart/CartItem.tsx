import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { CartItem as CartItemType } from '../../types';

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const { updateCartItemQuantity, removeFromCart } = useCart();
  
  const handleIncrease = () => {
    updateCartItemQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200">
      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden mr-4 mb-3 sm:mb-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-base font-medium text-gray-900 mb-1">{item.name}</h3>
        {item.variant && (
          <p className="text-sm text-gray-500 mb-1">
            {Object.entries(item.variant).map(([key, value]) => `${key}: ${value}`).join(', ')}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button 
              onClick={handleDecrease}
              className="px-2 py-1 text-gray-600 hover:text-gray-900"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-2 py-1 text-gray-900 select-none">{item.quantity}</span>
            <button 
              onClick={handleIncrease}
              className="px-2 py-1 text-gray-600 hover:text-gray-900"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 flex items-center"
          >
            <Trash2 size={16} className="mr-1" />
            <span className="text-sm">Remove</span>
          </button>
        </div>
      </div>
      
      <div className="mt-3 sm:mt-0 text-right flex-shrink-0 font-medium text-gray-900">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;