/* eslint-disable @next/next/no-css-tags */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '@/providers/AppProvider';

import '../globals.css';
import { getStaticParams } from '@/i18n/server';
import { dir } from 'i18next';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Youtube Companion',
  description: 'Tag line of youtube companion',
};

export const generateStaticParams = getStaticParams();

export interface IRootLayout {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params }: IRootLayout) {
  return (
    <html lang={params.locale} dir={dir(params.locale)}>
      <body className={inter.className}>
        <Providers params={params}>{children}</Providers>
      </body>
    </html>
  );
}