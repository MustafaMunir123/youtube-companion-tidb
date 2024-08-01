'use client';

import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import { useGetChatDetails } from '@/services/chatbot/chatbot.service';
import { HeaderSkeleton, PageHeader } from '@/ui-components';
import { protectedRoutes } from '@/utils/routes';
import { useI18n } from '@/i18n/client';

export const ChatbotHeader = ({ lng, chat_id }: { lng: string; chat_id: string }) => {
  const t = useI18n();
  const { replace } = useRouter();


  const { data, isFetching, error } = useGetChatDetails(chat_id);

  if (isFetching) {
    return <HeaderSkeleton />;
  }

  if (error) {
    toast.error('Error occured while fetching bot');
    replace(protectedRoutes.YOUTUBE_COMPANION);
  }

  return (
    <>
      {/* Page Header */}
      <PageHeader
        chatId={chat_id}
        title={data?.data?.chat_title}
        url={data?.data?.url}
        status={data?.data?.status}
        is_playlist={data?.data?.is_playlist}
      />
    </>
  );
};
