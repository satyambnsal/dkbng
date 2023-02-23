import Head from 'next/head';
import * as React from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>DaaK Bangla</title>
        <meta
          name='description'
          content='Reviving the cherished tradition of exchanging postcards.'
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
