import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle, Clock, Package, Search, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { useUpdateOrderStatus } from '@/hooks/orders/mutate';
import { useGetAllOrders } from '@/hooks/orders/query';
import { useToast } from '@/hooks/use-toast';

import OrderKanbanBoard from './OrderKanbanBoard';

import { Order } from '@/types/order';

// UI-compatible order type for Kanban board
export interface UIOrder {
  _id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  product: string;
  status: 'placed' | 'processing' | 'ready' | 'cancelled';
  createdAt: string;
  amount: number;
}

const OrderMain = () => {
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isPending: isMutating } =
    useUpdateOrderStatus();
  const { data: apiOrders = [], isLoading, error } = useGetAllOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<UIOrder[]>([]);
  const { toast } = useToast();

  // Map API orders to UI-compatible orders
  const orders: UIOrder[] = apiOrders.map((order: Order) => ({
    _id: order._id,
    orderNumber: order.orderId,
    customerName: order.customerDetails.name,
    email: order.customerDetails.email,
    product: order.items.map((item) => `Item (${item.quantity}x)`).join(', '), // Simplified product name
    status: order.status,
    createdAt: order.createdAt,
    amount: order.total,
  }));

  // Update filtered orders when orders or search term changes
  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (JSON.stringify(filtered) !== JSON.stringify(filteredOrders)) {
      setFilteredOrders(filtered);
    }
  }, [orders, searchTerm, filteredOrders]);

  const handleStatusUpdate = async (
    orderId: string,
    newStatus: UIOrder['status'],
  ) => {
    const order = orders.find((o) => o._id === orderId);
    if (order && order.status !== newStatus) {
      // Optimistic update
      queryClient.setQueryData(['orders'], (old: Order[] | undefined) =>
        old
          ? old.map((o) =>
              o._id === orderId ? { ...o, status: newStatus } : o,
            )
          : old,
      );

      try {
        updateStatus(
          {
            id: orderId,
            payload: { status: newStatus },
          },
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSuccess: (data: any) => {
              toast.success(
                `Order ${data.data.orderId} status updated to ${newStatus}`,
              );
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
              // Revert optimistic update
              queryClient.setQueryData(['orders'], apiOrders);
              toast.error(error?.message || 'Failed to update order status');
            },
          },
        );
      } catch (error) {
        // Error handling is managed by onError callback
        console.error('Status update failed:', error);
        toast.error('Failed to update order status');
      }
    }
  };

  const getStatusIcon = (status: UIOrder['status']) => {
    switch (status) {
      case 'placed':
        return <Package className='w-5 h-5' />;
      case 'processing':
        return <Clock className='w-5 h-5' />;
      case 'ready':
        return <CheckCircle className='w-5 h-5' />;
      case 'cancelled':
        return <XCircle className='w-5 h-5' />;
      default:
        return null;
    }
  };

  const getStatusCount = (status: UIOrder['status']) => {
    return filteredOrders.filter((order) => order.status === status).length;
  };

  return (
    <div className=' bg-gradient-to-br from-slate-50 to-blue-50 overflow-y-auto '>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Order Management
          </h1>
          <p className='text-gray-600'>
            Drag orders between columns to update their status
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className='mb-4 text-blue-600'>Loading orders...</div>
        )}

        {/* Error State */}
        {error && (
          <div className='mb-4 text-red-600'>
            Error: {error.message || 'Failed to load orders'}
          </div>
        )}

        {/* Mutation Loading State */}
        {isMutating && (
          <div className='mb-4 text-blue-600'>Updating order status...</div>
        )}

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <div className='bg-white rounded-xl shadow-sm border border-blue-100 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Placed</p>
                <p className='text-2xl font-bold text-blue-600'>
                  {getStatusCount('placed')}
                </p>
              </div>
              <div className='p-3 bg-blue-100 rounded-lg'>
                {getStatusIcon('placed')}
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-sm border border-orange-100 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Processing</p>
                <p className='text-2xl font-bold text-orange-600'>
                  {getStatusCount('processing')}
                </p>
              </div>
              <div className='p-3 bg-orange-100 rounded-lg'>
                {getStatusIcon('processing')}
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-sm border border-green-100 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Ready</p>
                <p className='text-2xl font-bold text-green-600'>
                  {getStatusCount('ready')}
                </p>
              </div>
              <div className='p-3 bg-green-100 rounded-lg'>
                {getStatusIcon('ready')}
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-sm border border-red-100 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Cancelled</p>
                <p className='text-2xl font-bold text-red-600'>
                  {getStatusCount('cancelled')}
                </p>
              </div>
              <div className='p-3 bg-red-100 rounded-lg'>
                {getStatusIcon('cancelled')}
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className='mb-8'>
          <div className='relative max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search orders...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
        </div>

        {/* Kanban Board */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[10vh] overflow-y-auto'>
          <OrderKanbanBoard
            orders={filteredOrders}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderMain;
