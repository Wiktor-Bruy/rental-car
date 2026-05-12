import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import 'modern-normalize';
import './globals.css';

import Header from '@/components/Header/Header';

const geistMan = Manrope({
  variable: '--font-family',
  subsets: ['latin'],
});

const geistInter = Inter({
  variable: '--second-family',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Home',
  description: 'Car rental website home page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMan.variable} ${geistInter.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
