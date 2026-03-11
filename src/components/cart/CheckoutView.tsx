import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface CheckoutViewProps {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
  generatedOtp: string;
  isEmailVerified: boolean;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  availableTimes: string[];
  isSubmitting: boolean;
  handleSendOtp: () => Promise<void>;
  handleVerifyOtp: () => void;
  handleSubmitOrder: (e: React.FormEvent) => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  otp,
  setOtp,
  generatedOtp,
  isEmailVerified,
  pickupTime,
  setPickupTime,
  availableTimes,
  isSubmitting,
  handleSendOtp,
  handleVerifyOtp,
  handleSubmitOrder,
}) => {
  const [emailError, setEmailError] = useState<string>('');
  const [canResendOtp, setCanResendOtp] = useState<boolean>(true);
  const [resendCountdown, setResendCountdown] = useState<number>(0);
  const [hasSentOtp, setHasSentOtp] = useState<boolean>(false);
  const lastSentEmail = useRef<string>('');

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email input change with validation
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Debounce email validation and OTP sending
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        validateEmail(email) &&
        !isEmailVerified &&
        !hasSentOtp &&
        !isSubmitting &&
        email !== lastSentEmail.current
      ) {
        const sendOtp = async () => {
          setHasSentOtp(true);
          setCanResendOtp(false);
          setResendCountdown(30); // 30-second cooldown
          lastSentEmail.current = email;
          await handleSendOtp();
        };
        sendOtp();
      }
    }, 1000); // 1-second debounce to ensure user has finished typing

    return () => clearTimeout(timer);
  }, [email, isEmailVerified, hasSentOtp, isSubmitting, handleSendOtp]);

  // Cooldown for resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!canResendOtp && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            setHasSentOtp(false); // Allow new OTP send if email changes
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [canResendOtp, resendCountdown]);

  // Modified send OTP handler for resend button
  const handleSendOtpWithValidation = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setHasSentOtp(true);
    setCanResendOtp(false);
    setResendCountdown(30); // 30-second cooldown
    lastSentEmail.current = email;
    await handleSendOtp();
  };

  // Modified form submission handler with validation
  const handleSubmitWithValidation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!isEmailVerified) {
      setEmailError('Please verify your email before submitting');
      return;
    }
    handleSubmitOrder(e);
  };

  return (
    <form
      id='checkout-form'
      onSubmit={handleSubmitWithValidation}
      className='space-y-4'
    >
      <h3 className='text-lg sm:text-xl font-semibold mb-4 text-[#E8552D]'>
        Pickup Details
      </h3>
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
          Phone Number
        </label>
        <input
          type='tel'
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-[#E8552D] transition-colors'
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
          onChange={handleEmailChange}
          className={`w-full px-4 py-2 rounded-lg bg-white/10 text-white border ${
            emailError ? 'border-red-500' : 'border-white/20'
          } focus:outline-none focus:border-[#E8552D] transition-colors`}
        />
        {emailError && (
          <p className='text-red-500 text-sm mt-1'>{emailError}</p>
        )}
        {!isEmailVerified && !generatedOtp && (
          <p className='text-sm mt-2 text-white/70'>
            {isSubmitting
              ? 'Sending OTP...'
              : 'Enter a valid email to receive an OTP'}
          </p>
        )}
      </div>
      {!isEmailVerified && generatedOtp && (
        <div>
          <label className='block text-sm font-medium text-white mb-1'>
            Enter OTP
          </label>
          <input
            type='text'
            value={otp}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setOtp(e.target.value)
            }
            className='w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:border-[#E8552D] transition-colors'
          />
          <div className='flex gap-2 mt-2'>
            <button
              type='button'
              onClick={handleVerifyOtp}
              disabled={isSubmitting || !otp}
              className='px-4 py-2 bg-[#E8552D] text-black rounded-lg disabled:opacity-50 hover:bg-[#E8552D] transition-colors'
            >
              {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type='button'
              onClick={handleSendOtpWithValidation}
              disabled={isSubmitting || !canResendOtp || !validateEmail(email)}
              className='px-4 py-2 bg-transparent border border-[#E8552D] text-[#E8552D] rounded-lg disabled:opacity-50 hover:bg-[#E8552D]/10 transition-colors'
            >
              {isSubmitting
                ? 'Sending...'
                : !canResendOtp
                  ? `Resend OTP (${resendCountdown}s)`
                  : 'Resend OTP'}
            </button>
          </div>
        </div>
      )}
      {isEmailVerified && (
        <p className='text-green-500 text-sm mt-1'>
          Email verified successfully!
        </p>
      )}
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
        disabled={isSubmitting || !isEmailVerified}
        className='w-full px-4 py-2 mt-4 bg-[#E8552D] text-black rounded-lg disabled:opacity-50 hover:bg-[#E8552D] transition-colors'
      >
        {isSubmitting ? 'Submitting...' : 'Place Order'}
      </button>
    </form>
  );
};

export default CheckoutView;
