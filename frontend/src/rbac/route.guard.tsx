'use client';

import { ReactNode, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams, notFound } from 'next/navigation';

import { orgInfo } from '@/atoms/auth.atom';
import routePermissions from '@/utils/routes.private';
import { Spinner } from 'flowbite-react';
import { useAtomValue } from 'jotai';

import { EActions } from './abilities/ability.enum';
import useUserAbility from './abilities/useAbility';

const RouteGuard = (props: { children: ReactNode }) => {
  const { children } = props;

  const organizationInfo = useAtomValue(orgInfo);
  const { replace } = useRouter();
  const currentRoute = usePathname().slice(3);
  const searchParams = useSearchParams();
  const [authorized, setAuthorized] = useState(true);
  const ability = useUserAbility();


  useEffect(() => {
    const authCheck = () => {
      routePermissions.map((rp) => {
        if (
          (rp.dynamic && currentRoute?.includes(rp.path || '')) ||
          (rp.path === currentRoute && ability.rules.length)
        ) {
          if (!ability.can(rp.permission?.action as EActions, rp.permission?.subject)) {
            setAuthorized(false);
            notFound();
          }
        }
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentRoute, searchParams, ability.rules]);

  return authorized ? children : <Spinner aria-label="loading" size="sm" color="purple" />;
};

export default RouteGuard;
