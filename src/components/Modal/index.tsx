import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Fragment } from 'react';

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  heading: string;
  children: React.ReactNode;
  size?: "small" | "medium" | "large"
};

export const Modal = ({
  isOpen,
  handleClose,
  heading,
  children,
  size = "small"
}: ModalProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className={clsx('relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all', {
                  "max-w-md": size === 'small',
                  "max-w-xl": size === 'medium',
                  "max-w-3xl": size === 'large'
                })}>
                  <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                    <button
                      type='button'
                      className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none'
                      onClick={handleClose}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon
                        className='h-6 w-6'
                        aria-hidden='true'
                      ></XMarkIcon>
                    </button>
                  </div>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {heading}
                  </Dialog.Title>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
