import { CustomFlowbiteTheme, DeepPartial } from 'flowbite-react';
import { FlowbiteSidebarCollapseTheme } from 'flowbite-react/lib/esm/components/Sidebar/SidebarCollapse';
import { FlowbiteSidebarItemTheme } from 'flowbite-react/lib/esm/components/Sidebar/SidebarItem';

export const sidebarTheme: CustomFlowbiteTheme['sidebar'] = {
  root: {
    inner:
      'h-full overflow-y-auto overflow-x-hidden shadow-md rounded-lg border-1 bg-white py-4 px-3',
  },
};

export const sidebarItemTheme: Partial<FlowbiteSidebarItemTheme> = {
  base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 tablet:hover:bg-gray-100 tablet:bg-gray-100',
};

export const customCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    base: 'flex pt-0 h-full rounded-lg border border-gray-200 bg-white shadow-md',
    children: 'flex h-full justify-start flex-col gap-4 mt-4 p-3 tablet:p-6',
  },
};

export const customUnexpectedCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    base: 'rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col flex h-full overflow-wrap overflow-auto',
    children: 'flex h-full flex-col gap-4 p-6',
  },
};

export const sidebarCollapseItemTheme: DeepPartial<FlowbiteSidebarCollapseTheme> = {
  label: {
    icon: 'hidden',
  },
};

export const sidebarSelectedCollapseItemTheme: DeepPartial<FlowbiteSidebarCollapseTheme> = {
  label: {
    icon: 'hidden',
  },
  button:
    'flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 tablet:hover:bg-gray-100 tablet:bg-gray-100',
};

export const tabTheme: CustomFlowbiteTheme['tab'] = {
  tablist: {
    tabitem: {
      base: 'flex items-center justify-center pb-2 pt-4 px-8 rounded-t-lg text-md font-semibold first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:outline-none',
      styles: {
        underline: {
          active: {
            on: 'text-primary-500 rounded-t-lg border-b-2 border-primary-500 active',
          },
        },
      },
    },
  },
};
