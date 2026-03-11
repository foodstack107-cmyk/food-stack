import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, ShoppingCart, X } from 'lucide-react';

interface CartModalHeaderProps {
  viewState: string;
  handleClose: () => void;
}

const CartModalHeader: React.FC<CartModalHeaderProps> = ({
  viewState,
  handleClose,
}) => {
  return (
    <div className='p-4 sm:p-6 border-b border-white/10 flex items-center justify-between'>
      <h2 className='text-xl sm:text-2xl font-bold text-white flex items-center gap-2'>
        {viewState === 'cart' && (
          <>
            <ShoppingCart size={20} className='text-[#E8552D]' />
            Your Cart
          </>
        )}
        {viewState === 'checkout' && (
          <>
            <ShoppingCart size={20} className='text-[#E8552D]' />
            Checkout
          </>
        )}
        {viewState === 'success' && (
          <>
            <CheckCircle size={20} className='text-green-500' />
            Order Confirmed
          </>
        )}
        {viewState === 'orderDetails' && (
          <>
            <ShoppingCart size={20} className='text-[#E8552D]' />
            Order Details
          </>
        )}
        {viewState === 'cancellation' && (
          <>
            <AlertCircle size={20} className='text-red-500' />
            Cancel Order
          </>
        )}
      </h2>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClose}
        className='p-2 rounded-full hover:bg-white/5 transition-colors'
      >
        <X size={20} className='text-white' />
      </motion.button>
    </div>
  );
};

export default CartModalHeader;
