import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { Heart, ShoppingCart, Share2, Star, Check, Truck, RotateCcw, Shield } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Get similar products (from same category)
  const similarProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];
  
  if (!product) {
    return (
      <Container>
        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <p className="mt-4 text-gray-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products" className="mt-6 inline-block">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </Container>
    );
  }
  
  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100)
    : product.price;
  
  const handleAddToCart = () => {
    const variant: Record<string, string> = {};
    
    if (selectedColor) {
      variant.color = selectedColor;
    }
    
    if (selectedSize) {
      variant.size = selectedSize;
    }
    
    addToCart(product, quantity, Object.keys(variant).length > 0 ? variant : undefined);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Image gallery */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
          </div>
          
          {/* Product details */}
          <div className="lg:w-1/2">
            <div className="mb-2">
              <Link to={`/category/${product.category}`} className="text-blue-600 text-sm hover:underline">
                {product.category}
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-amber-500 mr-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">{product.reviews} reviews</span>
            </div>
            
            <div className="mb-6">
              {product.discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900 mr-2">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm font-medium">
                    Save {product.discount}%
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Color selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Color</span>
                  <span className="text-sm text-gray-500">
                    {selectedColor ? selectedColor : 'Select a color'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        selectedColor === color 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size selection */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Size</span>
                  <span className="text-sm text-gray-500">
                    {selectedSize ? selectedSize : 'Select a size'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`w-10 h-10 flex items-center justify-center border rounded-md text-sm ${
                        selectedSize === size 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  className="p-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 p-2 border-t border-b border-gray-300 text-center focus:outline-none"
                />
                <button
                  className="p-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600"
                  onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                >
                  +
                </button>
                <span className="ml-4 text-sm text-gray-500">
                  {product.stock} available
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Heart size={20} />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Additional info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <Truck className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-xs text-gray-500">On orders over $100</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <RotateCcw className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Easy Returns</h4>
                    <p className="text-xs text-gray-500">30-day return policy</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Secure Checkout</h4>
                    <p className="text-xs text-gray-500">Encrypted payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  className={`
                    py-4 px-1 text-center border-b-2 font-medium text-sm
                    ${activeTab === tab 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-700 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl eget
                  ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl. Sed euismod, nisl eget
                  ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.
                </p>
                <ul className="mt-4">
                  <li>High-quality materials</li>
                  <li>Durable and long-lasting</li>
                  <li>Modern design</li>
                  <li>Easy to use</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-gray-500">Brand</dt>
                    <dd className="text-sm text-gray-900 col-span-2">ShopEase</dd>
                  </div>
                  <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-gray-500">Category</dt>
                    <dd className="text-sm text-gray-900 col-span-2">{product.category}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-gray-500">Material</dt>
                    <dd className="text-sm text-gray-900 col-span-2">Premium Quality</dd>
                  </div>
                  <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                    <dd className="text-sm text-gray-900 col-span-2">10 x 5 x 3 inches</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-gray-500">Weight</dt>
                    <dd className="text-sm text-gray-900 col-span-2">1.5 lbs</dd>
                  </div>
                  <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-gray-500">Warranty</dt>
                    <dd className="text-sm text-gray-900 col-span-2">1 year</dd>
                  </div>
                </dl>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-4">
                    <div className="text-4xl font-bold text-gray-900 mr-2">{product.rating.toFixed(1)}</div>
                    <div className="flex flex-col">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6 mb-6">
                  {/* Sample reviews */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <img 
                        src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg" 
                        alt="Reviewer" 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Alex Johnson</h4>
                        <div className="flex items-center">
                          <div className="flex text-amber-500 mr-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < 5 ? 'fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">3 months ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      This product exceeded my expectations! The quality is excellent and it looks even better in person.
                      Fast shipping and great customer service too.
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <img 
                        src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg" 
                        alt="Reviewer" 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Sarah Miller</h4>
                        <div className="flex items-center">
                          <div className="flex text-amber-500 mr-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">5 months ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Good product for the price. Would have given 5 stars, but delivery took longer than expected.
                      Overall happy with the purchase though.
                    </p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">Read All Reviews</Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Similar products */}
        <div className="mt-16">
          <ProductGrid 
            products={similarProducts} 
            title="You May Also Like" 
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailPage;