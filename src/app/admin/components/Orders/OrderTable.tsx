import { Trash2 } from 'lucide-react';
import React from 'react';

interface Order {
  _id: string;
  customerName: string;
  email: string;
  product: string;
  status: 'Pending' | 'Cancelled' | 'Completed';
  createdAt: string;
}

interface OrderTableProps {
  orders: Order[];
  onDeleteClick: (id: string) => void;
  onCancelClick: (id: string) => void;
  isProcessing: boolean;
  processingId: string | null;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  onDeleteClick,
  onCancelClick,
  isProcessing,
  processingId,
}) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Customer
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Email
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Product
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Status
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Date
            </th>
            <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {orders.map((order, index) => (
            <tr
              key={order._id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm font-medium text-gray-900'>
                  {order.customerName}
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{order.email}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{order.product}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <span
                  className={`text-sm font-medium ${
                    order.status === 'Cancelled'
                      ? 'text-red-600'
                      : order.status === 'Completed'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2'>
                <button
                  onClick={() => onDeleteClick(order._id)}
                  className='text-red-600 hover:text-red-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 p-2 rounded-full hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  aria-label='Delete order'
                  disabled={isProcessing && processingId === order._id}
                >
                  <Trash2 className='w-5 h-5' />
                </button>
                {order.status !== 'Cancelled' && (
                  <button
                    onClick={() => onCancelClick(order._id)}
                    className='text-yellow-600 hover:text-yellow-800 underline text-xs disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isProcessing && processingId === order._id}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
