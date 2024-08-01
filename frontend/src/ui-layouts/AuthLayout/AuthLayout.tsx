'use client';

import { IAuthLayout } from './AuthLayout.types';

export const AuthLayout = ({ leftSide, rightSide }: IAuthLayout) => {
  return (
    <div className="flex min-h-screen flex-col laptop:flex-row gap-2.5">
      <div className="flex flex-none laptop:flex-1 h-20 laptop:h-screen justify-center items-center bg-no-repeat bg-cover bg-left-img">
        {leftSide}
      </div>

      <div className="flex flex-1 justify-center bg-white laptop:py-8">
        <div className="flex flex-col px-2 laptop:px-4 py-2 justify-start laptop:justify-center items-center text-center gap-y-4 laptop:gap-y-8 w-[460px]">
          {rightSide}
        </div>
      </div>
    </div>
  );
};
