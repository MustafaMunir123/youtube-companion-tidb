'use client';

import { Suspense, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import ConfirmationDialogProvider from '@/hooks/useConfirm/useConfirm.provider';
import AbilityProvider from '@/rbac/abilities/ability.provider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { Provider as JotaiProvider } from 'jotai';

import { NavigationEvent } from '@/components/NavigationEvent/NavigationEvent';

import { I18nProviderClient } from '@/i18n/client';
import en from '@/i18n/locales/en';

function Providers({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const [client] = useState(new QueryClient());
  console.log("params.locale::===", params.locale)
  return (
    <>
      <AbilityProvider>
        <I18nProviderClient locale={params.locale} fallbackLocale={en}>
          <QueryClientProvider client={client}>
            <JotaiProvider>
              <ConfirmationDialogProvider>
                <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
                <ReactQueryDevtools initialIsOpen={false} />
              </ConfirmationDialogProvider>

              <Suspense fallback={null}>
                <NavigationEvent />
              </Suspense>
            </JotaiProvider>
          </QueryClientProvider>
        </I18nProviderClient>
      </AbilityProvider>
      <Toaster position="top-right" />
    </>
  );
}

export default Providers;
