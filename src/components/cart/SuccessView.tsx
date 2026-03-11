import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

import { OrderDetails } from '@/types/menu';

interface SuccessViewProps {
  currentOrder: OrderDetails | null;
  setViewState: (
    state: 'cart' | 'checkout' | 'success' | 'orderDetails' | 'cancellation',
  ) => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({
  currentOrder,
  setViewState,
}) => {
  return (
    <div className='text-center'>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='flex justify-center mb-6'
      >
        <div className='w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center'>
          <CheckCircle size={32} className='text-green-500' />
        </div>
      </motion.div>
      <h3 className='text-xl font-bold text-white mb-2'>Order Confirmed!</h3>
      <p className='text-white/70 mb-4'>
        Your order #{currentOrder?.orderId} has been placed successfully.
      </p>
      <div className='bg-white/5 p-4 rounded-lg mb-6'>
        <p className='text-sm text-white mb-1'>Pickup Time</p>
        <p className='text-lg font-semibold text-[#E8552D]'>
          {currentOrder?.customerDetails.pickupTime}
        </p>
      </div>
      <p className='text-sm text-white/70 mb-6'>
        We've sent a confirmation email with your order details.
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setViewState('orderDetails')}
        className='px-6 py-2 bg-white/10 text-white rounded-lg font-medium'
      >
        View Order Details
      </motion.button>
    </div>
  );
};

export default SuccessView;
