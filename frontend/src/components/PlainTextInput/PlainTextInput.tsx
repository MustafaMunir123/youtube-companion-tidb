'use client';

import { UseFormRegister } from 'react-hook-form';

import { TextArea } from '@/ui-components';
import { TOTAL_ALLOWED_RAW_TEXT_CHARACTERS } from '@/utils/constants';

import { useI18n } from '@/i18n/client';

export type PlainTextProps = {
  display: boolean;
  register: UseFormRegister<any>;
  errorMsg: string;
  setErrorMsg: (value: string) => void;
};

export const PlainTextInput = (props: PlainTextProps) => {
  const { display, register, errorMsg, setErrorMsg } = props;
  const t = useI18n();
  return (
    <div className={`${!display && 'hidden'} flex flex-col w-full gap-y-2`}>
      <TextArea
        variant="primary"
        label={t('text_label')}
        placeholder={t('write_text')}
        errorMessage={errorMsg}
        error={!!errorMsg}
        maxLength={10000}
        onFocus={() => setErrorMsg('')}
        required
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 "
        fullWidth
        rows={5}
        additionalLabel
        allowedCharacters={TOTAL_ALLOWED_RAW_TEXT_CHARACTERS}
        {...register('text')}
        data-testid="bot-plain-text"
      />
    </div>
  );
};
