// app/admin/layout.tsx
import { ReactNode } from 'react';

import '@/styles/globals.css';
import '@/styles/colors.css';

import LogoutButton from '@/components/LogoutButton';

import Sidebar from '@/app/admin/components/Sidebar';

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin Dashboard',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <div className='p-4 flex justify-end'>
          <LogoutButton />
        </div>
        <main className='flex-1 p-6 lg:p-8 overflow-hidden'>{children}</main>
      </div>
    </div>
  );
}
