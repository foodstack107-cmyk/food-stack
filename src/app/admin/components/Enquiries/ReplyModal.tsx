import { Send, X } from 'lucide-react';
import React, { useState } from 'react';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiry: Enquiry | null;
  onSendReply: (reply: string, originalMessage?: string) => void;
  isSending: boolean;
}

const ReplyModal: React.FC<ReplyModalProps> = ({
  isOpen,
  onClose,
  enquiry,
  onSendReply,
  isSending,
}) => {
  const [reply, setReply] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reply.trim()) {
      onSendReply(reply, enquiry?.message);
      setReply('');
    }
  };

  if (!isOpen || !enquiry) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Reply to Enquiry
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <div className='p-6'>
          <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
            <h3 className='font-medium text-gray-900 mb-2'>Original Enquiry</h3>
            <div className='space-y-2 text-sm'>
              <p>
                <span className='font-medium'>From:</span> {enquiry.name} (
                {enquiry.email})
              </p>
              <p>
                <span className='font-medium'>Date:</span>{' '}
                {new Date(enquiry.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className='font-medium'>Message:</span>
              </p>
              <p className='text-gray-700 bg-white p-3 rounded border'>
                {enquiry.message}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='reply'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Your Reply
              </label>
              <textarea
                id='reply'
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                rows={6}
                placeholder='Type your reply here...'
                required
                disabled={isSending}
              />
            </div>

            <div className='flex justify-end gap-3'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'
                disabled={isSending}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2'
                disabled={isSending || !reply.trim()}
              >
                {isSending ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className='w-4 h-4' />
                    Send Reply
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
