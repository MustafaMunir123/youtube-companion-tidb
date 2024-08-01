import { ComponentPropsWithRef, ComponentPropsWithoutRef } from 'react';

export interface ITextArea extends ComponentPropsWithoutRef<'textarea'> {
  label?: string;
  helpText?: string;
  error?: boolean | string;
  errorMessage?: string;
  isLoading?: boolean;
  labelClassName?: string;
  additionalLabel?: boolean;
  characterCount?: number;
  allowedCharacters?: number;
}
