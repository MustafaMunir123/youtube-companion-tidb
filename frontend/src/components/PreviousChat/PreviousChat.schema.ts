import * as yup from 'yup';

export const schema = yup.object().shape({
  prompt: yup.string().required('Prompt is required'),
});
