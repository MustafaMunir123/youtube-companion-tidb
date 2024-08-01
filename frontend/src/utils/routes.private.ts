import { Actions, EActions, ESubjects, Subjects } from '@/rbac/abilities/ability.enum';

import { protectedRoutes } from './routes';

export type IPermissionMeta = {
  action: Actions;
  subject: Subjects;
};

export type RoutingList = {
  path?: string;
  index?: boolean;
  permission?: IPermissionMeta;
  dynamic?: boolean;
};

const routePermissions: RoutingList[] = [
  {
    path: protectedRoutes.CHATBOT,
    permission: {
      action: EActions.READ,
      subject: ESubjects.BOTS,
    },
  },
];

export default routePermissions;
