'use client';

import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite, Spinner } from 'flowbite-react';

import { ILoadingSpinner } from './LoadingSpinner.interface';

const customTheme: CustomFlowbiteTheme = {
  spinner: {
    color: {
      primary: 'fill-primary-600',
    },
  },
};

export const LoadingSpinner = ({ customClass, spinnerSize }: ILoadingSpinner) => {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Spinner aria-label="loading" size={spinnerSize} color="primary" className={customClass} />
    </Flowbite>
  );
};
