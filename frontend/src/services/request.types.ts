import { ChatObject } from '@/types';

export type UserLogin = {
  email: string;
  password: string;
};

export type CreateOrg = {
  name: string;
};

export type UserForgotPassword = {
  email: string;
};

export type ResetUserPassword = {
  code: string;
  newPassword: string;
};

export type JoinOrg = {
  name: string;
  password: string;
  token: string;
};

export type UserSignup = {
  name: string;
  email: string;
  password: string;
};

export type SignupUserDetail = {
  name: string;
  email: string;
};

export type UpdateChatbot = {
  data: FormData;
  id: string;
};

export type TrainChatbot = {
  id: string;
  data: {
    // organization_id: string;
  };
};

export type DeleteChatbot = {
  id: string;
  organization_id: string;
};

export type AskPrompt = {
  chat_id: string;
  prompt: string;
};

export type DeleteUser = {
  userId: string;
};

export type UpdateUser = {
  data: {
    id: string;
    role: string;
  };
};

export type FetchStatus = {
  data: string[];
};

export type UpdateChatbotBubble = {
  data: FormData;
  id: string;
};

export type AddSubscription = {
  code: number;
  org_id: string;
};

export type AddAddOn = {
  code: number;
  org_id: string;
};

export type MessageFeedback = {
  sessionId: string;
  messageId: string;
  questionId: string | undefined;
  vote: string;
};
