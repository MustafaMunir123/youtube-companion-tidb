import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const botSessionAtom = atomFamily((id: string) =>
    atom<string>('')
);

export const botNameAtom = atomFamily((id: string) =>
    atom<string>('')
);
