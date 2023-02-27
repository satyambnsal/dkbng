import Link from 'next/link';

import { Postcard } from '@/components/Postcard';

import { PostCard as PostCardType } from '@/types';

export const FeaturedPostcards = ({
  postcards,
}: {
  postcards: PostCardType[];
}) => {
  return (
    <div className='mx-auto flex w-full'>
      <ul
        role='list'
        className='grid w-full justify-center gap-y-8 gap-x-4 px-8 sm:grid-cols-2 2xl:grid-cols-3'
      >
        {postcards.map((postcard) => (
          <Link href={`/postcards/${postcard.id}`} key={postcard.id}>
            <Postcard postcard={postcard} />
          </Link>
        ))}
      </ul>
    </div>
  );
};
