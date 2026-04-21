import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Award, Users, Truck, Leaf, ChevronRight } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Head of Marketing',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'Head of Customer Service',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  },
];

const About = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-light">
      <section className="relative bg-gradient-to-r from-primary to-green-600 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              About FreshMart
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Your trusted partner for fresh groceries and essentials
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                FreshMart was founded in 2020 with a simple mission: to make fresh,
                quality groceries accessible to everyone. What started as a small local
                store has grown into one of the most trusted online
                supermarkets in the region.
              </p>
              <p className="text-gray-600 mb-6">
                We believe that everyone deserves access to fresh,
                nutritious food. That's why we source our products
                directly from local farmers and trusted suppliers,
                ensuring the highest quality reaches your table.
              </p>
              <div className="flex items-center space-x-2">
                <ChevronRight className="h-5 w-5 text-primary" />
                <span className="font-medium text-dark">
                  Trusted by 50,000+ families
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop"
                alt="FreshMart Store"
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Leaf,
                title: '100% Fresh',
                description:
                  'Direct from farms to your table',
              },
              {
                icon: Truck,
                title: 'Fast Delivery',
                description:
                  'Same-day delivery available',
              },
              {
                icon: Award,
                title: 'Best Quality',
                description:
                  'Premium products guaranteed',
              },
              {
                icon: Users,
                title: '24/7 Support',
                description:
                  'Always here to help you',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-light rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            The dedicated people behind FreshMart working to bring you the best
            grocery experience
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-dark">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600">
                To provide fresh, quality groceries to every household while
                supporting local farmers and promoting sustainable
                agriculture. We aim to make healthy eating accessible and
                affordable for everyone.
              </p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600">
                To become the most trusted online supermarket in India,
                known for quality, reliability, and exceptional customer
                service. We envision a future where every family has
                access to fresh, nutritious food.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-green-600 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Visit Our Store
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Come visit us at our flagship store and experience the FreshMart
              difference firsthand
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
              <div className="bg-white/10 rounded-xl p-4">
                <MapPin className="h-6 w-6 text-white mb-2" />
                <h3 className="font-medium text-white">Address</h3>
                <p className="text-white/80 text-sm">
                  123 FreshMart Street,
                  <br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <Phone className="h-6 w-6 text-white mb-2" />
                <h3 className="font-medium text-white">Phone</h3>
                <p className="text-white/80 text-sm">+91 98765 43210</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <Clock className="h-6 w-6 text-white mb-2" />
                <h3 className="font-medium text-white">Hours</h3>
                <p className="text-white/80 text-sm">
                  Mon - Sat: 8AM - 10PM
                  <br />
                  Sun: 9AM - 8PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;