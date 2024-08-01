import React from 'react';

import { createAbility } from './ability-factory';
import { AbilityContext } from './ability.context';
import { EActions, ESubjects } from './ability.enum';

const abilityBuilder = createAbility([
  {
    action: EActions.MANAGE,
    subject: ESubjects.ALL,
  },
]);
const AbilityProvider = ({ children }: { children: React.ReactNode }) => {
  return <AbilityContext.Provider value={abilityBuilder}>{children}</AbilityContext.Provider>;
};

export default AbilityProvider;
