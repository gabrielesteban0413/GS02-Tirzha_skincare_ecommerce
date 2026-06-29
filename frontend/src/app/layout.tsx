/* eslint-disable @next/next/no-html-head-element */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Montserrat } from 'next/font/google';
import { LayoutClient } from './layout-client';

const titleFont = Montserrat({ weight: '700', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tirzah Skincare',
  description: 'Unlock your skin natural beauty',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}