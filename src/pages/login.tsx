import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Logo } from '@/components/Logo';

import { getURL } from '@/utils/helpers';

import { Database } from '@/types_db';
export default function LoginPage() {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient<Database>();
  console.log("Next public site url: ", {a: process?.env?.NEXT_PUBLIC_SITE_URL})
  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user]);

  if (!user)
    return (
      <div className='height-screen-helper flex justify-center'>
        <div className='m-auto flex w-80 max-w-lg flex-col justify-between p-3 '>
          <div className='flex justify-center pb-12 '>
            <Logo width='64px' height='64px' />
          </div>
          <div className='flex flex-col space-y-4'>
            <Auth
              supabaseClient={supabaseClient}
              providers={['google']}
              redirectTo={getURL()}
              magicLink={true}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#404040',
                      brandAccent: '#52525b',
                    },
                  },
                },
              }}
              theme='dark'
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className='m-6'>
      <div>Loading ... </div>
    </div>
  );
}
