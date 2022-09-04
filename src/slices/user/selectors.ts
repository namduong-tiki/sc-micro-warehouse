import { RootState } from '@/app/store';

export const storesSelector = (state: RootState) => state.user.userDetail?.currentUser?.stores?.data ?? [];
export const canSelectSellerSelector = (state: RootState) => state.user.userDetail?.shouldSelectSeller ?? false;
export const userSellerIdSelector = (state: RootState) => state.user.userDetail?.currentUser?.seller_id;
export const userSellerDetailSelector = (state: RootState) => state.user.userDetail;
