import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Mock data for sales
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const SalesTrendChart = () => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='card-title'>Monthly Sales Trend</h3>
        <p className='card-description'>Sales figures over the last months</p>
      </div>
      <div className='card-content h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={salesData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip contentStyle={{ borderRadius: '4px' }} />
            <Legend />
            <Line
              type='monotone'
              dataKey='sales'
              stroke='hsl(var(--chart-2))'
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesTrendChart;
