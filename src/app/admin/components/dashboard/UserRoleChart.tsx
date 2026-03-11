import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Mock data for users by role
const usersByRole = [
  { name: 'Admin', value: 3 },
  { name: 'Staff', value: 12 },
  { name: 'Customer', value: 85 },
];

const UserRoleChart = () => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='card-title'>Users by Role</h3>
        <p className='card-description'>
          Distribution of users across different roles
        </p>
      </div>
      <div className='card-content h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={usersByRole}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
            >
              <Cell fill='hsl(var(--chart-1))' />
              <Cell fill='hsl(var(--chart-4))' />
              <Cell fill='hsl(var(--chart-5))' />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserRoleChart;
