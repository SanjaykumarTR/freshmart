import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Package, Truck, ArrowRight } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('freshmart-order');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <Check className="h-12 w-12 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark mb-4"
          >
            Order Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-8"
          >
            Thank you for your order. We've received your order and will start processing it
            soon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-light rounded-xl p-6 mb-8 inline-block"
          >
            <div className="text-left">
              <div className="flex items-center space-x-2 mb-4">
                <Package className="h-5 w-5 text-primary" />
                <span className="font-medium text-dark">Order ID</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {order.orderId}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-light rounded-xl p-4">
              <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-dark mb-1">Estimated Delivery</h3>
              <p className="text-gray-600 text-sm">
                {new Date(
                  new Date(order.date).getTime() + 3 * 24 * 60 * 60 * 1000
                ).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </p>
            </div>
            <div className="bg-light rounded-xl p-4">
              <h3 className="font-medium text-dark mb-1">Delivery Address</h3>
              <p className="text-gray-600 text-sm">
                {order.customer.address}, {order.customer.city} - {order.customer.pincode}
              </p>
            </div>
            <div className="bg-light rounded-xl p-4">
              <h3 className="font-medium text-dark mb-1">Payment Method</h3>
              <p className="text-gray-600 text-sm capitalize">
                {order.customer.paymentMethod === 'cod'
                  ? 'Cash on Delivery'
                  : order.customer.paymentMethod === 'upi'
                  ? 'UPI'
                  : 'Card Payment'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/shop"
              className="inline-flex items-center bg-primary hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-xl transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Success;