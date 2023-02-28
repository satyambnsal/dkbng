import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDebounce } from 'react-use';
import * as yup from 'yup';

import { Spinner } from '@/components/Spinner';

import {
  PHONE_NO_VALIDATION_REGEX,
  PINCODE_VALIDATION_REGEX,
} from '@/constant/env';
import { fetchPincodeDetail } from '@/utils/helpers';

import { useLocalUser } from '../../hooks/useLocalUser';

const schema = yup
  .object({
    name: yup.string().required().max(40),
    contact_no: yup
      .string()
      .required('Contact No is required.')
      .matches(PHONE_NO_VALIDATION_REGEX, 'Invalid contact no.'),
    pincode: yup
      .string()
      .required('Pincode is required.')
      .length(6)
      .matches(PINCODE_VALIDATION_REGEX, 'Invalid Pincode.'),
    locality: yup.string().optional(),
    address: yup
      .string()
      .required()
      .min(5, 'Please enter descriptive address.'),
    city: yup.string().required().min(3),
    state: yup.string().required(),
    alt_contact_no: yup.string().optional().matches(PHONE_NO_VALIDATION_REGEX, {
      message: 'Invalid contact no.',
      excludeEmptyString: true,
    }),
    landmark: yup.string().optional(),
  })
  .required();

type AddressFormInputs = yup.InferType<typeof schema>;

export const AddressForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<AddressFormInputs>({
    resolver: yupResolver(schema),
  });
  const { userDetails, handleLoginModal } = useLocalUser();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<AddressFormInputs> = async (data) => {
    setIsLoading(true);
    // if (!userDetails?.id) {
    return handleLoginModal(true);
    // }
    // const user_id: string = userDetails.id;
    // const payload = { user_id, ...data };
    // const { data: result, error } = await addNewAddress(payload);
    // // console.log({ result, error });
    setIsLoading(false);
  };

  const pincode = watch('pincode');
  const [, cancel] = useDebounce(
    () => {
      fetchPincodeDetail(pincode).then(({ city, state, localities }) => {
        // console.log({ city, state, localities });
        setValue('city', city);
        setValue('state', state);
        setValue('locality', localities[0]);
      });
    },
    2000,
    [pincode]
  );
  return (
    <form
      className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700'
        >
          Name
        </label>
        <div className='mt-1'>
          <input
            type='text'
            autoComplete='name'
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            {...register('name')}
          />
        </div>
        {errors.name?.message && (
          <p className='mt-2 text-sm text-red-600' id='email-error'>
            Name is required.
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor='contact_no'
          className='block text-sm font-medium text-gray-700'
        >
          Contact No.
        </label>
        <div className='mt-1'>
          <input
            type='text'
            autoComplete='contact-number'
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            {...register('contact_no', {
              pattern: PHONE_NO_VALIDATION_REGEX,
              required: true,
            })}
          />
          {errors.contact_no && (
            <p className='mt-2 text-sm text-red-600' id='email-error'>
              {errors.contact_no.message}
            </p>
          )}
        </div>
      </div>

      <div className=''>
        <label
          htmlFor='pincode'
          className='block text-sm font-medium text-gray-700'
        >
          Pincode
        </label>
        <div className='mt-1'>
          <input
            type='text'
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            {...register('pincode')}
          />
        </div>
        {errors.pincode && (
          <p className='mt-2 text-sm text-red-600' id='email-error'>
            {errors.pincode.message}
          </p>
        )}
      </div>

      <div className=''>
        <label
          htmlFor='locality'
          className='block text-sm font-medium text-gray-700'
        >
          Locality
        </label>
        <div className='mt-1'>
          <input
            type='text'
            autoComplete='street-address'
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            {...register('locality')}
          />
        </div>
      </div>

      <div className='sm:col-span-2'>
        <label
          htmlFor='address'
          className='block text-sm font-medium text-gray-700'
        >
          Address
        </label>
        <div className='mt-1'>
          <textarea
            rows={2}
            className='block w-full resize-none overflow-hidden rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            {...register('address', { required: true })}
            placeholder='Area and street'
          />
          {errors.address && (
            <p className='mt-2 text-sm text-red-600' id='email-error'>
              {errors.address.message}
            </p>
          )}
        </div>
      </div>

      <div className=''>
        <label
          htmlFor='city'
          className='block text-sm font-medium text-gray-700'
        >
          City
        </label>
        <div className='mt-1'>
          <input
            type='text'
            autoComplete='city'
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            {...register('city', { required: true })}
          />
          {errors.city && (
            <p className='mt-2 text-sm text-red-600' id='email-error'>
              {errors.city.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor='state'
          className='block text-sm font-medium text-gray-700'
        >
          State
        </label>
        <div className='mt-1'>
          <select
            autoComplete='state'
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            {...register('state')}
          >
            <option value='Andhra Pradesh'>Andhra Pradesh</option>
            <option value='Andaman and Nicobar Islands'>
              Andaman and Nicobar Islands
            </option>
            <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
            <option value='Assam'>Assam</option>
            <option value='Bihar'>Bihar</option>
            <option value='Chandigarh'>Chandigarh</option>
            <option value='Chhattisgarh'>Chhattisgarh</option>
            <option value='Dadar and Nagar Haveli'>
              Dadar and Nagar Haveli
            </option>
            <option value='Daman and Diu'>Daman and Diu</option>
            <option value='Delhi'>Delhi</option>
            <option value='Lakshadweep'>Lakshadweep</option>
            <option value='Puducherry'>Puducherry</option>
            <option value='Goa'>Goa</option>
            <option value='Gujarat'>Gujarat</option>
            <option value='Haryana'>Haryana</option>
            <option value='Himachal Pradesh'>Himachal Pradesh</option>
            <option value='Jammu and Kashmir'>Jammu and Kashmir</option>
            <option value='Jharkhand'>Jharkhand</option>
            <option value='Karnataka'>Karnataka</option>
            <option value='Kerala'>Kerala</option>
            <option value='Madhya Pradesh'>Madhya Pradesh</option>
            <option value='Maharashtra'>Maharashtra</option>
            <option value='Manipur'>Manipur</option>
            <option value='Meghalaya'>Meghalaya</option>
            <option value='Mizoram'>Mizoram</option>
            <option value='Nagaland'>Nagaland</option>
            <option value='Odisha'>Odisha </option>
            <option value='Punjab'>Punjab</option>
            <option value='Rajasthan'>Rajasthan</option>
            <option value='Sikkim'>Sikkim</option>
            <option value='Tamil Nadu'>Tamil Nadu</option>
            <option value='Telangana'>Telangana</option>
            <option value='Tripura'>Tripura</option>
            <option value='Uttar Pradesh'>Uttar Pradesh</option>
            <option value='Uttarakhand'>Uttarakhand</option>
            <option value='West Bengal'>West Bengal</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor='landmark'
          className='block text-sm font-medium text-gray-700'
        >
          Landmark
        </label>
        <div className='mt-1'>
          <input
            type='text'
            autoComplete='landmark'
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            {...register('landmark')}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor='alt_contact_no'
          className='block text-sm font-medium text-gray-700'
        >
          Alternate Contact No.
        </label>
        <div className='mt-1'>
          <input
            type='text'
            autoComplete='alternate-contact-no'
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            {...register('alt_contact_no', {
              pattern: PHONE_NO_VALIDATION_REGEX,
            })}
          />
        </div>
      </div>
      <div>
        <button
          type='submit'
          className='bg-rose-400 px-4 py-2 font-medium text-white'
        >
          {isLoading ? <Spinner /> : ' Add Address'}
        </button>
      </div>
    </form>
  );
};
