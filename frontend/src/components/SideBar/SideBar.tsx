import { Can } from '@/rbac/abilities/ability.context';
import { EActions, ESubjects } from '@/rbac/abilities/ability.enum';

import { CreateBot, SideBarList } from '@/components';

import { LngParam, QParams } from '@/types';

export const SideBar = ({
  lng,
  showSidebar,
  setShowSidebar,
}: {
  lng: string;
  showSidebar: boolean;
  setShowSidebar: (argument: boolean) => void;
}) => {
  return (
    <div
      className={`${
        showSidebar ? 'flex' : 'hidden laptop:flex'
      } flex-col bg-primary-500 w-full laptop:w-[252px] h-[calc(100vh-56px)] jutify-between sticky top-[56px]`}
    >
      <div className="flex flex-1 flex-col gap-y-6 px-2 py-6 h-[calc(100%-56px)]">
        {/* <CreateBot /> */}
        {<CreateBot lng={lng} setShowSidebar={setShowSidebar} />}
        {/* Map through the BotsList */}
        <Can I={EActions.READ} a={ESubjects.BOTS}>
          <SideBarList lng={lng} setShowSidebar={setShowSidebar} />
        </Can>
      </div>
      {/* Setting button */}
      {/* <Can I={EActions.READ} a={ESubjects.USERS}>
        <YourOrganization setShowSidebar={setShowSidebar} />
      </Can> */}
    </div>
  );
};
