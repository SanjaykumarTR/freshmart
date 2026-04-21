import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, Leaf, BadgePercent, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { products } from '../data/products';
import { categories } from '../data/categories';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const bannerImages = [
  {
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop',
    title: 'Fresh Vegetables',
    subtitle: 'Up to 40% Off',
    description: 'Get fresh vegetables delivered to your doorstep',
    cta: 'Shop Now',
  },
  {
    image: 'https://images.unsplash.com/photo-1506484381205-f7945b6e6ab0?w=1200&h=600&fit=crop',
    title: 'Organic Fruits',
    subtitle: 'Summer Sale',
    description: 'Premium organic fruits at best prices',
    cta: 'View Offers',
  },
  {
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=600&fit=crop',
    title: 'Daily Essentials',
    subtitle: 'Flat 25% Off',
    description: 'Stock up on daily groceries',
    cta: 'Grab Deal',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    comment:
      'FreshMart never disappoints! The quality of fruits and vegetables is always top-notch. Fast delivery too!',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    comment:
      'Best online grocery shopping experience. Great prices and amazing customer service.',
  },
  {
    id: 3,
    name: 'Anita Patel',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    comment:
      'Love the freshness of products. My go-to supermarket now. Highly recommend FreshMart!',
  },
];

const Home = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const featuredProducts = products.slice(0, 8);
  const dealProducts = products.filter((p) => p.discountPrice < p.price).slice(0, 4);

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="h-[300px] sm:h-[400px] lg:h-[500px]"
        >
          {bannerImages.map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative h-full flex items-center"
                style={{
                  backgroundImage: `url(${banner.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white"
                  >
                    <span className="inline-block bg-secondary text-dark text-sm font-bold px-4 py-1 rounded-full mb-4">
                      {banner.subtitle}
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
                      {banner.title}
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 max-w-lg">
                      {banner.description}
                    </p>
                    <Link
                      to="/shop"
                      className="inline-flex items-center bg-primary hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-colors"
                    >
                      {banner.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-12 sm:py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our wide selection of groceries across different categories
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark">
                Featured Products
              </h2>
              <p className="text-gray-600 mt-2">
                Check out our top selling products
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center text-primary hover:text-green-700 font-medium"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Today's Special Deals
            </h2>
            <p className="text-white/80 mb-6">
              Limited time offers - Grab them before they expire!
            </p>
            <div className="flex justify-center gap-4 sm:gap-8">
              {Object.entries(countdown).map(([unit, value]) => (
                <div
                  key={unit}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 min-w-[70px] sm:min-w-[90px]"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 capitalize">
                    {unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-dark mb-2">Free Delivery</h3>
              <p className="text-gray-600 text-sm">
                Free delivery on orders above ₹500
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-dark mb-2">Fresh Products</h3>
              <p className="text-gray-600 text-sm">
                100% fresh and quality guaranteed
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BadgePercent className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-dark mb-2">Best Prices</h3>
              <p className="text-gray-600 text-sm">
                Get the best deals on every item
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <RotateCcw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-dark mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mb-4"
                />
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-secondary fill-current'
                          : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <h4 className="font-semibold text-dark">{testimonial.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-green-600 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Get the latest updates on new products and upcoming sales. Subscribe
              to our newsletter for exclusive offers!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button className="bg-secondary hover:bg-yellow-400 text-dark font-semibold px-8 py-3 rounded-full transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;