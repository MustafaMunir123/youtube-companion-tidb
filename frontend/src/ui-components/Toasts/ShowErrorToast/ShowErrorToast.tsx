'use client';

import toast from 'react-hot-toast';

import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const ShowErrorToast = (message: string) => {
  toast.error(
    <div className="flex flex-col justify-center gap-2 w-[288px]">
      <div className="flex justify-between items-center">
        <span className="flex items-center font-inter font-semibold text-sm gap-2">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
          Error
        </span>
        <button onClick={() => toast.remove(message)}>
          <XMarkIcon className="w-6 h-6 text-black" />
        </button>
      </div>
      <span className="text-sm text-gray-500">{message}</span>
    </div>,
    {
      duration: 5000,
      icon: null,
      style: {
        color: 'black',
        backgroundColor: '#FEF2F2',
        border: '1px solid #FECACA',
        minWidth: '288px',
      },
      id: message,
    },
  );
};
