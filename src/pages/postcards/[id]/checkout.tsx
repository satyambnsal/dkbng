import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import { useState } from 'react';

import { useLocalUser } from '@/hooks/useLocalUser';

import { Button } from '@/components/Button/Button';
import Layout from '@/components/layout/Layout';
import { Modal } from '@/components/Modal';
import { AddressForm } from '@/components/views/address/AddressForm';
import { AddressList } from '@/components/views/address/AddressList';

import { getPostcard, getPostcards } from '@/utils/supabase-client';

import { Address, PostCard } from '@/types';

interface CheckoutPageProps {
  postcard: PostCard;
}

const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: 'Rs 0.00',
  },
  {
    id: 2,
    title: 'Express',
    turnaround: '2–5 business days',
    price: 'Rs 20.00',
  },
];

export default function CheckoutPage({ postcard }: CheckoutPageProps) {
  const { userDetails } = useLocalUser();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handlePayment = async () => {
    console.log('TODO:// handle payment');
  };
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    userDetails?.addresses[0] || null
  );
  const onAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  if (!postcard?.id) {
    return (
      <Layout>
        <div>No Product available</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='bg-gray-50'>
        <div className='mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='sr-only'>Checkout</h2>
          <div className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'>
            <div>
              <div className='mt-10 border-t border-gray-200 pt-10'>
                <h2 className='text-lg font-medium text-gray-900'>
                  Shipping information
                </h2>
                {userDetails && userDetails.addresses && (
                  <AddressList
                    addresses={userDetails.addresses}
                    selectedAddress={selectedAddress}
                    onSelect={onAddressSelect}
                  />
                )}
                <button
                  type='button'
                  onClick={() => {
                    setShowAddressForm(true);
                  }}
                  className='mt-4 uppercase underline'
                >
                  Add New Address
                </button>
              </div>

              <div className='mt-10 border-t border-gray-200 pt-10'>
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onChange={setSelectedDeliveryMethod}
                >
                  <RadioGroup.Label className='text-lg font-medium text-gray-900'>
                    Delivery method
                  </RadioGroup.Label>

                  <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          clsx(
                            checked ? 'border-transparent' : 'border-gray-300',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className='flex flex-1'>
                              <span className='flex flex-col'>
                                <RadioGroup.Label
                                  as='span'
                                  className='block text-sm font-medium text-gray-900'
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as='span'
                                  className='mt-1 flex items-center text-sm text-gray-500'
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description
                                  as='span'
                                  className='mt-6 text-sm font-medium text-gray-900'
                                >
                                  {deliveryMethod.price}
                                </RadioGroup.Description>
                              </span>
                            </span>
                            {checked ? (
                              <CheckCircleIcon
                                className='h-5 w-5 text-indigo-600'
                                aria-hidden='true'
                              />
                            ) : null}
                            <span
                              className={clsx(
                                active ? 'border' : 'border-2',
                                checked
                                  ? 'border-indigo-500'
                                  : 'border-transparent',
                                'pointer-events-none absolute -inset-px rounded-lg'
                              )}
                              aria-hidden='true'
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order summary */}
            <div className='mt-10 lg:mt-0'>
              <h2 className='text-lg font-medium text-gray-900'>
                Order summary
              </h2>

              <div className='mt-4 rounded-lg border border-gray-200 bg-white shadow-sm'>
                <h3 className='sr-only'>Items in your cart</h3>
                <ul role='list' className='divide-y divide-gray-200'>
                  <li key={postcard.id} className='flex py-6 px-4 sm:px-6'>
                    <div className='flex-shrink-0'>
                      <Image
                        src={postcard?.front_image_url}
                        alt={postcard?.title}
                        className='w-20 rounded-md'
                        width={400}
                        height={400}
                      />
                    </div>

                    <div className='ml-6 flex flex-1 flex-col'>
                      <div className='flex'>
                        <div className='min-w-0 flex-1'>
                          <h4 className='text-sm'>
                            <a
                              href='#'
                              className='font-medium text-gray-700 hover:text-gray-800'
                            >
                              {postcard.title}
                            </a>
                          </h4>
                          {/* <p className='mt-1 text-sm text-gray-500'>
                              {product.color}
                            </p>
                            <p className='mt-1 text-sm text-gray-500'>
                              {product.size}
                            </p> */}
                        </div>

                        <div className='ml-4 flow-root flex-shrink-0'>
                          <button
                            type='button'
                            className='-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500'
                          >
                            <span className='sr-only'>Remove</span>
                            <TrashIcon className='h-5 w-5' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='flex flex-1 items-end justify-between pt-2'>
                        <p className='mt-1 text-sm font-medium text-gray-900'>
                          &#8377;{postcard.price}
                        </p>

                        <div className='ml-4'>
                          <label htmlFor='quantity' className='sr-only'>
                            Quantity
                          </label>
                          <select
                            id='quantity'
                            name='quantity'
                            className='rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                            disabled
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <dl className='space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Subtotal</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      &#8377;{postcard.price}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Shipping</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      &#8377;0
                    </dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Taxes</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      &#8377;0
                    </dd>
                  </div>
                  <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
                    <dt className='text-base font-medium'>Total</dt>
                    <dd className='text-base font-medium text-gray-900'>
                      &#8377;{postcard.price}
                    </dd>
                  </div>
                </dl>

                <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
                  <Button
                    type='button'
                    onClick={handlePayment}
                    className='w-full'
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showAddressForm}
        handleClose={() => {
          setShowAddressForm(false);
        }}
        heading=''
        size='medium'
      >
        <AddressForm />
      </Modal>
    </Layout>
  );
}

export async function getStaticPaths() {
  const postcards = await getPostcards();
  const paths = postcards.map((postcard) => ({
    params: {
      id: postcard.id?.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<CheckoutPageProps>> {
  const { params: { id } = {} } = context;
  const postcard = await getPostcard(id as any as number);
  // console.log('postcard: ', postcard);
  return {
    props: {
      postcard,
    },
    revalidate: 60,
  };
}
