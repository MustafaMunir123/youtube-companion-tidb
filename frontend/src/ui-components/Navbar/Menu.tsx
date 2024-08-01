'use client';

import { Fragment, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { isAuthenticatedRequest, orgInfo } from '@/atoms/auth.atom';
import { userInfo } from '@/atoms/auth.atom';
import { useUserSignout } from '@/services/auth/auth.service';
import { Avatar } from '@/ui-components';
import { protectedRoutes, publicRoutes } from '@/utils/routes';
import { Menu, Transition } from '@headlessui/react';
import { useSetAtom, useAtomValue } from 'jotai';

import { useI18n } from '@/i18n/client';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const UserMenu = ({ lng }: { lng: string }) => {
  const t = useI18n();
  const signoutMutation = useUserSignout();
  const setOrgInfo = useSetAtom(orgInfo);
  const setIsAuthenticated = useSetAtom(isAuthenticatedRequest);
  const pathName = usePathname();
  const router = useRouter();
  const closeMenuRef = useRef(null);

  const userDetails = useAtomValue(userInfo);

  // const { data: accountDetails, isLoading: isAccountDetailsLoading } = useFetchUserAccountDetails(
  //   userDetails?.id,
  // );

  useEffect(() => {
    if (closeMenuRef.current) {
      // @ts-ignore
      closeMenuRef.current();
    }
  }, [pathName]);

  const handleSignout = async () => {
    try {
      localStorage.removeItem("token");
      // clear all atoms from local storage
      setIsAuthenticated(false);
      localStorage.clear();
      setOrgInfo({});
      toast.success(t('signout_success'));
      window.history.replaceState(null, '', publicRoutes.AUTH_SIGNIN);
      window.location.reload();

    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(t('not_found_error'));
      }
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="w-[40px] h-[40px] overflow-hidden">
        <Avatar
          // imagePath={
          //   accountDetails?.data?.profile_picture ? accountDetails?.data?.profile_picture : ''
          // }
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute ltr:right-0 rtl:left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active, close }: any) => {
                closeMenuRef.current = close;
                return (
                  <>
                    {/* <button
                      type="button"
                      className={classNames(
                        active ? 'bg-primary-50 text-nuetral-800' : 'text-nuetral-800',
                        'group flex items-center w-full px-2 py-2 text-sm justify-center capitalize border-b',
                      )}
                      onClick={() => router.push(protectedRoutes.PROFILE_SETTINGS)}
                    >
                      {t('profile_settings')}
                    </button> */}
                    <button
                      type="submit"
                      className={classNames(
                        active ? 'bg-primary-50 text-nuetral-800' : 'text-nuetral-800',
                        'group flex items-center w-full px-2 py-2 text-sm justify-center',
                      )}
                      onClick={handleSignout}
                    >
                      {t('sign_out')}
                    </button>
                  </>
                );
              }}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
