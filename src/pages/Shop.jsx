import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, ChevronDown, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      'Fruits & Vegetables',
      'Dairy & Eggs',
      'Snacks',
      'Beverages',
      'Meat & Seafood',
      'Bakery',
      'Household',
      'Personal Care',
    ],
  },
  {
    id: 'rating',
    name: 'Rating',
    options: ['4★ & above', '3★ & above', '2★ & above'],
  },
  {
    id: 'availability',
    name: 'Availability',
    options: ['In Stock', 'Out of Stock'],
  },
];

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  );
  const [selectedSort, setSelectedSort] = useState('popularity');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [gridView, setGridView] = useState(true);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (selectedFilters.category?.length) {
      result = result.filter((product) =>
        selectedFilters.category.includes(product.category)
      );
    }

    if (selectedFilters.rating?.length) {
      const minRating = parseFloat(selectedFilters.rating[0].replace('★', ''));
      result = result.filter((product) => product.rating >= minRating);
    }

    if (selectedFilters.availability?.includes('In Stock')) {
      result = result.filter((product) => product.stock > 0);
    }

    result = result.filter(
      (product) =>
        product.discountPrice >= priceRange[0] &&
        product.discountPrice <= priceRange[1]
    );

    switch (selectedSort) {
      case 'price-low':
        result.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case 'price-high':
        result.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, selectedFilters, priceRange, selectedSort]);

  const handleFilterChange = (filterId, value) => {
    setSelectedFilters((prev) => {
      const existing = prev[filterId] || [];
      if (existing.includes(value)) {
        return {
          ...prev,
          [filterId]: existing.filter((v) => v !== value),
        };
      }
      return {
        ...prev,
        [filterId]: [...existing, value],
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setPriceRange([0, 1000]);
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSort('popularity');
    setSearchParams({});
  };

  const activeFilterCount =
    Object.values(selectedFilters).filter((arr) => arr.length > 0).length +
    (selectedCategory ? 1 : 0);

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark mb-2">
            Shop
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-dark">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-green-700"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-dark mb-3">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-dark mb-3">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              {filters.map((filter) => (
                <div key={filter.id} className="mb-6">
                  <h3 className="font-medium text-dark mb-3">{filter.name}</h3>
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedFilters[filter.id]?.includes(option) || false
                          }
                          onChange={() => handleFilterChange(filter.id, option)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-gray-600">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:max-w-md">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg"
                  >
                    <Filter className="h-5 w-5" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  <div className="relative">
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="hidden sm:flex items-center space-x-1 border border-gray-200 rounded-lg p-1">
                    <button
                      onClick={() => setGridView(true)}
                      className={`p-1.5 rounded ${
                        gridView ? 'bg-primary text-white' : 'text-gray-600'
                      }`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setGridView(false)}
                      className={`p-1.5 rounded ${
                        !gridView ? 'bg-primary text-white' : 'text-gray-600'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {(selectedCategory || Object.keys(selectedFilters).length > 0) && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedCategory && (
                    <span className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      <span>{selectedCategory}</span>
                      <button onClick={() => setSelectedCategory('')}>
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  )}
                  {Object.entries(selectedFilters).map(
                    ([key, values]) =>
                      values.length > 0 &&
                      values.map((value) => (
                        <span
                          key={value}
                          className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          <span>{value}</span>
                          <button
                            onClick={() => handleFilterChange(key, value)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      ))
                  )}
                </div>
              )}
            </div>

            {showMobileFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
                <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
                  <div className="p-4 flex items-center justify-between">
                    <h2 className="font-semibold text-dark">Filters</h2>
                    <button onClick={() => setShowMobileFilters(false)}>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="mb-6">
                      <h3 className="font-medium text-dark mb-3">Search</h3>
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    {filters.map((filter) => (
                      <div key={filter.id} className="mb-6">
                        <h3 className="font-medium text-dark mb-3">
                          {filter.name}
                        </h3>
                        <div className="space-y-2">
                          {filter.options.map((option) => (
                            <label
                              key={option}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  selectedFilters[filter.id]?.includes(
                                    option
                                  ) || false
                                }
                                onChange={() =>
                                  handleFilterChange(filter.id, option)
                                }
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <span className="text-gray-600">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <h3 className="text-xl font-semibold text-dark mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search term
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-primary hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridView
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;