// import { StoreFromUserPayload } from '@/components/StoreSelect/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StoreFromUserPayload {
  id: number;
}

export interface UserState {
  userDetail: UserDetail;
  sellerDetail: object;
}

export interface UserDetail {
  shouldSelectSeller: boolean;
  currentUser: Partial<CurrentUser>;
  permissions?: any,
  sellerIds?: any
}

interface CurrentUser {
  stores: {
    data: StoreFromUserPayload[];
  };
  seller_id: number;
  id: number;
  tiki_id: number;
  name: string;
  email: string;
  phone_number: string;
  status: boolean;
  is_email_verified: boolean;
  created_at: string;
}

interface PayloadUserDetail {
  user: UserDetail;
  seller: object;
}

const initialState: UserState = {
  userDetail: {
    shouldSelectSeller: false,
    currentUser: {},
  },
  sellerDetail: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    saveUserDetail: (state: UserState, action: PayloadAction<PayloadUserDetail>) => {
      state.userDetail = action.payload.user;
      state.sellerDetail = action.payload.seller;
    },
  },
});

export const { saveUserDetail } = userSlice.actions;

export default userSlice.reducer;
