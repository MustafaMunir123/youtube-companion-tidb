'use client';

import { UseFormInputReturnType, FormInputProps } from './FormInput.types';

import { Control, useController } from 'react-hook-form';

export function FormInputWrapper<T>(name: string, control: Control): UseFormInputReturnType<T> {
  // Use the useController hook to get the field and fieldState objects
  // for the current input
  const {
    field: { onBlur, value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  // Return an object with the values we want to expose to the component
  return {
    value: value as T,
    error: error?.message,
    onBlur,
    onChange, // Added the onChange function to the return object
  };
}

export function FormInput<T>({ control, names, render }: FormInputProps<T>) {
  // Call useFormInput for each field name
  const inputPropsList = names.map((name) => FormInputWrapper<T>(name, control));
  // Call the render function, passing in the input props
  return render(inputPropsList);
}
export default FormInput;
