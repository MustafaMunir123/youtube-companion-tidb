'use client';

import toast from 'react-hot-toast';

import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const ShowSuccessToast = (message: string) => {
  toast.success(
    <div className="flex flex-col justify-center gap-2 w-[288px]">
      <div className="flex justify-between">
        <span className="flex items-center font-inter font-semibold text-sm gap-2">
          <CheckCircleIcon className="w-6 h-6 text-green-500" />
          Success
        </span>
        <button onClick={() => toast.remove(message)}>
          <XMarkIcon className="w-6 h-6 text-black" />
        </button>
      </div>
      <span className="text- text-gray-500">{message}</span>
    </div>,
    {
      duration: 5000,
      icon: null,
      style: {
        color: 'black',
        backgroundColor: '#F0FDF4',
        border: '1px solid #A7F3D0',
        minWidth: '288px',
      },
      id: message,
    },
  );
};
