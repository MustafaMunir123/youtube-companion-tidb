'use client';

import { createContext } from 'react';

import { isAuthenticatedRequest } from '@/atoms/auth.atom';
import { useIsUserAuthenticated } from '@/services/auth/auth.service';
import { useAtomValue } from 'jotai';

// context
export const AuthContext = createContext<null>(null);

// context provider
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

  const { data, isLoading } = useIsUserAuthenticated();
  const isAuthenticated = useAtomValue(isAuthenticatedRequest);


  if (isLoading) {
    return null;
  }

  // if (isAuthenticated && (isObjectEmpty(userDetails) || isObjectEmpty(orgDetails))) {
  //   setUserInfo(data?.data);
  //   setOrgInfo(data?.data?.organization);
  // }

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};
