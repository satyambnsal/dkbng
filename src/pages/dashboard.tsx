import Head from 'next/head';

import { Artists } from '@/components/Artists';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Newsletter } from '@/components/Newsletter';
import { Sponsors } from '@/components/Sponsors';

export default function Dashboard() {
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
      <main>
        <h1 className='font-display text-5xl font-bold text-rose-800 sm:text-7xl'>
          Welcome bro
        </h1>
        <Artists />
        {/* <Schedule /> */}
        <Sponsors />
        <Newsletter />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
