import { Calendar, Eye, Mail, Reply, Trash2, User } from 'lucide-react';
import React, { useState } from 'react';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface EnquiryTableProps {
  enquiries: Enquiry[];
  onDeleteClick: (id: string) => void;
  onReplyClick: (enquiry: Enquiry) => void;
  isDeleting: boolean;
  deletingId: string | null;
}

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  name: string;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  message,
  name,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-4 border-b'>
          <h3 className='text-lg font-semibold'>Message from {name}</h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 text-xl w-6 h-6 flex items-center justify-center'
          >
            ×
          </button>
        </div>
        <div className='p-4'>
          <p className='text-gray-700 whitespace-pre-wrap leading-relaxed'>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

const EnquiryTable: React.FC<EnquiryTableProps> = ({
  enquiries,
  onDeleteClick,
  onReplyClick,
  isDeleting,
  deletingId,
}) => {
  const [messageModal, setMessageModal] = useState<{
    isOpen: boolean;
    message: string;
    name: string;
  }>({
    isOpen: false,
    message: '',
    name: '',
  });

  const openMessageModal = (message: string, name: string) => {
    setMessageModal({ isOpen: true, message, name });
  };

  const closeMessageModal = () => {
    setMessageModal({ isOpen: false, message: '', name: '' });
  };

  const ActionButtons = ({ enquiry }: { enquiry: Enquiry }) => (
    <div className='flex items-center gap-2'>
      <button
        onClick={() => onReplyClick(enquiry)}
        className='text-blue-600 hover:text-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-2 rounded-full hover:bg-blue-50'
        aria-label='Reply to enquiry'
      >
        <Reply className='w-4 h-4 md:w-5 md:h-5' />
      </button>
      <button
        onClick={() => onDeleteClick(enquiry._id)}
        className='text-red-600 hover:text-red-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 p-2 rounded-full hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed'
        aria-label='Delete enquiry'
        disabled={isDeleting && enquiry._id === deletingId}
      >
        <Trash2 className='w-4 h-4 md:w-5 md:h-5' />
      </button>
    </div>
  );

  return (
    <div className='w-full'>
      {/* Mobile Card Layout */}
      <div className='md:hidden space-y-4 max-h-[70vh] overflow-y-auto p-2'>
        {enquiries.map((enquiry) => (
          <div
            key={enquiry._id}
            className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-3'
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 mb-2'>
                  <User className='w-4 h-4 text-gray-400' />
                  <h3 className='text-sm font-semibold text-gray-900 truncate'>
                    {enquiry.name}
                  </h3>
                </div>
                <div className='flex items-center gap-2 mb-2'>
                  <Mail className='w-4 h-4 text-gray-400' />
                  <p className='text-xs text-gray-600 truncate'>
                    {enquiry.email}
                  </p>
                </div>
                <div className='flex items-center gap-2 mb-3'>
                  <Calendar className='w-4 h-4 text-gray-400' />
                  <p className='text-xs text-gray-500'>
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <ActionButtons enquiry={enquiry} />
            </div>

            <div className='border-t pt-3'>
              <div className='text-sm text-gray-700'>
                <p className='line-clamp-2 mb-2'>{enquiry.message}</p>
                {enquiry.message.length > 80 && (
                  <button
                    onClick={() =>
                      openMessageModal(enquiry.message, enquiry.name)
                    }
                    className='text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 mt-1'
                  >
                    <Eye className='w-3 h-3' />
                    Read Full Message
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {enquiries.length === 0 && (
          <div className='text-center py-8 text-gray-500'>
            <p>No enquiries found.</p>
          </div>
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className='hidden md:block overflow-auto max-h-[70vh] border border-gray-200 rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50 sticky top-0'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Name
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Email
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Message
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Date
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {enquiries.map((enquiry, index) => (
              <tr
                key={enquiry._id}
                className={
                  index % 2 === 0
                    ? 'bg-white hover:bg-gray-50'
                    : 'bg-gray-50 hover:bg-gray-100'
                }
              >
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900'>
                    {enquiry.name}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-500'>{enquiry.email}</div>
                </td>
                <td className='px-6 py-4'>
                  <div className='text-sm text-gray-500 max-w-xs'>
                    <p className='truncate'>{enquiry.message}</p>
                    {enquiry.message.length > 50 && (
                      <button
                        onClick={() =>
                          openMessageModal(enquiry.message, enquiry.name)
                        }
                        className='text-blue-600 hover:text-blue-800 text-xs mt-1 flex items-center gap-1'
                      >
                        <Eye className='w-3 h-3' />
                        Read More
                      </button>
                    )}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-500'>
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <ActionButtons enquiry={enquiry} />
                </td>
              </tr>
            ))}

            {enquiries.length === 0 && (
              <tr>
                <td colSpan={5} className='px-6 py-8 text-center text-gray-500'>
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <MessageModal
        isOpen={messageModal.isOpen}
        onClose={closeMessageModal}
        message={messageModal.message}
        name={messageModal.name}
      />
    </div>
  );
};

export default EnquiryTable;
