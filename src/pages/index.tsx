import { GetStaticPropsResult } from 'next';
import Head from 'next/head';

import { Artists } from '@/components/Artists';
import { FAQ } from '@/components/FAQ';
import { FeaturedPostcards } from '@/components/FeaturedPostcards';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Newsletter } from '@/components/Newsletter';
import { Sponsors } from '@/components/Sponsors';

import { getPostcards } from '@/utils/supabase-client';

import { PostCard } from '@/types';

interface HomePageProps {
  postcards: PostCard[];
}
export default function HomePage({ postcards }: HomePageProps) {
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
        <FeaturedPostcards postcards={postcards} />
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

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomePageProps>
> {
  const postcards = await getPostcards();
  console.log('postcards: ', postcards);
  return {
    props: {
      postcards,
    },
    revalidate: 60,
  };
}
