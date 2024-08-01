'use client';

import { forwardRef } from 'react';

import { VariantProps } from 'class-variance-authority';

import { inputStyles } from './Input.styles';
import { IInput } from './Input.types';

import { useI18n } from '@/i18n/client';

export const Input = forwardRef<HTMLInputElement, IInput & VariantProps<typeof inputStyles>>(
  (props, ref) => {
    const t = useI18n();
    const {
      variant,
      label,
      size,
      roundedness,
      fullWidth,
      helpText,
      error,
      errorMessage,
      disabled,
      isLoading,
      required,
      className = '',
      labelClassName = '',
      ...nativeInputProps
    } = props;

    return (
      <div className="flex flex-col gap gap-y-2 items-start w-full">
        {label && (
          <label
            htmlFor={label}
            className="text-neutral-800 font-semibold text-sm capitalize tracking-wide"
          >
            {label} {required ? <span className="text-danger-500">*</span> : `(${t('optional')})`}
          </label>
        )}
        <input
          ref={ref}
          className={`${inputStyles({
            ...(disabled || isLoading ? { disable: variant } : { variant }),
            size,
            roundedness,
            fullWidth,
          })} ${className}`}
          disabled={disabled || isLoading}
          {...nativeInputProps}
        />
        {helpText ? (
          <p
            className="text-start font-regular text-sm text-gray-500 tablet:w-[32rem] break-words"
            title={helpText}
          >
            {helpText}
          </p>
        ) : null}
        {error ? (
          <p className="text-start font-regular text-sm text-danger-300 tablet:w-[32rem] break-words">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
