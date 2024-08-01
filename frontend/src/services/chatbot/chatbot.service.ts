import { apiPath, AI_SERVICE_PATH } from '@/utils/api.endpoints';
import { axiosClient as axios } from '@/utils/axiosInstance';
import { ChatbotStatus } from '@/utils/constants';
import {
  useMutation,
  useQueryClient,
  useQuery,
  useInfiniteQuery,
  QueryClient,
} from '@tanstack/react-query';


import {
  AskPrompt,
  FetchStatus,
  UpdateChatbot,
  UpdateChatbotBubble,
  MessageFeedback,
  TrainChatbot,
  DeleteChatbot,
} from '../request.types';

//Get chatbot
const fetchChatbots = async (organization_id: string) => {
  const response = await axios.get(
    `${AI_SERVICE_PATH + apiPath.MGET_CHATBOTS}?organization_id=${organization_id}`,
  );
  return response.data;
};

export const useGetChatbots = (organization_id: string) => {
  return useQuery(['chatbots'], () => fetchChatbots(organization_id));
};

const fetchInfiniteChatbot = async (url: string, organization_id: string) => {
  const response = await axios.get(
    url ?? `${AI_SERVICE_PATH}${apiPath.MGET_CHATBOTS}?organization_id=${organization_id}`,
  );
  return response.data;
};

export const useGetInfiniteChatbot = (organization_id: string) => {
  return useInfiniteQuery(
    ['Infinitechatbots', organization_id],
    ({ pageParam }) => fetchInfiniteChatbot(pageParam, organization_id),
    {
      getPreviousPageParam: (firstPage) => firstPage.data.previous ?? undefined,
      getNextPageParam: (lastPage) => lastPage.data.next ?? undefined,
      enabled: !!organization_id,
      refetchOnWindowFocus: false,
    },
  );
};

const fetchPaginateChatbots = async () => {
  const response = await axios.get(`${AI_SERVICE_PATH + apiPath.MGET_CHATBOTS}`);
  return response.data;
};

export const usePaginateChatbots = () => {
  return useQuery(['chatbots'], () => fetchPaginateChatbots(), 
  // {
  //   refetchOnWindowFocus: false,
  // }
);
};




//Train chatbot
const postTrainChat = async (data : {chat_title: string, url: string}) => {
  const response = await axios.post(AI_SERVICE_PATH + apiPath.MINITIATE_CHAT, data);
  return response.data;
};

export const useTrainChat = () => {
  const queryClient = useQueryClient();
  return useMutation((data: {chat_title: string, url: string}) => postTrainChat(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['chatbots']);
      queryClient.invalidateQueries(['chatbot']);
    },
  });
};




//Get spacific chatbot details by id
const fetchChatDetails = async (chat_id: string, history?: boolean) => {
  const response = await axios.get(
    `${AI_SERVICE_PATH}${apiPath.MCHAT_SESSION}/${chat_id}?history=${history}`,
  );
  return response.data;
};

export const useGetChatDetails = (chat_id: string, history?: boolean) => {
  return useQuery(['chatbot', chat_id], () => fetchChatDetails(chat_id, history), {
    refetchOnWindowFocus: false,
  });
};

const askPrompt = async ({ chat_id, prompt }: AskPrompt) => {
  const requestBody = {
    prompt: prompt,
  };

  const response = await axios.post(
    `${AI_SERVICE_PATH}${apiPath.MCHAT_SESSION}/${chat_id}${apiPath.MASK_PROMPT}`,
    requestBody,
  );

  return response.data;
};

export const useAskPrompt = () => {
  const queryClient = useQueryClient();
  return useMutation((prompt: AskPrompt) => askPrompt(prompt), {
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations']);
    },
  });
};

