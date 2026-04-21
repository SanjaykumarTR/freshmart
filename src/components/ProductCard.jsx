import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.discountPrice < product.price && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
              )}
              % OFF
            </div>
          )}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full shadow-lg transition-colors ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-primary hover:text-white'
              }`}
            >
              <Heart
                className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`}
              />
            </button>
            <button className="p-2 rounded-full bg-white text-gray-600 hover:bg-primary hover:text-white shadow-lg transition-colors">
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-secondary fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              ({product.rating})
            </span>
          </div>
          <h3 className="font-semibold text-dark mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary">
                ₹{product.discountPrice}
              </span>
              {product.discountPrice < product.price && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  ₹{product.price}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-primary hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;