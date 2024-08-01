import { RefObject } from 'react';

import { IPromptAndAnswer } from '@/types';

export interface IChatMessage {
  chatPromptHistoryAtom: {
    messages: IPromptAndAnswer[];
  };
  isLoading: boolean;
  scrollHeight?: number | undefined;
  scrollRef?: RefObject<HTMLDivElement>;
  customChatStyles?: {
    backgroundColor: string;
    color: string;
  };
  fontSize?: string;
  botLogo: string;
  retainScroll?: boolean;
  isThinking?: boolean;
  setChatTopInView?: (value: boolean) => void;
  // ytPLayerConfig: {yt_id: string, time: string},
  // setYtPLayerConfig: (value: {yt_id: string, time: string}) => void;
}
