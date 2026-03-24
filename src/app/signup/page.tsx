'use client';

import { Eye, EyeOff, Lock, Mail, User, Utensils } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Registration failed. Please try again.');
      } else {
        setSuccess(true);
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
            Join us today and enjoy authentic Indian & Nepali cuisine delivered
            straight to your door.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
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
                <h3 className='text-xl font-bold text-white mb-2'>
                  Account Created!
                </h3>
                <p className='text-gray-400 mb-6'>
                  Your account has been created successfully.
                </p>
                <Link
                  href='/login'
                  className='inline-block py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200'
                >
                  Sign In Now
                </Link>
              </div>
            ) : (
              <>
                <div className='text-center mb-8'>
                  <h3 className='text-2xl font-bold text-white mb-2'>
                    Create Account
                  </h3>
                  <p className='text-gray-400'>Sign up to get started</p>
                </div>

                {error && (
                  <div className='mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm'>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <User className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                      name='name'
                      type='text'
                      placeholder='Full name'
                      value={form.name}
                      onChange={handleChange}
                      required
                      className='w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-200'
                    />
                  </div>

                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Mail className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                      name='email'
                      type='email'
                      placeholder='Email address'
                      value={form.email}
                      onChange={handleChange}
                      required
                      className='w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-200'
                    />
                  </div>

                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Lock className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      value={form.password}
                      onChange={handleChange}
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
                      name='confirm'
                      type={showConfirm ? 'text' : 'password'}
                      placeholder='Confirm password'
                      value={form.confirm}
                      onChange={handleChange}
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
                    className='w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-[0_4px_14px_0_rgba(232,85,45,0.3)] hover:shadow-[0_6px_20px_rgba(232,85,45,0.4)] hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
                  >
                    {isLoading ? (
                      <div className='flex items-center justify-center'>
                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2' />
                        Creating account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>

                <p className='text-center text-gray-400 text-sm mt-6'>
                  Already have an account?{' '}
                  <Link
                    href='/login'
                    className='text-orange-400 hover:text-orange-300 font-medium transition-colors'
                  >
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
