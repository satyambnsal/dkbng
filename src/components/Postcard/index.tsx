import Image from 'next/image';
import { useState } from 'react';

import { PostCard } from '@/types';

export const Postcard = ({ postcard }: { postcard: PostCard }) => {
  const [coverType, setCoverType] = useState<'front' | 'back'>('front');
  return (
    <li key={postcard.id} className='relative h-[480px] rounded-lg shadow'>
      <div className='group relative block h-5/6 w-full overflow-hidden bg-gray-100 px-4'>
        <Image
          src={
            coverType === 'front'
              ? postcard.front_image_url
              : postcard.back_image_url
          }
          alt=''
          className='object-fit group-hover:opacity-75'
          fill
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
      <div className='flex items-center justify-between p-4 font-medium text-gray-600'>
        <p className='overflow-hidden text-ellipsis'>{postcard.title}</p>
        <p className=''>&#8377;{postcard.price}</p>
      </div>
    </li>
  );
};
