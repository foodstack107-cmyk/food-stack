'use client';

import {
  Grid,
  MessageCircle,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Mock data for the dashboard
const productsByCategory = [
  { name: 'Appetizers', count: 12 },
  { name: 'Main Course', count: 20 },
  { name: 'Desserts', count: 8 },
  { name: 'Beverages', count: 15 },
  { name: 'Sides', count: 6 },
];

const blogsByType = [
  { name: 'Food', value: 65 },
  { name: 'News', value: 35 },
];

const usersByRole = [
  { name: 'Admin', value: 3 },
  { name: 'Staff', value: 12 },
  { name: 'Customer', value: 85 },
];

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const enquiriesData = [
  { name: 'Week 1', enquiries: 24 },
  { name: 'Week 2', enquiries: 13 },
  { name: 'Week 3', enquiries: 29 },
  { name: 'Week 4', enquiries: 17 },
];

export default function AdminDashboard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const stats = [
    {
      title: 'Total Products',
      value: '61',
      description: '5 new products this week',
      icon: <ShoppingCart className='h-4 w-4 text-muted-foreground' />,
      trend: '+8.2%',
    },
    {
      title: 'Active Users',
      value: '2,843',
      description: '320 users joined this month',
      icon: <Users className='h-4 w-4 text-muted-foreground' />,
      trend: '+12.3%',
    },
    {
      title: 'Enquiries',
      value: '83',
      description: '12 new enquiries today',
      icon: <MessageCircle className='h-4 w-4 text-muted-foreground' />,
      trend: '+4.6%',
    },
    {
      title: 'Blog Posts',
      value: '29',
      description: '3 new posts this week',
      icon: <Grid className='h-4 w-4 text-muted-foreground' />,
      trend: '+2.5%',
    },
  ];

  if (!isClient) {
    return null;
  }

  return (
    <div className='max-h-screen overflow-y-auto pb-10'>
      <div className='space-y-6 p-6 pb-24'>
        {' '}
        {/* Increased pb-24 for more bottom padding */}
        <div className='sticky top-0 bg-white z-10'>
          <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground pb-5'>
            Overview of your application's performance and statistics.
          </p>
        </div>
        {/* Stats Cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat, index) => (
            <div key={index} className='card'>
              <div className='card-header flex flex-row items-center justify-between pb-2'>
                <h3 className='text-sm font-medium'>{stat.title}</h3>
                {stat.icon}
              </div>
              <div className='card-content'>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <p className='text-xs text-muted-foreground'>
                  {stat.description}
                </p>
                <div className='mt-2 flex items-center text-xs text-green-500'>
                  <TrendingUp className='mr-1 h-3 w-3' />
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Charts */}
        <div className='grid gap-4 md:grid-cols-2'>
          {/* Products by Category */}
          <div className='card'>
            <div className='card-header'>
              <h3 className='card-title'>Products by Category</h3>
              <p className='card-description'>
                Distribution of products across categories
              </p>
            </div>
            <div className='card-content h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={productsByCategory}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='count'
                    name='Products'
                    fill='hsl(var(--chart-1))'
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Blogs by Type */}
          <div className='card'>
            <div className='card-header'>
              <h3 className='card-title'>Blog Content Distribution</h3>
              <p className='card-description'>
                Percentage of blogs by content type
              </p>
            </div>
            <div className='card-content h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={blogsByType}
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
                    <Cell fill='hsl(var(--chart-2))' />
                    <Cell fill='hsl(var(--chart-3))' />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Users by Role */}
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

          {/* Monthly Sales Trend */}
          <div className='card'>
            <div className='card-header'>
              <h3 className='card-title'>Monthly Sales Trend</h3>
              <p className='card-description'>
                Sales figures over the last months
              </p>
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
                  <Tooltip />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='sales'
                    stroke='hsl(var(--chart-2))'
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Enquiries Over Time */}
          <div className='card col-span-2'>
            <div className='card-header'>
              <h3 className='card-title'>Enquiries Trend</h3>
              <p className='card-description'>Weekly enquiry volume</p>
            </div>
            <div className='card-content h-96'>
              {' '}
              {/* Increased height to h-96 for better visibility */}
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  data={enquiriesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id='colorEnquiries'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
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
                  <Tooltip />
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
        </div>
      </div>
    </div>
  );
}
