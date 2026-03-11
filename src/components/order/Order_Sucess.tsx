'use client';

import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0B1426] to-[#1A2744] flex items-center justify-center px-4'>
      <div className='max-w-md w-full bg-white/5 p-8 rounded-lg border border-white/10 text-white text-center'>
        <div className='flex justify-center mb-6'>
          <div className='relative'>
            <div className='absolute inset-0 animate-ping'>
              <CheckCircle size={64} className='text-[#E8552D] opacity-25' />
            </div>
            <CheckCircle size={64} className='text-[#E8552D] relative' />
          </div>
        </div>
        <h1 className='text-2xl font-bold mb-4'>Order Placed Successfully!</h1>
        <p className='text-white/70 mb-6'>
          Thank you for your order. You will receive a text message when your
          order is ready for pickup.
        </p>
        <button
          onClick={() => router.push('/')}
          className='w-full py-3 bg-[#E8552D] text-[#0B1426] rounded-lg font-bold text-center hover:bg-[#E8552D] transition-colors'
        >
          Back to Menu
        </button>
        <p className='text-sm text-white/50 mt-4'>
          Redirecting to menu in 5 seconds...
        </p>
      </div>
    </div>
  );
}
