'use client;';

import { useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ConfirmationDialogProps } from '@/hooks/useConfirm/useConfirm.interface';
import { Button } from '@/ui-components';
import { errorIcon } from '@/utils/images';
import { CustomFlowbiteTheme, Flowbite, Modal } from 'flowbite-react';

const confirmationDialogStyle: CustomFlowbiteTheme = {
  modal: {
    content: {
      base: 'h-auto w-[330px] tablet:w-auto',
    },
    body: {
      popup: 'pt-6',
    },
  },
};

export const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const {
    open,
    description,
    title,
    confirmTitle,
    cancelTitle,
    onSubmit,
    onCancel,
    confirmBtn,
    cancelBtn,
    isLoading,
    variant = 'error',
  } = props;

  const pathName = usePathname();

  useEffect(() => {
    if (open) {
      onCancel();
    }
  }, [pathName]);

  return (
    <>
      <Flowbite theme={{ theme: confirmationDialogStyle }}>
        <Modal show={open} size="md" popup onClose={onCancel}>
          <Modal.Body>
            <div className="flex flex-col justify-center items-center gap-y-6">
              <Image
                src={errorIcon}
                width="54"
                height="54"
                quality={100}
                priority
                alt="Delete icon"
                className="mx-auto"
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-base">{description}</p>
              </div>
              <div className="flex w-full gap-x-4">
                <Button variant="secondary" size="lg" fullWidth onClick={onCancel}>
                  {cancelTitle}
                </Button>
                <Button variant="danger" size="lg" fullWidth onClick={onSubmit}>
                  {confirmTitle}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Flowbite>
    </>
  );
};
