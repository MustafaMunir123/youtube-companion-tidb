'use client';

import { useRouter } from 'next/navigation';

import { Can } from '@/rbac/abilities/ability.context';
import { EActions, ESubjects } from '@/rbac/abilities/ability.enum';
import { Button } from '@/ui-components';
import { protectedRoutes } from '@/utils/routes';
import { PlusSmallIcon } from '@heroicons/react/24/outline';

import { useI18n } from '@/i18n/client';

export const CreateBot = ({
  lng,
  setShowSidebar,
}: {
  lng: string;
  setShowSidebar: (argument: boolean) => void;
}) => {
  const t = useI18n();
  const { push } = useRouter();

  const handleChatbot = () => {
    push(protectedRoutes.CREATE_CHAT);
    setShowSidebar(false);
  };

  return (
    <Can I={EActions.CREATE} a={ESubjects.BOTS}>
      <Button
        variant="secondary"
        fullWidth
        roundedness="md"
        onClick={handleChatbot}
        className="border-white"
      >
        <PlusSmallIcon className="h-6 w-6" />
        <span className="text-sm">{t('create_bot')}</span>
      </Button>
    </Can>
  );
};

export default CreateBot;
