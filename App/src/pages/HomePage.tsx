import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import ProductGrid from '../components/products/ProductGrid';
import PromoSection from '../components/home/PromoSection';
import Testimonials from '../components/home/Testimonials';
import Container from '../components/ui/Container';
import { products } from '../data/products';

const HomePage = () => {
  // Get featured products (could be based on various criteria like top rated, newest, etc.)
  const featuredProducts = products.slice(0, 4);
  
  // Get products with discounts for deals section
  const discountedProducts = products.filter(product => product.discount > 0);
  
  return (
    <div>
      <Hero />
      
      <FeaturedCategories />
      
      <Container>
        <ProductGrid 
          products={featuredProducts} 
          title="Featured Products" 
        />
      </Container>
      
      <PromoSection />
      
      <Container>
        <ProductGrid 
          products={discountedProducts} 
          title="Special Offers" 
        />
      </Container>
      
      <Testimonials />
    </div>
  );
};

export default HomePage;