export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const PINCODE_API_BASE_URL = 'https://api.postalpincode.in/pincode/';
export const PHONE_NO_VALIDATION_REGEX = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
export const PINCODE_VALIDATION_REGEX = /^[1-9][0-9]{5}$/;
