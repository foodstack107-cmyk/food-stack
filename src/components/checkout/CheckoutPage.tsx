'use client';

import { useAtom } from 'jotai';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cartAtomWithStorage, cartTotalAtom, clearCart } from '@/store/atom';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useAtom(cartAtomWithStorage);
  const [total] = useAtom(cartTotalAtom);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [pickupTimeError, setPickupTimeError] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/');
    }
  }, [cart, router]);

  useEffect(() => {
    const getAvailablePickupTimes = () => {
      const times = [];
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 45, 0, 0);

      now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0);

      while (now <= end) {
        times.push(
          now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        );
        now.setMinutes(now.getMinutes() + 15);
      }
      return times;
    };

    setAvailableTimes(getAvailablePickupTimes());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setNameError('');
    setPhoneError('');
    setPickupTimeError('');

    let hasError = false;

    if (!name.trim()) {
      setNameError('Name is required.');
      hasError = true;
    }

    if (!phone.trim()) {
      setPhoneError('Phone number is required.');
      hasError = true;
    } else if (!/^[0-9]{10}$/.test(phone)) {
      setPhoneError('Phone number must be 10 digits.');
      hasError = true;
    }

    if (!pickupTime) {
      setPickupTimeError('Please select a pickup time.');
      hasError = true;
    }

    if (hasError) {
      return;
    }
    const orderData = {
      items: cart,
      total,
      customerDetails: {
        name,
        phone,
        pickupTime,
      },
    };
    //semd mail
    const res = await fetch('/api/sendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) {
      console.error('Error sending order data:', res.statusText);
      return;
    }

    setCart(clearCart());
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0B1426] to-[#1A2744] text-white py-12 px-4'>
      <div className='max-w-3xl mx-auto'>
        <div className='flex items-center gap-3 mb-8'>
          <ShoppingCart size={32} className='text-[#E8552D]' />
          <h1 className='text-3xl font-bold'>Checkout</h1>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          <div className='bg-white/5 p-6 rounded-lg border border-white/10'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
            <div className='space-y-4 mb-6'>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className='flex justify-between items-center'
                >
                  <div>
                    <p className='font-medium'>{item.name}</p>
                    <p className='text-sm text-white/70'>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className='font-medium'>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className='border-t border-white/10 pt-4'>
              <div className='flex justify-between items-center text-lg font-bold'>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className='bg-white/5 p-6 rounded-lg border border-white/10'
          >
            <h2 className='text-xl font-semibold mb-4'>Pickup Details</h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>Name</label>
                <input
                  type='text'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#E8552D] transition-colors'
                />
                {nameError && (
                  <p className='text-red-500 text-sm mt-1'>{nameError}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#E8552D] transition-colors'
                />
                {phoneError && (
                  <p className='text-red-500 text-sm mt-1'>{phoneError}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Pickup Time
                </label>
                <select
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className='w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#E8552D] transition-colors'
                >
                  <option value=''>Select a time</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {pickupTimeError && (
                  <p className='text-red-500 text-sm mt-1'>{pickupTimeError}</p>
                )}
              </div>
              <button
                type='submit'
                className='w-full py-3 bg-[#E8552D] text-[#0B1426] rounded-lg font-bold text-center mt-6 hover:bg-[#E8552D] transition-colors'
              >
                Place Order
              </button>
              <p className='text-center text-sm text-white/70 mt-4'>
                Pay in cash when you pick up your order
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
