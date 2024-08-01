'use client';

import { Fragment, useEffect, useRef } from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { LanguageIcon } from '@heroicons/react/20/solid';

import { useI18n, useCurrentLocale, useChangeLocale } from '@/i18n/client';
import { Tlanguages, languagesWithCode as languages } from '@/i18n/settings';

export const DropdownMenu = () => {
  const t = useI18n();
  // const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  console.log("currentLocale", currentLocale)
  const router = useRouter();
  const pathName = usePathname();
  const closeMenuRef = useRef(null);

  useEffect(() => {
    if (closeMenuRef.current) {
      // @ts-ignore
      closeMenuRef.current();
    }
  }, [pathName]);

  const selectedLanguage = languages.find((language) => language.code === currentLocale);

  // const languagesMenuItems = () => {
  //   return languages.map(({ code, lang }) => {
  //     return (
  //       <Menu.Item key={code}>
  //         {({ close }: any) => {
  //           closeMenuRef.current = close;
  //           return (
  //             <button
  //               type="button"
  //               onClick={() => {
  //                 changeLocale(code as Tlanguages);
  //                 router.refresh();
  //               }}
  //               className={`${
  //                 code === currentLocale ? 'bg-primary-50 text-nuetral-800' : 'text-nuetral-800'
  //               } group flex w-full items-center px-2 py-2 text-sm`}
  //             >
  //               {`${
  //                 code === 'ar' && currentLocale === 'ar'
  //                   ? `${lang} - ${code.toUpperCase()}`
  //                   : `${code.toUpperCase()} - ${lang}`
  //               }`}
  //             </button>
  //           );
  //         }}
  //       </Menu.Item>
  //     );
  //   });
  // };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-transparent px-2 laptop:px-4 py-2 text-sm font-medium group text-neutral-800 hover:text-primary-500 focus:outline-none">
          <LanguageIcon
            className="ltr:mr-1 rtl:ml-1 h-[20px] w-[20px] text-gray-500 group-hover:text-primary-500"
            aria-hidden="true"
          />
          {selectedLanguage?.lang}
          <ChevronDownIcon
            className="ltr:ml-1 rtl:mr-1 h-[24px] w-[24px] text-gray-500 group-hover:text-primary-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      {/* <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute ltr:right-0 rtl:left-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{languagesMenuItems()}</div>
        </Menu.Items>
      </Transition> */}
    </Menu>
  );
};
