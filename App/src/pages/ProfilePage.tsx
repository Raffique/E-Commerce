import React, { useState } from 'react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, Package, CreditCard, Heart, Settings, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                        activeTab === 'profile'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <User className="w-5 h-5 mr-3" />
                      My Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                        activeTab === 'orders'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('orders')}
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Orders
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                        activeTab === 'payment'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('payment')}
                    >
                      <CreditCard className="w-5 h-5 mr-3" />
                      Payment Methods
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                        activeTab === 'wishlist'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('wishlist')}
                    >
                      <Heart className="w-5 h-5 mr-3" />
                      Wishlist
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                        activeTab === 'settings'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      Settings
                    </button>
                  </li>
                  <li className="pt-2 mt-2 border-t border-gray-200">
                    <button
                      className="flex items-center px-3 py-2 w-full rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          defaultValue={user.firstName}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          defaultValue={user.lastName}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        defaultValue="(555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Address Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address
                          </label>
                          <input
                            id="address"
                            type="text"
                            defaultValue="123 Main St"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            id="city"
                            type="text"
                            defaultValue="Anytown"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            id="state"
                            type="text"
                            defaultValue="CA"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code
                          </label>
                          <input
                            id="zip"
                            type="text"
                            defaultValue="12345"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <select
                            id="country"
                            defaultValue="US"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Update Profile</Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #ORD-123456
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            June 10, 2023
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Delivered
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $129.99
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              View
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #ORD-123457
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            May 28, 2023
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Shipped
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $89.99
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              View
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #ORD-123458
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            May 15, 2023
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Delivered
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $199.99
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              View
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-12 h-8 bg-gray-200 rounded mr-3"></div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Visa ending in 4242</h3>
                            <p className="text-xs text-gray-500">Expires 12/2024</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-12 h-8 bg-gray-200 rounded mr-3"></div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Mastercard ending in 5678</h3>
                            <p className="text-xs text-gray-500">Expires 08/2023</p>
                          </div>
                        </div>
                        <div>
                          <button className="text-sm text-blue-600 hover:text-blue-800 mr-2">
                            Set as default
                          </button>
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="mt-4">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Sample wishlist items */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                        <img
                          src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg"
                          alt="Product"
                          className="object-cover w-full h-48"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900">Wireless Headphones</h3>
                        <p className="text-sm text-gray-500 mb-2">$129.99</p>
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button size="sm">
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                        <img
                          src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"
                          alt="Product"
                          className="object-cover w-full h-48"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900">Smart Watch</h3>
                        <p className="text-sm text-gray-500 mb-2">$299.99</p>
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button size="sm">
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Email Preferences</h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="promo-emails"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="promo-emails" className="ml-2 block text-sm text-gray-700">
                            Promotional emails
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="order-updates"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="order-updates" className="ml-2 block text-sm text-gray-700">
                            Order updates
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="product-updates"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="product-updates" className="ml-2 block text-sm text-gray-700">
                            Product updates
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Password</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            id="current-password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            id="new-password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            id="confirm-password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button>Update Password</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Delete Account</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;