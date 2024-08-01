export interface ConfirmationDialogOptions {
  title?: string;
  description?: string;
  confirmTitle: string;
  cancelTitle: string;
  variant?: string;
}

export interface ConfirmationDialogProps extends ConfirmationDialogOptions {
  open: boolean;
  confirmBtn: boolean;
  cancelBtn: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}
