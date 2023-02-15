import Head from 'next/head';

import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Newsletter } from '@/components/Newsletter';
import { Schedule } from '@/components/Schedule';
import { Artists } from '@/components/Artists';
import { Sponsors } from '@/components/Sponsors';

export default function HomePage() {
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
        <Hero />
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
