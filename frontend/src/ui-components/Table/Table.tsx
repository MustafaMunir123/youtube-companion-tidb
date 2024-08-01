'use client';

import React, { Fragment } from 'react';

import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';
import { Table } from 'flowbite-react';

import { IColumn, ITable } from './Table.type';

export default function DefaultTable(props: ITable) {
  const { columns, data, rowClick, onSort } = props;
  const actions = columns.find((column) => column.accessor === 'actions');

  return (
    <Table
      striped
      className="ltr:text-left rtl:text-right overflow-x-auto"
      theme={{ root: { wrapper: 'overflow-x-auto' } }}
    >
      <Table.Head className="text-grey-600 border-b border-gray-200">
        {columns?.map((columnData: IColumn, index: number) => {
          return (
            <Table.HeadCell
              onClick={() => columnData.isSortable && onSort && onSort(columnData.accessor)}
              className="!rounded-none px-3 py-2 font-regular"
              key={index}
            >
              <div className="flex items-center">
                {columnData.isSortable && (
                  <button className="flex justify-center items-center gap-x-1">
                    <ArrowsUpDownIcon className="w-3 h-3 text-gray-500" />
                    {columnData.header}
                  </button>
                )}
                {!columnData.isSortable && <span>{columnData.header}</span>}
              </div>
            </Table.HeadCell>
          );
        })}
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 text-neutral-800">
        {data?.map((rowData: object, index) => {
          return (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:!bg-primary-50"
              key={index}
              onClick={() => rowClick && rowClick(rowData)}
            >
              {Object.entries(rowData)?.map((cellInfo: any, cellIndex: number) => {
                const [columnKey, conlumnValue] = cellInfo;
                const foundColumn = columns.find((obj) => obj.accessor === columnKey);
                return (
                  <Fragment key={cellIndex}>
                    {foundColumn && (
                      <Table.Cell
                        key={cellIndex}
                        className="!rounded-none px-1 tablet:px-3 py-2 max-w-full tablet:max-w-[210px] break-words truncate text-xs tablet:text-sm"
                        title={conlumnValue.toString()}
                      >
                        {foundColumn?.cellFormatter ? (
                          foundColumn?.cellFormatter?.(rowData)
                        ) : (
                          <p className="max-w-[100%] truncate">{conlumnValue}</p>
                        )}
                      </Table.Cell>
                    )}
                  </Fragment>
                );
              })}
              {actions && (
                <Table.Cell className="!rounded-none px-3 py-2 w-[120px]">
                  {actions?.cellFormatter?.(rowData, index)}
                </Table.Cell>
              )}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
