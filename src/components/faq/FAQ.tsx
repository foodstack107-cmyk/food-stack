import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useGetAllFaq } from '@/hooks/faq/query';

// Adjust the path as necessary

const FAQItem = ({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className='group relative'
    >
      <div className='absolute -inset-0.5 bg-gradient-to-r from-[#E8552D]/20 to-[#1A2744]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm' />
      <div className='relative border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm bg-gradient-to-r from-[#0B1426]/90 to-[#1A2744]/90 shadow-2xl'>
        <motion.button
          whileHover={{ scale: 1.005, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.995 }}
          onClick={() => setIsOpen(!isOpen)}
          className='w-full px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left relative group/button'
        >
          <div className='flex-1'>
            <span className='text-[#E8552D] font-semibold text-[clamp(0.9rem,2vw,1.1rem)] leading-relaxed block'>
              {question}
            </span>
          </div>

          <motion.div
            initial={false}
            animate={{
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 1.1 : 1,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='text-white ml-4 flex-shrink-0 relative'
          >
            <div className='absolute inset-0 bg-[#E8552D]/20 rounded-full scale-0 group-hover/button:scale-100 transition-transform duration-200' />
            <div className='relative z-10 p-1'>
              {isOpen ? (
                <Minus className='w-5 h-5' />
              ) : (
                <Plus className='w-5 h-5' />
              )}
            </div>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className='overflow-hidden'
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className='bg-gradient-to-r from-[#0B1426]/95 to-[#1A2744]/95 backdrop-blur-sm border-t border-white/10'
              >
                <div className='px-4 py-4 sm:px-6 sm:py-5'>
                  <div className='text-white/90 leading-relaxed text-[clamp(0.85rem,1.8vw,1rem)] space-y-2'>
                    {answer.split('\n').map((paragraph, idx) => (
                      <p key={idx} className='first:mt-0'>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQSkeleton = () => {
  return (
    <div className='rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 animate-pulse space-y-4'>
      <div className='h-5 w-3/4 bg-white/20 rounded'></div>
      <div className='h-4 w-full bg-white/10 rounded'></div>
      <div className='h-4 w-5/6 bg-white/10 rounded'></div>
    </div>
  );
};

export function FAQ() {
  const { data: faqData = [], isLoading } = useGetAllFaq();

  return (
    <div className='min-h-screen bg-[#0B1426] pt-24 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-b from-[#1A2744]/20 to-[#0B1426] backdrop-blur-3xl' />
        <div className='absolute top-20 right-10 w-[40vw] h-[40vw] bg-[#E8552D]/5 rounded-full blur-[120px]' />
        <div className='absolute bottom-20 left-10 w-[50vw] h-[50vw] bg-[#2D4A7A]/10 rounded-full blur-[150px]' />
      </div>

      <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-8 sm:mb-12 md:mb-16'
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='inline-flex items-center gap-3 mb-6'
          >
            <div className='p-3 rounded-2xl bg-gradient-to-r from-[#E8552D]/20 to-[#1A2744]/20 backdrop-blur-sm border border-[#E8552D]/30'>
              <HelpCircle className='w-6 h-6 text-[#E8552D]' />
            </div>
          </motion.div>

          <h1 className='text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight'>
            Frequently Asked{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#E8552D] to-[#F97316]'>
              Questions
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='max-w-2xl mx-auto'
          >
            <p className='text-white/80 text-[clamp(1rem,2.2vw,1.2rem)] leading-relaxed mb-4'>
              Find answers to common questions about our premium food delivery
              service
            </p>
            <div className='w-24 h-1 bg-gradient-to-r from-[#E8552D] to-[#1A2744] mx-auto rounded-full' />
          </motion.div>
        </motion.div>

        {/* Centered Single Column Layout */}
        <div className='max-w-4xl mx-auto'>
          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className='space-y-4'
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <FAQSkeleton key={index} />
                ))
              : faqData.map(
                  (
                    faq: { question: string; answer: string },
                    index: number,
                  ) => (
                    <FAQItem
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                      index={index}
                    />
                  ),
                )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className='text-center mt-8 sm:mt-12 md:mt-16'
        >
          <div className='inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl'>
            <div className='w-2 h-2 rounded-full bg-[#E8552D] animate-pulse' />
            <span className='text-white/70 text-sm sm:text-base font-medium text-center'>
              Still have questions? Contact our support team at{' '}
              <Link
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    'https://mail.google.com/mail/?view=cm&fs=1&to=foodstack107@gmail.com',
                    '_blank',
                  );
                }}
                className='inline-flex items-center gap-1 text-sm truncate hover:underline'
              >
                foodstack107@gmail.com
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FAQ;
