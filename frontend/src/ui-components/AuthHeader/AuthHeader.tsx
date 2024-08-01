import Image from 'next/image';

import { headerLogo } from '@/utils/images';

export const AuthHeader = ({ title, subtitle }: IAuthHeaderProps) => {
  return (
    <>
      <Image
        src={headerLogo}
        width="100"
        height="100"
        quality={100}
        priority
        alt="logo"
        className="object-contain"
      />
      <div className="flex flex-col items-center gap-y-1 max-w-[460px]">
        {title ? (
          <h1 className="font-semibold text-xl laptop:text-2xl capitalize truncate max-w-full">
            {title}
          </h1>
        ) : null}
        {subtitle && <p className="font-regular text-sm text-gray-500">{subtitle}</p>}
      </div>
    </>
  );
};
