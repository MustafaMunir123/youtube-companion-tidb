'use client';

import { useState } from 'react';
import { AuthContextProvider } from '@/context/AuthContextProvider/AuthContext';
import RouteGuard from '@/rbac/route.guard';
import { Navbar } from '@/ui-components';
import { SideBar } from '@/components';
import { ChatBotParam, LngParam } from '@/types';

export interface IHomeLayout {
  children: React.ReactNode;
  params: ChatBotParam;
}

export default function HomeLayout({ children, params }: IHomeLayout) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Navbar lng={params.lng} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={showSidebar ? 'd-block z-10 w-full' : 'flex'}>
        <SideBar lng={params.lng} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        {!showSidebar ? (
          <main className="p-3 tablet:p-6 flex flex-col gap-y-6 flex-1 bg-content-main bg-no-repeat bg-cover relative overflow-x-auto">
            <AuthContextProvider>
              <RouteGuard>{children}</RouteGuard>
            </AuthContextProvider>
          </main>
        ) : null}
      </div>
    </>
  );
}
