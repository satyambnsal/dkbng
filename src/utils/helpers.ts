import { PINCODE_API_BASE_URL } from '@/constant/env';

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'https://daakbangla.club/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
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
