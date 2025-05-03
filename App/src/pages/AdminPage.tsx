import React, { useState } from 'react';
import Container from '../components/ui/Container';
import ProductTable from '../components/admin/ProductTable';
import ProductForm from '../components/admin/ProductForm';
import Button from '../components/ui/Button';
import { products as initialProducts } from '../data/products';
import { Product } from '../types';
import { Plus, Users, ShoppingBag, Package, BarChart2, Settings } from 'lucide-react';

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeSection, setActiveSection] = useState('products');
  
  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    
    setProducts([...products, newProduct]);
    setIsAddingProduct(false);
  };
  
  const handleUpdateProduct = (productData: Omit<Product, 'id'>) => {
    if (!editingProduct) return;
    
    const updatedProduct: Product = {
      ...productData,
      id: editingProduct.id,
    };
    
    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  };
  
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };
  
  const handleViewProduct = (product: Product) => {
    // In a real app, this would navigate to the product detail page
    console.log('View product:', product);
  };
  
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
  };
  
  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/5">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 bg-blue-600 text-white">
                <h2 className="text-lg font-bold">Admin Dashboard</h2>
              </div>
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                        activeSection === 'dashboard'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('dashboard')}
                    >
                      <BarChart2 className="w-5 h-5 mr-3" />
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                        activeSection === 'products'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('products')}
                    >
                      <ShoppingBag className="w-5 h-5 mr-3" />
                      Products
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                        activeSection === 'orders'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('orders')}
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Orders
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                        activeSection === 'customers'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('customers')}
                    >
                      <Users className="w-5 h-5 mr-3" />
                      Customers
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium ${
                        activeSection === 'settings'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection('settings')}
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      Settings
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:w-4/5">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeSection === 'products' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                    {!isAddingProduct && !editingProduct && (
                      <Button 
                        onClick={() => setIsAddingProduct(true)}
                        className="flex items-center"
                      >
                        <Plus size={18} className="mr-1" />
                        Add Product
                      </Button>
                    )}
                  </div>
                  
                  {isAddingProduct ? (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Product</h3>
                      <ProductForm 
                        onSubmit={handleAddProduct} 
                        onCancel={handleCancelEdit}
                      />
                    </div>
                  ) : editingProduct ? (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Product</h3>
                      <ProductForm 
                        initialData={editingProduct}
                        onSubmit={handleUpdateProduct} 
                        onCancel={handleCancelEdit}
                      />
                    </div>
                  ) : (
                    <ProductTable 
                      products={products} 
                      onEdit={handleEditProduct} 
                      onDelete={handleDeleteProduct}
                      onView={handleViewProduct}
                    />
                  )}
                </>
              )}
              
              {activeSection === 'dashboard' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                          <ShoppingBag className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Products</p>
                          <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                          <Package className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Orders</p>
                          <p className="text-2xl font-semibold text-gray-900">45</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                          <Users className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Customers</p>
                          <p className="text-2xl font-semibold text-gray-900">128</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                          <BarChart2 className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Revenue</p>
                          <p className="text-2xl font-semibold text-gray-900">$12,456</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                #ORD-123456
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                John Doe
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Delivered
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                $129.99
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                #ORD-123457
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                Jane Smith
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  Shipped
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                $89.99
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded mr-3">
                            <img
                              src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"
                              alt="Product"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-sm font-medium text-gray-900">Wireless Headphones</h4>
                            <p className="text-xs text-gray-500">124 sold</p>
                          </div>
                          <div className="text-sm font-medium text-gray-900">$129.99</div>
                        </li>
                        <li className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded mr-3">
                            <img
                              src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"
                              alt="Product"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-sm font-medium text-gray-900">Smart Watch</h4>
                            <p className="text-xs text-gray-500">89 sold</p>
                          </div>
                          <div className="text-sm font-medium text-gray-900">$299.99</div>
                        </li>
                        <li className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded mr-3">
                            <img
                              src="https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg"
                              alt="Product"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-sm font-medium text-gray-900">Men's Casual Jacket</h4>
                            <p className="text-xs text-gray-500">67 sold</p>
                          </div>
                          <div className="text-sm font-medium text-gray-900">$79.99</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
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
                            John Doe
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
                            Jane Smith
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
                            Michael Johnson
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
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #ORD-123459
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Emily Williams
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            May 8, 2023
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Processing
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $149.99
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
              
              {activeSection === 'customers' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Customers</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Orders
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Spent
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-600 font-medium">JD</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">John Doe</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            john.doe@example.com
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            12
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $1,249.99
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              View
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-600 font-medium">JS</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            jane.smith@example.com
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            8
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $879.45
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              View
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-600 font-medium">MJ</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Michael Johnson</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            michael.johnson@example.com
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            5
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $629.95
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
              
              {activeSection === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Store Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="store-name" className="block text-sm font-medium text-gray-700 mb-1">
                            Store Name
                          </label>
                          <input
                            id="store-name"
                            type="text"
                            defaultValue="ShopEase"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="store-email" className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Email
                          </label>
                          <input
                            id="store-email"
                            type="email"
                            defaultValue="contact@shopease.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="store-phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Phone
                          </label>
                          <input
                            id="store-phone"
                            type="tel"
                            defaultValue="(555) 123-4567"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Accept Credit Cards</h4>
                            <p className="text-xs text-gray-500">Allow customers to pay with credit cards</p>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                              type="checkbox"
                              id="accept-cc"
                              defaultChecked
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label
                              htmlFor="accept-cc"
                              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                            ></label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Accept PayPal</h4>
                            <p className="text-xs text-gray-500">Allow customers to pay with PayPal</p>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                              type="checkbox"
                              id="accept-paypal"
                              defaultChecked
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label
                              htmlFor="accept-paypal"
                              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">New Order Notifications</h4>
                            <p className="text-xs text-gray-500">Receive an email when a new order is placed</p>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                              type="checkbox"
                              id="new-order-email"
                              defaultChecked
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label
                              htmlFor="new-order-email"
                              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                            ></label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Customer Registration Notifications</h4>
                            <p className="text-xs text-gray-500">Receive an email when a new customer registers</p>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                              type="checkbox"
                              id="new-customer-email"
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label
                              htmlFor="new-customer-email"
                              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Settings</Button>
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

export default AdminPage;