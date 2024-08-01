'use client';

import { useRef, useState } from 'react';

import { botNameAtom } from '@/atoms/chat.atoms';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useAtom } from 'jotai';

import { IChatHistory } from './ChatHistory.types';

import { useI18n } from '@/i18n/client';

import { YoutubeEmbedding } from '../YoutubeEmbedding/YoutubeEmbedding';
import { PreviousChat } from '../PreviousChat/PreviousChat';

export const ChatHistory = (props: IChatHistory) => {
  const { bot_id } = props;
  const [botName] = useAtom(botNameAtom(bot_id));

  const t = useI18n();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [ytPLayerConfig, setYtPLayerConfig] = useState<{yt_id: string, time: string}>({yt_id: '', time: ''});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
    <>
      {/* All Previous Conversations */}
      <div className={`bottom-0 h-full`} ref={scrollRef}>
        <div className="h-[84vh] flex flex-col tablet:flex-row gap-x-3 laptop:gap-x-8">
          <PreviousChat
              lng={bot_id}
              bot_id={bot_id}
              isSidebarOpen={isSidebarOpen}
              ytPLayerConfig={ytPLayerConfig}
              setYtPLayerConfig={setYtPLayerConfig}
            />
          <div
            className={`w-full tablet:w-full bg-white rounded-md border overflow-x-hidden ${
              !isSidebarOpen ? 'hidden tablet:block' : ''
            }`}
          >
            <YoutubeEmbedding yt_id={ytPLayerConfig.yt_id} start_time={ytPLayerConfig.time}/>
          </div>

          {!isSidebarOpen ? (
            <div className="mb-2.5 tablet:hidden">
              <ChevronLeftIcon onClick={() => setIsSidebarOpen(true)} className="h-7 w-7" />
            </div>
          ) : null}

        </div>
      </div>
    </>
  );
};
