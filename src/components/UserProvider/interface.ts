import { UserDetail as SliceUserDetail } from "@/slices/user";

export interface UserDetail {
  loading: boolean;
  user: User;
  seller: object;
}

export interface User extends SliceUserDetail {
  permissions: string;
  checkTikiTrading: () => {};
}
