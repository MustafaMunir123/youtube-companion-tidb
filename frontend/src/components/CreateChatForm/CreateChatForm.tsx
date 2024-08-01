'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import {
  useCreateChatbot,
  useTrainChat,
  useTrainChatbot,
} from '@/services/chatbot/chatbot.service';
import { Input, PageHeader } from '@/ui-components';
import { protectedRoutes } from '@/utils/routes';
import { yupResolver } from '@hookform/resolvers/yup';

import FormInput from '../FormInput/FormInput';
import { CreatebotFieldsFormValues } from './CreateChatForm.types';
import { useCreateBotFormSchema } from './useCreateChatFormSchema';

import { useI18n } from '@/i18n/client';

export const CreateChatForm = () => {
  const t = useI18n();
  const { createBotFormSchema } = useCreateBotFormSchema();
  const [errorMsg, setErrorMsg] = useState('');
  const [isDisableCreateBot, setIsDisableCreateBot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(t('create_train'));

  const TrainChat = useTrainChat()

  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreatebotFieldsFormValues>({
    resolver: yupResolver<CreatebotFieldsFormValues>(createBotFormSchema),
    defaultValues: {
      title: '',
      url: '',
    },
  });

  const watchName = watch('title');
  const watchDescription = watch('url');

  useEffect(() => {
    handleDisableCreateBot(!watchName || !watchDescription );
  }, [watchName, watchDescription]);


  // TODO: THIS IS FORMDATA RIGHT NOW, MAKE IT JSON
  const onSubmit: SubmitHandler<CreatebotFieldsFormValues> = async (data) => {

    try {
      setErrorMsg('');
      try {
        console.log("data in createchatform", data)
        const chatbot = await TrainChat.mutateAsync({chat_title: data.title, url: data.url});

        if (chatbot?.data?.id) {
          toast.success(t('chatbot_created'));
        }
      } catch (createBotError: any) {
        let errorMessage = '';
        if (
          createBotError?.response?.data?.message &&
          createBotError?.response?.data?.message.includes('Maximum chatbot limit reached')
        ) {
          errorMessage = t('maximum_chatbot_limit_reached');
        } else {
          errorMessage = createBotError?.response?.data?.message || t('not_found_error');
        }
        toast.error(errorMessage);
      }
    } catch (validationError: any) {
      setErrorMsg(validationError.message);
    } finally {
      setIsLoading(false);
      setLoadingText(t('create_train'));
    }
  };

  const handleDisableCreateBot = (value: boolean) => {
    setIsDisableCreateBot(value);
  };

  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <PageHeader
          title={t('create_your_bot')}
          actionButton={{
            text: t('create_train'),
            type: 'submit',
            error: !!errorMsg,
            isLoading: isLoading,
            disabled: isDisableCreateBot,
            onClick: handleSubmit(onSubmit)
          }}
        />
        <div className="flex flex-col gap-y-4 items-center bg-white rounded-md shadow-sm w-full max-w-[720px] m-auto mt-6 p-3 tablet:p-6 border border-gray-200">
          <FormInput<string>
            control={control}
            names={['title', 'url']} // Pass an array of field names
            render={(inputPropsList) => {
              // Destructuring the inputPropsList array
              const [titleProps, urlProps] = inputPropsList;
              return (
                <>
                  <Input
                    type="text"
                    variant="primary"
                    label={t('name_your_bot')}
                    placeholder={t('type_name')}
                    required
                    fullWidth
                    errorMessage={titleProps.error}
                    {...titleProps}
                  />
                  <Input
                    type="text"
                    variant="primary"
                    label={t('url')}
                    placeholder={'youtube url'}
                    required
                    fullWidth
                    errorMessage={urlProps.error}
                    {...urlProps}
                  />
                </>
              );
            }}
          />


        </div>
      </form>
    </>
  );
};
