import { AbilityTuple, MatchConditions, PureAbility } from '@casl/ability';

export enum Role {
  SuperAdmin = 'SuperAdmin',
  BotAdmin = 'BotAdmin',
  User = 'BotUser',
}
export enum DefaultActions {
  MANAGE = 'manage', // CASL default action
}

export enum EnableAction {
  ENABLE = 'enable', // CASL default action
}

export enum DefaultSubjects {
  ALL = 'all', // CASL default subject
}

// This will serve as the source of truth for SUBJECTS throughout our frontend, to be maintained in sync with the backend enum
export enum ESubjects {
  ALL = 'all',
  DASHBOARD = 'dashboard',
  USERS = 'users',
  BOTS = 'bots',
  ORG = 'organization',
}

// This will serve as the source of truth for ACTIONS throughout our frontend, to be maintained in sync with the backend enum
export enum EActions {
  VIEW = 'view',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  EXPORT = 'export',
  IMPORT = 'import',
  MANAGE = 'manage',
}

export enum EFields {
  TENANT_2FA_ENABLED = 'is_2fa_tenant_enabled',
  UNBLOCK = 'is_blocked',
  RECOVER = 'is_deleted',
}

export type Subjects = ESubjects;
export type Actions = EActions;

export type AppAbilities = AbilityTuple<Actions, Subjects | any>;
export type AppAbilityType = PureAbility<AppAbilities, MatchConditions>;
