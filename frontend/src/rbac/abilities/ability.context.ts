'use client';

import { createContext } from 'react';

import { createContextualCan } from '@casl/react';

import { createAbility } from './ability-factory';

export const AbilityContext = createContext(createAbility([]));
export const Can = createContextualCan(AbilityContext.Consumer);
