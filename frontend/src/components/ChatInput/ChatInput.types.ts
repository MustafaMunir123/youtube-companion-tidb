import { Control } from 'react-hook-form';

import { IChatPrompt } from '../ChatHistory/ChatHistory.types';

export interface IChatInput {
  control: Control<IChatPrompt, 'prompt'>;
  lng: string;
  isLoading: boolean;
  org_id: string;
  bot_id: string;
  customStyle?: string;
  postionRight?: string;
  userPrompt: string[];
  placeholderText?: string;
}
