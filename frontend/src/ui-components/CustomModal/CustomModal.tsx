'use client';

import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite, Modal } from 'flowbite-react';

export const CustomModal = (prop: any) => {
  const { show, onClose, children, title, size, customStyle } = prop;
  const customModalStyle: CustomFlowbiteTheme = {
    modal: {
      root: {
        base: 'fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
        show: {
          on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
          off: 'hidden',
        },
        sizes: {
          sm: 'max-w-sm',
          md: 'max-w-md',
          lg: 'max-w-lg',
          xl: 'max-w-xl',
          '2xl': 'max-w-2xl',
          '3xl': 'max-w-3xl',
          '4xl': 'max-w-4xl',
          '5xl': 'max-w-5xl',
          '6xl': 'max-w-6xl',
          '7xl': 'max-w-7xl',
        },
      },
      content: {
        base: 'relative h-full w-full p-4 md:h-auto w-full h-auto',
        inner:
          'relative rounded-md bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh] overflow-auto',
      },
      body: {
        base: 'py-3 px-6 tablet:p-6 flex-1 overflow-auto',
        popup: '',
      },
      header: {
        base: 'flex items-start justify-between rounded-t-md dark:border-gray-600 border-b py-3 px-6 tablet:p-6',
        popup: 'py-3 px-6 tablet:p-6 border-b border-gray-200',
        title: 'text-lg font-semibold text-neutral-800 dark:text-white',
        close: {
          base: 'ltr:ml-auto inline-flex items-center rounded-md bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
          icon: 'h-5 w-5',
        },
      },
      footer: {
        base: 'flex items-center justify-end gap-x-2 rounded-b border-t border-gray-200 px-6 py-3 tablet:p-6 dark:border-gray-600',
        popup: 'border-t',
      },
    },
  };

  return (
    <>
      <Flowbite theme={{ theme: customStyle ?? customModalStyle }}>
        <Modal show={show} size={size ?? 'lg'} position="center" popup onClose={onClose}>
          {children}
        </Modal>
      </Flowbite>
    </>
  );
};
