import React, { useState } from 'react';
import Container from '../components/ui/Container';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingCart } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  
  const handleCheckoutComplete = () => {
    // In a real app, this would submit order details to the backend
    setOrderComplete(true);
    clearCart();
  };
  
  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="py-8">
        <Container>
          <div className="bg-white p-12 rounded-lg shadow-sm text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-900 mb-1">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              You need to add items to your cart before proceeding to checkout.
            </p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }
  
  if (orderComplete) {
    return (
      <div className="py-8">
        <Container>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h2>
            <p className="text-gray-700 mb-6">
              Your order has been received and is being processed.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
              <div className="text-left mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="text-gray-900 font-medium">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="text-gray-900">Credit Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Method:</span>
                  <span className="text-gray-900">Standard Shipping</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button>Continue Shopping</Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline">View Order History</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm onComplete={handleCheckoutComplete} />
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="divide-y divide-gray-200 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      {item.variant && (
                        <p className="text-xs text-gray-500">
                          {Object.entries(item.variant).map(([key, value]) => `${key}: ${value}`).join(', ')}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex-shrink-0 font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">$5.99</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">
                    ${(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.07).toFixed(2)}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      ${(
                        cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + 
                        5.99 + 
                        cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.07
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;