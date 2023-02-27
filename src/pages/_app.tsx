import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app';
import { useState } from 'react';
import 'focus-visible';

import '@/styles/globals.css';

import { MyUserContextProvider } from '../hooks/useLocalUser';
import { Database } from '../types_db';

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <MyUserContextProvider>
        <Component {...pageProps} />
      </MyUserContextProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
