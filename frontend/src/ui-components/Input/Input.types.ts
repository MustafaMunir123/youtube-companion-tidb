import { ComponentPropsWithoutRef } from 'react';

export interface IInput extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  helpText?: string;
  error?: boolean | string;
  errorMessage?: string;
  isLoading?: boolean;
  labelClassName?: string;
}
