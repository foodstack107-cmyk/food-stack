import React from 'react';
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

import { useGetCategoryTypePercentage } from '@/hooks/product';

const ProductCategoryChart = () => {
  const { data, isLoading } = useGetCategoryTypePercentage();

  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='card-title'>Products by Category</h3>
        <p className='card-description'>
          Distribution of products across categories
        </p>
      </div>
      <div className='card-content h-80'>
        {isLoading ? (
          <div className='flex items-center justify-center h-full'>
            <span className='text-muted-foreground'>Loading...</span>
          </div>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={data || []}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: '4px' }} />
              <Legend />
              <Bar
                dataKey='count'
                name='Products'
                fill='hsl(var(--chart-1))'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ProductCategoryChart;
