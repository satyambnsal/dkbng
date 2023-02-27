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
  isShowLoginModal: boolean;
  handleLoginModal: (value: boolean) => void;
};

export interface Props {
  [propName: string]: any;
}

export const UserContext = createContext<UserContextType>({
  accessToken: null,
  user: null,
  isLoading: false,
  userDetails: null,
  isShowLoginModal: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLoginModal: (value) => {},
});

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  // console.log('supabase user: ', user);

  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  const handleLoginModal = (value: boolean) => {
    setIsShowLoginModal(value);
  };
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
        console.log('user details 81', userDetails);
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
          userDetails.data?.length > 0
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
    isShowLoginModal,
    handleLoginModal,
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useLocalUser = () => {
  const {
    user,
    userDetails,
    isLoading,
    accessToken,
    isShowLoginModal,
    handleLoginModal,
  } = useContext(UserContext);

  return {
    user,
    userDetails,
    isLoading,
    accessToken,
    isShowLoginModal,
    handleLoginModal,
  };
};
