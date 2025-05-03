import React from 'react';
import Container from '../ui/Container';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    comment: 'The quality of the products exceeded my expectations. Fast shipping and excellent customer service. Highly recommended!',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    comment: "I've been shopping here for over a year now and have never been disappointed. Great prices and amazing selection.",
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    rating: 4,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    comment: 'The checkout process was smooth, and my items arrived earlier than expected. Will definitely be a repeat customer!',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what customers think about their shopping experience with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;