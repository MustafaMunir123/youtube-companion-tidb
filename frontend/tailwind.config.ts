/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'left-img': 'url("/assets/images/background.png")',
        'content-main': "url('/assets/svg/content-bg.svg')",
      },
      colors: {
        //color
        white: '#FFFFFF',
        // Chatwards colors
        primary: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        secondary: {
          50: '#F4F5F7',
          100: '#E3E6EA',
          200: '#C9CED8',
          300: '#A4ACBC',
          400: '#778299',
          500: '#5C677E',
          600: '#4F576B',
          700: '#44495A',
          800: '#414552',
          900: '#363843',
        },
        neutral: {
          50: '#F4F5F7',
          100: '#E3E6EA',
          200: '#C9CED8',
          300: '#A4ACBC',
          400: '#778299',
          500: '#5C677E',
          600: '#4F576B',
          700: '#44495A',
          800: '#414552',
          900: '#363843',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },

        // Utility colors
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
        },
        warning: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
        },
        info: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
        },
      },

      boxShadow: {
        sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.08)',
        base: '0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
        md: '0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
        lg: '0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)',
        xl: '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)',
        '2xl': '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: '0px 2px 4px 0px rgba(0, 0, 0, 0.06) inset',
      },

      dropShadow: {
        sm: '0px 8px 6px rgba(0, 0, 0, 0.25)',
      },

      borderRadius: {
        sm: '2px',
        base: '4px',
        md: '8px',
        lg: '16px',
        xl: '32px',
        '2xl': '64px',
        full: '200px',
      },

      width: {
        '10vw': '10vw',
        '20vw': '20vw',
        '30vw': '30vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '80vw': '80vw',
        '90vw': '90vw',
      },

      maxWidth: {
        '10vw': '10vw',
        '20vw': '20vw',
        '30vw': '30vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '80vw': '80vw',
        '90vw': '90vw',
      },

      fontFamily: {
        regular: ['Segoe UI Regular'],
        light: ['Segoe UI Light'],
        semibold: ['Segoe UI SemiBold'],
        bold: ['Segoe UI Bold'],
        body: ['Segoe UI Regular'],
        display: ['Segoe UI Bold'],
      },
    },

    screens: {
      fold: { min: '0px', max: '319px' },
      // => @media (min-width: 320px) { ... }

      mobile: '320px',
      // => @media (min-width: 320px) { ... }

      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '912px',
      // => @media (min-width: 912px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }

      sm: { min: '320px', max: '767px' },
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')],
};
