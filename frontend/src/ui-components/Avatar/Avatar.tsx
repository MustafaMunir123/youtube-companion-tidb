'use client';

import Image from 'next/image';

import { userInfo } from '@/atoms/auth.atom';
import { useAtomValue } from 'jotai';

export const Avatar = ({
  width = 40,
  height = 40,
  fontSize = 14,
  imagePath,
}: {
  width?: number;
  height?: number;
  fontSize?: number;
  imagePath?: string;
}) => {
  const userDetails = useAtomValue(userInfo);
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-primary-50 border border-primary-100 rounded-full dark:bg-gray-600`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {!!imagePath ? (
        <Image
          className={`${`h-full w-full object-cover`}`}
          width={width}
          height={height}
          src={imagePath as string}
          priority={true}
          alt="profile-picture"
        />
      ) : (
        <span
          className="font-bold text-primary-500 mb-px dark:text-gray-300"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          {userDetails && userDetails?.full_name?.slice(0, 1).toUpperCase()}
        </span>
      )}
    </div>
  );
};
