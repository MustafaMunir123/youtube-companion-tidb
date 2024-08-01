import { ReactNode } from 'react';


export enum ChatRole {
  User = 'user',
  Assistant = 'assistant',
}

export interface QParams<T> {
  params: {
    [K in keyof T]: T[K];
  };
}

export interface LngParam {
  lng: string;
}

export interface IPromptAndAnswer {
  role: ChatRole;
  content: string | ReactNode;
  createdAt?: string;
  textColor?: string;
  customStyle?: string;
  customTsx?: ReactNode;
  icon?: ReactNode;
}

export interface MessageObject {
  messages: IPromptAndAnswer[]; // You can define a more specific type if needed
}

export type RoleAndContent = Pick<IPromptAndAnswer, 'role' | 'content'>;

export interface ChatObject {
  messages: RoleAndContent[];
}

export type FileType = {
  format: string;
  extension: string;
};

export type BotStatusData = {
  id: string;
  name: string;
  status: string;
};

export interface ChatHistoryParam {
  lng: string;
  bot_id: string;
}

export interface ChatBotParam {
  lng: string;
  bot_id: string;
  bot_name: string;
}

export interface PreviousChatParam {
  lng: string;
  bot_id: string;
  session_id: string;
}

export type PreviousChatComponentProps = {
  sessionId: string;
  botName: string;
  isReaded: number;
  isMarkedConversation: boolean;
  name: string;
  created_at: string;
};
