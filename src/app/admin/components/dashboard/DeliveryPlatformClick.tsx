import React, { useState } from 'react';
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
type Timeframe = 'weekly' | 'monthly';
// Mock data for delivery platform clicks (historical)
const platformClicksData = {
  weekly: [
    { date: 'Week 1', doordash: 243, ubereats: 198 },
    { date: 'Week 2', doordash: 312, ubereats: 276 },
    { date: 'Week 3', doordash: 289, ubereats: 301 },
    { date: 'Week 4', doordash: 342, ubereats: 364 },
  ],
  monthly: [
    { date: 'Jan', doordash: 1243, ubereats: 987 },
    { date: 'Feb', doordash: 1121, ubereats: 1053 },
    { date: 'Mar', doordash: 1389, ubereats: 1275 },
    { date: 'Apr', doordash: 1456, ubereats: 1398 },
    { date: 'May', doordash: 1532, ubereats: 1476 },
    { date: 'Jun', doordash: 1678, ubereats: 1587 },
  ],
};

const DeliveryPlatformClicks = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>('weekly');

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='card-title'>Delivery Platform Engagement</h3>
            <p className='card-description'>
              Click-through activity on delivery platforms
            </p>
          </div>
          <div className='flex space-x-1'>
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-2 py-1 text-xs rounded ${
                timeframe === 'weekly'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-2 py-1 text-xs rounded ${
                timeframe === 'monthly'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
      <div className='card-content h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={platformClicksData[timeframe]}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip
              contentStyle={{ borderRadius: '4px' }}
              formatter={(value) => [`${value} clicks`, '']}
            />
            <Legend />
            <Bar
              dataKey='doordash'
              name='DoorDash'
              fill='hsl(var(--chart-3))'
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey='ubereats'
              name='UberEats'
              fill='hsl(var(--chart-4))'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className='mt-4 flex justify-between text-sm'>
          <div className='flex items-center'>
            <div className='w-3 h-3 rounded-full bg-[hsl(var(--chart-3))] mr-2'></div>
            <span>
              Total DoorDash:{' '}
              <strong>
                {platformClicksData[timeframe].reduce(
                  (total, item) => total + item.doordash,
                  0,
                )}
              </strong>
            </span>
          </div>
          <div className='flex items-center'>
            <div className='w-3 h-3 rounded-full bg-[hsl(var(--chart-4))] mr-2'></div>
            <span>
              Total UberEats:{' '}
              <strong>
                {platformClicksData[timeframe].reduce(
                  (total, item) => total + item.ubereats,
                  0,
                )}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPlatformClicks;
