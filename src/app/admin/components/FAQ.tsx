import {
  AlertCircle,
  ChevronDown,
  FileQuestion,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useCreateFaq, useDeleteFaq } from '@/hooks/faq/mutation';
import { useUpdateFaq } from '@/hooks/faq/mutation';
import { useGetAllFaq } from '@/hooks/faq/query';

import { Modal } from './Modal';
import { IFAQ } from '../types';

export function FAQ() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<IFAQ | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Queries and Mutations
  const {
    data: faqs,
    isLoading: isFaqsLoading,
    isError: isFaqsError,
    refetch: refetchFaqs,
  } = useGetAllFaq();

  const { mutate: createFaq, isPending: isCreating } = useCreateFaq();
  const { mutate: updateFaq, isPending: isUpdating } = useUpdateFaq();
  const { mutate: deleteFaq, isPending: isDeleting } = useDeleteFaq();

  const isLoading = isCreating || isUpdating || isDeleting;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
    };

    if (editingFaq) {
      updateFaq(
        { id: editingFaq._id, payload },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            refetchFaqs();
            setEditingFaq(null);
          },
          onError: (error) => {
            toast.error(`Failed to update FAQ: ${error.message}`);
          },
        },
      );
    } else {
      createFaq(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
          refetchFaqs();
        },
        onError: (error) => {
          toast.error(`Failed to create FAQ: ${error.message}`);
        },
      });
    }
  };

  const handleEdit = (faq: IFAQ) => {
    setEditingFaq(faq);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      deleteFaq(id, {
        onSuccess: () => {
          refetchFaqs();
        },
        onError: (error) => {
          toast.error(`Failed to delete FAQ: ${error.message}`);
        },
      });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  if (isFaqsLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600'></div>
      </div>
    );
  }

  if (isFaqsError) {
    return (
      <div className='flex items-center justify-center h-64 px-4'>
        <div className='bg-red-50 text-red-800 rounded-lg p-4 flex items-center'>
          <AlertCircle className='w-5 h-5 mr-2' />
          <span>Error loading FAQs. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col bg-gray-50'>
      <div className='bg-white border-b border-gray-200 flex-shrink-0'>
        <div className='max-w-4xl mx-auto px-4 py-6'>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900'>
                FAQ Management
              </h2>
              <p className='mt-2 text-gray-600'>
                Manage your frequently asked questions
              </p>
            </div>
            <button
              onClick={() => {
                setEditingFaq(null);
                setIsModalOpen(true);
              }}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200'
              disabled={isLoading}
            >
              <Plus className='w-4 h-4 mr-2' />
              Add FAQ
            </button>
          </div>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto min-h-0'>
        <div className='max-w-4xl mx-auto px-4 py-6'>
          {!faqs || faqs.length === 0 ? (
            <div className='flex flex-col items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
              <FileQuestion className='w-16 h-16 text-gray-400 mb-4' />
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                No FAQs Found
              </h3>
              <p className='text-gray-600 text-center mb-6'>
                Get started by adding your first frequently asked question.
              </p>
              <button
                onClick={() => {
                  setEditingFaq(null);
                  setIsModalOpen(true);
                }}
                className='bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors'
              >
                <Plus className='w-4 h-4 mr-2' />
                Add Your First FAQ
              </button>
            </div>
          ) : (
            <div className='space-y-4'>
              {faqs.map((faq: IFAQ) => (
                <div
                  key={faq._id}
                  className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200'
                >
                  <div
                    className='p-6 cursor-pointer'
                    onClick={() => toggleExpand(faq._id)}
                  >
                    <div className='flex justify-between items-start'>
                      <div className='flex-1 pr-4'>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {faq.question}
                        </h3>
                        <div
                          className={`mt-2 text-gray-600 transition-all duration-200 ${
                            expandedFaq === faq._id ? 'block' : 'hidden'
                          }`}
                        >
                          {faq.answer}
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(faq);
                          }}
                          className='p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50'
                          disabled={isLoading}
                        >
                          <Pencil className='w-4 h-4 text-gray-600' />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(faq._id);
                          }}
                          className='p-2 hover:bg-red-50 rounded-full transition-colors text-red-600 disabled:opacity-50'
                          disabled={isLoading}
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                            expandedFaq === faq._id
                              ? 'transform rotate-180'
                              : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFaq(null);
        }}
        title={editingFaq ? 'Edit FAQ' : 'Add FAQ'}
      >
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Question
            </label>
            <input
              type='text'
              name='question'
              defaultValue={editingFaq?.question || ''}
              className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100'
              placeholder='Enter your question'
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Answer
            </label>
            <textarea
              name='answer'
              defaultValue={editingFaq?.answer || ''}
              className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100'
              rows={4}
              placeholder='Enter the answer'
              required
              disabled={isLoading}
            />
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Processing...
              </span>
            ) : editingFaq ? (
              'Update FAQ'
            ) : (
              'Add FAQ'
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default FAQ;
