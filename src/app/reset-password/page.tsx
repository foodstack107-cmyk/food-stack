'use client';

import { Eye, EyeOff, Lock, Utensils } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { toast } from 'sonner';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      toast.error('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, id, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to reset password.');
        toast.error(data.message || 'Failed to reset password.');
      } else {
        setSuccess(true);
        toast.success('Password reset successfully!');
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch {
      const msg = 'Something went wrong. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token || !id) {
    return (
      <div className='text-center py-6'>
        <p className='text-red-400 mb-4'>Invalid or missing reset link.</p>
        <Link
          href='/forgot-password'
          className='text-orange-400 hover:text-orange-300 font-medium'
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <>
      {success ? (
        <div className='text-center py-6'>
          <div className='w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4'>
            <svg
              className='w-8 h-8 text-green-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-white mb-2'>Password Reset!</h3>
          <p className='text-gray-400 mb-4'>
            Your password has been updated successfully.
          </p>
          <p className='text-gray-500 text-sm'>Redirecting to login...</p>
        </div>
      ) : (
        <>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-orange-500/20'>
              <Lock className='w-6 h-6 text-orange-400' />
            </div>
            <h3 className='text-2xl font-bold text-white mb-1'>
              Set New Password
            </h3>
            <p className='text-gray-400 text-sm'>
              Enter your new password below
            </p>
          </div>

          {error && (
            <div className='mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='New password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
                className='w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-200'
              />
              <button
                type='button'
                onClick={() => setShowPassword((v) => !v)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300'
              >
                {showPassword ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
            </div>

            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder='Confirm new password'
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  setError('');
                }}
                required
                className='w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-200'
              />
              <button
                type='button'
                onClick={() => setShowConfirm((v) => !v)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300'
              >
                {showConfirm ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-[0_4px_14px_0_rgba(232,85,45,0.3)] hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
            >
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2' />
                  Resetting...
                </div>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A] flex'>
      <div className='hidden lg:flex lg:flex-1 flex-col justify-center items-center p-12 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-20 w-32 h-32 border border-orange-400/30 rounded-full' />
          <div className='absolute bottom-40 right-16 w-24 h-24 border border-orange-400/20 rounded-full' />
        </div>
        <div className='relative z-10 text-center'>
          <div className='mb-8 relative'>
            <div className='w-32 h-32 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(232,85,45,0.3)]'>
              <Utensils className='w-16 h-16 text-white' />
            </div>
          </div>
          <h1 className='text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4'>
            Food Stack
          </h1>
          <h2 className='text-2xl xl:text-3xl font-semibold text-orange-300 mb-6'>
            Food Delivery
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6' />
          <p className='text-gray-300 text-lg max-w-md leading-relaxed'>
            Create a strong new password to keep your account secure.
          </p>
        </div>
      </div>

      <div className='flex-1 lg:flex-initial lg:w-1/2 flex items-center justify-center p-6 lg:p-12'>
        <div className='w-full max-w-md'>
          <div className='lg:hidden text-center mb-8'>
            <div className='w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(232,85,45,0.3)] mb-4'>
              <Utensils className='w-10 h-10 text-white' />
            </div>
            <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600'>
              Food Stack
            </h1>
          </div>

          <div className='bg-black/30 backdrop-blur-sm rounded-2xl border border-orange-400/20 p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-orange-400/30 transition-all duration-300'>
            <Suspense
              fallback={
                <div className='text-white text-center'>Loading...</div>
              }
            >
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
