import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';

import { getURL } from '@/utils/helpers';

import { Database } from '@/types_db';

type LoginModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

//TODO: Copy changes needed
const LOGIN_MODAL_HEADING = 'Welcome to Daakbangla!🎉';

export const LoginModal = ({ isOpen, handleClose }: LoginModalProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const router = useRouter();
  const supabaseClient = useSupabaseClient<Database>();

  const loginWithGoogle = async () => {
    const redirectUrl = `${getURL()}${router.pathname}`;
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    });
  };

  const loginWithMagicLink = async () => {
    const redirectUrl = `${getURL()}${router.pathname}`;
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    if (data && !error) {
      toast('Email link sent!');
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                    <button
                      type='button'
                      className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none'
                      onClick={handleClose}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon
                        className='h-6 w-6'
                        aria-hidden='true'
                      ></XMarkIcon>
                    </button>
                  </div>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {LOGIN_MODAL_HEADING}
                  </Dialog.Title>
                  <div className='mx-auto mt-8 flex w-full max-w-sm flex-col space-y-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={loginWithGoogle}
                    >
                      Login with Google
                    </button>
                    <div>
                      <input
                        type='email'
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder='Enter your email'
                        className='input'
                      />
                    </div>
                    <button
                      type='button'
                      className={clsx(
                        'inline-flex justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                        {
                          'cursor-not-allowed bg-blue-100': email.length === 0,
                        }
                      )}
                      onClick={loginWithMagicLink}
                      disabled={email.length === 0}
                    >
                      Login With Magic Link
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
