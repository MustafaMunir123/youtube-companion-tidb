// export interface ITablePagination {
//   page: number;
//   pageSize:
// }

export interface ITablePagination {
  nextPage: () => void;
  previousPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageIndex: number;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  pageCount: number;
  //
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  recordsPerPage: number;
  handleRecordsPerPage: (newRecordsPerPage: number) => void;
  handleCurrentPage: (page: number) => void;
}
