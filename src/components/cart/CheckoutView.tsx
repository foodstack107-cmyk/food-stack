import React, { useState } from 'react';
import { toast } from 'sonner';

interface CheckoutViewProps {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  availableTimes: string[];
  isSubmitting: boolean;
  handleSubmitOrder: (e?: React.FormEvent) => void;
  isLoggedIn: boolean;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CheckoutView: React.FC<CheckoutViewProps> = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  pickupTime,
  setPickupTime,
  availableTimes,
  isSubmitting,
  handleSubmitOrder,
  isLoggedIn,
}) => {
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; phone?: string } = {};
    if (!isLoggedIn && !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      toast.error('Invalid Email', {
        description: 'Please enter a valid email address.',
      });
    }
    if (phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
      toast.error('Invalid Phone Number', {
        description: 'Phone number must be exactly 10 digits.',
      });
    } else if (!/^[6-9]/.test(phone)) {
      newErrors.phone = 'Phone number must start with 6, 7, 8, or 9.';
      toast.error('Invalid Phone Number', {
        description: 'Indian phone numbers start with 6, 7, 8, or 9.',
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) handleSubmitOrder(e);
  };

  return (
    <form id='checkout-form' onSubmit={handleSubmit} className='space-y-4'>
      <h3 className='text-lg sm:text-xl font-semibold mb-4 text-[#E8552D]'>
        Pickup Details
      </h3>
      {!isLoggedIn && (
        <>
          <div>
            <label className='block text-sm font-medium mb-1 text-white'>
              Name
            </label>
            <input
              type='text'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#E8552D] transition-colors text-white'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-white mb-1'>
              Email
            </label>
            <input
              type='email'
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={`w-full px-4 py-2 rounded-lg bg-white/10 text-white border transition-colors focus:outline-none ${errors.email ? 'border-red-500' : 'border-white/20 focus:border-[#E8552D]'}`}
            />
            {errors.email && (
              <p className='text-red-400 text-xs mt-1'>{errors.email}</p>
            )}
          </div>
        </>
      )}
      <div>
        <label className='block text-sm font-medium text-white mb-1'>
          Phone Number
        </label>
        <input
          type='tel'
          required
          value={phone}
          maxLength={10}
          onChange={(e) => {
            setPhone(e.target.value);
            setErrors((prev) => ({ ...prev, phone: undefined }));
          }}
          className={`w-full px-4 py-2 rounded-lg bg-white/10 text-white border transition-colors focus:outline-none ${errors.phone ? 'border-red-500' : 'border-white/20 focus:border-[#E8552D]'}`}
        />
        {errors.phone && (
          <p className='text-red-400 text-xs mt-1'>{errors.phone}</p>
        )}
      </div>
      <div>
        <label className='block text-sm font-medium mb-1 text-white'>
          Pickup Time
        </label>
        <div className='relative'>
          <select
            required
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className='w-full px-4 py-2 pr-10 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-[#E8552D] transition-colors appearance-none cursor-pointer'
            style={{
              colorScheme: 'dark',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
            }}
          >
            <option value='' className='bg-[#0B1426] text-white'>
              Select a time
            </option>
            {availableTimes.map((time) => (
              <option
                key={time}
                value={time}
                className='bg-[#0B1426] text-white'
              >
                {time}
              </option>
            ))}
          </select>
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
            <svg
              className='w-4 h-4 text-white/60'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>
      </div>
      <p className='text-center text-sm text-white/10 mt-4'>
        Pay in cash when you pick up your order
      </p>
      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full px-4 py-2 mt-4 bg-[#E8552D] text-black rounded-lg disabled:opacity-50 hover:bg-[#E8552D] transition-colors'
      >
        {isSubmitting ? 'Submitting...' : 'Place Order'}
      </button>
    </form>
  );
};

export default CheckoutView;
