'use client';

import { useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { isAuthenticatedRequest } from '@/atoms/auth.atom';
import { protectedRoutes, publicRoutes } from '@/utils/routes';
import { useAtomValue } from 'jotai';

export function NavigationEvent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isAuthenticated = useAtomValue(isAuthenticatedRequest);


  useEffect(() => {
    const url = `${pathname}`;
    const urlParts = url.split('/');
    const currentPath = `/${urlParts.slice(2).join('/')}`;
    const currentLinkPath = `/${urlParts[2]}`;

    // if (isAuthenticated && organizationInfo?.id) {
    //   const publicPaths = [publicRoutes.AUTH_SIGNIN, publicRoutes.AUTH_SIGNUP] as string[];

    //   if (publicPaths.includes(currentPath)) {
    //     router.push(protectedRoutes.YOUR_BOTS);
    //   }
    // }
    const protectedPaths = Object.values(protectedRoutes) as string[];
    if (!isAuthenticated && protectedPaths.includes(currentPath)) {
      router.push(publicRoutes.AUTH_SIGNIN);
    }

    if (isAuthenticated && protectedPaths.includes(currentPath)) {
      router.push(currentPath);
    } else if (isAuthenticated && (currentLinkPath === '/en' || currentLinkPath === '/' || currentLinkPath === publicRoutes.AUTH_SIGNIN)) {
        router.push(protectedRoutes.CREATE_CHAT);
    }

    // if (isAuthenticated) {
    //   // router.push(protectedRoutes.YOUTUBE_COMPANION);

    //   router.push('/en'+protectedRoutes.CREATE_CHAT);
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return null;
}
