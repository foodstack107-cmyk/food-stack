import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { useGetBlogTypePercentages } from '@/hooks/blog/query';

type Percentages = {
  [key: string]: number;
};
const transformData = (percentages: Percentages) => {
  if (!percentages || typeof percentages !== 'object') return [];
  const result = Object.entries(percentages).map(([name, value]) => ({
    name,
    value,
  }));

  return result;
};

const BlogDistributionChart = () => {
  const { data, isLoading } = useGetBlogTypePercentages();

  // Try accessing percentages from multiple possible structures
  const percentages = data?.data?.percentages || data?.percentages || null;
  const chartData = percentages ? transformData(percentages) : [];

  // Handle loading state
  if (isLoading) {
    return (
      <div className='card'>
        <div className='card-header'>
          <h3 className='card-title'>Blog Content Distribution</h3>
          <p className='card-description'>
            Percentage of blogs by content type
          </p>
        </div>
        <div className='card-content h-80'>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Handle empty or invalid data
  if (!chartData.length) {
    return (
      <div className='card'>
        <div className='card-header'>
          <h3 className='card-title'>Blog Content Distribution</h3>
          <p className='card-description'>
            Percentage of blogs by content type
          </p>
        </div>
        <div className='card-content h-80'>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='card-title'>Blog Content Distribution</h3>
        <p className='card-description'>Percentage of blogs by content type</p>
      </div>
      <div className='card-content h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={chartData}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              dataKey='value'
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BlogDistributionChart;
