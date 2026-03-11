import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useGetWeeklyEnquiryTrend } from '@/hooks/enquiry/mutate';

// Mock data for enquiries

const EnquiriesTrendChart = () => {
  const { data: enquiriesData } = useGetWeeklyEnquiryTrend();

  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='card-title'>Enquiries Trend</h3>
        <p className='card-description'>Weekly enquiry volume</p>
      </div>
      <div className='card-content h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            data={enquiriesData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id='colorEnquiries' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='hsl(var(--chart-3))'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='hsl(var(--chart-3))'
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip contentStyle={{ borderRadius: '4px' }} />
            <Area
              type='monotone'
              dataKey='enquiries'
              stroke='hsl(var(--chart-3))'
              fillOpacity={1}
              fill='url(#colorEnquiries)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnquiriesTrendChart;
