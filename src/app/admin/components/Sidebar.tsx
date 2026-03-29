'use client';
import dayjs from 'dayjs';
import {
  Coffee,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Mail,
  Menu,
  Users,
  X,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PiFlagBannerFoldBold } from 'react-icons/pi';
import { RiListOrdered } from 'react-icons/ri';

import { NavItem } from '../types';

export const navItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    id: 'dashboard',
    path: '/admin/dashboard',
  },
  { icon: Users, label: 'Team', id: 'team', path: '/admin/team' },
  { icon: Coffee, label: 'Products', id: 'products', path: '/admin/products' },
  { icon: HelpCircle, label: 'FAQ', id: 'faq', path: '/admin/faq' },
  {
    icon: Mail,
    label: 'Enquiries',
    id: 'enquiries',
    path: '/admin/enquiries',
  },
  { icon: FileText, label: 'Blogs', id: 'blogs', path: '/admin/blogs' },
  {
    icon: PiFlagBannerFoldBold,
    label: 'Banner',
    id: 'banner',
    path: '/admin/banner',
  },
  { icon: RiListOrdered, label: 'Orders', id: 'orders', path: '/admin/orders' },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile header */}
      <div className='lg:hidden fixed top-0 left-0 right-0 bg-white p-4 flex items-center justify-between shadow-md z-40'>
        <h1 className='text-xl font-bold text-gray-800'>Admin Panel</h1>
        <button
          onClick={toggleSidebar}
          className='p-2 rounded-md hover:bg-gray-100 transition-colors'
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? (
            <X className='w-6 h-6' />
          ) : (
            <Menu className='w-6 h-6' />
          )}
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 lg:hidden z-40'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-screen
        `}
      >
        <div className='flex flex-col h-full'>
          <div className='p-6'>
            <h1 className='text-2xl font-bold text-gray-800'>Admin Panel</h1>
          </div>

          <button
            className='absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 lg:hidden'
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className='w-5 h-5' />
          </button>

          <nav className='flex-1 overflow-y-auto py-4'>
            <ul className='space-y-1'>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        w-full flex items-center px-6 py-3 text-gray-700
                        transition-colors
                        ${
                          isActive
                            ? 'bg-blue-100 text-blue-900'
                            : 'hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <Icon
                        className={`w-5 h-5 mr-3 ${
                          isActive ? 'text-blue-900' : 'text-gray-500'
                        }`}
                      />
                      <span className='font-medium'>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className='p-4 border-t border-gray-200'>
            <p className='text-sm text-gray-500 text-center'>
              © {dayjs().year()} Admin Panel
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
