import Image from 'next/image';
import { useState } from 'react';

import { PostCard } from '@/types';

const files = [
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1-Back.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1-Back.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1-Back.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1-Back.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: '/images/Hindi1.png',
  },
];

const Postcard = ({ postcard }: { postcard: PostCard }) => {
  const [coverType, setCoverType] = useState<'front' | 'back'>('front');
  return (
    <li key={postcard.id} className='relative rounded-lg shadow'>
      <div className='group relative block w-full overflow-hidden  bg-gray-100 px-4'>
        <Image
          src={
            coverType === 'front'
              ? postcard.front_image_url
              : postcard.back_image_url
          }
          alt=''
          className='object-cover group-hover:opacity-75'
          width={700}
          height={400}
        />
        <button
          onClick={() => {
            setCoverType(coverType === 'front' ? 'back' : 'front');
          }}
          className='absolute top-1 right-1'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
            />
          </svg>
        </button>
      </div>
      <div className='px-4'>
        <p className='mt-2 text-gray-900'>{postcard.description}</p>
        <p className='text-xl text-gray-900'>{postcard.price}</p>
      </div>
    </li>
  );
};

export const FeaturedPostcards = ({ postcards }: { postcards: PostCard[] }) => {
  return (
    <div className='mx-auto flex w-full'>
      <ul
        role='list'
        className='gapy-y-8 grid w-full justify-center gap-x-4 px-8 sm:grid-cols-2 2xl:grid-cols-3'
      >
        {postcards.map((postcard) => (
          <Postcard postcard={postcard} key={postcard.id} />
        ))}
      </ul>
    </div>
  );
};
