import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Apple,
  Milk,
  Coffee,
  Beef,
  Home,
  Heart,
  Cookie,
  Croissant,
} from 'lucide-react';

const iconMap = {
  Apple: Apple,
  Milk: Milk,
  Coffee: Coffee,
  Beef: Beef,
  Home: Home,
  Heart: Heart,
  Cookie: Cookie,
  Croissant: Croissant,
};

const CategoryCard = ({ category, index }) => {
  const Icon = iconMap[category.icon] || Apple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/shop?category=${encodeURIComponent(category.name)}`}>
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center group cursor-pointer"
        >
          <div className="relative mb-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center group-hover:from-primary group-hover:to-green-400 transition-all duration-300">
              <Icon className="h-10 w-10 text-primary group-hover:text-white transition-colors" />
            </div>
          </div>
          <h3 className="font-semibold text-dark group-hover:text-primary transition-colors">
            {category.name}
          </h3>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;