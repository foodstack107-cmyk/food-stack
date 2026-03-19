import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
import '@/styles/colors.css';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: 'Forgot Password', template: `%s | ${siteConfig.title}` },
  description: siteConfig.description,
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
