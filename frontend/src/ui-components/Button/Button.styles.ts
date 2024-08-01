import { cva } from 'class-variance-authority';

export const buttonStyles = cva(
  'flex font-semibold text-sm tracking-wide	items-center justify-center capitalize px-1 tablet:px-3.5 laptop:px-6 gap-2 cursor-pointer',
  {
    variants: {
      buttonType: {
        base: 'border',
        outlined: 'border-2 border-light',
      },
      variant: {
        primary:
          'bg-primary-500 border-primary-500 text-white hover:bg-primary-700 active:bg-primary-700 hover:border-primary-700',
        secondary:
          'bg-white border-gray-300 text-primary-500 hover:text-white hover:bg-primary-700 hover:border-primary-700',
        tertiary: 'text-primary-500 hover:text-primary-700 bg-transparent border-0 px-1',
        danger: 'bg-red-500 border-red-500 text-white hover:bg-red-700 hover:border-red-700',
      },
      disable: {
        primary:
          'border-neutral-50 bg-neutral-50 text-neutral-400 show-custom-cursor cursor-not-allowed select-none hover:bg-neutral-50',
        secondary:
          'border-neutral-100 bg-neutral-100 text-neutral-400 show-custom-cursor cursor-not-allowed	select-none hover:bg-neutral-100',
        tertiary:
          'text-primary-500 hover:text-white bg-transparent border-0 px-1 color-neutral-400 disabled:cursor-not-allowed',
        danger:
          'border-neutral-50 bg-neutral-50 text-neutral-400 show-custom-cursor cursor-not-allowed	select-none hover:bg-neutral-50',
      },
      size: {
        sm: 'h-7 py-1.5',
        md: 'h-9 py-2',
        lg: 'h-12 py-3',
        xl: 'h-14 py-4',
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
      buttonType: 'base',
      size: 'lg',
      roundedness: 'md',
      fullWidth: false,
    },
  },
);

export const buttonChildStyles = cva('flex justify-center items-center w-full gap-x-1', {
  variants: {
    size: {
      sm: 'text-sm leading-2',
      md: 'text-sm',
      lg: 'text-sm',
    },
    disable: {
      primary: 'text-neutral-400',
      secondary: 'text-neutral-400',
      'primary-light': 'text-white/20',
      danger: 'text-neutral-400',
      dark: 'text-white/20',
      dark2: 'text-white/20',
      tertiary: 'text-neutral-400',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});
