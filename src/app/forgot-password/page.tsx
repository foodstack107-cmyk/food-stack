'use client';

import { ArrowLeft, Mail, Utensils } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Failed to send reset email. Please try again.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A] flex'>
      {/* Left Side - Branding */}
      <div className='hidden lg:flex lg:flex-1 flex-col justify-center items-center p-12 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-20 w-32 h-32 border border-orange-400/30 rounded-full' />
          <div className='absolute bottom-40 right-16 w-24 h-24 border border-orange-400/20 rounded-full' />
          <div className='absolute top-1/2 left-1/4 w-16 h-16 border border-orange-400/25 rounded-full' />
        </div>
        <div className='relative z-10 text-center'>
          <div className='mb-8 relative'>
            <div className='w-32 h-32 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(232,85,45,0.3)]'>
              <Utensils className='w-16 h-16 text-white' />
            </div>
            <div className='absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-transparent rounded-full blur-xl' />
          </div>
          <h1 className='text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4'>
            Food Stack
          </h1>
          <h2 className='text-2xl xl:text-3xl font-semibold text-orange-300 mb-6'>
            Food Delivery
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6' />
          <p className='text-gray-300 text-lg max-w-md leading-relaxed'>
            No worries! We'll send you a link to reset your password and get you back in no time.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className='flex-1 lg:flex-initial lg:w-1/2 flex items-center justify-center p-6 lg:p-12'>
        <div className='w-full max-w-md'>
          {/* Mobile Logo */}
          <div className='lg:hidden text-center mb-8'>
            <div className='w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(232,85,45,0.3)] mb-4'>
              <Utensils className='w-10 h-10 text-white' />
            </div>
            <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600'>
              Food Stack Food Delivery
            </h1>
          </div>

          <div className='bg-black/30 backdrop-blur-sm rounded-2xl border border-orange-400/20 p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(232,85,45,0.1)] hover:border-orange-400/30 transition-all duration-300'>
            {submitted ? (
              <div className='text-center py-6'>
                <div className='w-16 h-16 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center mb-4'>
                  <Mail className='w-8 h-8 text-orange-400' />
                </div>
                <h3 className='text-xl font-bold text-white mb-2'>Check Your Email</h3>
                <p className='text-gray-400 mb-2'>
                  We've sent a password reset link to
                </p>
                <p className='text-orange-400 font-medium mb-6'>{email}</p>
                <p className='text-gray-500 text-sm mb-6'>
                  Didn't receive it? Check your spam folder or try again.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setEmail(''); }}
                  className='text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors'
                >
                  Try a different email
                </button>
              </div>
            ) : (
              <>
                <div className='text-center mb-8'>
                  <h3 className='text-2xl font-bold text-white mb-2'>Forgot Password?</h3>
                  <p className='text-gray-400'>Enter your email and we'll send you a reset link.</p>
                </div>

                {error && (
                  <div className='mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm'>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Mail className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                      type='email'
                      placeholder='Email address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className='w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-200'
                    />
                  </div>

                  <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-[0_4px_14px_0_rgba(232,85,45,0.3)] hover:shadow-[0_6px_20px_rgba(232,85,45,0.4)] hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
                  >
                    {isLoading ? (
                      <div className='flex items-center justify-center'>
                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2' />
                        Sending...
                      </div>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </form>

                <Link
                  href='/login'
                  className='flex items-center justify-center gap-2 text-gray-400 hover:text-orange-400 text-sm font-medium mt-6 transition-colors'
                >
                  <ArrowLeft className='w-4 h-4' />
                  Back to Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
