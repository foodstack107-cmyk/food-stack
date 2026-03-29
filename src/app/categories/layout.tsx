import * as React from 'react';

import ClientLayout from '@/lib/providers/ClientLayout';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      <Navbar />
      {children}
      <Footer />
    </ClientLayout>
  );
}
