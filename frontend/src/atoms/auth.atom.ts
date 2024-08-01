import { atom } from 'jotai';
import { atomFamily, atomWithStorage } from 'jotai/utils';

// import { IMessageState } from '@/components/ChatHistory/ChatHistory.types';

import { AtomWithStorageConfig } from './customAtomConfigs/AtomWithStorageConfig';

export const orgInfo = atomWithStorage<Record<string, any>>(
  'orgInfo',
  {},
  new AtomWithStorageConfig<Record<string, any>>(),
);
export const userInfo = atomWithStorage<Record<string, any>>(
  'userInfo',
  {},
  new AtomWithStorageConfig<Record<string, any>>(),
);
export const isAuthenticatedRequest = atomWithStorage<boolean>(
  'isAuthenticated',
  false,
  new AtomWithStorageConfig<boolean>(),
);

export const userConfigs = atomWithStorage<Record<string, any>>(
  'userConfigs',
  {},
  new AtomWithStorageConfig<Record<string, any>>(),
);

export const promptStackAtom = atomFamily((id: string) =>
  atom<any>({
    messages: [],
  }),
);

export const filteredChatsStackAtom = atomFamily((id: string) =>
  atom<any>({
    messages: [],
  }),
);
