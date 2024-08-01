export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const SEED_SERVICE_PATH =
  process.env.NODE_ENV === 'development'
    ? `${process.env.NEXT_PUBLIC_API_URL}/seed/v1`
    : 'http://localhost:8080/seed/v1';
export const AI_SERVICE_PATH = 
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_AI_SERVICE_URL}/api`
    : 'http://localhost:8000/api';

console.log('API_BASE_URL', API_BASE_URL, AI_SERVICE_PATH);

export enum apiPath {
// Auth
  MSIGN_IN = `/user/login/`,
  SIGN_OUT = 'user/signout/',
  RENEW_TOKEN = '/auth/renew-token',

  // Chatbot
  MCHAT_SESSION = '/search/chats',
  MINITIATE_CHAT = '/search/chats/initiate',
  MGET_CHATBOTS = '/search/chats/all',
  MASK_PROMPT = '/prompt',

}

export const publicApiEndpoints: string[] = [
  apiPath.MSIGN_IN,
  apiPath.RENEW_TOKEN,
];
