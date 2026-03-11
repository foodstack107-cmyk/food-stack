import { motion } from 'framer-motion';

import { OrderDetails } from '@/types/menu';

interface CancellationViewProps {
  currentOrder: OrderDetails | null;
  cancellationReason: string;
  setCancellationReason: (reason: string) => void;
  isSubmitting: boolean;
  handleCancelOrder: () => void;
  handleBackToOrderDetails: () => void;
}

const CancellationView: React.FC<CancellationViewProps> = ({
  currentOrder,
  cancellationReason,
  setCancellationReason,
  isSubmitting,
  handleCancelOrder,
  handleBackToOrderDetails,
}) => {
  return (
    <div>
      <h3 className='text-xl font-bold text-white mb-4'>Cancel Your Order</h3>
      <div className='bg-white/5 p-4 rounded-lg mb-6'>
        <p className='text-sm text-white mb-1'>
          Order #{currentOrder?.orderId}
        </p>
        <p className='text-white/60 text-sm'>
          Pickup at {currentOrder?.customerDetails.pickupTime}
        </p>
      </div>

      <div className='mb-6'>
        <p className='text-white/70 mb-4'>
          Please note that you can only cancel your order within 15 minutes of
          placing it. Are you sure you want to cancel this order?
        </p>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1 text-white'>
            Reason for cancellation (optional)
          </label>
          <select
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
            className='w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-[#E8552D] transition-colors'
          >
            <option value=''>Select a reason (optional)</option>
            <option value='Changed my mind'>Changed my mind</option>
            <option value='Ordered by mistake'>Ordered by mistake</option>
            <option value='Incorrect time selected'>
              Incorrect time selected
            </option>
            <option value='Other'>Other</option>
          </select>
        </div>
      </div>

      <div className='flex gap-2'>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBackToOrderDetails}
          className='flex-1 py-2 sm:py-3 text-sm sm:text-base bg-white/10 text-white rounded-lg font-bold text-center'
          disabled={isSubmitting}
        >
          Keep Order
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCancelOrder}
          className='flex-1 py-2 sm:py-3 text-sm sm:text-base bg-red-500 text-white rounded-lg font-bold text-center'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation'}
        </motion.button>
      </div>
    </div>
  );
};

export default CancellationView;
