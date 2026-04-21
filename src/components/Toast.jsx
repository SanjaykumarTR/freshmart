import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Toast = () => {
  const { toast } = useCart();

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const Icon = icons[toast?.type] || Info;
  const bgColor = bgColors[toast?.type] || bgColors.success;

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className={`fixed bottom-4 left-1/2 z-50 ${bgColor} text-white px-6 py-3 rounded-xl shadow-xl flex items-center space-x-3`}
        >
          <Icon className="h-5 w-5" />
          <span className="font-medium">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;