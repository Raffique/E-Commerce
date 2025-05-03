import React from 'react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const CartSummary = () => {
  const { cartItems } = useCart();
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 5.99) : 0;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          {shipping === 0 && subtotal > 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span className="text-gray-900">${shipping.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (7%)</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-medium">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Link to="/checkout">
          <Button className="w-full">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
      
      <div className="mt-4">
        <Link to="/products">
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-2">We Accept</h3>
        <div className="flex gap-2">
          <div className="bg-gray-200 rounded p-1 w-12 h-8"></div>
          <div className="bg-gray-200 rounded p-1 w-12 h-8"></div>
          <div className="bg-gray-200 rounded p-1 w-12 h-8"></div>
          <div className="bg-gray-200 rounded p-1 w-12 h-8"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;