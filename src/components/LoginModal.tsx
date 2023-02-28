import { useSupabaseClient } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { getURL } from '@/utils/helpers';

import { Modal } from './Modal';

import { Database } from '@/types_db';

type LoginModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

//TODO: Copy changes needed
const LOGIN_MODAL_HEADING = 'Welcome to Daakbangla!🎉';

export const LoginModal = ({ isOpen, handleClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const supabaseClient = useSupabaseClient<Database>();
  const loginWithGoogle = async () => {
    const redirectUrl = `${getURL()}${router.asPath}`;
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    });
  };

  const loginWithMagicLink = async () => {
    const redirectUrl = `${getURL()}${router.asPath}`;
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
    <Modal
      heading={LOGIN_MODAL_HEADING}
      isOpen={isOpen}
      handleClose={handleClose}
    >
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
    </Modal>
  );
};
