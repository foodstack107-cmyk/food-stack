import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

import { currencyFormatter } from '@/lib/utils';

import { OrderDetails } from '@/types/menu';

interface OrderDetailsViewProps {
  currentOrder: OrderDetails | null;
  isCancellationAllowed: (order: OrderDetails) => boolean;
  handleStartCancellation: () => void;
}

const OrderDetailsView: React.FC<OrderDetailsViewProps> = ({
  currentOrder,
  isCancellationAllowed,
  handleStartCancellation,
}) => {
  return (
    <div>
      <div className='mb-6'>
        <div className='flex items-center mb-4'>
          <h3 className='text-xl font-bold text-white flex-grow'>
            Order #{currentOrder?.orderId}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentOrder?.status === 'placed'
                ? 'bg-green-500/20 text-green-500'
                : currentOrder?.status === 'cancelled'
                  ? 'bg-red-500/20 text-red-500'
                  : 'bg-yellow-500/20 text-yellow-500'
            }`}
          >
            {currentOrder?.status
              ? currentOrder.status.charAt(0).toUpperCase() +
                currentOrder.status.slice(1)
              : ''}
          </span>
        </div>
        <p className='text-white/70 text-sm mb-2'>
          <Clock size={14} className='inline mr-1' />
          Pickup at {currentOrder?.customerDetails.pickupTime}
        </p>
        <div className='flex items-center text-white/70 text-sm'>
          <span className='mr-4'>{currentOrder?.customerDetails.name}</span>
          <span>{currentOrder?.customerDetails.phone}</span>
        </div>
      </div>

      <div className='border-t border-white/10 pt-4 mb-6'>
        <h4 className='text-lg font-semibold text-white mb-3'>Order Summary</h4>
        <div className='space-y-3'>
          {currentOrder?.items.map((item) => (
            <div key={item.id} className='flex items-center justify-between'>
              <div className='flex items-center'>
                <span className='bg-white/10 w-6 h-6 rounded-full text-xs flex items-center justify-center text-white mr-3'>
                  {item.quantity}
                </span>
                <span className='text-white'>{item.name}</span>
              </div>
              <span className='text-white/70'>
                {currencyFormatter.format(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='border-t border-white/10 pt-4 mb-6'>
        <div className='flex justify-between mb-2'>
          <span className='text-white/70'>Subtotal</span>
          <span className='text-white'>
            {currencyFormatter.format(currentOrder?.total || 0)}
          </span>
        </div>
        <div className='flex justify-between font-bold'>
          <span className='text-white'>Total</span>
          <span className='text-[#E8552D]'>
            {currencyFormatter.format(currentOrder?.total || 0)}
          </span>
        </div>
      </div>

      {currentOrder && isCancellationAllowed(currentOrder) && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStartCancellation}
          className='w-full py-2 bg-red-500/20 text-red-400 rounded-lg font-medium mt-4'
        >
          Cancel Order
        </motion.button>
      )}
    </div>
  );
};

export default OrderDetailsView;
