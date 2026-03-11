import { motion } from 'framer-motion';

import { CartItem, OrderDetails } from '@/types/menu';
interface CartModalFooterProps {
  viewState: 'cart' | 'checkout' | 'success' | 'orderDetails' | 'cancellation';
  cart: CartItem[];
  total: number;
  isSubmitting: boolean;
  handleBackToCart: () => void;
  handleProceedToCheckout: () => void;
  setViewState: (
    state: 'cart' | 'checkout' | 'success' | 'orderDetails' | 'cancellation',
  ) => void;
  onClose: () => void;
  recentOrders: OrderDetails[];
}

const CartModalFooter: React.FC<CartModalFooterProps> = ({
  viewState,
  cart,
  total,
  isSubmitting,
  handleBackToCart,
  handleProceedToCheckout,
  setViewState,
  onClose,
  recentOrders,
}) => {
  if (cart.length === 0 && viewState === 'cart' && recentOrders.length === 0) {
    return null;
  }

  if (viewState === 'checkout') {
    return (
      <div className='p-4 sm:p-6 bg-[#0B1426]/90 border-t border-white/10 mt-auto'>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-white/70'>Total:</span>
          <span className='font-bold text-lg sm:text-xl text-white'>
            ${total.toFixed(2)}
          </span>
        </div>
        <div className='flex gap-2'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBackToCart}
            className='flex-1 py-2 sm:py-3 text-sm sm:text-base bg-white/10 text-white rounded-lg font-bold text-center'
            disabled={isSubmitting}
          >
            Back to Cart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            form='checkout-form'
            className='flex-1 py-2 sm:py-3 text-sm sm:text-base bg-[#E8552D] text-[#0B1426] rounded-lg font-bold text-center'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </motion.button>
        </div>
      </div>
    );
  }

  if (viewState === 'cart' && cart.length > 0) {
    return (
      <div className='p-4 sm:p-6 bg-[#0B1426]/90 border-t border-white/10 mt-auto'>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-white/70'>Subtotal:</span>
          <span className='font-bold text-lg sm:text-xl text-white'>
            ${total.toFixed(2)}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleProceedToCheckout}
          className='w-full py-2 sm:py-3 text-sm sm:text-base bg-[#E8552D] text-[#0B1426] rounded-lg font-bold text-center'
        >
          Proceed to Checkout
        </motion.button>
      </div>
    );
  }

  if (viewState === 'orderDetails' || viewState === 'success') {
    return (
      <div className='p-4 sm:p-6 bg-[#0B1426]/90 border-t border-white/10 mt-auto'>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setViewState('cart')}
          className='w-full py-2 sm:py-3 text-sm sm:text-base bg-white/10 text-white rounded-lg font-bold text-center'
        >
          Back to Menu
        </motion.button>
      </div>
    );
  }

  if (viewState === 'cart' && cart.length === 0 && recentOrders.length > 0) {
    return (
      <div className='p-4 sm:p-6 bg-[#0B1426]/90 border-t border-white/10 mt-auto'>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className='w-full py-2 sm:py-3 text-sm sm:text-base bg-white/10 text-white rounded-lg font-bold text-center'
        >
          Browse Menu
        </motion.button>
      </div>
    );
  }

  return null;
};

export default CartModalFooter;
