const TOTAL_ALLOWED_CHARACTERS = 2000000;
const TOTAL_ALLOWED_RAW_TEXT_CHARACTERS = 10000;

const TOTAL_ALLOWED_FILE_SIZE = 10;
const TOTAL_ALLOWED_FILE_STRING = '10';
const CONVERT_TO_MB = 1024 * 1024;
const EMAIL_REGEX = /^[\w\.\-\+]+@[\w\.-]+\.\w+$/;

export {
  TOTAL_ALLOWED_FILE_SIZE,
  TOTAL_ALLOWED_FILE_STRING,
  CONVERT_TO_MB,
  TOTAL_ALLOWED_CHARACTERS,
  TOTAL_ALLOWED_RAW_TEXT_CHARACTERS,
  EMAIL_REGEX,
};

export const INIVTE_USER_ROLE_KEY = 'Invite';
export const ARROW_UP = 'ArrowUp';
export const ARROW_DOWN = 'ArrowDown';

export const PAYLOAD_CHAT_HISTORY_LENGTH = 10;
export const CHAT_HISTORY_LENGTH = 100;

export const DEFAULT_ORGANIZATION_NAME = 'My Organization';

// Progress Bar
export const API_CALL_TIMEOUT = 500;
export const PROGRESS_BAR_DELAY = 500;
export const PROGRESS_INCREMENT = 10;
export const MAX_PROGRESS = 90;

export const EMAIL_ALREADY_IN_USE = 'email-already-in-use';
export const RESEND_EMAIL_TIME = 30;
export const RESEND_EMAIL_EXTENDED_TIME = 60;
export const INVALID_TOKEN = 'invalid_token';
export const INVALID_CREDENTIALS = 'invalid-login-credentials';
export const TOO_MANY_FAILED_ATTEMPTS = 'too-many-requests';

export enum StatusCodes {
  SUCCESS = 200,
}

export enum PageType {
  VERIFY_EMAIL = 'verifyEmail',
  RESET_PASSWORD = 'resetPassword',
}

export enum ErrorMessages {
  'Either this is invalid token or token is expired.' = 'invalid_token',
  "User email doesn't exists." = 'email_not_exists',
  "Your request can't be processed at this time, Try again Later." = 'invalid_query_param',
  'Invalid user group.' = 'invalid_user_group',
  'The resource you are trying to access is not available.' = 'object_not_found',
  'We are unable to process your request at the moment. Please try again later.' = 'service_unavailable',
  'User not associated with any organization.' = 'user_not_associated',
  'User already associated with organization.' = 'user_already_associated',
  'User invite link already initiated.' = 'user_invite_already_associated',
  "User updation failed, user doesn't exist." = 'user_updattion_failed',
  "Can't modified your own role." = 'can_not_modify_own_profile',
  'There are no messages associated with this Chatbot.' = 'no_messages_chatbot',
  'The resource you are trying to create is already available' = 'email_already_in_use',
  'No conversation found' = 'no_conversation_found',
  'The user does not exists.' = 'email_not_exists',
  "Requested Tenant doesnot match user's tenant." = 'email_not_exists',
}

export enum ChatbotStatus {
  IN_PROGRESS = 'training',
  TRAINED = 'trained',
  FAILED = 'failed',
}

export const ExceptionDuration = [
  { label: 'Last 24 Hours', value: 'LD' },
  { label: 'Last Week', value: 'LW' },
  { label: 'Last Month', value: 'LM' },
];

export const contextLimit = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
];
