'use client';

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  ChevronDown,
  LogOut,
  Menu,
  Newspaper,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

const menuItems = [
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title: 'Menu', link: '/menu' },
  { title: 'Blog', link: '/blog/food-tips', icon: BookOpen },
  { title: 'News', link: '/blog/latest-news', icon: Newspaper },
  { title: 'Schedule', link: '/schedule', icon: Calendar },
  { title: 'FAQ', link: '/faq' },
  { title: 'Contact', link: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { data: session } = useSession();

  useEffect(() => {
    return scrollY.on('change', (latest) => setScrolled(latest > 20));
  }, [scrollY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (link: string) => pathname === link;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${scrolled ? 'pt-4 px-4' : 'pt-6 px-6'}`}
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
                  className={`object-contain transition-all duration-300 ${scrolled ? 'h-14 w-14' : 'h-18 w-18'}`}
                />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className='hidden lg:flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-full px-2 py-1.5 border border-white/5'>
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className={`relative px-4 py-2 flex items-center rounded-full overflow-hidden transition-colors text-sm font-semibold tracking-wide ${
                    isActive(item.link)
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {isActive(item.link) && (
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
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Right side CTAs */}
            <div className='hidden lg:flex items-center gap-3'>
              {/* <Link href='/menu'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='relative group flex items-center justify-center gap-2 bg-gradient-to-r from-[#E8552D] to-[#F97316] text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(232,85,45,0.4)] overflow-hidden'
                >
                  <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine' />
                  <ShoppingBag className='w-4 h-4' />
                  <span>Order Now</span>
                </motion.button>
              </Link> */}

              {session ? (
                <div className='relative' ref={userMenuRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className='flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-orange-400/40 text-white px-3 py-2 rounded-full transition-all duration-200'
                  >
                    <div className='w-7 h-7 rounded-full bg-gradient-to-br from-[#E8552D] to-[#F97316] flex items-center justify-center text-white text-xs font-bold shrink-0'>
                      {session.user?.name?.[0]?.toUpperCase() ?? (
                        <User className='w-4 h-4' />
                      )}
                    </div>
                    <span className='text-sm font-semibold max-w-[100px] truncate'>
                      {session.user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 opacity-60 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className='absolute right-0 mt-3 w-52 bg-[#0B1426]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50'
                      >
                        <div className='px-4 py-3 border-b border-white/10'>
                          <p className='text-white font-semibold text-sm truncate'>
                            {session.user?.name}
                          </p>
                          <p className='text-white/40 text-xs truncate'>
                            {session.user?.email}
                          </p>
                        </div>
                        <div className='p-2 space-y-1'>
                          <Link
                            href='/profile'
                            onClick={() => setUserMenuOpen(false)}
                            className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all text-sm font-medium'
                          >
                            <User className='w-4 h-4' />
                            My Profile
                          </Link>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              signOut({ callbackUrl: '/' });
                            }}
                            className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-sm font-medium'
                          >
                            <LogOut className='w-4 h-4' />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href='/login'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='relative group flex items-center justify-center gap-2 bg-gradient-to-r from-[#E8552D] to-[#F97316] text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(232,85,45,0.4)] overflow-hidden'
                  >
                    <User className='w-4 h-4' />
                    Sign In
                  </motion.button>
                </Link>
              )}
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

            <div className='flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-center gap-2'>
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className={`block text-2xl sm:text-3xl font-bold mb-4 ${isActive(item.link) ? 'text-[#E8552D]' : 'text-white'}`}
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='p-6 w-full mt-auto flex flex-col gap-3'
            >
              {session ? (
                <div className='flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#E8552D] to-[#F97316] flex items-center justify-center text-white font-bold'>
                      {session.user?.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className='text-white font-semibold text-sm'>
                        {session.user?.name}
                      </p>
                      <p className='text-white/40 text-xs truncate max-w-[160px]'>
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Link
                      href='/profile'
                      onClick={() => setIsOpen(false)}
                      className='p-2 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 transition-colors'
                    >
                      <User className='w-5 h-5' />
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className='p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors'
                    >
                      <LogOut className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              ) : (
                <Link href='/login' onClick={() => setIsOpen(false)}>
                  <button className='w-full py-3.5 bg-white/10 border border-white/10 text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-3'>
                    <User className='w-5 h-5' />
                    Sign In
                  </button>
                </Link>
              )}
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
