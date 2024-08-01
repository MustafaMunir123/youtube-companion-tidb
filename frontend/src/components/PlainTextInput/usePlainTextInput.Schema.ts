import * as yup from 'yup';


export const usePlainTextInputSchema = () => {

  const plainTextInputSchema = yup.object().shape({
    text: yup.string().required('text_required'),
  });

  return {
    plainTextInputSchema,
  };
};
