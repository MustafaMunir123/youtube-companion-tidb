import * as yup from 'yup';

import { useI18n } from '@/i18n/client';


export const useCreateBotFormSchema = () => {
  const t = useI18n(); // Assuming useI18n() provides translation function

  const createBotFormSchema = yup.object().shape({
    title: yup
      .string()
      .trim()
      .required(t('name_required'))
      .matches(/.*[a-zA-Z0-9].*/, t('name_invalid'))
      .matches(/^[^\d]*$/, 'no numbers allowed')
      .max(32, t('name_max_error', { max: '32' })),

    url: yup.string().url(t('invaliad_url_format')).required(t('URL_is_required')).matches(/youtube\.com/, t('invaliad_url_format')),
  });


  return { createBotFormSchema };
};
