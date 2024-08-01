'use client';

import Image from 'next/image';
import { Button } from '@/ui-components';
import { headerLogo } from '@/utils/images';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import { DropdownMenu } from './DropdownMenu';
import { UserMenu } from './Menu';

export const Navbar = ({
  lng,
  showSidebar,
  setShowSidebar,
}: {
  lng: string;
  showSidebar?: boolean;
  setShowSidebar?: (showSidebar: boolean) => void;
}) => {
  return (
    <>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 sticky top-0 z-10">
        <div className="max-w-screen-xl flex gap-x-2.5 items-center justify-between mx-auto h-14 py-2 px-3">
          <div className="flex justify-start gap-x-2.5">
            <Button
              variant="secondary"
              fullWidth
              roundedness="md"
              onClick={() => setShowSidebar?.(!showSidebar)}
              className="flex laptop:hidden border-white !w-auto px-0.5"
            >
              <Bars3CenterLeftIcon className="h-6 w-6" />
            </Button>
            <a href="" className="flex items-center">
              <Image
                src={headerLogo}
                height="56"
                width="190"
                quality={100}
                priority
                alt="logo"
                className="w-auto h-auto object-contain"
              />
            </a>
          </div>
          <div className="flex items-center justify-center">
            <UserMenu lng={lng} />
          </div>
        </div>
      </nav>
    </>
  );
};
