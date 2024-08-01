export interface IColumn {
  header: string;
  accessor: string;
  cellFormatter?: (value: any, index?: number | undefined) => JSX.Element | undefined;
  isSortable?: boolean;
  sortDirection?: 'asc' | 'desc';
}

export interface ITable {
  columns: IColumn[];
  data: object[];
  rowClick?: (row: any) => void;
  onSort?: (column: string) => void;
}
