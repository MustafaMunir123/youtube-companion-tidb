import { useAbility } from '@casl/react';

import { AbilityContext } from './ability.context';
import { AppAbilityType } from './ability.enum';

const useUserAbility = (): AppAbilityType => {
  return useAbility<AppAbilityType>(AbilityContext);
};

export default useUserAbility;
