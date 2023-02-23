import {
  User,
  useSessionContext,
  useUser as useSupaUser,
} from '@supabase/auth-helpers-react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { UserDetails } from '@/types';

type GoogleUser = {
  email: string;
  user_metadata: {
    full_name: string;
    avatar_url: string;
  };
  id: string;
};

type UserContextType = {
  accessToken: string | null;
  user: User | GoogleUser | null;
  isLoading: boolean;
  userDetails: UserDetails | null;
};

export interface Props {
  [propName: string]: any;
}
export const UserContext = createContext<UserContextType | null>(null);

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  console.log('supabase user: ', user);

  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const getUserDetails = useCallback(
    () => supabase.from('users').select('*').eq('email', user?.email),
    [supabase, user]
  );
  const addUserDetails = useCallback(
    ({ full_name, email, avatar_url, id }: UserDetails) =>
      supabase.from('users').insert({ full_name, email, avatar_url, id }),
    [supabase]
  );

  useEffect(() => {
    async function handleUserDetails() {
      try {
        setIsloadingData(true);
        const userDetails = await getUserDetails();
        // console.log('user details', userDetails);
        if (
          user &&
          Array.isArray(userDetails.data) &&
          userDetails.data.length === 0
        ) {
          const {
            email = '',
            user_metadata: { full_name = '', avatar_url = '' } = {},
            id,
          } = user;
          await addUserDetails({
            full_name,
            email,
            avatar_url,
            id,
          } as UserDetails);
          setUserDetails({ full_name, email, avatar_url, id });
        } else if (
          user &&
          Array.isArray(userDetails.data) &&
          userDetails.data?.length > 1
        ) {
          setUserDetails(userDetails.data[0]);
        }
      } catch (error: any) {
        console.error('user details error: ', error.message);
      } finally {
        setIsloadingData(false);
      }
    }

    if (user) {
      handleUserDetails();
    }
  }, [user]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
