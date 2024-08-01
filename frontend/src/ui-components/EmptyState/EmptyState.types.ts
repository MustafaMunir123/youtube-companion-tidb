import { ReactNode } from 'react';

export interface IEmptyStateButtonProps {
  icon?: ReactNode;
}
export type IEmptyState = {
  emptyIcon?: IEmptyStateButtonProps;
  title: string;
  description?: string;
};
