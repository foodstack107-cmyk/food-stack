'use client';

// Re-export toast functions from the provider for easy importing
import {
  toast,
  toastError,
  toastInfo,
  toastSuccess,
  toastWarning,
  transitions,
} from '@/lib/providers/toastify/toast-provider';

// Main hook for using toast functionality
export const useToast = () => {
  return {
    toast,
    success: toastSuccess,
    error: toastError,
    info: toastInfo,
    warning: toastWarning,
    transitions,
    // Additional custom methods can be added here
    customToast: (content: React.ReactNode, options = {}) => {
      return toast(content, options);
    },
    promise: <T extends Promise<unknown>>(
      promise: T,
      {
        pending,
        success,
        error,
      }: { pending: string; success: string; error: string },
      options = {},
    ) => {
      return toast.promise(
        promise,
        {
          pending,
          success,
          error,
        },
        options,
      );
    },
  };
};

// Re-export everything for direct imports
export {
  toastError as errorToast,
  toastInfo as info,
  toastSuccess as success,
  toast,
  transitions,
  toastWarning as warning,
};
