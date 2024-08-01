'use client';

import { useRouter } from 'next/navigation';

import { IAuthMemberFooterProps } from './AuthMemberFooter.types';


export const AuthMemberFooter = ({ text, link, redirect }: IAuthMemberFooterProps) => {
  const { replace } = useRouter();

  return (
    <div>
      <p className="font-semibold text-sm">
        {text}{' '}
        <span
          className="text-primary-500 cursor-pointer"
          onClick={() => {
            replace(redirect);
          }}
        >
          {link}
        </span>
      </p>
    </div>
  );
};
