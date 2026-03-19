'use client';

import { Lock, Mail, Shield, User, Utensils } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

type LoginMode = 'user' | 'admin';

export default function Login() {
  const [mode, setMode] = useState<LoginMode>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error('Login Failed', {
          description: 'Invalid credentials. Please check your email and password.',
        });
      } else {
        toast.success('Login Successful', {
          description: mode === 'admin' ? 'Redirecting to dashboard...' : 'Welcome back!',
        });
        setTimeout(() => {
          window.location.href = mode === 'admin' ? '/admin/dashboard' : '/';
        }, 1000);
      }
    } catch {
      toast.error('Something went wrong', { description: 'Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = mode === 'admin';

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
            <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(232,85,45,0.3)] transition-all duration-500 ${isAdmin ? 'bg-gradient-to-br from-[#2D4A7A] to-[#1A2744] border-2 border-orange-400/40' : 'bg-gradient-to-br from-orange-500 to-orange-600'}`}>
              {isAdmin ? <Shield className='w-16 h-16 text-orange-400' /> : <Utensils className='w-16 h-16 text-white' />}
            </div>
            <div className='absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-transparent rounded-full blur-xl' />
          </div>
          <h1 className='text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4'>
            Food Stack
          </h1>
          <h2 className='text-2xl xl:text-3xl font-semibold text-orange-300 mb-6'>
            {isAdmin ? 'Admin Portal' : 'Food Delivery'}
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6' />
          <p className='text-gray-300 text-lg max-w-md leading-relaxed'>
            {isAdmin
              ? 'Manage orders, menus, and customers from your admin dashboard.'
              : 'Delicious food delivered fast. Experience the authentic taste of quality cuisine.'}
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

          {/* Role Toggle */}
          <div className='flex bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-1.5 mb-6'>
            <button
              onClick={() => setMode('user')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                !isAdmin
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-[0_4px_14px_rgba(232,85,45,0.4)]'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <User className='w-4 h-4' />
              User Login
            </button>
            <button
              onClick={() => setMode('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isAdmin
                  ? 'bg-gradient-to-r from-[#1A2744] to-[#2D4A7A] text-orange-400 border border-orange-400/40 shadow-[0_4px_14px_rgba(45,74,122,0.5)]'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <Shield className='w-4 h-4' />
              Admin Login
            </button>
          </div>

          {/* Form Card */}
          <div className={`bg-black/30 backdrop-blur-sm rounded-2xl border p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
            isAdmin
              ? 'border-orange-400/30 hover:border-orange-400/50 hover:shadow-[0_0_40px_rgba(45,74,122,0.3)]'
              : 'border-orange-400/20 hover:border-orange-400/30 hover:shadow-[0_0_40px_rgba(232,85,45,0.1)]'
          }`}>
            <div className='text-center mb-8'>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${isAdmin ? 'bg-[#2D4A7A]/50 border border-orange-400/30' : 'bg-orange-500/20'}`}>
                {isAdmin ? <Shield className='w-6 h-6 text-orange-400' /> : <User className='w-6 h-6 text-orange-400' />}
              </div>
              <h3 className='text-2xl font-bold text-white mb-1'>
                {isAdmin ? 'Admin Sign In' : 'Welcome Back'}
              </h3>
              <p className='text-gray-400 text-sm'>
                {isAdmin ? 'Access the admin dashboard' : 'Sign in to your account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
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

              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-200'
                />
              </div>

              <div className='flex items-center justify-between pt-1'>
                <Link
                  href='/forgot-password'
                  className='text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors'
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className={`w-full py-3 px-4 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                  isAdmin
                    ? 'bg-gradient-to-r from-[#1A2744] to-[#2D4A7A] border border-orange-400/40 hover:border-orange-400/70 shadow-[0_4px_14px_rgba(45,74,122,0.4)] hover:shadow-[0_6px_20px_rgba(45,74,122,0.6)]'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_4px_14px_0_rgba(232,85,45,0.3)] hover:shadow-[0_6px_20px_rgba(232,85,45,0.4)] hover:from-orange-600 hover:to-orange-700'
                }`}
              >
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2' />
                    Signing in...
                  </div>
                ) : (
                  isAdmin ? 'Sign In as Admin' : 'Sign In'
                )}
              </button>
            </form>

            {!isAdmin && (
              <p className='text-center text-gray-400 text-sm mt-6'>
                Don&apos;t have an account?{' '}
                <Link href='/signup' className='text-orange-400 hover:text-orange-300 font-medium transition-colors'>
                  Sign up
                </Link>
              </p>
            )}

            {isAdmin && (
              <p className='text-center text-gray-500 text-xs mt-6'>
                Admin access is restricted. Contact your system administrator.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
