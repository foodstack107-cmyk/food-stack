'use client';
import React, { useEffect, useState } from 'react';

import { success } from '@/hooks/use-toast';

export default function UnsubscribePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);

  // Fetch email and hash from the query string
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    const hashFromUrl = urlParams.get('hash');

    if (emailFromUrl && hashFromUrl) {
      setEmail(emailFromUrl);
      setHash(hashFromUrl);
    } else {
      alert('Invalid unsubscribe request');
    }
  }, []);

  const handleUnsubscribe = async () => {
    if (!email || !hash) {
      alert('Invalid request. Missing parameters.');
      return;
    }

    try {
      const response = await fetch(
        `/api/unsubscribe?email=${encodeURIComponent(email)}&hash=${encodeURIComponent(hash)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        success(data.message || 'You have been unsubscribed successfully.');
      } else {
        alert(data.error || 'Failed to unsubscribe. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A] flex items-center justify-center p-4'>
      <div className='max-w-md w-full bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl'>
        <h1 className='text-3xl font-bold text-[#E8552D] text-center mb-6'>
          Unsubscribe from Our Newsletter
        </h1>
        <p className='text-[#E8552D]/90 text-center mb-8'>
          We're sorry to see you go. Are you sure you want to unsubscribe from
          our newsletter?
        </p>
        <div className='flex flex-col gap-4'>
          <button
            onClick={handleUnsubscribe}
            className='w-full py-3 px-6 rounded-lg bg-[#E8552D] text-[#0B1426] font-semibold 
                     hover:bg-[#E8552D]/90 transition-colors duration-200'
          >
            Yes, Unsubscribe Me
          </button>
          <a
            href='/'
            className='w-full py-3 px-6 rounded-lg border-2 border-[#E8552D] text-[#E8552D] 
                     text-center font-semibold hover:bg-[#E8552D]/10 transition-colors duration-200'
          >
            No, Take Me Back
          </a>
        </div>
      </div>
    </div>
  );
}
