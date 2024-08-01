'use client';

import { useEffect, useRef, Fragment, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Avatar } from '@/ui-components';
import { getFormatMessageTimestamp } from '@/utils/helpers';
import { UserIcon } from '@heroicons/react/24/outline';


import { IChatMessage } from './ChatMessage.types';

import { ChatRole } from '@/types';

interface IChatBotThinkingProps {
  botLogo: string;
}

const ChatBotThinking = ({ botLogo }: IChatBotThinkingProps) => (
  <div className="flex gap-x-4 items-start">
    <Image src={botLogo} width="40" height="40" quality={100} priority alt="Edit Icon" />
    <span className="flex gap-x-1 items-center max-w-full bg-gray-100 rounded-md rounded-tl-none p-3">
      <div className="loading-dot-animation first-circle"></div>
      <div className="loading-dot-animation second-circle"></div>
      <div className="loading-dot-animation third-circle"></div>
    </span>
  </div>
);

export const ChatMessage = ({
  chatPromptHistoryAtom,
  isLoading,
  customChatStyles,
  fontSize,
  scrollHeight,
  botLogo,
  isThinking,
  scrollRef,
  retainScroll,
  setChatTopInView,
}: IChatMessage) => {
  const { ref, inView } = useInView();
  const pathName = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const setScrollbarPostion = () => {
  //   messagesEndRef?.current?.scrollTo({
  //     top:
  //       Number(scrollHeight) || scrollHeight === 0
  //         ? scrollHeight
  //         : messagesEndRef.current?.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // };

  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  };

  const restoreScroll = () => {
    if (scrollRef) {
      const container = scrollRef.current;
      if (container) container.scrollTop = container.scrollHeight - scrollPosition;
    }
  };

  useEffect(() => {
    if (retainScroll && retainScroll === true) restoreScroll();
    else scrollToBottom();
  }, [chatPromptHistoryAtom]);

  useEffect(() => {
    if (inView) {
      if (scrollRef) {
        const container = scrollRef.current;
        if (container) setScrollPosition(container?.scrollHeight);
      }
    }
    if (setChatTopInView) {
      setChatTopInView(inView);
    }
  }, [inView]);

  return (
    <>
      <div className="flex flex-1 px-6">
        <div className="w-full flex flex-col gap-3 tablet:gap-6 pb-0 tablet:pb-[50px]">
          <div ref={scrollRef}></div>
          <div ref={ref}></div>
          {chatPromptHistoryAtom?.messages?.map((message, index) => {
            const formattedTime = getFormatMessageTimestamp(message?.createdAt);
            return (
              <Fragment key={index}>
                {message.role === ChatRole.User && (
                  <div className="flex justify-end gap-x-4 items-start" key={index}>
                    <span
                      className="max-w-[800px] break-words overflow-hidden inline-block bg-primary-500 rounded-md rounded-tr-none py-2 px-3"
                      style={customChatStyles}
                    >
                      <p
                        className={`${!fontSize && `text-base`} font-inter font-normal text-white ${
                          fontSize && `text-${fontSize}`
                        }`}
                        style={customChatStyles}
                      >
                        {message.content}
                      </p>
                    </span>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      {pathName.startsWith('/en/chatbot-iframe') ? (
                        <UserIcon
                          className={`w-5 h-5 text-white ${fontSize && `text-${fontSize}`}`}
                          style={customChatStyles}
                        />
                      ) : (
                        <Avatar />
                      )}
                    </a>
                  </div>
                )}
                {message.role === ChatRole.Assistant && (
                  <div className="flex gap-x-4 items-start" key={index}>
                    <Image
                      className="rounded-2xl"
                      src={botLogo}
                      width="40"
                      height="40"
                      quality={100}
                      priority
                      alt="Edit Icon"
                      style={{
                        height: `40px`,
                      }}
                    />
                    <span
                      className={`max-w-[800px] break-words overflow-hidden inline-block bg-gray-100 text-400-400 rounded-md rounded-tl-none py-2 px-3 ${message.customStyle}`}
                    >
                      {/* <div className="flex flex-col justify-center text-base font-inter font-normal"> */}
                      <div className="flex text-base font-regular">
                        {message.icon && <span className="pt-2 mr-px">{message.icon}</span>}
                        <div className="flex flex-col gap-y-2">
                          {/* TODO: MAKE THIS DYNAMIC ITH YTPLAYER CONFIG AND ITS SETTER*/}
                          {message.content}
  
                          <div className="flex gap-x-1 pb-2">{message.customTsx}</div>
                        </div>
                        <div className="flex text-xs pt-5 pl-1 gap-x-2 pb-2 items-end whitespace-nowrap">
                          <>{formattedTime}</>
                        </div>
                      </div>
                    </span>
                  </div>
                )}
              </Fragment>
            );
          })}
          {isLoading && isThinking && <ChatBotThinking botLogo={botLogo} />}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
    </>
  );
};
