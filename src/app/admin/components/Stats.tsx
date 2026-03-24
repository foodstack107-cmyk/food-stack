export function Stats() {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-6'>Statistics</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold mb-2'>Total Orders</h3>
          <p className='text-3xl font-bold'>1,234</p>
          <p className='text-sm text-gray-500 mt-2'>+12% from last month</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold mb-2'>Revenue</h3>
          <p className='text-3xl font-bold'>₹45,678</p>
          <p className='text-sm text-gray-500 mt-2'>+8% from last month</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold mb-2'>Average Order Value</h3>
          <p className='text-3xl font-bold'>₹37.50</p>
          <p className='text-sm text-gray-500 mt-2'>+5% from last month</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold mb-2'>Customer Satisfaction</h3>
          <p className='text-3xl font-bold'>4.8/5.0</p>
          <p className='text-sm text-gray-500 mt-2'>Based on 256 reviews</p>
        </div>
      </div>
    </div>
  );
}
