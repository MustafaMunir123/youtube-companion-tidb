'use client';

import { ChatbotHeader } from '@/components';
import { ChatHistory } from '@/components/ChatHistory/ChatHistory';

export default function Page({ params }: { params: { locale: string; chat_id: string } }) {
  return (
    <>
      <ChatbotHeader lng={params.locale} chat_id={params.chat_id} />
      <ChatHistory bot_id={params.chat_id} />
    </>
  );
}
