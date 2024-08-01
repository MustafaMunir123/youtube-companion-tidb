import { EActions, ESubjects } from './ability.enum';

export type Permission = {
  action: EActions;
  subject: ESubjects;
  conditions?: string;
  fields?: string[];
  inverted?: boolean;
  system?: boolean;
};
