'use client';
import React, { useEffect, useState } from 'react';

import BlogDistributionChart from '@/app/admin/components/dashboard/BlogDistributionChart';
import EnquiriesTrendChart from '@/app/admin/components/dashboard/EnquiriesTrendChart';
import ProductCategoryChart from '@/app/admin/components/dashboard/ProductCategory';
// import StatsCards from '@/app/admin/components/dashboard/StatsCards';
import TopProductsChart from '@/app/admin/components/dashboard/TopProductsChart';
import VisitorsChart from '@/app/admin/components/dashboard/VisitorsChart';

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const stats = [
  //   {
  //     title: 'Total Products',
  //     value: '61',
  //     description: '5 new products this week',
  //     icon: <ShoppingCart className='h-4 w-4 text-muted-foreground' />,
  //     trend: '+8.2%',
  //   },
  //   {
  //     title: 'Active Users',
  //     value: '2,843',
  //     description: '320 users joined this month',
  //     icon: <Users className='h-4 w-4 text-muted-foreground' />,
  //     trend: '+12.3%',
  //   },
  //   {
  //     title: 'Enquiries',
  //     value: '83',
  //     description: '12 new enquiries today',
  //     icon: <MessageCircle className='h-4 w-4 text-muted-foreground' />,
  //     trend: '+4.6%',
  //   },
  //   {
  //     title: 'Blog Posts',
  //     value: '29',
  //     description: '3 new posts this week',
  //     icon: <Grid className='h-4 w-4 text-muted-foreground' />,
  //     trend: '+2.5%',
  //   },
  // ];

  if (!isClient) {
    return null;
  }

  return (
    <div className='max-h-screen overflow-y-auto pb-10'>
      <div className='space-y-6  pb-24'>
        <div className='sticky top-0 bg-white z-10 p-4 rounded-lg shadow-sm'>
          <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground pb-2'>
            Overview of your restaurant's performance and statistics.
          </p>
        </div>

        {/* <StatsCards stats={stats} /> */}

        <div className='grid gap-4 md:grid-cols-2'>
          <ProductCategoryChart />
          <BlogDistributionChart />
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <VisitorsChart />
          <TopProductsChart />
        </div>

        <EnquiriesTrendChart />
      </div>
    </div>
  );
}
