export const CardSkeleton = () => {
  return (
    <div className='bg-[#1A2744] border border-[#E8552D]/20 rounded-2xl overflow-hidden animate-pulse'>
      <div className='relative h-56 md:h-64 lg:h-72 bg-gray-700/50'></div>

      <div className='p-8 space-y-4'>
        <div className='h-6 bg-gray-600/50 rounded w-3/4'></div>

        <div className='space-y-2'>
          <div className='h-4 bg-gray-600/50 rounded w-full'></div>
          <div className='h-4 bg-gray-600/50 rounded w-5/6'></div>
        </div>

        <div className='h-5 bg-gray-600/50 rounded w-1/3'></div>
      </div>
    </div>
  );
};
