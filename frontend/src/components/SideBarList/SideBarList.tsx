'use client';

import { useInView } from 'react-intersection-observer';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

import {
  usePaginateChatbots,
} from '@/services/chatbot/chatbot.service';
import { ChatbotStatus } from '@/utils/constants';
import { yourBot, chatBot } from '@/utils/images';
import { protectedRoutes } from '@/utils/routes';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

import { useI18n } from '@/i18n/client';


export const SideBarList = ({
  lng,
  setShowSidebar,
}: {
  lng: string;
  setShowSidebar: (argument: boolean) => void;
}) => {
  const { ref, inView } = useInView();

  const { data: resData, isFetching, isLoading, refetch } = usePaginateChatbots()
  console.log("resdata in sidebar::===", resData)

  const t = useI18n();
  const { chat_id: activeBot } = useParams();
  const activeBotId = activeBot;

  const pathname = usePathname();

  return (
    <>
      <nav
        id="nav"
        className="text-base ltr:-mr-1 rtl:-ml-1 lg:text-sm max-h-[calc(100%-24px)] overflow-auto"
      >
        <ul className="list-unstyled ltr:mr-1 rtl:ml-1">
          <li onClick={() => setShowSidebar(false)}>
            <Link
              href={`${protectedRoutes.YOUTUBE_COMPANION}`}
              className={`${'sidebar-lisl-item'} ${
                pathname.includes('your-bots') || activeBotId
                  ? 'bg-primary-700'
                  : 'hover:bg-primary-700'
              }`}
            >
              <Image
                src={yourBot}
                width="24"
                height="24"
                quality={100}
                priority
                alt="Bot Icon"
                className="ml-1"
              />
              <span className="truncate mb-1">{t('my_bots')}</span>
            </Link>
            <ul className="list-unstyled ltr:pl-6 rtl:pr-6 mt-1">
              {
                resData?.data.map((bot: any, index: number) =>          
                      <li
                        key={index}
                        className="mb-1 last:mb-0"
                        onClick={() => setShowSidebar(false)}
                      >
                        <Link
                          href={`${protectedRoutes.YOUTUBE_COMPANION}/${bot.id}`}
                          className={`${'sidebar-lisl-item'} ${
                            bot.id === activeBotId || pathname.includes(`/update-chatbot/${bot.id}`)
                              ? 'bg-primary-700'
                              : 'hover:bg-primary-700'
                          }`}
                        >
                          <Image
                            src={chatBot}
                            width="24"
                            height="24"
                            style={{ objectFit: 'scale-down' }}
                            quality={100}
                            priority
                            alt="Bot Icon"
                          />
                          <span
                            className="flex justify-start items-center truncate mb-1 gap-x-1"
                            title={bot.chat_title}
                          >
                            <span className="truncate max-w-[130px]">{bot.chat_title}</span>
                            {bot.status === ChatbotStatus.IN_PROGRESS && (
                              <ExclamationCircleIcon className="bg-white w-5 h-5 text-yellow-500 rounded-full" />
                            )}
                            {bot.status === ChatbotStatus.FAILED && (
                              <ExclamationCircleIcon className="bg-white w-5 h-5 text-red-500 rounded-full" />
                            )}
                          </span>
                        </Link>
                      </li>
                )}
            </ul>
          </li>
        </ul>
        <div ref={ref}></div>
      </nav>
    </>
  );
};

export default SideBarList;
