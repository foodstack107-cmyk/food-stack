import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useTotalClicks } from '@/hooks/total-clicks/query';

type PlatformType = 'doordash' | 'ubereats' | 'shivshakti' | 'combined';

const TopProductsChart = () => {
  const [platform, setPlatform] = useState<PlatformType>('combined');
  const [isMobile, setIsMobile] = useState(false);
  const { data: topClicksData, isLoading, isError } = useTotalClicks(platform);

  const chartData = topClicksData?.data?.[platform] || [];

  // Detect mobile screens
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Set initial value
    checkIfMobile();

    // Add event listener
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const getPlatformColor = (currentPlatform: PlatformType): string => {
    switch (currentPlatform) {
      case 'doordash':
        return 'hsl(var(--chart-3))';
      case 'ubereats':
        return 'hsl(var(--chart-4))';
      case 'shivshakti':
        return 'hsl(var(--chart-2))';
      default:
        return 'hsl(var(--chart-6))';
    }
  };

  const getPlatformDisplayName = (currentPlatform: PlatformType): string => {
    switch (currentPlatform) {
      case 'doordash':
        return 'DoorDash';
      case 'ubereats':
        return 'UberEats';
      case 'shivshakti':
        return 'Shiv Shakti';
      default:
        return 'All Platforms';
    }
  };

  // Optimized chart data for mobile - limit to top 5 items for better readability
  const optimizedChartData =
    isMobile && chartData.length > 5 ? chartData.slice(0, 5) : chartData;

  return (
    <div className='card w-full'>
      <div className='card-header'>
        <div className='flex flex-col gap-3'>
          <div>
            <h3 className='card-title text-lg md:text-xl'>
              Most Popular Products
            </h3>
            <p className='card-description text-sm text-gray-500'>
              Products with the highest click-through rates
            </p>
          </div>
          <div className='overflow-x-auto -mx-4 px-4 md:overflow-visible md:px-0'>
            <div className='flex flex-nowrap md:flex-wrap gap-1 min-w-max md:min-w-0'>
              <button
                onClick={() => setPlatform('combined')}
                className={`px-2 py-1 text-xs rounded whitespace-nowrap transition-colors duration-200 ${
                  platform === 'combined'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                All Platforms
              </button>
              <button
                onClick={() => setPlatform('doordash')}
                className={`px-2 py-1 text-xs rounded whitespace-nowrap transition-colors duration-200 ${
                  platform === 'doordash'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                DoorDash
              </button>
              <button
                onClick={() => setPlatform('ubereats')}
                className={`px-2 py-1 text-xs rounded whitespace-nowrap transition-colors duration-200 ${
                  platform === 'ubereats'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                UberEats
              </button>
              <button
                onClick={() => setPlatform('shivshakti')}
                className={`px-2 py-1 text-xs rounded whitespace-nowrap transition-colors duration-200 ${
                  platform === 'shivshakti'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                Shiv Shakti
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`card-content ${isMobile ? 'h-64' : 'h-80'} mt-4`}>
        {isLoading ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-center text-gray-500'>Loading...</p>
          </div>
        ) : isError ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-center text-red-500'>
              Error fetching data. Showing mock data.
            </p>
          </div>
        ) : chartData.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-center text-gray-500'>
              No data available for {getPlatformDisplayName(platform)}.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              layout='vertical'
              data={optimizedChartData}
              margin={
                isMobile
                  ? { top: 10, right: 10, left: 70, bottom: 5 }
                  : { top: 20, right: 30, left: 100, bottom: 5 }
              }
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis type='number' tick={{ fontSize: isMobile ? 10 : 12 }} />
              <YAxis
                dataKey='name'
                type='category'
                tick={{ fontSize: isMobile ? 10 : 12 }}
                width={isMobile ? 70 : 100}
              />
              <Tooltip
                contentStyle={{ borderRadius: '4px' }}
                formatter={(value) => [`${value} clicks`, 'Popularity']}
                animationDuration={300}
              />
              <Legend wrapperStyle={isMobile ? { fontSize: '10px' } : {}} />
              <Bar
                dataKey='clicks'
                name={
                  platform === 'combined'
                    ? 'Total Clicks'
                    : `${getPlatformDisplayName(platform)} Clicks`
                }
                fill={getPlatformColor(platform)}
                radius={[0, 4, 4, 0]}
                animationDuration={500}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      {isMobile && chartData.length > 5 && (
        <div className='text-center text-xs text-gray-500 mt-2'>
          Showing top 5 products. View on larger screen for full data.
        </div>
      )}
    </div>
  );
};

export default TopProductsChart;
