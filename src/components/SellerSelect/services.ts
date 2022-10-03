import { Seller } from '@/types/seller';
import { apiGet } from '@/utils/request';
import { uniqBy } from 'lodash/fp';
import {
  GetSellerOptionsRequest,
  GetSellerRequest,
  GetSellersRequest,
  GetSellersResponse,
} from './types';

export const getSellers: GetSellersRequest = ({ name = '' } = {}) => {
  const params: Record<string, string> = {
    limit: '20',
    order_by: 'created_at|desc',
  };

  if (name !== '') {
    params.name = name;
  }

  const paramsString = new URLSearchParams(params).toString();
  return apiGet(`${process.env.REACT_APP_API_SC}/seller/v2/sellers?${paramsString}`, {});
};

export const getSeller: GetSellerRequest = ({ sellerId }) => {
  return apiGet(`${process.env.REACT_APP_API_SC}/seller/v2/sellers/${sellerId}`, {});
};

export const getSellerOptions: GetSellerOptionsRequest = async ({ sellerId }) => {
  if (!sellerId) {
    const response = await getSellers();
    return response.data;
  }

  const requests: [Promise<GetSellersResponse>, Promise<Seller>] = [
    getSellers(),
    getSeller({ sellerId }),
  ];
  const [sellers, seller] = await Promise.all(requests);
  // Unique to prevent duplication
  return uniqBy('id', [seller, ...sellers.data]);
};
