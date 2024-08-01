import { ReactNode } from 'react';

export interface IPageHeaderButtonProps {
  icon?: ReactNode;
  editIcon?: ReactNode;
  deleteIcon?: ReactNode;
  isLoading?: boolean;
  text?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  error?: boolean;
  disabled?: boolean;
}
export interface IPageHeaderProps {
  chatId?: string;
  title: string;
  url?: string;
  status?: string,
  is_playlist?: boolean,
  actionButton?: IPageHeaderButtonProps;
}
