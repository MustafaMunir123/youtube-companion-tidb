'use client';

import { forwardRef } from 'react';

import { VariantProps } from 'class-variance-authority';

import { textAreaStyles } from './TextArea.styles';
import { ITextArea } from './TextArea.types';

import { useI18n } from '@/i18n/client';

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  ITextArea & VariantProps<typeof textAreaStyles>
>((props, ref) => {
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
    additionalLabel,
    allowedCharacters,
    ...nativeInputProps
  } = props;
  const t = useI18n();

  return (
    <div className="flex flex-col gap gap-y-2 items-start w-full">
      <div className="flex flex-row justify-between w-full">
        {label && (
          <label
            htmlFor={label}
            className="text-neutral-800 font-semibold text-sm capitalize tracking-wide"
          >
            {label} {required ? <span className="text-danger-500">*</span> : '(optional)'}
          </label>
        )}
        {additionalLabel && allowedCharacters && (
          <div className="flex justify-end">
            <span className="text-sm">
              <span
                className={`font-semibold`}
              >
                {`${'actual'} / `}
              </span>
              <span className="font-light">{`${t('allowed', {
                size: allowedCharacters.toLocaleString('en-us'),
              })} ${t('limit')} `}</span>
            </span>
          </div>
        )}
      </div>
      <textarea
        ref={ref}
        className={`${textAreaStyles({
          ...(disabled || isLoading ? { disable: variant } : { variant }),
          size,
          roundedness,
          fullWidth,
        })} ${className}`}
        disabled={disabled || isLoading}
        {...nativeInputProps}
      />
      {helpText && <p className="font-regular text-sm text-gray-500">{helpText}</p>}
      {error && <p className="font-regular text-sm text-danger-300">{errorMessage}</p>}
    </div>
  );
});

export default TextArea.displayName = 'TextArea';
