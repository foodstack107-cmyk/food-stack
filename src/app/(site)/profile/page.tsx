'use client';

import { Lock, Mail, Phone, Save, Shield, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { data: session, update } = useSession();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/profile');
        if (res.ok) {
          const data = await res.json();
          setName(data.user.name || '');
          setEmail(data.user.email || '');
          setPhone(data.user.phone?.number || '');
        }
      } catch {
        toast.error('Failed to load profile');
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData: Record<string, string> = {};
      if (name.trim()) updateData.name = name.trim();
      if (phone.trim()) updateData.phone = phone.trim();

      if (newPassword) {
        if (newPassword !== confirmPassword) {
          toast.error('Passwords do not match');
          setIsLoading(false);
          return;
        }
        if (newPassword.length < 6) {
          toast.error('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }

      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Update failed');
        return;
      }

      toast.success('Profile updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Update the session with new name
      if (updateData.name) {
        await update({ name: updateData.name });
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A] flex items-center justify-center pt-32'>
        <div className='w-8 h-8 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A] pt-32 pb-16 px-4'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(232,85,45,0.3)] mb-4'>
            <span className='text-3xl font-bold text-white'>
              {session?.user?.name?.[0]?.toUpperCase() || (
                <User className='w-8 h-8' />
              )}
            </span>
          </div>
          <h1 className='text-3xl font-bold text-white mb-1'>My Profile</h1>
          <p className='text-gray-400 text-sm'>Manage your account details</p>
          {session?.user?.role && (
            <div className='inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-orange-500/10 border border-orange-400/20 rounded-full'>
              <Shield className='w-3.5 h-3.5 text-orange-400' />
              <span className='text-orange-400 text-xs font-semibold'>
                {session.user.role}
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleProfileUpdate} className='space-y-6'>
          {/* Personal Info Card */}
          <div className='bg-black/30 backdrop-blur-sm rounded-2xl border border-orange-400/20 p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]'>
            <h2 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
              <User className='w-5 h-5 text-orange-400' />
              Personal Information
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-gray-400 text-sm mb-1.5'>
                  Full Name
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <User className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Your full name'
                    className='w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all'
                  />
                </div>
              </div>

              <div>
                <label className='block text-gray-400 text-sm mb-1.5'>
                  Email
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='email'
                    value={email}
                    disabled
                    className='w-full pl-10 pr-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-lg text-gray-400 cursor-not-allowed'
                  />
                </div>
                <p className='text-gray-500 text-xs mt-1'>
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className='block text-gray-400 text-sm mb-1.5'>
                  Phone Number
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Phone className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='tel'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='Your phone number'
                    className='w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Card */}
          <div className='bg-black/30 backdrop-blur-sm rounded-2xl border border-orange-400/20 p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]'>
            <h2 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
              <Lock className='w-5 h-5 text-orange-400' />
              Change Password
            </h2>
            <p className='text-gray-500 text-xs mb-4'>
              Leave blank if you don&apos;t want to change your password
            </p>
            <div className='space-y-4'>
              <div>
                <label className='block text-gray-400 text-sm mb-1.5'>
                  Current Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='password'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder='Enter current password'
                    className='w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all'
                  />
                </div>
              </div>

              <div>
                <label className='block text-gray-400 text-sm mb-1.5'>
                  New Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='Enter new password'
                    className='w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all'
                  />
                </div>
              </div>

              <div>
                <label className='block text-gray-400 text-sm mb-1.5'>
                  Confirm New Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm new password'
                    className='w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_0_rgba(232,85,45,0.3)] hover:shadow-[0_6px_20px_rgba(232,85,45,0.4)] flex items-center justify-center gap-2'
          >
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2' />
                Saving...
              </div>
            ) : (
              <>
                <Save className='w-5 h-5' />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
