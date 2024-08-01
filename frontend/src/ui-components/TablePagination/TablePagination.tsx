'use client';

import { Dropdown, Pagination } from 'flowbite-react';

import { ITablePagination } from './Paginate.interface';

import { useI18n } from '@/i18n/client';

export default function TablePagination(props: Partial<ITablePagination>) {
  const {
    currentPage,
    totalPages,
    totalRecords,
    handleCurrentPage,
    recordsPerPage,
    handleRecordsPerPage,
  } = props;
  const rowsPerPageOptions = [5, 10, 15, 20];
  const t = useI18n();

  return (
    <div className="flex flex-col tablet:flex-row items-start tablet:items-center justify-center w-full border-t border-gray-200 outline-none px-3 tablet:px-0 py-3 tablet:py-0 gap-y-2">
      <span className="flex justify-start tablet:justify-end items-center text-md font-regular text-gray-700 w-full">
        {/* if we want to show Records on Every page to that i work with this and change the justify-end to justify-between */}
        {/* <span className='ml-4'>
          {`${currentPage} - ${recordsPerPage} of ${totalPages}`}
        </span> */}
        <span className="flex">
          {`${t('rows_per_page')} : ${recordsPerPage}`}
          <Dropdown inline label={null}>
            {rowsPerPageOptions.map((option) => (
              <Dropdown.Item
                key={option}
                onClick={() => {
                  handleRecordsPerPage?.(option);
                }}
              >
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </span>
      </span>
      <Pagination
        layout="pagination"
        currentPage={currentPage as number}
        onPageChange={(page) => {
          handleCurrentPage?.(page);
        }}
        showIcons
        totalPages={totalPages as number}
        className="flex justify-end items-center text-grey-600 py-0 tablet:py-3 px-0 tablet:px-6 h-auto"
        nextLabel={`${t('next')}`}
        previousLabel={`${t('previous')}`}
      />
    </div>
  );
}
