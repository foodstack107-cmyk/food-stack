'use client';
import { motion } from 'framer-motion';
import { Book, HelpCircle, Mail, MessageCircle, PhoneCall } from 'lucide-react';
import React from 'react';

const Support: React.FC = () => {
  const faqs = [
    {
      question: 'How do I track my order?',
      answer:
        "You can track your order by logging into your account and visiting the 'Orders' section. There you'll find real-time updates on your delivery status.",
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, PayPal, and mobile payment solutions including Apple Pay and Google Pay.',
    },
    {
      question: 'How can I modify or cancel my order?',
      answer:
        'Orders can be modified or cancelled within 5 minutes of placing them. Contact our support team immediately for assistance.',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A] p-4 md:p-8'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <motion.div
            className='flex items-center justify-center mb-6'
            whileHover={{ rotate: 10 }}
          >
            <HelpCircle className='w-16 h-16 text-[#E8552D]' />
          </motion.div>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Support Center
          </h1>
          <p className='text-lg text-white/80'>
            We're here to help you with any questions
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8 mb-12'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-[#E8552D]/20 hover:border-[#E8552D]/40 transition-all duration-300'
          >
            <div className='flex items-center gap-4 mb-4'>
              <MessageCircle className='w-8 h-8 text-[#E8552D]' />
              <h2 className='text-2xl font-semibold text-white'>Live Chat</h2>
            </div>
            <p className='text-white/80 mb-4'>
              Get instant help from our support team
            </p>
            <button className='w-full bg-[#E8552D] text-[#0B1426] py-3 rounded-xl font-semibold hover:bg-[#E8552D]/90 transition-all duration-300'>
              Start Chat
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-[#E8552D]/20 hover:border-[#E8552D]/40 transition-all duration-300'
          >
            <div className='flex items-center gap-4 mb-4'>
              <Book className='w-8 h-8 text-[#E8552D]' />
              <h2 className='text-2xl font-semibold text-white'>
                Knowledge Base
              </h2>
            </div>
            <p className='text-white/80 mb-4'>
              Browse our help articles and guides
            </p>
            <button className='w-full bg-[#E8552D] text-[#0B1426] py-3 rounded-xl font-semibold hover:bg-[#E8552D]/90 transition-all duration-300'>
              View Articles
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='bg-black/30 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#E8552D]/20 mb-8'
        >
          <h2 className='text-2xl font-semibold text-white mb-6'>
            Frequently Asked Questions
          </h2>
          <div className='space-y-6'>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className='border-b border-[#E8552D]/20 pb-4 last:border-0'
              >
                <h3 className='text-lg font-semibold text-white mb-2'>
                  {faq.question}
                </h3>
                <p className='text-white/80'>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='bg-black/30 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#E8552D]/20'
        >
          <h2 className='text-2xl font-semibold text-white mb-6'>Contact Us</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='flex items-center gap-4'>
              <PhoneCall className='w-6 h-6 text-[#E8552D]' />
              <div>
                <p className='text-white font-medium'>Phone Support</p>
                <p className='text-white/80'>1-800-FOOD-EXP</p>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <Mail className='w-6 h-6 text-[#E8552D]' />
              <div>
                <p className='text-white font-medium'>Email Support</p>
                <p className='text-white/80'>support@foodexplorer.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;
