'use client';

import { useState } from 'react';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Dropdown } from 'flowbite-react';

import { DropdownOptionType } from './CustomDropDown.type';

import { useI18n } from '@/i18n/client';

export const CustomDropdown = ({
  dropdownOptions,
  handleClick,
  currentValue,
  label,
  required,
  height,
  width,
}: {
  dropdownOptions: DropdownOptionType[];
  handleClick: (option: DropdownOptionType) => void;
  currentValue?: string | number;
  label?: string;
  required?: boolean;
  height?: string;
  width?: string;
}) => {
  const t = useI18n();
  const currentOption = dropdownOptions.find((option) => option.value === currentValue);
  const [currentOptionState, setCurrentOptionState] = useState(currentOption);
  return (
    <>
      {label && (
        <label
          htmlFor={label}
          className="text-sm font-semibold tracking-wide capitalize text-neutral-800 font-inter"
        >
          {label} {required ? <span className="text-danger-500">*</span> : null}
        </label>
      )}
      <Dropdown
        style={{ width: `${!!width ? width : '370px'}` }}
        label={label}
        className={'bg-gray-50'}
        renderTrigger={() => (
          <div
            style={{
              width: `${!!width ? width : '370px'}`,
              height: `${!!height ? height : '41px'}`,
            }}
            className={
              'flex justify-between items-center px-4 py-3 border border-gray-200 rounded-md bg-gray-50 hover:cursor-pointer'
            }
          >
            <span className="text-sm font-normal text-neutral-800">
              {currentOptionState?.label}
            </span>
            <ChevronDownIcon className="h-4 w-4 text-neutral-800" />
          </div>
        )}
      >
        {dropdownOptions.map((option: DropdownOptionType, index: number) => {
          return (
            <Dropdown.Item
              key={index}
              className="text-sm font-normal text-gray-500 hover:!bg-gray-200 hover:text-neutral-800"
              onClick={() => {
                handleClick(option);
                setCurrentOptionState(option);
              }}
            >
              {option.label}
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    </>
  );
};
