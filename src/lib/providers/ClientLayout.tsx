'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import Banner from '@/components/banner/Banner';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/visits', {
      method: 'POST',
      body: JSON.stringify({ page: pathname }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        sessionStorage.setItem(`tracked_${pathname}`, 'true');
      })
      .catch((err) => console.error('Failed to track visit:', err));
  }, [pathname]);

  return (
    <>
      <Banner />
      {children}
    </>
  );
}
