import { EMAIL_REGEX } from '@/utils/constants';
import * as yup from 'yup';

import { useI18n } from '@/i18n/client';

export const useSigninSchema = () => {
  const t = useI18n(); // Assuming useI18n() provides translation function

  const signinSchema = yup.object().shape({
    email: yup
      .string()
      .required(t('email_required'))
      .matches(EMAIL_REGEX, t('invalid_email_format')),
    password: yup.string().required(t('no_password_provided')),
  });

  return { signinSchema };
};
