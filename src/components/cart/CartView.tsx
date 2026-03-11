import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Minus,
  Plus,
  ShoppingCart,
} from 'lucide-react';
import Image from 'next/image';

import { CartItem, OrderDetails } from '@/types/menu';

interface CartViewProps {
  cart: CartItem[];
  recentOrders: OrderDetails[];
  showRecentOrders: boolean;
  setCart: (cart: CartItem[]) => void;
  handleRemoveItem: (itemId: string) => void;
  handleAddItem: (item: CartItem) => void;
  handleClearCart: () => void;
  toggleRecentOrders: () => void;
  handleViewOrderDetails: (order: OrderDetails) => void;
  formatDate: (date: Date) => string;
  getStatusBadgeColor: (status: string) => string;
  onClose: () => void;
}

const CartView: React.FC<CartViewProps> = ({
  cart,
  recentOrders,
  showRecentOrders,
  setCart,
  handleRemoveItem,
  handleAddItem,
  handleClearCart,
  toggleRecentOrders,
  handleViewOrderDetails,
  formatDate,
  getStatusBadgeColor,
  onClose,
}) => {
  const renderEmptyCartView = () => (
    <div className='flex flex-col items-center justify-center h-full text-center py-16'>
      <ShoppingCart size={48} className='text-white/30 mb-4' />
      <p className='text-white/70'>Your cart is empty.</p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClose}
        className='mt-4 px-6 py-2 bg-[#E8552D] text-[#0B1426] rounded-full font-medium'
      >
        Browse Menu
      </motion.button>
    </div>
  );

  return (
    <>
      {cart.length > 0 && (
        <div className='flex justify-end mb-4'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearCart}
            className='text-sm text-[#E8552D] hover:underline'
          >
            Clear all
          </motion.button>
        </div>
      )}

      {cart.length > 0 && (
        <div className='space-y-3 sm:space-y-4 mb-6'>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='flex items-center justify-between bg-white/5 rounded-lg p-3 sm:p-4'
            >
              <div className='w-20 h-20 rounded-lg overflow-hidden mr-3 sm:mr-4 flex-shrink-0'>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex-grow min-w-0'>
                <h3 className='font-semibold text-base sm:text-lg text-white truncate'>
                  {item.name}
                </h3>
                <p className='text-white/70 text-sm'>
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className='flex items-center space-x-2 ml-2 flex-shrink-0'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (item.quantity > 1) {
                      setCart(
                        cart.map((cartItem) =>
                          cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem,
                        ),
                      );
                    } else {
                      item.id && handleRemoveItem(item.id);
                    }
                  }}
                  className='p-1 rounded-full hover:bg-red-500/20 transition-colors'
                >
                  <Minus size={16} className='text-white' />
                </motion.button>
                <span className='text-white min-w-4 text-center'>
                  {item.quantity}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddItem(item)}
                  className='p-1 rounded-full hover:bg-green-500/20 transition-colors'
                >
                  <Plus size={16} className='text-white' />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {recentOrders.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='mt-4'
        >
          <div
            className='flex items-center justify-between py-2 px-1 mb-2 cursor-pointer'
            onClick={toggleRecentOrders}
          >
            <h3 className='text-[#E8552D] font-semibold flex items-center'>
              <Clock size={16} className='mr-2' />
              Recent Orders
            </h3>
            <motion.div
              animate={{ rotate: showRecentOrders ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className='text-[#E8552D]' />
            </motion.div>
          </div>

          <AnimatePresence>
            {showRecentOrders && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='overflow-hidden'
              >
                <div className='space-y-3 mb-4'>
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.orderId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className='bg-white/5 hover:bg-white/10 rounded-lg p-3 cursor-pointer transition-colors'
                      onClick={() => handleViewOrderDetails(order)}
                    >
                      <div className='flex justify-between mb-1'>
                        <span className='text-white/90 font-medium'>
                          #{order.orderId}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeColor(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <div>
                          <p className='text-white/60 text-xs'>
                            {formatDate(new Date(order.createdAt))}
                          </p>
                          <p className='text-white/80 text-sm mt-0.5'>
                            {order.items.length}{' '}
                            {order.items.length === 1 ? 'item' : 'items'} · $
                            {order.total.toFixed(2)}
                          </p>
                        </div>
                        <ChevronRight size={16} className='text-white/40' />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {cart.length === 0 && recentOrders.length === 0 && renderEmptyCartView()}
    </>
  );
};

export default CartView;
