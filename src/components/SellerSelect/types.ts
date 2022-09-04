import { Response } from '@/types';
import { Seller } from '@/types/seller';

export type GetSellersPayload = {
  name?: string;
};
export type GetSellersResponse = Response<Seller>;
export type GetSellersRequest = (payload?: GetSellersPayload) => Promise<GetSellersResponse>;

export type GetSellerPayload = {
  sellerId: number | string;
};
export type GetSellerRequest = (payload: GetSellerPayload) => Promise<Seller>;

export type GetSellerOptionsPayload = {
  sellerId: number | string;
};
export type GetSellerOptionsRequest = (payload: GetSellerOptionsPayload) => Promise<Seller[]>;

export type UseSellers = (sellerId: string | number) => {
  sellers: Seller[];
  fetching: boolean;
  onSearch: (value: string) => void;
};
