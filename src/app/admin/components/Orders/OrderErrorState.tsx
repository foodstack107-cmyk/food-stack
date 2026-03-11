import { AlertCircle, RefreshCw } from 'lucide-react';
import React from 'react';

interface OrderErrorStateProps {
  onRetry: () => void;
}

const OrderErrorState: React.FC<OrderErrorStateProps> = ({ onRetry }) => {
  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden'>
      <div className='p-8 text-center'>
        <div className='flex justify-center mb-4'>
          <AlertCircle className='h-12 w-12 text-red-500' />
        </div>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          Unable to load orders
        </h2>
        <p className='text-gray-600 mb-6'>
          There was a problem fetching the orders. Please try again.
        </p>
        <button
          onClick={onRetry}
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          <RefreshCw className='w-4 h-4 mr-2' />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default OrderErrorState;
