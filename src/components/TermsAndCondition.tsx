'use client';
import { motion } from 'framer-motion';
import { AlertCircle, FileCheck, ScrollText } from 'lucide-react';
import React from 'react';

const Terms: React.FC = () => {
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
            <ScrollText className='w-16 h-16 text-[#E8552D]' />
          </motion.div>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Terms & Conditions
          </h1>
          <p className='text-lg text-white/80'>Last updated: March 2024</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='space-y-8'
        >
          <div className='bg-black/30 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#E8552D]/20'>
            <div className='flex items-center gap-4 mb-4'>
              <FileCheck className='w-8 h-8 text-[#E8552D]' />
              <h2 className='text-2xl font-semibold text-white'>
                Agreement to Terms
              </h2>
            </div>
            <div className='space-y-4 text-white/80'>
              <p>
                By accessing or using Food Explorer, you agree to be bound by
                these Terms and Conditions and our Privacy Policy. If you
                disagree with any part of these terms, you may not access our
                service.
              </p>
            </div>
          </div>

          <div className='bg-black/30 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#E8552D]/20'>
            <div className='flex items-center gap-4 mb-4'>
              <AlertCircle className='w-8 h-8 text-[#E8552D]' />
              <h2 className='text-2xl font-semibold text-white'>
                User Responsibilities
              </h2>
            </div>
            <div className='space-y-4 text-white/80'>
              <p>As a user of Food Explorer, you agree to:</p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Not share your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in any fraudulent activities</li>
              </ul>
            </div>
          </div>

          <div className='bg-black/30 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#E8552D]/20'>
            <h2 className='text-2xl font-semibold text-white mb-4'>
              Intellectual Property
            </h2>
            <div className='space-y-4 text-white/80'>
              <p>
                The Food Explorer service and its original content, features,
                and functionality are owned by Food Explorer and are protected
                by international copyright, trademark, patent, trade secret, and
                other intellectual property laws.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
