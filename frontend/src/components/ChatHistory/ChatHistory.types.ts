import { IPromptAndAnswer } from '@/types';

export interface IMessageState {
  messages: IPromptAndAnswer[];
}

export interface IChatPrompt {
  prompt: string;
}

export interface IChat {
  lng: string;
  bot_id: string;
  bot_name?: string;
  session_id?: string;
  session_id_setter?: (session_id: string) => void;
  customStyle?: string;
  postionRight?: string;
  isChatBubble?: boolean;
}

export interface IChatHistory extends Pick<IChat, 'bot_id'> {}

export interface ISession {
  id: string;
  last_message: string;
  last_message_timestamp: string;
  chatbot: string;
  is_starred: boolean;
  unread_messages: number;
  feedback_status: string;
  title?: string; // Add 'title' property as optional
}

export interface ISelectedFilters {
  interfaces: string[];
  status: string[];
}
