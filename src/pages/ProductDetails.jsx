import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Minus,
  Plus,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
  ShoppingCart,
  ChevronRight,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find((p) => p.id === parseInt(id));
  const inWishlist = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">Product not found</h2>
          <Link to="/shop" className="text-primary hover:text-green-700">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const images = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/shop" className="hover:text-primary">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-dark">{product.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-square rounded-2xl overflow-hidden bg-gray-100"
              >
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? 'ring-2 ring-primary'
                        : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-dark mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-secondary fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      ({product.rating} ratings)
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleWishlist}
                    className={`p-2 rounded-full border ${
                      inWishlist
                        ? 'bg-red-500 text-white border-red-500'
                        : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:border-primary hover:text-primary">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">
                  ₹{product.discountPrice}
                </span>
                {product.discountPrice < product.price && (
                  <>
                    <span className="text-xl text-gray-400 line-through ml-3">
                      ₹{product.price}
                    </span>
                    <span className="ml-3 bg-red-500 text-white text-sm font-medium px-2 py-1 rounded">
                      {Math.round(
                        ((product.price - product.discountPrice) /
                          product.price) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <h3 className="font-medium text-dark mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="px-4 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    Stock: {product.stock} available
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-secondary hover:bg-yellow-400 text-dark font-semibold py-3 px-8 rounded-xl transition-colors"
                >
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center space-x-3">
                  <Truck className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-medium text-dark">Free Delivery</h4>
                    <p className="text-sm text-gray-600">
                      On orders above ₹500
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-medium text-dark">Secure Payment</h4>
                    <p className="text-sm text-gray-600">100% secure</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-medium text-dark">Easy Returns</h4>
                    <p className="text-sm text-gray-600">30-day returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;