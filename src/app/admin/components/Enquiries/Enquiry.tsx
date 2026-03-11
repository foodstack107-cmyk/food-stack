import { RefreshCw, Search } from 'lucide-react';
import React, { useState } from 'react';

import { useDeleteEnquiry, useGetAllEnquiries } from '@/hooks/enquiry/mutate';

import DeleteConfirmationModal from './DeleteComfirmation';
import ErrorState from './ErrorState';
import LoadingState from './LoadingState';
import ReplyModal from './ReplyModal';
import EnquiryTable from '../Enquiries/EnquiryTable';

// Define the Enquiry type to match EnquiryTable
interface Enquiry {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const EnquiriesPage: React.FC = () => {
  const {
    data: enquiries = [],
    isLoading,
    isError,
    refetch: refreshEnquiries,
  } = useGetAllEnquiries();
  const { mutate: deleteEnquiry, isPending: isDeleting } = useDeleteEnquiry();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(
    null,
  );
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isSendingReply, setIsSendingReply] = useState(false);

  const handleDeleteClick = (id: string) => {
    setSelectedEnquiryId(id);
    setShowDeleteModal(true);
  };

  const handleReplyClick = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowReplyModal(true);
  };

  const handleSendReply = async (reply: string, originalMessage?: string) => {
    if (!selectedEnquiry) return;

    setIsSendingReply(true);
    try {
      const response = await fetch('/api/enquiry/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: selectedEnquiry.email,
          name: selectedEnquiry.name,
          reply,
          originalMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reply');
      }

      setShowReplyModal(false);
      setSelectedEnquiry(null);
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Failed to send reply. Please try again.');
    } finally {
      setIsSendingReply(false);
    }
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedEnquiryId) return;
    try {
      deleteEnquiry(selectedEnquiryId);
      setShowDeleteModal(false);
      setSelectedEnquiryId(null);
    } catch (error) {
      console.error('Failed to delete enquiry:', error);
    }
  };

  // Filter enquiries
  const filteredEnquiries = enquiries.filter(
    (enquiry: Enquiry) =>
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.message.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refreshEnquiries} />;

  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden'>
      <div className='p-6 border-b border-gray-200'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold text-gray-800'>Enquiries</h1>
          <button
            onClick={() => refreshEnquiries()}
            disabled={isLoading}
            className='flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50'
            aria-label='Refresh enquiries'
          >
            <RefreshCw className='w-4 h-4' />
            <span>Refresh</span>
          </button>
        </div>

        <div className='relative'>
          <label htmlFor='search' className='sr-only'>
            Search enquiries
          </label>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Search className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
          <input
            id='search'
            type='text'
            placeholder='Search enquiries...'
            className='pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-describedby='search-description'
          />
          <span id='search-description' className='sr-only'>
            Search by name, email, or message
          </span>
        </div>
      </div>

      {filteredEnquiries.length === 0 ? (
        <div className='p-8 text-center'>
          <p className='text-gray-500'>No enquiries found</p>
        </div>
      ) : (
        <EnquiryTable
          enquiries={filteredEnquiries}
          onDeleteClick={handleDeleteClick}
          onReplyClick={handleReplyClick}
          isDeleting={isDeleting}
          deletingId={selectedEnquiryId} // Pass selectedEnquiryId as deletingId
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedEnquiryId(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      <ReplyModal
        isOpen={showReplyModal}
        onClose={() => {
          setShowReplyModal(false);
          setSelectedEnquiry(null);
        }}
        enquiry={selectedEnquiry}
        onSendReply={handleSendReply}
        isSending={isSendingReply}
      />
    </div>
  );
};

export default EnquiriesPage;
