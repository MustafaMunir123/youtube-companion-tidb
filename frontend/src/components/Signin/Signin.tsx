'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { useRouter, useSearchParams } from 'next/navigation';

import { userInfo, isAuthenticatedRequest, userConfigs } from '@/atoms/auth.atom';
import {
  useSignInWithGoogle,
} from '@/services/auth/auth.service';
import { AuthHeader } from '@/ui-components';
import { protectedRoutes } from '@/utils/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSetAtom } from 'jotai';


import { GoogleSigninButton } from '../GoogleSigninButton/GoogleSigninButton';
import { SigninFormValues } from './Signin.types';
import { useSigninSchema } from './useSigninSchema';
import { useI18n } from '@/i18n/client';


export function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { signinSchema } = useSigninSchema();
  const { push, replace } = useRouter();
  const t = useI18n();

  const setUserInfo = useSetAtom(userInfo);
  const setIsAuthenticated = useSetAtom(isAuthenticatedRequest);
  const setUserConfigs = useSetAtom(userConfigs);

  const { mutateAsync: signInMutateAsync } = useSignInWithGoogle();


  const searchParams = useSearchParams();


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  const handleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const response = await signInMutateAsync();
      console.log("google signin response::==", response);
      setUserInfo(response.data);
      setIsAuthenticated(true);
 
      push(protectedRoutes.CREATE_CHAT)

      toast.success(t('signin_successfully'));
    } catch (error: any) {
      if (error?.response?.data?.status_code === 403) {
        toast.error(error?.response?.data?.message);
      } else if (error.code === 'auth/popup-closed-by-user') {
        toast.success(t('google_sign_in_cancelled')); // Display an informative message
      } else {
        toast.error(t('something_went_wrong'));
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <AuthHeader title={t('signin_to') + ' Youtube Study Companion'} />
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex flex-col gap-y-2 w-full">
          <GoogleSigninButton isLoading={isGoogleLoading} onClick={handleSignIn} />
        </div>

      </div>
    </>
  );
}
