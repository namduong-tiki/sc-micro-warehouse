import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';

export interface ContainerInterface {
  container?: Element;
}

export type Unused = any;

export interface Response<T> {
  data: T[];
  paging: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
  };
}

export type OnPagingChange = <T>(
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<T> | SorterResult<T>[],
  extra: TableCurrentDataSource<T>
) => void;

export interface Paging {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}
