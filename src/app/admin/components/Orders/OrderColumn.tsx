import React, { useState } from 'react';

import { UIOrder } from '@/app/admin/components/Orders/OrderMain';

import OrderCard from './OrderCard';

import { Order } from '@/types/order';

interface OrderColumnProps {
  id: Order['status'];
  title: string;
  color: string;
  orders: UIOrder[];
  onDrop: (orderId: string, status: Order['status']) => void;
  draggingOrder: UIOrder | null;
}

const OrderColumn: React.FC<OrderColumnProps> = ({
  id,
  title,
  color,
  orders,
  onDrop,
  draggingOrder,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        header: 'bg-blue-500',
        border: 'border-blue-200',
        bg: 'bg-blue-50/50',
        hover: 'bg-blue-100',
      },
      orange: {
        header: 'bg-orange-500',
        border: 'border-orange-200',
        bg: 'bg-orange-50/50',
        hover: 'bg-orange-100',
      },
      green: {
        header: 'bg-green-500',
        border: 'border-green-200',
        bg: 'bg-green-50/50',
        hover: 'bg-green-100',
      },
      red: {
        header: 'bg-red-500',
        border: 'border-red-200',
        bg: 'bg-red-50/50',
        hover: 'bg-red-100',
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const colorClasses = getColorClasses(color);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const orderId = e.dataTransfer.getData('text/plain');
    if (orderId) {
      onDrop(orderId, id as Order['status']);
    }
  };

  return (
    <div
      className={`rounded-xl border-2 ${colorClasses.border} ${colorClasses.bg} transition-all duration-200 ${
        isDragOver ? colorClasses.hover : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className={`${colorClasses.header} text-white p-4 rounded-t-xl`}>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-lg'>{title}</h3>
          <span className='bg-white bg-opacity-30 px-3 py-1 rounded-full text-sm font-medium'>
            {orders.length}
          </span>
        </div>
      </div>

      {/* Cards Container with Scrollbar */}
      <div className='p-4 h-[400px] overflow-y-auto space-y-3'>
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onDragStart={(e, draggedOrder) => {
              e.dataTransfer.setData('text/plain', draggedOrder._id);
              e.dataTransfer.effectAllowed = 'move';
            }}
            isDragging={draggingOrder?._id === order._id}
          />
        ))}

        {orders.length === 0 && (
          <div className='text-center py-8 text-gray-500'>
            <p className='text-sm'>No orders</p>
            <p className='text-xs mt-1'>Drag orders here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderColumn;
