import { Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';

import { getPostcard } from '@/utils/supabase-client';

import { PostCard } from '@/types';

interface PostcardPageProps {
  postcard: PostCard;
}

const details = [
  'Only the best materials',
  'Ethically and locally made',
  'Pre-washed and pre-shrunk',
  'Machine wash cold with similar colors',
];
const policies = [
  {
    name: 'Express delivery',
    icon: GlobeAmericasIcon,
    description: 'Get your order in 2 days',
  },
  {
    name: 'NFT token',
    icon: CurrencyDollarIcon,
    description: 'Mint an NFT for your postcard.',
  },
];

export default function PostcardPage({ postcard }: PostcardPageProps) {
  console.log('postcard', postcard);
  const allImages = [
    {
      id: 1,
      src: postcard.front_image_url,
    },
    {
      id: 2,
      src: postcard.back_image_url,
    },
  ];
  return (
    <div className='bg-white'>
      <div className='pt-6 pb-16 sm:pb-24'>
        <div className='mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
            <div className='lg:col-span-5 lg:col-start-8'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-medium text-gray-900'>
                  {postcard.title}
                </h1>
                <p className='text-xl font-medium text-gray-900'>
                  {postcard.price}
                </p>
              </div>
              {/* Reviews */}
              <div className='mt-4'>
                <h2 className='sr-only'>Reviews</h2>
                <div className='flex items-center'>
                  <p className='text-sm text-gray-700'>
                    {postcard.rating}
                    <span className='sr-only'> out of 5 stars</span>
                  </p>
                  <div className='ml-1 flex items-center'>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={clsx(
                          {
                            'text-yellow-400': postcard.rating > rating,
                            'text-gray-200': postcard.rating <= rating,
                          },
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden='true'
                      />
                    ))}
                  </div>
                  <div
                    aria-hidden='true'
                    className='ml-4 text-sm text-gray-300'
                  >
                    ·
                  </div>
                  <div className='ml-4 flex'>
                    <a
                      href='#'
                      className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      See all 10 reviews
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className='mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0'>
              <h2 className='sr-only'>Images</h2>
              <Tab.Group as='div' className='flex flex-col-reverse'>
                {/* Image selector */}
                <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
                  <Tab.List className='grid grid-cols-4 gap-6'>
                    {allImages.map((image) => (
                      <Tab
                        key={image.id}
                        className='relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4'
                      >
                        {({ selected }) => (
                          <>
                            <span className='absolute inset-0 overflow-hidden rounded-md'>
                              <Image
                                src={image.src}
                                alt='postcard image'
                                className='h-full w-full object-cover object-center'
                                width={200}
                                height={200}
                              />
                            </span>
                            <span
                              className={clsx(
                                selected
                                  ? 'ring-indigo-500'
                                  : 'ring-transparent',
                                'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                              )}
                              aria-hidden='true'
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>

                <Tab.Panels className='aspect-w-1 aspect-h-1 w-full'>
                  {allImages.map((image) => (
                    <Tab.Panel key={image.id}>
                      <Image
                        src={image.src}
                        alt='sample'
                        className='object-cover group-hover:opacity-75'
                        width={720}
                        height={600}
                      />
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>

            <div className='mt-8 lg:col-span-5'>
              <form>
                <button
                  type='submit'
                  className='mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Buy now
                </button>
              </form>

              {/* Product details */}
              <div className='mt-10'>
                <h2 className='text-sm font-medium text-gray-900'>
                  Description
                </h2>

                <div
                  className='prose prose-sm mt-4 text-gray-500'
                  dangerouslySetInnerHTML={{ __html: postcard.description }}
                />
              </div>

              <div className='mt-8 border-t border-gray-200 pt-8'>
                <div className='prose prose-sm mt-4 text-gray-500'>
                  <ul role='list'>
                    {details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policies */}
              <section aria-labelledby='policies-heading' className='mt-10'>
                <h2 id='policies-heading' className='sr-only'>
                  Our Policies
                </h2>

                <dl className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className='rounded-lg border border-gray-200 bg-gray-50 p-6 text-center'
                    >
                      <dt>
                        <policy.icon
                          className='mx-auto h-6 w-6 flex-shrink-0 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='mt-4 text-sm font-medium text-gray-900'>
                          {policy.name}
                        </span>
                      </dt>
                      <dd className='mt-1 text-sm text-gray-500'>
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PostcardPageProps>> {
  const { params: { id } = {} } = context;
  const postcard = await getPostcard(id as any as number);
  console.log('postcard: ', postcard);
  return {
    props: {
      postcard,
    },
    revalidate: 60,
  };
}
