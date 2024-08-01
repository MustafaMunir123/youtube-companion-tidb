import {
  ConditionsMatcher,
  FieldMatcher,
  MatchConditions,
  PureAbility,
  RawRuleOf,
} from '@casl/ability';

import { AppAbilities, AppAbilityType, EActions, ESubjects, Role } from './ability.enum';
import { Permission } from './permissions.types';

export const lambdaMatcher: ConditionsMatcher<MatchConditions<Record<PropertyKey, any>>> = (
  matchConditions: MatchConditions,
) => matchConditions;

export const fieldMatcher: FieldMatcher = (fields) => (field) => fields.includes(field);

export const createAbility = (rules: RawRuleOf<AppAbilityType>[]) =>
  new PureAbility<AppAbilities, MatchConditions>(rules, {
    conditionsMatcher: lambdaMatcher,
    fieldMatcher: fieldMatcher,
  });

export class CaslAbilityFactory {
  createPermissionsForUser(role: Role, permissions: Permission[]) {
    if (role === Role.SuperAdmin) {
      const { rules } = createAbility([
        {
          action: EActions.MANAGE,
          subject: ESubjects.ALL,
        },
      ]);
      return rules;
    }

    const permissionsArray: Permission[] = [];
    if (permissions) {
      permissions.forEach((permission: Permission) => {
        const { system, subject, action, ...perm } = permission;

        permissionsArray.push({
        subject: subject,
          action: action,
          ...perm,
        });
      });
    }

    // NO RBAC RIGHT NOW 
    // const { rules } = createAbility(permissionsArray as RawRuleOf<AppAbilityType>[]);
    const { rules } = createAbility([
      {
        action: EActions.MANAGE,
        subject: ESubjects.ALL,
      },
    ]);

    return rules;
  }
}
