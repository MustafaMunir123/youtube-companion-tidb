'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import styled from 'styled-components';

import { filteredChatsStackAtom, promptStackAtom } from '@/atoms/auth.atom';

import { ResponseAllConversations } from '@/services/chat/chat.types';
import { useAskPrompt, useGetChatDetails } from '@/services/chatbot/chatbot.service';
import { CustomDropdown, DropdownOptionType } from '@/ui-components';
import { CHAT_HISTORY_LENGTH, ErrorMessages } from '@/utils/constants';
import { logo } from '@/utils/images';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  Query,
} from '@tanstack/react-query';
import FileSaver from 'file-saver';
import { useAtom } from 'jotai';

import { IChatPrompt, ISelectedFilters } from '../ChatHistory/ChatHistory.types';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { ChatSplash } from '../ChatSplash/ChatSplash';
import { NewChatName } from './PreviousChat.data';
import { schema } from './PreviousChat.schema';

import { useI18n } from '@/i18n/client';

import { ChatRole, ChatObject, IPromptAndAnswer, PreviousChatComponentProps } from '@/types';
import React from 'react';

interface VideoInfoProps {
  message: {
    video_title: string;
    video_id: string;
    time_stamps: {
      time_stamp: string;
      caption: string;
    }[];
  };
  setYtPLayerConfig: (value: { yt_id: string; time: string }) => void;
}

// export const VideoInfo: React.FC<VideoInfoProps> = ({ message, setYtPLayerConfig }) => {
//   return (
//     <>
//         {message.video_title}
//       <br />
//       {message.time_stamps.map((time_stamp: any) => {
//         return (
//           <button key={time_stamp} onClick={() => setYtPLayerConfig({ yt_id: message.video_id, time: time_stamp.time_stamp })}>
//             {time_stamp.time_stamp}
//             <br />
//             {time_stamp.caption.slice(0, 100) + '...'}
//           </button>
//         );
//       })}
//     </>
//   );
// };

interface VideoInfoProps {
  message: {
    video_title: string;
    video_id: string;
    time_stamps: {
      time_stamp: string;
      caption: string;
    }[];
  };
  setYtPLayerConfig: (config: { yt_id: string; time: string }) => void;
}

const VideoInfoContainer = styled.div`
  margin: 20px 0;
`;

const VideoTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const TimestampButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const CaptionText = styled.span`
  display: block;
  font-size: 14px;
  color: #666;
`;

export const VideoInfo: React.FC<VideoInfoProps> = ({ message, setYtPLayerConfig }) => {
  return (
    <VideoInfoContainer>
      <VideoTitle>{message.video_title}</VideoTitle>
      {message.time_stamps.map((time_stamp) => (
        <TimestampButton
          key={time_stamp.time_stamp}
          onClick={() => setYtPLayerConfig({ yt_id: message.video_id, time: time_stamp.time_stamp })}
        >
          {time_stamp.time_stamp}
          <CaptionText>{time_stamp.caption.slice(0, 100) + '...'}</CaptionText>
        </TimestampButton>
      ))}
    </VideoInfoContainer>
  );
};

