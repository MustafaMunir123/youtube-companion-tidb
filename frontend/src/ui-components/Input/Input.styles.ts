import { cva } from 'class-variance-authority';

export const inputStyles = cva('w-full px-4 font-regular text-sm !outline-0', {
  variants: {
    variant: {
      primary:
        'border border-gray-200 bg-gray-50 text-neutral-800 placeholder:text-gray-500 focus:outline-primary-500',
    },
    disable: {
      primary:
        'border-neutral-200 bg-gray-200 text-gray-400 show-custom-cursor cursor-not-allowed select-none',
    },
    size: {
      sm: 'h-7',
      md: 'h-9',
      lg: 'h-12',
      xl: 'h-14',
    },
    roundedness: {
      full: 'rounded-full',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    size: 'lg',
    roundedness: 'md',
    fullWidth: false,
  },
});
