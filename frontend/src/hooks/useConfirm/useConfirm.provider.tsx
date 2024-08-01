'use client';

import { useState } from 'react';

import { ConfirmationDialog } from '@/components/ConfirmationDialog/ConfirmationDialog';

import { ConfirmationDialogContext } from './useConfirm';
import { ConfirmationDialogOptions } from './useConfirm.interface';

interface IProvider {
  children: React.ReactNode;
}
export const ConfirmationDialogProvider = ({ children }: IProvider) => {
  const [confirmationState, setConfirmationState] = useState<ConfirmationDialogOptions | null>(
    null,
  );
  const [confirmBtn, setConfirmBtn] = useState<boolean>(false);
  const [cancelBtn, setCancelBtn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [resolveReject, setResolveReject] = useState<any>([]);
  const [resolve, reject] = resolveReject;
  const confirm = (options: ConfirmationDialogOptions): Promise<() => void> => {
    return new Promise<() => void>((resolve, reject) => {
      setConfirmationState(options);
      setResolveReject([resolve, reject]);
    });
  };
  const handleClose = () => {
    setResolveReject([]);
    setConfirmBtn(false);
    setCancelBtn(false);
    setLoading(false);
  };
  const handleCancel = () => {
    setConfirmBtn(true);
    setCancelBtn(true);
    reject();
    handleClose();
  };
  const handleSubmit = () => {
    setLoading(true);
    setConfirmBtn(true);
    setCancelBtn(true);
    resolve(handleClose);
  };

  return (
    <>
      <ConfirmationDialogContext.Provider value={confirm}>
        {children}
      </ConfirmationDialogContext.Provider>
      <ConfirmationDialog
        open={resolveReject.length === 2}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        confirmBtn={confirmBtn}
        cancelBtn={cancelBtn}
        isLoading={isLoading}
        confirmTitle="Ok"
        cancelTitle="Cancel"
        variant={confirmationState?.variant}
        {...confirmationState}
      />
    </>
  );
};
export default ConfirmationDialogProvider;