export const PreviousChat = ({
  lng,
  bot_id,
  isSidebarOpen,
  ytPLayerConfig,
  setYtPLayerConfig,
}: {
  lng: string;
  bot_id: string;
  isSidebarOpen: boolean;
  ytPLayerConfig: {yt_id: string, time: string},
  setYtPLayerConfig: (value: {yt_id: string, time: string}) => void;
}) => {

  const t = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState<number | undefined>();


  const [chatTopInView, setChatTopInView] = useState<boolean>(false);
  const [retainScroll, setRetainScroll] = useState<boolean>(false);
  const [currentPromptSession, setCurrentPromptSession] = useState<string>('');

  const {
    data: resData,
    isLoading: isloading,
    isSuccess,
    isError,
    error,
  }  = useGetChatDetails(bot_id, true);

  const [chatPromptHistoryAtom, setChatPromptHistoryAtom] = useAtom(
    promptStackAtom(bot_id),
  );



  useEffect(() => {
    if (chatTopInView) {
      setRetainScroll(true);
    }
  }, [chatTopInView]);

  useEffect(() => {
    console.log("resdata for message history in useeffect", resData)
    if (resData?.data?.history) {
      const atom_messages: any = [];
      resData?.data?.history.forEach((message: any, index: number) => {

          atom_messages.push({
            role: ChatRole.User,
            content: message.prompt,
            createdAt: '',
            isReaded: '',
            customStyle: '',
          });
          // TODO: remove sameple data
          // message = 
          //     {
          //       video_title: "Sample Video Title 2",
          //       video_id: "def456",
          //       time_stamps: [
          //         {
          //           time_stamp: "00:01:30",
          //           caption: "Caption for the first timestamp"
          //         },
          //         {
          //           time_stamp: "00:02:30",
          //           caption: "Caption for the second timestamp"
          //         }
          //       ]
          //     }
            
                   
          
          atom_messages.push({
            role: ChatRole.Assistant,
            content: <VideoInfo message={message} setYtPLayerConfig={setYtPLayerConfig} />,
            createdAt: '',
            isReaded: '',
            customStyle: '',
          });
        });
      setChatPromptHistoryAtom((prevChatPromptStack: any) => ({
        messages: [
          ...[],
          ...atom_messages
            .flat(),
        ] as IPromptAndAnswer[],
      }));
    }
  }, [resData]);

  // get last 100 messages FROM SESSION HERE
  if (chatPromptHistoryAtom.messages.length > CHAT_HISTORY_LENGTH) {
    chatPromptHistoryAtom?.messages?.slice(-CHAT_HISTORY_LENGTH);
  }

  const userPrompt = chatPromptHistoryAtom.messages
    ?.filter((message: { role: ChatRole }) => message.role === ChatRole.User)
    .map((message: { content: any }) => message.content);

  const { mutate, isLoading } = useAskPrompt();

  const { control, handleSubmit, reset } = useForm<IChatPrompt>({
    resolver: yupResolver(schema),
    defaultValues: {
      prompt: '',
    },
  });

  interface IsetPromptandAnswer extends IPromptAndAnswer {}
  const setPromptandAnswer = ({
    role,
    content,
    textColor,
    customStyle,
    icon,
    createdAt,
    customTsx,
  }: IsetPromptandAnswer) => {
    setRetainScroll(false);
    setChatPromptHistoryAtom((prevChatPromptStack: { messages: any }) => ({
      messages: [
        ...(prevChatPromptStack.messages || []),
        { role, content, textColor, customStyle, icon, createdAt, customTsx },
      ],
    }));
  };


  const handlePromptSubmit = async (data: IChatPrompt) => {
    setPromptandAnswer({ content: data.prompt.trimStart(), role: ChatRole.User });

    setScrollHeight(undefined);
    reset({});
    mutate(
      {
        chat_id: bot_id,
        prompt: data.prompt.trimStart(),
      },
      {
        onSuccess: (resp) => {
          if (resp?.data) {
            resp?.data.forEach((message: {
              video_title: string;
              video_id: string;
              time_stamps: {
                time_stamp: string;
                caption: string;
              }[];
            })=>{
              setPromptandAnswer({
                // WILL HAVE TO MODIFY THIS AND MAKE IT DYNAMIC, CLICKABLE, WILL INVOLVE STATEFUL CHANGES
                content: <VideoInfo message={message} setYtPLayerConfig={setYtPLayerConfig} />,
                role: ChatRole.Assistant,
                createdAt: resp?.data?.created_at,
                // customTsx: (
                //   <Thumbs
                //     sessionId={previousChatComponentProps.sessionId}
                //     messageId={resp?.data?.id}
                //     vote={null}
                //     questionId={resp?.data?.question_id}
                //   />
                // ),
              });
            })

          } else {
            toast.error(t('not_found_error'));
          }
        },
        onError: (err: any) => {
          setPromptandAnswer({
            role: ChatRole.Assistant,
            content: `${err.response.data.message}`,
            textColor: 'text-red-500',
            customStyle: 'bg-red-50 border border-red-500',
            icon: <ExclamationTriangleIcon className="w-4 h-4 text-red-500 mr-1" />,
          });
        },
        onSettled: () => {
          setCurrentPromptSession('');
        },
      },
    );
  };

  return (
    <div
      className={`tablet:flex flex-col border w-full bg-white rounded-md ${isSidebarOpen && 'hidden tablet:block'}`}
    >
      {/* {!previousChatComponentProps.sessionId && (
        <div className="w-full h-full bg-white rounded-md border overflow-x-hidden">
          <ChatSplash handleClick={handleStartConversation} />
        </div>
      )}{' '} */}

        <>
          <div className="border-b p-2 px-4 flex flex-row relative">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold bg-primary-50 border dark:bg-gray-600`}
            >
              <span
                className="text-primary-500 dark:text-gray-300 p-8"
                data-testid="new-chat-main-heading"
              >
                {resData?.data?.title
                  ? resData?.data?.title.slice(0, 1).toUpperCase()
                  : t('new_chat').slice(0, 1).toUpperCase()}
              </span>
            </div>
            <span
              className="py-3 px-4 font-bold truncate max-w-[25rem] overflow-hidden overflow-ellipsis"
              title={resData?.data?.title ?? t('new_chat')}
            >
              {resData?.data?.title ?? t('new_chat')}
            </span>
          </div>

          <form
            onSubmit={handleSubmit(handlePromptSubmit)}
            className="flex flex-col flex-1 relative p-7 h-full tablet:h-auto laptop:p-0"
          >
            <div
              ref={scrollRef}
              className="flex-1 flex-col w-full bg-white overflow-auto max-h-[75vh] relative"
            >
                <ChatMessage
                  chatPromptHistoryAtom={chatPromptHistoryAtom}
                  isLoading={isLoading}
                  scrollRef={scrollRef}
                  scrollHeight={scrollHeight! >= 0 ? scrollHeight : undefined}
                  botLogo={logo}
                  // isThinking={currentPromptSession === previousChatComponentProps.sessionId}
                  isThinking={false}
                  retainScroll={retainScroll}
                  setChatTopInView={setChatTopInView}
                />
              {/* Chat Input */}
            </div>

            <ChatInput
              userPrompt={userPrompt}
              control={control}
              lng={lng}
              bot_id={bot_id}
              isLoading={isLoading}
              org_id=''
            />
          </form>
        </>
    </div>
  );
};
