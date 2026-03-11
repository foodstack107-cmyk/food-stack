'use client';

import { useGetAllOrders } from '@/hooks/orders/query';

interface Order {
  _id: string;
  customerDetails?: {
    name?: string;
    email?: string;
  };
  items?: {
    name: string;
  }[];
  status: string;
  createdAt?: string;
}

export default function OrdersPage() {
  const { data: orders = [], isLoading } = useGetAllOrders();

  // const { mutate: updateStatus } = useUpdateOrderStatus();

  // const deleteOrder = async (id: string) => {
  //   if (!confirm('Are you sure you want to delete this order?')) return;
  //   try {
  //     await axios.delete(`/api/orders/${id}`);
  //     refetch();
  //   } catch (error) {
  //     // console.error('Delete failed:', error);
  //   }
  // };

  // const cancelOrder = async (id: string) => {
  //   updateStatus(
  //     { id, payload: { status: 'Cancelled' } },
  //     {
  //       onSuccess: () => refetch(),
  //       // onError: (err) => console.error('Cancel failed:', err),
  //     },
  //   );
  // };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Orders</h2>
      <div className='bg-white shadow rounded-lg overflow-hidden'>
        <div className='p-4 border-b'>
          <input
            type='text'
            placeholder='Search orders...'
            className='w-full border rounded px-3 py-2'
          />
        </div>
        <div className='max-h-[500px] overflow-auto'>
          <table className='min-w-full text-sm'>
            <thead className='bg-gray-100 sticky top-0 z-10'>
              <tr>
                <th className='px-4 py-2'>Customer Name</th>
                <th className='px-4 py-2'>Email</th>
                {/* <th className='px-4 py-2'>Product</th> */}
                <th className='px-4 py-2'>Status</th>
                <th className='px-4 py-2'>Date</th>
                {/* <th className='px-4 py-2'>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => (
                <tr key={order._id} className='border-t'>
                  <td className='px-4 py-2'>
                    {order.customerDetails?.name || '—'}
                  </td>
                  <td className='px-4 py-2'>
                    {order.customerDetails?.email || '—'}
                  </td>
                  {/* <td className='px-4 py-2'>
                    {order.items?.map((item) => item.name).join(', ') || '—'}
                  </td> */}
                  <td className='px-4 py-2'>{order.status}</td>
                  <td className='px-4 py-2'>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : '—'}
                  </td>
                  {/* <td className='px-4 py-2 flex space-x-2'>
                    <button
                      className='text-red-600 hover:text-red-800'
                      onClick={() => deleteOrder(order._id)}
                    >
                      <FiTrash2 />
                    </button>
                    {order.status !== 'Cancelled' && (
                      <button
                        className='text-yellow-600 hover:text-yellow-800 text-xs underline'
                        onClick={() => cancelOrder(order._id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isLoading && <p className='p-4 text-gray-500'>Loading...</p>}
        {!isLoading && orders.length === 0 && (
          <p className='p-4 text-gray-500'>No orders found.</p>
        )}
      </div>
    </div>
  );
}
