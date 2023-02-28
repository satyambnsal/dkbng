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

import { createNewUser, fetchUserByEmail } from '@/utils/helpers';

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
  updateUserDetails: (value: UserDetails) => void;
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
  handleLoginModal: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUserDetails: () => {},
});

export const MyUserContextProvider = (props: Props) => {
  const { session, isLoading: isLoadingUser } = useSessionContext();

  const user = useSupaUser();
  // console.log('supabase user: ', user);

  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  const handleLoginModal = (value: boolean) => {
    setIsShowLoginModal(value);
  };

  useEffect(() => {
    async function handleUserDetails() {
      try {
        setIsloadingData(true);
        const userDetails = await fetchUserByEmail(user?.email || '');
        if (user && !userDetails) {
          const {
            email = '',
            user_metadata: { full_name = '', avatar_url = '' } = {},
            id,
          } = user;
          await createNewUser({
            full_name,
            email,
            avatar_url,
            id,
          });
          setUserDetails({ full_name, email, avatar_url, id, addresses: [] });
        } else if (user && userDetails) {
          setUserDetails(userDetails);
        }
      } catch (error: any) {
        console.error('user details error: ', error.message);
      } finally {
        setIsloadingData(false);
      }
    }

    if (user && user.email) {
      handleUserDetails();
    }
  }, [user]);

  const updateUserDetails = useCallback((data: UserDetails) => {
    setUserDetails(data);
  }, []);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    isShowLoginModal,
    handleLoginModal,
    updateUserDetails,
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
    updateUserDetails,
  } = useContext(UserContext);

  return {
    user,
    userDetails,
    isLoading,
    accessToken,
    isShowLoginModal,
    handleLoginModal,
    updateUserDetails,
  };
};
