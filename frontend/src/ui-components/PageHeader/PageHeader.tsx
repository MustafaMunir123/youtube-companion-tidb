'use client';

import { useRouter } from 'next/navigation';

import { Can } from '@/rbac/abilities/ability.context';
import { EActions, ESubjects } from '@/rbac/abilities/ability.enum';
import { getFormattedDateString } from '@/utils/helpers';
import { protectedRoutes } from '@/utils/routes';
import { PencilSquareIcon, PlusSmallIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Spinner } from 'flowbite-react';

import { DefaultBadge } from '@/components';

import { Button } from '../Button/Button';
import { IPageHeaderProps } from './PageHeader.types';

export const PageHeader = ({
  title,
  actionButton
}: IPageHeaderProps) => {
  const { push } = useRouter();

  return (
    <div className="flex flex-col w-full tablet:min-h-[52px]">
      <div className="flex items-center justify-between">
        <div className="flex items-start flex-col tablet:flex-row tablet:items-center justify-start gap-x-2">
          <h2
            className="text-xl laptop:text-2xl font-semibold truncate max-w-[500px]"
            title={title}
          >
            {title}
          </h2>
          <div className="flex-grow"></div> {/* Add this div to push the button to the right */}
          {actionButton && (
            <Button
              type={actionButton?.type}
              variant="primary"
              size="md"
              isLoading={actionButton?.isLoading}
              disabled={actionButton?.disabled || (actionButton?.error ? true : false)}
              onClick={actionButton?.onClick}
            >
              {actionButton?.icon}
              {actionButton.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
