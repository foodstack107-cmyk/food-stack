'use client';

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ChevronDown, Menu, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrolled(latest > 20);
    });
  }, [scrollY]);

  const menuItems = [
    { title: 'Home', link: '/' },
    { title: 'Menu', link: '/menu' },
    { title: 'About', link: '/about' },
    { title: 'FAQ', link: '/faq' },
    {
      title: 'Blog',
      submenu: [
        { title: 'Latest News', link: '/blog/latest-news' },
        { title: 'Food Tips', link: '/blog/food-tips' },
      ],
    },
  ];

  const isActiveLink = (link: string) => pathname === link;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
          scrolled ? 'pt-4 px-4' : 'pt-6 px-6'
        }`}
      >
        <div
          className={`mx-auto max-w-7xl rounded-full transition-all duration-500 overflow-visible ${
            scrolled
              ? 'bg-[#0B1426]/80 backdrop-blur-md border border-white/10 shadow-2xl py-3 px-6'
              : 'bg-transparent py-4 px-4'
          }`}
        >
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className='flex-shrink-0'>
              <Link href='/' className='flex items-center gap-2'>
                <Image
                  src='/images/logo.svg'
                  alt='Food Stack Food Delivery'
                  height={80}
                  width={80}
                  className={`object-contain transition-all duration-300 ${
                    scrolled ? 'h-12 w-12' : 'h-16 w-16'
                  }`}
                />
              </Link>
            </motion.div>

            {/* Desktop Menu - Centered Pill */}
            <div className='hidden lg:flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-full px-2 py-1.5 border border-white/5'>
              {menuItems.map((item) => (
                <div key={item.title} className='relative group px-1'>
                  <div
                    onMouseEnter={() =>
                      item.submenu && setActiveDropdown(item.title)
                    }
                    onMouseLeave={() => item.submenu && setActiveDropdown(null)}
                  >
                    <Link
                      href={item.link || '#'}
                      className={`relative px-4 py-2 flex items-center gap-1 rounded-full overflow-hidden transition-colors ${
                        isActiveLink(item.link || '')
                          ? 'text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {/* Active Indicator Label */}
                      {isActiveLink(item.link || '') && (
                        <motion.div
                          layoutId='active-nav'
                          className='absolute inset-0 bg-[#E8552D] rounded-full -z-10'
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className='text-sm font-semibold tracking-wide'>
                        {item.title}
                      </span>
                      {item.submenu && (
                        <ChevronDown className='w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity' />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.submenu && activeDropdown === item.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className='absolute left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#0B1426]/95 backdrop-blur-xl rounded-2xl shadow-2xl py-3 border border-white/10 z-50 overflow-hidden'
                        >
                          <div className='absolute inset-0 bg-gradient-to-b from-[#E8552D]/10 to-transparent pointer-events-none' />
                          {item.submenu.map((subItem) => (
                            <Link key={subItem.title} href={subItem.link}>
                              <div
                                className={`block px-5 py-2.5 text-sm font-medium transition-all ${
                                  isActiveLink(subItem.link)
                                    ? 'text-[#E8552D] bg-[#E8552D]/10'
                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                {subItem.title}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side CTAs */}
            <div className='hidden lg:flex items-center gap-4'>
              <Link href='/menu'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='relative group flex items-center justify-center gap-2 bg-gradient-to-r from-[#E8552D] to-[#F97316] text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(232,85,45,0.4)] overflow-hidden'
                >
                  {/* Button shine effect */}
                  <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine' />
                  <ShoppingBag className='w-4 h-4' />
                  <span>Order Now</span>
                </motion.button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className='lg:hidden p-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10'
            >
              <Menu className='w-6 h-6' />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-[200] bg-[#0B1426]/95 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0B1426]/80 flex flex-col'
          >
            {/* Mobile Menu Header */}
            <div className='flex items-center justify-between p-6 w-full'>
              <Image
                src='/images/logo.svg'
                alt='Logo'
                height={60}
                width={60}
                className='object-contain'
              />
              <motion.button
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className='p-3 rounded-full bg-white/10 text-white'
              >
                <X className='w-6 h-6' />
              </motion.button>
            </div>

            {/* Mobile Menu Links */}
            <div className='flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-center gap-2'>
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.submenu ? (
                    <div className='mb-2'>
                      <div className='text-white/50 text-sm font-bold uppercase tracking-widest mb-4'>
                        {item.title}
                      </div>
                      <div className='flex flex-col gap-4 pl-4 border-l border-white/10'>
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.link}
                            onClick={() => setIsOpen(false)}
                            className={`text-xl font-bold ${
                              isActiveLink(sub.link)
                                ? 'text-[#E8552D]'
                                : 'text-white'
                            }`}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={() => setIsOpen(false)}
                      className={`block text-2xl sm:text-3xl font-bold mb-4 ${
                        isActiveLink(item.link)
                          ? 'text-[#E8552D]'
                          : 'text-white'
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='p-6 w-full mt-auto'
            >
              <Link href='/menu' onClick={() => setIsOpen(false)}>
                <button className='w-full py-4 bg-[#E8552D] text-white text-xl font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl'>
                  <ShoppingBag className='w-6 h-6' />
                  Start Your Order
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
