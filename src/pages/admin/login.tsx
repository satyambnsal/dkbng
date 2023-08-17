import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useLocalUser } from '@/hooks/useLocalUser';

import { getURL } from '@/utils/helpers';

import { Database } from '@/types_db';

export default function AdminLogin() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient<Database>();
  const { userDetails, isAdmin } = useLocalUser();
  const [message, setMessage] = useState('');

  const loginWithGoogle = async () => {
    setMessage('');
    const redirectUrl = `${getURL()}${router.asPath}`;
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    });
  };

  useEffect(() => {
    if (userDetails && !isAdmin) {
      setMessage('Admin access not available for this email id');
    }
    if (userDetails && userDetails.role === 'ADMIN') {
      router.push('/admin/dashboard');
    }
  }, [userDetails, isAdmin
  ]);
  return (
    <div className='h-screen w-screen bg-slate-200'>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <h1 className='text-3xl font-bold'>Admin Login</h1>
        <button onClick={loginWithGoogle}>Login with Google</button>
        <span className='block text-xl font-semibold'>{message}</span>
      </div>
    </div>
  );
}
