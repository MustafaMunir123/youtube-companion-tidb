import { ComponentPropsWithoutRef } from 'react';

export interface IButton extends ComponentPropsWithoutRef<'button'> {
  children?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  childClassName?: string;
}
