import React, { useState } from 'react';

import { UIOrder } from '@/app/admin/components/Orders/OrderMain';

import OrderColumn from './OrderColumn';

import { Order } from '@/types/order';

interface OrderKanbanBoardProps {
  orders: UIOrder[];
  onStatusUpdate: (orderId: string, newStatus: UIOrder['status']) => void;
}

const OrderKanbanBoard: React.FC<OrderKanbanBoardProps> = ({
  orders,
  onStatusUpdate,
}) => {
  const [draggingOrder, setDraggingOrder] = useState<UIOrder | null>(null);

  const columns: { id: Order['status']; title: string; color: string }[] = [
    { id: 'placed', title: 'Placed', color: 'blue' },
    { id: 'processing', title: 'Processing', color: 'orange' },
    { id: 'ready', title: 'Ready', color: 'green' },
    { id: 'cancelled', title: 'Cancelled', color: 'red' },
  ];

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter((order) => order.status === status);
  };

  const handleDrop = (orderId: string, newStatus: Order['status']) => {
    const order = orders.find((o) => o._id === orderId);
    if (order && order.status !== newStatus) {
      onStatusUpdate(orderId, newStatus);
    }
    setDraggingOrder(null);
  };

  // Handle drag start globally to track dragging state
  React.useEffect(() => {
    const handleDragStart = (e: DragEvent) => {
      const orderId = e.dataTransfer?.getData('text/plain') ?? '';
      if (orderId) {
        const order = orders.find((o) => o._id === orderId);
        setDraggingOrder(order || null);
      }
    };

    const handleDragEnd = () => {
      setDraggingOrder(null);
    };

    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragend', handleDragEnd);

    return () => {
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('dragend', handleDragEnd);
    };
  }, [orders]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
      {columns.map((column) => (
        <OrderColumn
          key={column.id}
          id={column.id}
          title={column.title}
          color={column.color}
          orders={getOrdersByStatus(column.id)}
          onDrop={handleDrop}
          draggingOrder={draggingOrder}
        />
      ))}
    </div>
  );
};

export default OrderKanbanBoard;
