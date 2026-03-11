import React, { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useAnalytics } from '@/hooks/visits/query';

// Define types
type Timeframe = 'daily' | 'weekly' | 'monthly';
type UppercaseTimeframe = 'DAILY' | 'WEEKLY' | 'MONTHLY';

// Type for individual chart data points
interface ChartDataPoint {
  date: string;
  visitors: number;
  isToday?: boolean;
  isCurrent?: boolean;
}

// Type for the analytics response from useAnalytics

// Map lowercase timeframe to uppercase
const mapToUppercaseTimeframe = (timeframe: Timeframe): UppercaseTimeframe => {
  switch (timeframe) {
    case 'daily':
      return 'DAILY';
    case 'weekly':
      return 'WEEKLY';
    case 'monthly':
      return 'MONTHLY';
    default:
      throw new Error(`Invalid timeframe: ${timeframe}`);
  }
};

const VisitorsChart = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>('daily');

  // Use the mapped uppercase timeframe for the hook
  const { data, isLoading } = useAnalytics(mapToUppercaseTimeframe(timeframe));

  // Safe access to chart data with empty array fallback
  const chartData: ChartDataPoint[] = data?.data || [];

  // Find today's or current period's index for reference line
  const currentIndex = chartData.findIndex(
    (item) => item.isToday || item.isCurrent,
  );

  // Calculate maximum for Y axis with some padding
  const maxVisitors = Math.max(
    ...chartData.map((item) => item.visitors || 0),
    1,
  );
  const yAxisMax = Math.ceil(maxVisitors * 1.2); // 20% padding

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='card-title'>Total Website Visits</h3>
            <p className='card-description'>Website traffic over time</p>
          </div>
          <div className='flex space-x-1'>
            {(['daily', 'weekly', 'monthly'] as Timeframe[]).map((type) => (
              <button
                key={type}
                onClick={() => setTimeframe(type)}
                className={`px-2 py-1 text-xs rounded ${
                  timeframe === type
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='card-content h-80'>
        {isLoading ? (
          <div className='flex items-center justify-center h-full'>
            <span className='text-gray-500'>Loading...</span>
          </div>
        ) : chartData.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <span className='text-gray-500'>No data available</span>
          </div>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id='colorVisitors' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='5%'
                    stopColor='hsl(var(--chart-4))'
                    stopOpacity={0.8}
                  />
                  <stop
                    offset='95%'
                    stopColor='hsl(var(--chart-4))'
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' opacity={0.6} />
              <XAxis
                dataKey='date'
                tick={{ fontSize: 12 }}
                height={50}
                tickMargin={10}
                angle={-10}
              />
              <YAxis domain={[0, yAxisMax]} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
                formatter={(value: number) => [`${value} visitors`, 'Visitors']}
              />
              {currentIndex >= 0 && (
                <ReferenceLine
                  x={chartData[currentIndex].date}
                  stroke='rgba(107, 114, 128, 0.7)'
                  label={{
                    value: 'Current',
                    position: 'top',
                    fill: 'rgba(107, 114, 128, 0.9)',
                    fontSize: 12,
                  }}
                  strokeDasharray='3 3'
                />
              )}
              <Area
                type='monotone'
                dataKey='visitors'
                stroke='hsl(var(--chart-4))'
                strokeWidth={2}
                fillOpacity={1}
                fill='url(#colorVisitors)'
                activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default VisitorsChart;
