import { TablePaginationConfig } from "antd";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface";

export interface Amount {
  status: string;
  total: number;
}

export interface PaymentController {
  id: number;
  request_date: number;
  status: string;
  total: number;
  created_at: number;
  completed_date: number;
  created_by: string;
  payment_request_summary: Amount[];
}

export type OnPagingChange<T> = (
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<T> | SorterResult<T>[],
  extra: TableCurrentDataSource<T>
) => void;

export interface PaymentControllerQuery {
  order_by: string;
  limit: string;
  page: string;
}

export type PushPaymentAPIParams = Pick<PaymentController, "id" | "status">;
export type GeneratePaymentAPIParams = { request_date?: string };
export type GetPaymentAPIParams = {
  page: string;
  limit: string;
  order_by: string;
};


export type GetListProductBySellerIdParams = {
  cursor: number,
  dataPayload: any,
  limit: number
}

export type GetListWarehouseParams = {
  seller_id: any,
  items: any,
}

export type CreateBPORParams = {
  [key: string]: any;
}

export type UpdateBPORParams ={
  [key: string]: any;
}
export type ImportFileParams ={
  [key: string]: any;
}
