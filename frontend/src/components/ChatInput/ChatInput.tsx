'use client';

import { useState } from 'react';
import { useController } from 'react-hook-form';

import { Button, Input } from '@/ui-components';
import { ARROW_DOWN, ARROW_UP } from '@/utils/constants';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { IChatInput } from './ChatInput.types';

import { useI18n } from '@/i18n/client';

export const ChatInput = ({
  control,
  isLoading,
  customStyle,
  postionRight,
  userPrompt,
  placeholderText,
}: IChatInput) => {
  const t = useI18n();

  const { field, fieldState } = useController({ control, name: 'prompt' });
  const screenWidth = customStyle ?? 'px-6 pb-6 w-[calc(100%-252px)]';
  const rightPosition = postionRight ?? 'ltr:right-[48px] rtl:left-[48px]';

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === ARROW_UP || e.key === ARROW_DOWN) && userPrompt) {
      e.preventDefault();

      if (e.key === ARROW_UP && currentIndex < userPrompt.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
      if (e.key === ARROW_DOWN && currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
      const selectedIndex = userPrompt.length - currentIndex - 1; // Corrected calculation
      const selectedValue = userPrompt[selectedIndex];
      field.onChange(selectedValue);
    }
  };

  return (
    <div
      className={`absolute bottom-0 min-h-[70px] w-full ltr:right-0 rtl:left-0 border-t-0 border-transparent bg-[#f5f5ff] rounded-lg `}
    >
      <div className="px-4 bg-white border-gray-200 border-t-0 border-l-0 rounded-t-none rounded-lg">
        <div className="w-full">
          <Button
            variant="primary"
            roundedness="md"
            className={`absolute !p-0 w-[36px] h-[36px] top-[8.1px] border ${rightPosition}`}
            disabled={!fieldState.isDirty || !field.value.trimStart() || isLoading}
            type="submit"
          >
            <PaperAirplaneIcon className="w-5 h-5 rtl:rotate-180" />
          </Button>
          <Input
            type="text"
            placeholder={placeholderText ?? t('chat_placeholder')}
            variant="primary"
            fullWidth
            className="shadow-sm ltr:pr-[46px] rtl:pl-[46px]"
            value={field.value}
            onKeyUp={handleKeyUp}
            onChange={field.onChange}
          />
        </div>
        <p className="text-center text-xs text-gray-500 mt-1 pb-2">
          Powered By <strong className="font-semibold">TiDB</strong>
        </p>
      </div>
    </div>
  );
};
