import React from 'react';
import Container from '../components/ui/Container';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, ChevronLeft } from 'lucide-react';

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  
  return (
    <div className="py-8">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          {cartItems.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear Cart
            </button>
          )}
        </div>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            <div>
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg shadow-sm text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-900 mb-1">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;