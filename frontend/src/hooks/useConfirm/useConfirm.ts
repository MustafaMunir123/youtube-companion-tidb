'use client';

import { createContext, useContext } from 'react';

import { ConfirmationDialogOptions } from './useConfirm.interface';

export const ConfirmationDialogContext = createContext<
  (options: ConfirmationDialogOptions) => Promise<() => void>
>(Promise.reject);
ConfirmationDialogContext.displayName = 'DialogContext';

export const useConfirm = () => useContext(ConfirmationDialogContext);
