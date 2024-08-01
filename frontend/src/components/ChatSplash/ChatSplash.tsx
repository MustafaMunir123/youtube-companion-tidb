import Image from 'next/image';

import { Button } from '@/ui-components';

import { useI18n } from '@/i18n/client';

export const ChatSplash = (props: { handleClick: () => void }) => {
  const { handleClick } = props;
  const t = useI18n();

  return (
    <div className="flex flex-col h-full justify-center items-center border border-gray-300 rounded-md relative">
      <Image className="block" height={80} width={80} src="/assets/svg/logo.svg" alt="" />
      <p className="font-bold my-4">Chatwards</p>
      <Button
        roundedness="md"
        variant="primary"
        buttonType="base"
        className="bg-primary-500 border-primary-500 text-white"
        onClick={handleClick}
      >
        {t('start_conversation')}
      </Button>
      <p className="text-center text-xs text-gray-500 mt-1 absolute bottom-4">
        Powered By <strong className="font-semibold">youtube companion</strong>
      </p>
    </div>
  );
};
