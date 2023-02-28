import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

import { Address } from '@/types';

type AddressListProps = {
  addresses: Address[];
  onSelect: (address: Address) => void;
  selectedAddress: Address | null;
};
export const AddressList = ({
  addresses,
  onSelect,
  selectedAddress,
}: AddressListProps) => {
  return (
    <div className='mt-10 border-t border-gray-200 pt-10'>
      <RadioGroup value={selectedAddress} onChange={onSelect}>
        <RadioGroup.Label className='text-lg font-medium text-gray-900'>
          Select Address
        </RadioGroup.Label>

        <div className='mt-4 grid grid-cols-1 gap-y-6 sm:gap-x-4'>
          {addresses.map((address) => (
            <RadioGroup.Option
              key={address.id}
              value={address}
              className={({ checked, active }) =>
                clsx(
                  checked ? 'border-transparent' : 'border-gray-300',
                  active ? 'ring-2 ring-indigo-500' : '',
                  'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <span className='flex flex-1'>
                    <span className='flex flex-col'>
                      <RadioGroup.Label
                        as='span'
                        className='block text-sm font-medium uppercase text-gray-900'
                      >
                        {address.name}
                      </RadioGroup.Label>
                      <RadioGroup.Label
                        as='span'
                        className='block text-sm font-medium text-gray-900'
                      >
                        {address.address}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as='span'
                        className='mt-1 flex items-center text-sm text-gray-500'
                      >
                        {address.contact_no}
                      </RadioGroup.Description>
                      <div className='flex space-x-2'>
                        <RadioGroup.Description
                          as='span'
                          className='mt-6 text-sm font-medium text-gray-900'
                        >
                          {address.city},
                        </RadioGroup.Description>
                        <RadioGroup.Description
                          as='span'
                          className='mt-6 text-sm font-medium text-gray-900'
                        >
                          {address.state},
                        </RadioGroup.Description>
                        <RadioGroup.Description
                          as='span'
                          className='mt-6 text-sm font-medium text-gray-900'
                        >
                          {address.pincode}
                        </RadioGroup.Description>
                      </div>
                    </span>
                  </span>
                  {checked ? (
                    <CheckCircleIcon
                      className='h-5 w-5 text-indigo-600'
                      aria-hidden='true'
                    />
                  ) : null}
                  <span
                    className={clsx(
                      active ? 'border' : 'border-2',
                      checked ? 'border-indigo-500' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-lg'
                    )}
                    aria-hidden='true'
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
