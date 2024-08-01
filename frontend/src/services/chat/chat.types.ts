
export type AllConversationChatItem = {
  id: string;
  last_message: string;
  last_message_timestamp: string;
  chatbot: string;
  is_starred: boolean;
  unread_messages: number;
  name: string;
  created_at: string;
};

export type ResponseAllConversations = {
  data: {
    results: AllConversationChatItem[];
    count: number;
    next: number;
    previous: number;
  };
  message: string;
  status_code: number;
};

export type ChatConversationsResponse = {
  data: ChatConversationsItem[];
  message: string;
  status_code: number;
};

export type ChatConversationsItem = {
  content: string;
  created_at: string;
  feedback_status: string;
  id: string;
  is_answered: boolean;
  is_read: boolean;
  role: string;
  sender: string;
  updated_at: string;
  name: string;
  session: string;
};

export type ChatAnalysis = {
  botId: string;
  docName: string | null | undefined;
};
