import React from 'react';
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';

// 1. Define the shape of your data
type PlatformComparisonData = {
  metric: string;
  doordash: number;
  ubereats: number;
};

// 2. Sample data
const platformComparisonData: PlatformComparisonData[] = [
  { metric: 'Order Volume', doordash: 85, ubereats: 78 },
  { metric: 'Avg. Order Value', doordash: 72, ubereats: 83 },
  { metric: 'Click-Through Rate', doordash: 80, ubereats: 75 },
  { metric: 'Customer Ratings', doordash: 88, ubereats: 90 },
  { metric: 'Delivery Speed', doordash: 75, ubereats: 85 },
];

// 3. Fully typed CustomTooltip
const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>): JSX.Element | null => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white p-2 border border-gray-200 shadow-md rounded-md text-sm'>
        <p className='font-medium'>{payload[0].payload.metric}</p>
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }

  return null;
};

// 4. Chart component
const PlatformComparison = () => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='card-title'>Platform Performance Comparison</h3>
        <p className='card-description'>
          Comparative analysis of key metrics (scores out of 100)
        </p>
      </div>
      <div className='card-content h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <RadarChart outerRadius={90} data={platformComparisonData}>
            <PolarGrid />
            <PolarAngleAxis dataKey='metric' />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name='DoorDash'
              dataKey='doordash'
              stroke='hsl(var(--chart-3))'
              fill='hsl(var(--chart-3))'
              fillOpacity={0.5}
            />
            <Radar
              name='UberEats'
              dataKey='ubereats'
              stroke='hsl(var(--chart-4))'
              fill='hsl(var(--chart-4))'
              fillOpacity={0.5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className='px-5 pb-5'>
        <h4 className='text-sm font-medium mb-2'>Key Insights:</h4>
        <ul className='text-xs text-gray-600 space-y-1'>
          <li>• DoorDash leads in order volume and click-through rates</li>
          <li>• UberEats excels in average order value and delivery speed</li>
          <li>• Both platforms maintain high customer satisfaction ratings</li>
        </ul>
      </div>
    </div>
  );
};

export default PlatformComparison;
