import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Heart, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { cartItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-green-600">
              <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-gray-800">
                FreshMart
              </span>
              <p className="text-xs sm:text-sm text-gray-500">
                Fresh Groceries Delivered Fast
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`font-medium transition-colors ${
                isActive('/shop') ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Shop
            </Link>
            <div className="relative">
              <button
                onMouseEnter={() => setShowDropdown(true)}
                className="font-medium text-gray-700 hover:text-green-600 flex items-center"
              >
                Categories
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showDropdown && (
                <div
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50"
                >
                  <Link to="/shop?category=Fruits & Vegetables" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Fruits & Vegetables
                  </Link>
                  <Link to="/shop?category=Dairy & Eggs" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Dairy & Eggs
                  </Link>
                  <Link to="/shop?category=Snacks" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Snacks
                  </Link>
                  <Link to="/shop?category=Beverages" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Beverages
                  </Link>
                  <Link to="/shop?category=Meat & Seafood" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Meat & Seafood
                  </Link>
                  <Link to="/shop?category=Bakery" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Bakery
                  </Link>
                  <Link to="/shop?category=Household" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Household
                  </Link>
                  <Link to="/shop?category=Personal Care" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Personal Care
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive('/about') ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-700 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className="block font-medium text-gray-700 hover:text-green-600 py-2">
              Home
            </Link>
            <Link to="/shop" className="block font-medium text-gray-700 hover:text-green-600 py-2">
              Shop
            </Link>
            <Link to="/about" className="block font-medium text-gray-700 hover:text-green-600 py-2">
              About
            </Link>
            <Link to="/contact" className="block font-medium text-gray-700 hover:text-green-600 py-2">
              Contact
            </Link>
            <Link to="/login" className="block font-medium text-gray-700 hover:text-green-600 py-2">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;