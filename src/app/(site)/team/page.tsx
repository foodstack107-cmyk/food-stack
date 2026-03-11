'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { useGetAlUsers } from '@/hooks/team/query';

import TeamGrid from '@/components/team/TeamGrid';

const Team = () => {
  // Use the hook to fetch team members
  const { data: teamMembers, isLoading, error } = useGetAlUsers();

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A2744] to-[#2D4A7A]'>
      <div className='container mx-auto px-4 py-8 sm:py-12 md:py-16'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-8 sm:mb-12 md:mb-16'
        >
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8552D] mb-4 sm:mb-6'>
            Our Vibrant Team
          </h1>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-2xl mx-auto px-4'>
            Meet the talented individuals who make our company extraordinary.
          </p>
        </motion.div>

        {isLoading ? (
          <div className='text-center text-white/80'>Loading...</div>
        ) : error ? (
          <div className='text-center text-red-500'>
            Error loading team members
          </div>
        ) : (
          <TeamGrid
            members={(teamMembers || []).filter(
              (member: { name: string }) => member.name !== 'Test User',
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Team;
