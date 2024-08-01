import { FocusEventHandler, ChangeEvent } from 'react';

// Define a type for the return value of the useFormInput function
export type UseFormInputReturnType<T> = {
  onBlur: FocusEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | undefined;
  value: T;
  error?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
};

// Define the FormInput component
export type FormInputProps<T> = {
  // Todo: we will replace the any type with {Control} React-hook-form in future inshaAllah
  control: any;
  names: string[]; // Accept an array of field names
  render: (props: UseFormInputReturnType<T>[]) => JSX.Element;
};
