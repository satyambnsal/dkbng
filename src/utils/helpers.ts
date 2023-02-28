import { PINCODE_API_BASE_URL } from '@/constant/env';
import { supabaseClient } from '@/utils/supabase-client';

import { Address, AddressInput, UserDetails } from '@/types';

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'https://daakbangla.club';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  return url;
};

export const fetchPincodeDetail = async (
  pincode: string
): Promise<{
  city: string;
  state: string;
  localities: string[];
}> => {
  const response = await fetch(`${PINCODE_API_BASE_URL}/${pincode}`);
  const result = await response.json();
  if (
    result.length === 0 ||
    !result[0]?.PostOffice ||
    result[0]?.PostOffice?.length === 0
  ) {
    return {
      city: '',
      state: '',
      localities: [],
    };
  }

  const postOffices = result[0]['PostOffice'];
  const localities: string[] = postOffices.map(
    (postOffice: { Name: string }) => postOffice['Name']
  );
  const city = postOffices[0]['District'];
  const state = postOffices[0]['State'];
  return {
    city,
    state,
    localities,
  };
};

export const addNewAddress = async (payload: AddressInput) => {
  const { error, data } = await supabaseClient
    .from('address')
    .insert(payload)
    .select();
  return { error, data };
};

export const fetchAddresses = async (userId: string): Promise<Address[]> => {
  const { error, data } = await supabaseClient
    .from('address')
    .select('*')
    .eq('user_id', userId);
  if (!data) {
    console.log(
      `Failed to fetch addresses for user id ${userId}: ${
        error && error.message
      }`
    );
    return [];
  }
  console.log('addresses: ', data);
  return data as Address[];
};

export const fetchUserByEmail = async (
  email: string
): Promise<UserDetails | null> => {
  const { error, data } = await supabaseClient
    .from('users')
    .select('*')
    .eq('email', email);
  if (error || !data || data?.length === 0) {
    console.log(
      `failed to fetch user for email ${email} : ${error && error.message}`
    );
    return null;
  }
  const userDetails: any & { id: string } = data[0];
  const addresses = await fetchAddresses(userDetails?.id);
  userDetails.addresses = addresses;
  return userDetails;
};

export const createNewUser = async ({
  full_name,
  email,
  avatar_url,
  id,
}: {
  full_name: string;
  email: string;
  avatar_url: string;
  id: string;
}) => {
  const { error, data } = await supabaseClient
    .from('users')
    .insert({ full_name, email, avatar_url, id });
  return { error, data };
};
