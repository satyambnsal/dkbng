import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import { Button } from '@/components/Button/Button';
import { LinkButton } from '@/components/Button/LinkButton';
import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';

import { Database } from '@/types_db';

export function Header() {
  const user = useUser();
  const supabaseClient = useSupabaseClient<Database>();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
  };

  return (
    <header className='relative z-50 pb-11 lg:pt-11'>
      <Container className='flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap'>
        <div className='mt-10 lg:mt-0 lg:grow lg:basis-0'>
          <Logo className='h-12 w-auto text-slate-900' />
        </div>
        {/* <div className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm text-blue-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
          <div className="mx-auto flex items-center gap-4 px-4">
            <p>
              <time dateTime="2022-04-04">04</time>-
              <time dateTime="2022-04-06">06 of April, 2022</time>
            </p>
            <DiamondIcon className="h-1.5 w-1.5 overflow-visible fill-current stroke-current" />
            <p>Los Angeles, CA</p>
          </div>
        </div> */}
        <LinkButton
          href='https://docs.google.com/forms/d/e/1FAIpQLSdHnkh7wKeeKvhjemro_olNk2h0xYqz1MpaGXkV_JTAGg8rLQ/viewform'
          newTab
        >
          Become a creator
        </LinkButton>
        {!user ? (
          <LinkButton className='ml-4' href='/login'>
            Login
          </LinkButton>
        ) : (
          <Button className='ml-4' onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Container>
    </header>
  );
}
