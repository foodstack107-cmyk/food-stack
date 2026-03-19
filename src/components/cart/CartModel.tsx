import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { generateOtp, verifyOtp } from '@/lib/utils';
import { useCreateOrder, useUpdateOrderStatus } from '@/hooks/orders/mutate';
import { errorToast, success, warning } from '@/hooks/use-toast';

import {
  addToCart,
  cartAtomWithStorage,
  cartTotalAtom,
  clearCart,
  recentOrdersAtomWithStorage,
  removeFromCart,
} from '@/store/atom';

import CancellationView from './CancellationView';
import CartModalHeader from './CartModalHeader';
import CartModalFooter from './CartModelFooter';
import CartView from './CartView';
import CheckoutView from './CheckoutView';
import {
  generateAdminCancellationEmailTemplate,
  generateAdminOrderEmailTemplate,
  generateCustomerCancellationEmailTemplate,
} from './emailTemplates';
import OrderDetailsView from './OrderDetails';
import SuccessView from './SuccessView';

import { CartItem, OrderDetails } from '@/types/menu';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [cart, setCart] = useAtom(cartAtomWithStorage);
  const [recentOrders, setRecentOrders] = useAtom(recentOrdersAtomWithStorage);
  const [total] = useAtom(cartTotalAtom);
  const [isMounted, setIsMounted] = useState(false);
  const [viewState, setViewState] = useState<
    'cart' | 'checkout' | 'success' | 'orderDetails' | 'cancellation'
  >('cart');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRecentOrders, setShowRecentOrders] = useState(true);
  const createOrder = useCreateOrder();
  const updateOrderStatus = useUpdateOrderStatus();
  const [otp, setOtp] = useState<string>('');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  // Auto-fill user details from session
  useEffect(() => {
    if (isLoggedIn && session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');

      // Fetch phone from profile
      fetch('/api/auth/profile')
        .then((res) => res.json())
        .then((data) => {
          if (data.user?.phone?.number) {
            setPhone(data.user.phone.number);
          }
        })
        .catch(() => {
          console.warn('Failed to fetch user profile for phone number');
        });
    }
  }, [isLoggedIn, session?.user]);

  const handleSendOtp = async (): Promise<void> => {
    const otp = generateOtp();
    setGeneratedOtp(otp);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: [email],
          subject: 'Your OTP for Email Verification',
          template: `Your OTP is: ${otp}. Please enter it in the verification form.`,
          ccRecipients: [],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      setIsEmailVerified(false);
      success(`OTP sent to ${email}. Please check your inbox.`);
    } catch (error) {
      console.error('Error sending OTP:', error);
      errorToast('There was an error sending the OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = (): void => {
    if (verifyOtp(otp, generatedOtp)) {
      setIsEmailVerified(true);
      success('Email verified successfully!');
    } else {
      warning('Invalid OTP. Please try again.');
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        if (viewState === 'success') {
          setViewState('cart');
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, viewState]);

  if (!isMounted) return null;

  const handleRemoveItem = (itemId: string) => {
    setCart(removeFromCart(cart, itemId));
  };

  const handleAddItem = (item: CartItem) => {
    setCart(addToCart(cart, item));
  };

  const handleClearCart = () => {
    setCart(clearCart());
  };

  const handleProceedToCheckout = () => {
    setViewState('checkout');
  };

  const handleBackToCart = () => {
    setViewState('cart');
  };

  const handleBackToOrderDetails = () => {
    setViewState('orderDetails');
  };

  const handleViewOrderDetails = (order: OrderDetails) => {
    setCurrentOrder(order);
    setViewState('orderDetails');
  };

  const handleClose = () => {
    if (viewState === 'success') {
      setViewState('cart');
    }
    onClose();
  };

  const toggleRecentOrders = () => {
    setShowRecentOrders(!showRecentOrders);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailVerified) {
      alert('Please verify your email before placing the order.');
      return;
    }

    setIsSubmitting(true);

    const orderId = `ORD-${crypto.randomUUID().slice(0, 8)}`;
    const newOrder: OrderDetails = {
      orderId,
      items: cart,
      total,
      customerDetails: { name, phone, pickupTime, email },
      status: 'placed',
      createdAt: new Date(),
    };

    try {
      interface CreateOrderResponse {
        success: boolean;
      }

      const createOrderRes = (await createOrder.mutateAsync(
        newOrder,
      )) as CreateOrderResponse;

      if (!createOrderRes.success) {
        throw new Error('Order creation failed');
      }

      // Send admin notification email
      const adminEmailTemplate = generateAdminOrderEmailTemplate(
        cart,
        total,
        newOrder.customerDetails,
        orderId,
      );

      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients: [email],
          subject: `New Order - ${orderId}`,
          template: adminEmailTemplate,
          ccRecipients: [],
        }),
      });

      setRecentOrders((prev) => [newOrder, ...prev].slice(0, 5));
      setCurrentOrder(newOrder);
      setCart(clearCart());
      setViewState('success');
    } catch (error) {
      console.error('Order processing error:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartCancellation = () => {
    setViewState('cancellation');
  };

  const handleCancelOrder = async () => {
    if (!currentOrder) return;

    setIsSubmitting(true);

    try {
      const cancelledOrder = {
        ...currentOrder,
        status: 'cancelled' as const,
      };
      interface UpdateOrderResponse {
        success: boolean;
      }

      if (!currentOrder.orderId) {
        throw new Error('Order ID is missing');
      }

      const updateOrderRes = (await updateOrderStatus.mutateAsync({
        id: currentOrder.orderId,
        payload: cancelledOrder,
      })) as UpdateOrderResponse;

      if (!updateOrderRes.success) {
        throw new Error('Failed to update order status');
      }
      const adminCancellationEmailTemplate =
        generateAdminCancellationEmailTemplate(
          cancelledOrder,
          cancellationReason,
        );

      const customerCancellationEmailTemplate =
        generateCustomerCancellationEmailTemplate(cancelledOrder);

      const adminRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: [cancelledOrder.customerDetails.email],
          subject: `Order Cancellation - ${cancelledOrder.orderId}`,
          template: adminCancellationEmailTemplate,
          ccRecipients: [],
        }),
      });
      const customerRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: [cancelledOrder.customerDetails.email],
          subject: `Order Cancellation Confirmation - ${cancelledOrder.orderId}`,
          template: customerCancellationEmailTemplate,
          ccRecipients: [],
        }),
      });
      if (!customerRes.ok || !adminRes.ok) {
        throw new Error('Failed to send emails');
      }

      setRecentOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === cancelledOrder.orderId ? cancelledOrder : order,
        ),
      );

      setCurrentOrder(cancelledOrder);
      setViewState('cart');
      setName('');
      setPhone('');
      setPickupTime('');
      setCancellationReason('');

      alert('Your order has been successfully cancelled.');
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('There was an error cancelling your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const orderDate = new Date(date);

    if (orderDate.toDateString() === today.toDateString()) {
      return `Today, ${orderDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })}`;
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (orderDate.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${orderDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })}`;
    }

    return orderDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const isCancellationAllowed = (order: OrderDetails) => {
    const orderTime = new Date(order.createdAt).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - orderTime;
    const fifteenMinutesInMs = 15 * 60 * 1000;
    return timeDifference <= fifteenMinutesInMs && order.status === 'placed';
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'placed':
        return 'bg-blue-500/20 text-blue-500';
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'ready':
        return 'bg-green-500/20 text-green-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='fixed inset-0 bg-black/50 z-50'
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className='fixed top-0 right-0 h-full w-full md:w-96 bg-[#0B1426] z-[999] shadow-2xl overflow-hidden flex flex-col'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CartModalHeader viewState={viewState} handleClose={handleClose} />
            <div className='p-4 sm:p-6 overflow-y-auto flex-grow'>
              {viewState === 'cart' && (
                <CartView
                  cart={cart}
                  recentOrders={recentOrders}
                  showRecentOrders={showRecentOrders}
                  setCart={setCart}
                  handleRemoveItem={handleRemoveItem}
                  handleAddItem={handleAddItem}
                  handleClearCart={handleClearCart}
                  toggleRecentOrders={toggleRecentOrders}
                  handleViewOrderDetails={handleViewOrderDetails}
                  formatDate={formatDate}
                  getStatusBadgeColor={getStatusBadgeColor}
                  onClose={onClose}
                />
              )}
              {viewState === 'checkout' && (
                <CheckoutView
                  name={name}
                  setName={setName}
                  phone={phone}
                  setPhone={setPhone}
                  email={email}
                  setEmail={setEmail}
                  otp={otp}
                  setOtp={setOtp}
                  generatedOtp={generatedOtp}
                  isEmailVerified={isEmailVerified}
                  pickupTime={pickupTime}
                  setPickupTime={setPickupTime}
                  availableTimes={availableTimes}
                  isSubmitting={isSubmitting}
                  handleSendOtp={handleSendOtp}
                  handleVerifyOtp={handleVerifyOtp}
                  handleSubmitOrder={handleSubmitOrder}
                  isLoggedIn={isLoggedIn}
                />
              )}
              {viewState === 'success' && (
                <SuccessView
                  currentOrder={currentOrder}
                  setViewState={setViewState}
                />
              )}
              {viewState === 'orderDetails' && (
                <OrderDetailsView
                  currentOrder={currentOrder}
                  isCancellationAllowed={isCancellationAllowed}
                  handleStartCancellation={handleStartCancellation}
                />
              )}
              {viewState === 'cancellation' && (
                <CancellationView
                  currentOrder={currentOrder}
                  cancellationReason={cancellationReason}
                  setCancellationReason={setCancellationReason}
                  isSubmitting={isSubmitting}
                  handleCancelOrder={handleCancelOrder}
                  handleBackToOrderDetails={handleBackToOrderDetails}
                />
              )}
            </div>
            <CartModalFooter
              viewState={viewState}
              cart={cart}
              total={total}
              isSubmitting={isSubmitting}
              handleBackToCart={handleBackToCart}
              handleProceedToCheckout={handleProceedToCheckout}
              setViewState={setViewState}
              onClose={onClose}
              recentOrders={recentOrders}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
