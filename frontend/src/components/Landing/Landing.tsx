import Image from 'next/image';
import Link from 'next/link';

import { publicRoutes } from '@/utils/routes';

export const Landing = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <nav className="w-full fixed top-0 bg-white p-0 border-b border-gray-200 z-20">
        <div className="container sm:w-full sm:max-w-full sm:px-6 flex items-center justify-between m-auto">
          <Link href="">
            <Image
              src="/assets/svg/logo-header.svg"
              alt="chatwards logo"
              width="220"
              height="185"
            />
          </Link>
          {/* collapse */}
          <div className="navbar-content-inner ms-lg-auto d-flex flex-column flex-lg-row align-lg-center gap-4 gap-lg-10 p-2 p-lg-0">
            <Link
              href={`${publicRoutes.AUTH_SIGNIN}`}
              className="no-underline flex font-semibold text-sm tracking-wide items-center justify-center capitalize px-6 gap-2 border bg-primary-500 border-primary-500 text-white hover:bg-primary-700 active:bg-primary-700 hover:border-primary-700 h-12 py-3 rounded-md"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex items-center flex-1 flex-col justify-center flex-1 flex-col bg-content-main bg-no-repeat bg-cover w-full pt-16">
        <div className="container sm:w-full sm:max-w-full sm:px-6">
          <div className="flex items-center flex-row sm:flex-col">
            <div className="w-2/5 sm:w-full">
              <div className="text-left sm:text-center sm:mb-4 relative z-10">
                <h1 className="text-5xl sm:text-4xl leading-snug font-semibold mb-8">
                  Say hello to more free time with{' '}
                  <span className="text-primary-500">Chatwards</span>, the AI ChatBot that helps
                  your documents speak!
                </h1>
              </div>
            </div>
            <div className="w-3/5 sm:w-full ltr:pl-8 rtl:pr-8 sm:pl-0">
              <img
                src="/assets/svg/blurry-shape-2.svg"
                alt=""
                className="absolute -top-24 right-0 z-0"
              />
              <div className="rounded-md border border-gray-200 relative shadow-lg overflow-hidden z-10">
                <img className="block" src="/assets/images/screen-6.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
