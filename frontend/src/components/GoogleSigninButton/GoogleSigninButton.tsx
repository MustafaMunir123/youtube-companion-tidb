'use client';

import Image from 'next/image';

import { IButton } from '@/ui-components/Button/Button.types';
import { LoadingSpinner } from '@/ui-components/LoadingSpinner/LoadingSpinner';
import { googleButton } from '@/utils/images';

import { useI18n } from '@/i18n/client';

export const GoogleSigninButton = ({ isLoading, onClick }: IButton) => {
  const t = useI18n();
  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="flex justify-center items-center h-12 w-full border rounded-md bg-white border-neutral-200 hover:bg-neutral-50"
          disabled={isLoading}
          onClick={onClick}
        >
          {isLoading ? (
            <span className="flex justify-center items-center w-full h-full bg-neutral-50">
              <LoadingSpinner spinnerSize="md" customClass="mr-2" />
            </span>
          ) : (
            <span className="flex justify-center items-center w-full h-full font-medium text-neutral-800">
              {`${t('continue_with')}`}
              <Image
                src={googleButton}
                width="24"
                height="24"
                quality={100}
                priority
                alt="google-logo"
                className="object-contain ml-2"
              />
            </span>
          )}
        </button>
      </div>
    </>
  );
};
