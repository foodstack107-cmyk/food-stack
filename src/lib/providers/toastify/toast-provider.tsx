'use client';

import {
  Bounce,
  Flip,
  Slide,
  toast,
  ToastContainer,
  Zoom,
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// Custom theme styles to integrate with our design system
import './toast-styles.css';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Slide}
      />
    </>
  );
};

// Helper functions to easily use toasts throughout the app
export const toastSuccess = (message: string) => {
  return toast.success(message);
};

export const toastError = (message: string) => {
  return toast.error(message);
};

export const toastInfo = (message: string) => {
  return toast.info(message);
};

export const toastWarning = (message: string) => {
  return toast.warning(message);
};

// Export toast directly for advanced usage
export { toast };

// Export transitions for custom configuration
export const transitions = {
  Slide,
  Bounce,
  Flip,
  Zoom,
};
