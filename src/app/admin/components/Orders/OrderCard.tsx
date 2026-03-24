import { Calendar, Mail, Package, User } from 'lucide-react';
import React from 'react';

import { UIOrder } from '@/app/admin/components/Orders/OrderMain';

interface OrderCardProps {
  order: UIOrder;
  onDragStart: (e: React.DragEvent, order: UIOrder) => void;
  isDragging: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onDragStart,
  isDragging,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(e, order);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md select-none ${
        isDragging ? 'opacity-50 rotate-3 scale-105' : ''
      }`}
    >
      {/* Order Number & Amount */}
      <div className='flex justify-between items-start mb-3'>
        <span className='text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded'>
          {order.orderNumber}
        </span>
        <div className='flex items-center text-green-600 font-semibold'>
          {formatAmount(order.amount)}
        </div>
      </div>

      {/* Customer Info */}
      <div className='space-y-2 mb-3'>
        <div className='flex items-center text-gray-700'>
          <User className='w-4 h-4 mr-2 text-gray-400' />
          <span className='font-medium text-sm'>{order.customerName}</span>
        </div>
        <div className='flex items-center text-gray-600'>
          <Mail className='w-4 h-4 mr-2 text-gray-400' />
          <span className='text-xs truncate'>{order.email}</span>
        </div>
      </div>

      {/* Product */}
      <div className='flex items-start mb-3'>
        <Package className='w-4 h-4 mr-2 text-gray-400 mt-0.5' />
        <span className='text-sm text-gray-700 font-medium'>
          {order.product}
        </span>
      </div>

      {/* Date */}
      <div className='flex items-center text-gray-500 text-xs'>
        <Calendar className='w-3 h-3 mr-1' />
        {formatDate(order.createdAt)}
      </div>

      {/* Drag Indicator */}
      <div className='mt-3 pt-2 border-t border-gray-100'>
        <div className='flex justify-center'>
          <div className='w-8 h-1 bg-gray-200 rounded-full'></div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
