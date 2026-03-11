'use client';
import { motion } from 'framer-motion';
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
  ChevronRight,
  Send,
  Flame,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaTiktok } from 'react-icons/fa';

import { useSubscriber } from '@/hooks/subscriber/mutate';

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const { mutateAsync: createSubscriber } = useSubscriber();

  const handleSubscribe = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await createSubscriber({ email });
      alert('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const quickLinks = ['about', 'menu', 'team', 'contact'];
  const usefulLinks = ['privacy', 'terms', 'disclaimer', 'faq'];

  const socialLinks = [
    {
      href: 'https://www.facebook.com/',
      icon: <Facebook size={16} />,
      label: 'Facebook',
      color: '#1877F2',
    },
    {
      href: 'https://www.tiktok.com/about',
      icon: <FaTiktok size={16} />,
      label: 'TikTok',
      color: '#000000',
    },
    {
      href: 'https://www.instagram.com/',
      icon: <Instagram size={16} />,
      label: 'Instagram',
      color: '#E1306C',
    },
    {
      href: 'https://www.youtube.com/shorts/G7cd9iEdBEc',
      icon: <Youtube size={16} />,
      label: 'YouTube',
      color: '#FF0000',
    },
  ];

  return (
    <footer className='relative overflow-hidden bg-[#0A0F1E]'>
      {/* Decorative top border gradient */}
      <div className='h-[3px] w-full bg-gradient-to-r from-transparent via-[#E8552D] to-transparent' />

      {/* Background blobs */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute -top-32 -left-32 w-72 h-72 bg-[#E8552D]/8 rounded-full blur-3xl' />
        <div className='absolute top-1/2 -right-24 w-64 h-64 bg-[#E8552D]/5 rounded-full blur-3xl' />
        <div className='absolute -bottom-16 left-1/2 w-96 h-48 bg-[#1A2744]/60 rounded-full blur-3xl' />
      </div>

      {/* Newsletter Banner */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='relative z-10 border-b border-white/5'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#E8552D]/15 to-[#2D4A7A]/20 rounded-2xl px-6 py-6 border border-[#E8552D]/20 backdrop-blur-sm'>
            <div className='text-center md:text-left'>
              <div className='flex items-center gap-2 justify-center md:justify-start mb-1'>
                <Flame size={18} className='text-[#E8552D]' />
                <span className='text-xs font-semibold tracking-widest text-[#E8552D] uppercase'>
                  Stay Updated
                </span>
              </div>
              <h3 className='text-xl sm:text-2xl font-bold text-white'>
                Get Exclusive Deals & Offers
              </h3>
              <p className='text-gray-400 text-sm mt-1'>
                Subscribe and never miss a tasty deal.
              </p>
            </div>

            <div className='w-full md:w-auto flex-shrink-0'>
              <div
                className={`flex items-center gap-2 bg-white/5 rounded-xl border transition-all duration-300 overflow-hidden px-3 ${
                  focused
                    ? 'border-[#E8552D] shadow-[0_0_16px_rgba(232,85,45,0.25)]'
                    : 'border-white/10'
                }`}
              >
                <Mail size={16} className='text-gray-400 shrink-0' />
                <input
                  type='email'
                  placeholder='your@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className='bg-transparent text-white placeholder-gray-500 text-sm py-3 flex-1 min-w-0 w-56 focus:outline-none'
                />
                <motion.button
                  type='button'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  onClick={handleSubscribe}
                  className='flex items-center gap-1.5 bg-[#E8552D] hover:bg-[#F97316] text-white text-xs font-bold tracking-wider px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0'
                >
                  {loading ? (
                    <svg
                      className='w-4 h-4 animate-spin'
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
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z'
                      />
                    </svg>
                  ) : (
                    <>
                      <Send size={13} />
                      JOIN
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Grid */}
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
          {/* Brand */}
          <motion.div
            variants={itemVariants}
            className='sm:col-span-2 lg:col-span-1 space-y-5'
          >
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-8 h-8 rounded-lg bg-[#E8552D] flex items-center justify-center'>
                  <Flame size={18} className='text-white' />
                </div>
                <span className='text-lg font-extrabold text-white tracking-tight'>
                  Shiv Shakti
                </span>
              </div>
              <p className='text-gray-400 text-sm leading-relaxed'>
                Authentic flavors delivered fresh and fast, right to your
                doorstep — every single day.
              </p>
            </div>

            <div className='flex items-center gap-2'>
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className='w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-gray-300 hover:text-white transition-all duration-200'
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className='space-y-4'>
            <h4 className='text-xs font-bold tracking-[0.18em] text-[#E8552D] uppercase'>
              Quick Links
            </h4>
            <ul className='space-y-2.5'>
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link}`}
                    className='group flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors duration-200'
                  >
                    <ChevronRight
                      size={13}
                      className='text-[#E8552D] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200'
                    />
                    <span>{link.charAt(0).toUpperCase() + link.slice(1)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Useful Links */}
          <motion.div variants={itemVariants} className='space-y-4'>
            <h4 className='text-xs font-bold tracking-[0.18em] text-[#E8552D] uppercase'>
              Useful Links
            </h4>
            <ul className='space-y-2.5'>
              {usefulLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link}`}
                    className='group flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors duration-200'
                  >
                    <ChevronRight
                      size={13}
                      className='text-[#E8552D] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200'
                    />
                    <span>
                      {link
                        .split('-')
                        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                        .join(' ')}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className='space-y-4'>
            <h4 className='text-xs font-bold tracking-[0.18em] text-[#E8552D] uppercase'>
              Get In Touch
            </h4>
            <ul className='space-y-3'>
              {[
                {
                  icon: (
                    <MapPin
                      size={15}
                      className='text-[#E8552D] shrink-0 mt-0.5'
                    />
                  ),
                  text: '13, Nundah Street, Nundah, QLD 4012',
                },
                {
                  icon: <Phone size={15} className='text-[#E8552D] shrink-0' />,
                  text: '+61 470 355 929',
                },
                {
                  icon: <Mail size={15} className='text-[#E8552D] shrink-0' />,
                  text: 'shiv0803shakti@gmail.com',
                },
                {
                  icon: <Clock size={15} className='text-[#E8552D] shrink-0' />,
                  text: '04:30 PM – 10:30 PM',
                },
              ].map((item, i) => (
                <li key={i} className='flex items-start gap-2.5'>
                  {item.icon}
                  <span className='text-gray-400 text-sm leading-relaxed'>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className='mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3'
        >
          <p className='text-gray-500 text-xs text-center sm:text-left'>
            © {new Date().getFullYear()} Shiv Shakti Food Delivery. All rights
            reserved.
          </p>
          <p className='text-gray-600 text-xs'>
            Made with <span className='text-[#E8552D]'>♥</span> in Australia
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
