import { Role } from '@/rbac/abilities/ability.enum';

export interface IUserLogin {
  user: {
    userId: string;
    email: string;
    name: string;
    role: Role;
  };
  organization: {
    organizationId: string;
    name: string;
  };
}

export type UserLoginType = {
  id: string;
  full_name: string;
  email: string;
  organization?: IOrganization | null;
};

export type IOrganization = {
  id: string;
  name: string;
};
