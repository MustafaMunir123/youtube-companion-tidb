'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useConfirm } from '@/hooks/useConfirm/useConfirm';
import { useDebounce } from '@/hooks/useDebounce/useDebounce';
import useAbility from '@/rbac/abilities/useAbility';
import {
  // useDeleteBot,
  // useFetchBotStatus,
  usePaginateChatbots,
  // useUpdateBot,
} from '@/services/chatbot/chatbot.service';
import { TableSkeleton } from '@/ui-components';
import Table from '@/ui-components/Table/Table';
import { IColumn } from '@/ui-components/Table/Table.type';
import TablePagination from '@/ui-components/TablePagination/TablePagination';
import { ChatbotStatus } from '@/utils/constants';
import { getFormattedDateString } from '@/utils/helpers';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';


import { useI18n } from '@/i18n/client';

import { BotStatusData } from '@/types/common';

const BotsDataTable = () => {
  const t = useI18n();

  const confirm = useConfirm();
  const { push } = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [dataLength, setDataLength] = useState<number>(0);

  const debouncedValue = useDebounce<string>(searchValue, 500);

  const ability = useAbility();

  const { data: resData, isFetching, isLoading, refetch } = usePaginateChatbots();

  // const deleteBot = useDeleteBot();

  // const fetchStatus = useFetchBotStatus();

  const [sortColumn, setSortColumn] = useState<string>(''); // Track the current sorting column
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc'); // Track the sorting direction

  const [botStatusInfo, setBotStatusInfo] = useState<BotStatusData[] | null>(null);

  // const updateChatbot = useUpdateBot();

  useEffect(() => {
    console.log("resData in useeffect for botsdatatable::===", resData)
    if (resData?.length) {
      setDataLength(resData?.length);
    }
  }, [resData]);


  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    }
  };

  const sortData = (data: any) => {
    if (!sortColumn) {
      return data; // No sorting, return data as is
    }
    const sortedData = [...data];
    sortedData.sort((a: any, b: any) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        if (sortDirection === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else {
        if (sortDirection === 'asc') {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      }
    });

    return sortedData;
  };

  //filter userdata based on name if name is present in searchValue
  const botsData = resData?.data?.results;

  const botsDataWithStatus = botsData?.map((bot: any) => {
    const statusData = botStatusInfo?.find((statusData: BotStatusData) => statusData.id === bot.id);
    if (statusData) {
      return { ...bot, status: statusData?.status };
    }
    return bot;
  });

  const sortedAndFilteredData = botsDataWithStatus ? sortData(botsDataWithStatus) : [];

  const nameFormatter = (rowData: any) => {
    return (
      <div className="flex items-center gap-x-2">
        {/* set the in the link tag */}
          <p
            title={`${rowData?.name}\nCreated At: ${getFormattedDateString(
              rowData?.created_at,
            )}\nUpdated At: ${getFormattedDateString(rowData?.updated_at)}`}
          >
            {rowData?.name}
          </p>
      </div>
    );
  };

  const lastTrainedFormatter = (rowData: any) => {
    return (
      <div className="flex items-center gap-x-2">
        <p className="bg-gray-100 text-primary-500 text-sm">
          {getFormattedDateString(rowData?.last_trained_at)}
        </p>
      </div>
    );
  };

  const statusFormatter = (rowData: any) => {
    return (
      <div className="flex font-regular font-normal  ">
        {rowData.status === ChatbotStatus.TRAINED && (
          <span className="text-green-500 flex gap-x-1">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            Trained
          </span>
        )}
        {rowData.status === ChatbotStatus.IN_PROGRESS && (
          <span className="text-yellow-500 flex gap-x-1">
            <ExclamationCircleIcon className="w-5 h-5 text-yellow-500" />
            In Progress
          </span>
        )}
        {rowData.status === ChatbotStatus.FAILED && (
          <span className="text-danger-500 flex gap-x-1">
            <ExclamationCircleIcon className="w-5 h-5 text-danger-500" />
            Failed
          </span>
        )}
      </div>
    );
  };


  const playlistFormatter = (rowData: any) => {
    return (
      <div className="flex font-regular font-normal  ">
        {rowData.playlist === true && (
          <span className="text-green-500 flex gap-x-1">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            Is Playlist
          </span>
        )}
        {rowData.playlist==false && (
          <span className="text-danger-500 flex gap-x-1">
          <ExclamationCircleIcon className="w-5 h-5 text-danger-500" />
          Not PLaylist
        </span>
        )}
      </div>
    );
  };


  const columns: IColumn[] = [
    { header: 'title', accessor: 'chat_title', cellFormatter: nameFormatter },
    { header: t('url'), accessor: 'url' },
    {
      header: t('status'),
      accessor: 'status',
      cellFormatter: statusFormatter,
      isSortable: true,
      sortDirection,
    },
    {
      header: 'playlist',
      accessor: 'is_playlist',
      cellFormatter: playlistFormatter,
    },
  ];

  const rowClick = (row: object) => {
    console.log("row in rowclick::===", row)
  };

  // const onDeleteBot = async (rowData: any) => {
  //   let closeDialog;
  //   closeDialog = await confirm({
  //     title: t(`delete_bot_title`),
  //     description: t(`delete_bot_message`, { name: rowData?.name }),
  //     confirmTitle: t('delete'),
  //     cancelTitle: t('cancel'),
  //   });
  //   try {
  //     const response = await deleteBot.mutateAsync({
  //       id: rowData.id,
  //       organization_id: organizationInfo?.id,
  //     });
  //     if (response.status === 204) {
  //       toast.success(t('chatbot_deleted_success'));
  //     }

  //     const newDataLength = dataLength - 1;
  //     orgSubscriptionRefetch();
  //   } catch (error: any) {
  //     toast.error(error?.response?.data?.message);
  //   }

  //   if (closeDialog) {
  //     closeDialog();
  //   }
  // };

  // const onEditBot = async (rowData: any) => {
  //   push(`${protectedRoutes.UPDATE_CHATBOT}/${rowData.id}`);
  // };

  // const onActivationChange = async (rowData: any, activate: boolean) => {
  //   let closeDialog;
  //   try {
  //     closeDialog = await confirm({
  //       title: activate ? t(`activate_bot_title`) : t(`deactivate_bot_title`),
  //       description: activate
  //         ? t(`activate_bot_message`, { name: rowData?.name })
  //         : t(`deactivate_bot_message`, { name: rowData?.name }),
  //       confirmTitle: t('yes'),
  //       cancelTitle: t('no'),
  //     });
  //     try {
  //       const formData = new FormData();

  //       formData.append('organization_id', organizationInfo?.id);
  //       formData.append('is_active', `${activate}`);
  //       const response = await updateChatbot.mutateAsync({ data: formData, id: rowData?.id });
  //       if (response?.success && activate) {
  //         toast.success(t('chatbot_activation_success'));
  //       } else if (response?.success && !activate) {
  //         toast.success(t('chatbot_deactivation_success'));
  //       }
  //       orgSubscriptionRefetch();
  //     } catch (error: any) {
  //       if (
  //         error?.response?.data?.message &&
  //         error?.response?.data?.message.includes('Maximum chatbot limit reached')
  //       ) {
  //         toast.error(t('maximum_chatbot_activation_limit_reached'));
  //       } else {
  //         toast.error(t('not_found_error'));
  //       }
  //     }
  //     if (closeDialog) {
  //       closeDialog();
  //     }
  //   } catch (e: any) {}
  // };

  // if ((!resData || resData?.data?.results?.length === 0) && debouncedValue === '') {
  //   return (
  //     <>
  //       <EmptyState
  //         emptyIcon={{
  //           icon: (
  //             <Image src={noBots} width="100" height="100" quality={100} priority alt="Bot Icon" />
  //           ),
  //         }}
  //         title={t('not_bots')}
  //         description={t('no_bot_description')}
  //       />
  //     </>
  //   );
  // }

  return (
    <>
      {isLoading ? (
        <TableSkeleton numberOfRows={recordsPerPage} />
      ) : (
        <div className="border border-gray-200 rounded-md overflow-x-auto">
          <Table
            columns={columns}
            data={sortedAndFilteredData}
            rowClick={rowClick}
            onSort={handleSort}
          />
          {sortedAndFilteredData.length > 0 && (
            <TablePagination
              currentPage={selectedPage}
              totalPages={Math.ceil(resData?.data?.count / recordsPerPage)}
              totalRecords={resData?.data?.count}
              recordsPerPage={recordsPerPage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BotsDataTable;
