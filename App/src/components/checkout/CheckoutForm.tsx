import React, { useState } from 'react';
import Button from '../ui/Button';
import { useCart } from '../../contexts/CartContext';
import { CreditCard, Check } from 'lucide-react';

type CheckoutFormProps = {
  onComplete: () => void;
};

const CheckoutForm = ({ onComplete }: CheckoutFormProps) => {
  const { cartItems } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping info
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    
    // Payment info
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 5.99) : 0;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      onComplete();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex border-b">
        <button
          className={`flex-1 py-4 text-center font-medium text-gray-700 ${
            step === 1 ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : ''
          }`}
          onClick={() => step > 1 && setStep(1)}
        >
          <span className="inline-flex items-center">
            <span className={`
              w-6 h-6 mr-2 rounded-full flex items-center justify-center text-sm
              ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
            `}>
              1
            </span>
            Shipping
          </span>
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium text-gray-700 ${
            step === 2 ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : ''
          }`}
          onClick={() => step > 2 && setStep(2)}
          disabled={step < 2}
        >
          <span className="inline-flex items-center">
            <span className={`
              w-6 h-6 mr-2 rounded-full flex items-center justify-center text-sm
              ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
            `}>
              2
            </span>
            Payment
          </span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        {step === 1 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province *
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP/Postal Code *
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            
            <div className="p-4 border border-gray-200 rounded-md mb-6">
              <h3 className="font-medium mb-2">Order Summary</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  {shipping === 0 && subtotal > 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="pt-2 border-t border-gray-200 font-medium">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex items-center mb-2">
                <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="font-medium">Credit Card</h3>
              </div>
              
              <div className="space-y-4 mt-3">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    required
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card *
                  </label>
                  <input
                    id="cardName"
                    name="cardName"
                    type="text"
                    required
                    value={formData.cardName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date *
                    </label>
                    <input
                      id="cardExpiry"
                      name="cardExpiry"
                      type="text"
                      placeholder="MM/YY"
                      required
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV *
                    </label>
                    <input
                      id="cardCvv"
                      name="cardCvv"
                      type="text"
                      placeholder="123"
                      required
                      value={formData.cardCvv}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md text-green-700 flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Your information is secure</p>
                <p className="text-sm">All transactions are secure and encrypted.</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-between">
          {step === 1 ? (
            <div></div>
          ) : (
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}
          
          <Button type="submit">
            {step === 1 ? 'Continue to Payment' : 'Place Order'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;